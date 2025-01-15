package com.example.BankingApplication.model;

import java.time.LocalDateTime;

public class Withdraw {

    private String accountId;
    private Double amount;
    private LocalDateTime withdrawalDate;

    // Constructor
    public Withdraw(String accountId, Double amount, LocalDateTime withdrawalDate) {
        this.accountId = accountId;
        this.amount = amount;
        this.withdrawalDate = withdrawalDate;
    }

    // Getters and Setters
    public String getAccountId() {
        return accountId;
    }

    public void setAccountId(String accountId) { // Corrected Setter
        this.accountId = accountId;
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
                "accountId='" + accountId + '\'' +
                ", amount=" + amount +
                ", withdrawalDate=" + withdrawalDate +
                '}';
    }
}

