import com.example.BankingApplication.exception.AccountNotFoundException;
import com.example.BankingApplication.exception.InsufficientFundsException;
import com.example.BankingApplication.model.Account;
import com.example.BankingApplication.model.Withdraw;
import com.example.BankingApplication.repository.AccountRepository;
import com.example.BankingApplication.repository.WithdrawRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
public class WithdrawService {

    @Autowired
    private WithdrawRepository withdrawRepository;

    @Autowired
    private AccountRepository accountRepository;

    /**
     * Process a withdrawal and save it as a Withdraw transaction.
     *
     * @param accountId The account ID from which to withdraw funds.
     * @param amount The amount to withdraw.
     * @return A Withdraw object containing details of the transaction.
     */
    @Transactional
    public Withdraw processWithdrawal(String accountId, Double amount) {
        // Validate the withdrawal amount
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be greater than zero.");
        }

        // Fetch the account from the database
        Account account = accountRepository.findByAccountId(accountId)
                .orElseThrow(() -> new AccountNotFoundException("Account with ID " + accountId + " not found."));

        // Check if the account has sufficient funds
        if (account.getBalance() < amount) {
            throw new InsufficientFundsException("Insufficient funds in account " + accountId + ".");
        }


        account.setBalance(account.getBalance() - amount);

        // Save the updated account
        accountRepository.save(account);

        // Create a Withdraw transaction
        Withdraw withdraw = new Withdraw("", 0.0, LocalDateTime.now());
        withdraw.setAccountId(accountId); // Use accountId here
        withdraw.setAmount(amount);
        withdraw.setWithdrawalDate(LocalDateTime.now());

        // Save the Withdraw transaction to the database
        return withdrawRepository.save(withdraw);
    }
}
