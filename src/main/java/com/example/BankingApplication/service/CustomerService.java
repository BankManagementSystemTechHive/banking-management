package com.example.BankingApplication.service;

import com.example.BankingApplication.exception.InsufficientFundsException;
import com.example.BankingApplication.model.Customer;
import com.example.BankingApplication.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;  // Corrected injection name

    // View balance for a customer
    public Customer viewBalance(String accountNumber) {
        return customerRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Account not found."));
    }
    public Optional<Customer> getCustomerById(String id) {
        return customerRepository.findById(id);
    }

    // Deposit into a customer's account
    public Customer deposit(String accountNumber, Double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Deposit amount must be greater than zero.");
        }

        Customer account = customerRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Account not found."));

        account.setBalance(account.getBalance() + amount);
        return customerRepository.save(account); // Save updated account
    }

    // Withdraw from a customer's account
    public Customer withdraw(String accountNumber, Double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Withdrawal amount must be greater than zero.");
        }

        Customer account = customerRepository.findByAccountNumber(accountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Account not found."));

        if (account.getBalance().compareTo(amount) < 0) {
            throw new InsufficientFundsException("Insufficient balance.");
        }

        account.setBalance(account.getBalance() - amount);
        return customerRepository.save(account); // Save updated account
    }

    // Transfer between two customers' accounts
    public boolean transfer(String fromAccountNumber, String toAccountNumber, Double amount) {
        if (amount <= 0) {
            throw new IllegalArgumentException("Transfer amount must be greater than zero.");
        }

        // Find the from and to customers by their account numbers
        Customer fromAccount = customerRepository.findByAccountNumber(fromAccountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Sender account not found."));
        Customer toAccount = customerRepository.findByAccountNumber(toAccountNumber)
                .orElseThrow(() -> new IllegalArgumentException("Receiver account not found."));

        // Check if the sender has sufficient funds
        if (fromAccount.getBalance().compareTo(amount) < 0) {
            throw new InsufficientFundsException("Insufficient balance for transfer.");
        }

        // Perform the transfer (debit from sender, credit to receiver)
        fromAccount.setBalance(fromAccount.getBalance() - amount);
        toAccount.setBalance(toAccount.getBalance() + amount);

        // Save the updated accounts
        customerRepository.save(fromAccount);
        customerRepository.save(toAccount);

        return true;
    }
}
