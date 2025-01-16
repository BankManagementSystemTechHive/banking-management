package com.example.BankingApplication.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "deposits")
public class Deposit {

    @Id
    private String id;
    private String customerId; // Assuming this refers to the account or customer making the deposit
    private Double amount;
    private LocalDateTime dateTime;

    // Constructor
    public Deposit(String customerId, Double amount, LocalDateTime dateTime) {
        this.customerId = customerId;
        this.amount = amount;
        this.dateTime = dateTime;
    }

    // Default no-argument constructor (required for frameworks like Spring)
    public Deposit() {}

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCustomerId() {
        return customerId;
    }

    public void setCustomerId(String customerId) {
        this.customerId = customerId;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }
}
