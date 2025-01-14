package com.example.BankingApplication.service;

@Service
public class WithdrawService {
    @Autowired
    private WithdrawRepository withdrawRepository;
    @Autowired
    private AccountRepository accountRepository;

    public Withdraw processWithdrawal(String accountNumber, Double amount) {
        // Perform the withdrawal logic and return a Withdraw object
    }
}

