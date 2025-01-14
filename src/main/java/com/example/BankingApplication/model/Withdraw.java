package com.example.BankingApplication.model;

import java.time.LocalDateTime;

public class Withdraw {

    private String accountNumber;
    private Double amount;
    private LocalDateTime withdrawalDate;

    // Constructor
    public Withdraw(String accountNumber, Double amount, LocalDateTime withdrawalDate) {
        this.accountNumber = accountNumber;
        this.amount = amount;
        this.withdrawalDate = withdrawalDate;
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

    public LocalDateTime getWithdrawalDate() {
        return withdrawalDate;
    }

    public void setWithdrawalDate(LocalDateTime withdrawalDate) {
        this.withdrawalDate = withdrawalDate;
    }

    @Override
    public String toString() {
        return "Withdraw{" +
                "accountNumber='" + accountNumber + '\'' +
                ", amount=" + amount +
                ", withdrawalDate=" + withdrawalDate +
                '}';
    }
}
