package com.example.BankingApplication.model;

import java.time.LocalDateTime;

public class Deposit {

    private String accountId;
    private Double amount;
    private LocalDateTime depositDate;

    // Constructor
    public Deposit(String accountId, Double amount, LocalDateTime depositDate) {
        this.accountId = accountId;
        this.amount = amount;
        this.depositDate = depositDate;
    }


    public String getAccountId() {

        return accountId;
    }

    public void setAccountId(String accountId) {

        this.accountId = accountId;
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
                "accountId='" + accountId + '\'' +
                ", amount=" + amount +
                ", depositDate=" + depositDate +
                '}';
    }
}
