package com.example.BankingApplication.controller;

import com.example.BankingApplication.model.Account;
import com.example.BankingApplication.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/deposit")
public class DepositController {

    @Autowired
    private AccountRepository accountRepository;  // Injecting the AccountRepository

    // Method to handle deposit requests
    @PostMapping("/{accountNumber}")
    public Account deposit(@PathVariable String accountNumber, @RequestParam Double amount) {
        // Fetching account based on account number
        Account account = accountRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));

        // Update the balance with the deposit amount
        account.setBalance(account.getBalance() + amount);

        // Save the updated account and return it
        return accountRepository.save(account);
    }
}

