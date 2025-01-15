package com.example.BankingApplication.model;

import java.time.LocalDateTime;

public class Transfer {

    private String fromAccountId;
    private String toAccountId;
    private Double amount;
    private LocalDateTime transferDate;

    // Constructor
    public Transfer(String fromAccountId, String toAccountId, Double amount, LocalDateTime transferDate) {
        this.fromAccountId = fromAccountId;
        this.toAccountId = toAccountId;
        this.amount = amount;
        this.transferDate = transferDate;
    }


    public String getFromAccountId() {

        return fromAccountId;
    }

    public void setFromAccountId(String fromAccountId) {
        this.fromAccountId = fromAccountId;
    }

    public String getToAccountId() {
        return toAccountId;
    }

    public void setToAccountId(String toAccountId) {

        this.toAccountId = toAccountId;
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
                "fromAccountId='" + fromAccountId + '\'' +
                ", toAccountId='" + toAccountId + '\'' +
                ", amount=" + amount +
                ", transferDate=" + transferDate +
                '}';
    }
}
