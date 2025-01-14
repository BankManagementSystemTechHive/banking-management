package com.example.BankingApplication.service;

import com.example.BankingApplication.exception.AccountNotFoundException;
import com.example.BankingApplication.exception.InsufficientFundsException;
import com.example.BankingApplication.model.Account;
import com.example.BankingApplication.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AccountService {

    // Injecting the AccountRepository to interact with the database
    @Autowired
    private AccountRepository accountRepository;

    /**
     * Deposit method to add a specified amount to an account's balance.
     *
     * @param accountNumber The account number where the deposit will be made.
     * @param amount The amount to deposit into the account.
     * @return The updated Account object after the deposit is successful.
     */
    public Account deposit(String accountNumber, Double amount) {
        // Ensure that the amount to deposit is positive
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be greater than zero.");
        }

        // Fetch the account by account number, throwing an exception if not found
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new AccountNotFoundException(accountNumber));

        // Add the deposit amount to the current balance
        account.setBalance(account.getBalance() + amount);

        // Save and return the updated account after deposit
        return accountRepository.save(account);
    }

    /**
     * Method to withdraw funds from an account. This method checks if the account
     * has enough balance before performing the withdrawal.
     *
     * @param accountNumber The account number where the withdrawal will be made.
     * @param amount The amount to withdraw from the account.
     * @return The updated Account object after the withdrawal is successful.
     */
    public Account withdraw(String accountNumber, Double amount) {
        // Ensure that the amount to withdraw is positive
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be greater than zero.");
        }

        // Fetch the account by account number, throwing an exception if not found
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new AccountNotFoundException(accountNumber));

        // Check if the account has enough balance
        if (account.getBalance() < amount) {
            throw new InsufficientFundsException();
        }

        // Deduct the withdrawal amount from the current balance
        account.setBalance(account.getBalance() - amount);

        // Save and return the updated account after withdrawal
        return accountRepository.save(account);
    }

    /**
     * Method to get the current balance of an account.
     *
     * @param accountNumber The account number whose balance is being checked.
     * @return The current balance of the account.
     */
    public Double getBalance(String accountNumber) {
        // Fetch the account by account number
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new AccountNotFoundException(accountNumber));

        // Return the current balance of the account
        return account.getBalance();
    }

    /**
     * Transfer funds from one account to another.
     * This method ensures both accounts are updated as part of a single transaction.
     *
     * @param fromAccountNumber The account number to transfer funds from.
     * @param toAccountNumber The account number to transfer funds to.
     * @param amount The amount to transfer.
     */
    @Transactional
    public void transfer(String fromAccountNumber, String toAccountNumber, Double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Transfer amount must be greater than zero.");
        }

        Account fromAccount = accountRepository.findByAccountNumber(fromAccountNumber)
                .orElseThrow(() -> new AccountNotFoundException(fromAccountNumber));

        Account toAccount = accountRepository.findByAccountNumber(toAccountNumber)
                .orElseThrow(() -> new AccountNotFoundException(toAccountNumber));

        // Ensure that the source account has enough balance
        if (fromAccount.getBalance() < amount) {
            throw new InsufficientFundsException();
        }

        // Perform the transfer (withdraw from source, deposit to destination)
        fromAccount.setBalance(fromAccount.getBalance() - amount);
        toAccount.setBalance(toAccount.getBalance() + amount);

        // Save both updated accounts
        accountRepository.save(fromAccount);
        accountRepository.save(toAccount);
    }
}


