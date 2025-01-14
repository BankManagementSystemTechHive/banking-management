package com.example.BankingApplication.model;

import java.time.LocalDateTime;

public class Transfer {

    private String fromAccountNumber;
    private String toAccountNumber;
    private Double amount;
    private LocalDateTime transferDate;

    // Constructor
    public Transfer(String fromAccountNumber, String toAccountNumber, Double amount, LocalDateTime transferDate) {
        this.fromAccountNumber = fromAccountNumber;
        this.toAccountNumber = toAccountNumber;
        this.amount = amount;
        this.transferDate = transferDate;
    }

    // Getters and Setters
    public String getFromAccountNumber() {
        return fromAccountNumber;
    }

    public void setFromAccountNumber(String fromAccountNumber) {
        this.fromAccountNumber = fromAccountNumber;
    }

    public String getToAccountNumber() {
        return toAccountNumber;
    }

    public void setToAccountNumber(String toAccountNumber) {
        this.toAccountNumber = toAccountNumber;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDateTime getTransferDate() {
        return transferDate;
    }

    public void setTransferDate(LocalDateTime transferDate) {
        this.transferDate = transferDate;
    }

    @Override
    public String toString() {
        return "Transfer{" +
                "fromAccountNumber='" + fromAccountNumber + '\'' +
                ", toAccountNumber='" + toAccountNumber + '\'' +
                ", amount=" + amount +
                ", transferDate=" + transferDate +
                '}';
    }
}
