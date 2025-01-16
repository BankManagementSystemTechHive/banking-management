package com.example.BankingApplication.service;

import com.example.BankingApplication.model.Customer;
import com.example.BankingApplication.model.Deposit;
import com.example.BankingApplication.repository.CustomerRepository;
import com.example.BankingApplication.repository.DepositRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class DepositService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private DepositRepository depositRepository;

    public Deposit processDeposit(String accountId, Double amount) {
        // Validate the account
        Customer customer = customerRepository.findById(accountId)
                .orElseThrow(() -> new IllegalArgumentException("Account not found"));

        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be greater than zero");
        }

        // Update customer's balance
        customer.setBalance(customer.getBalance() + amount);
        customerRepository.save(customer);

        // Create a new Deposit record
        Deposit deposit = new Deposit(customer.getId(), amount, LocalDateTime.now());
        return depositRepository.save(deposit);
    }
}

