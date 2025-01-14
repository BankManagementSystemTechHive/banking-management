package com.example.BankingApplication.service;

import com.example.BankingApplication.model.Deposit;
import com.example.BankingApplication.repository.AccountRepository;
import com.example.BankingApplication.repository.DepositRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepositService {
    @Autowired
    private DepositRepository depositRepository;
    @Autowired
    private AccountRepository accountRepository;

    public Deposit processDeposit(String accountNumber, Double amount) {
        // Perform the deposit logic and return a Deposit object
        return null;
    }
}
