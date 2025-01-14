package com.example.BankingApplication.model;

import java.time.LocalDateTime;

public class Deposit {

    private String accountNumber;
    private Double amount;
    private LocalDateTime depositDate;

    // Constructor
    public Deposit(String accountNumber, Double amount, LocalDateTime depositDate) {
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.depositDate = depositDate;
    }

    // Getters and Setters
    public String getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(String accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDateTime getDepositDate() {
        return depositDate;
    }

    public void setDepositDate(LocalDateTime depositDate) {
        this.depositDate = depositDate;
    }

    @Override
    public String toString() {
        return "Deposit{" +
                "accountNumber='" + accountNumber + '\'' +
                ", amount=" + amount +
                ", depositDate=" + depositDate +
                '}';
    }
}
