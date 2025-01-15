package com.example.BankingApplication.exception;

public class AccountNotFoundException extends RuntimeException {

    // Constructor with a message argument
    public AccountNotFoundException(String message) {
        super(message); // Pass the message to the superclass constructor
    }

    // Optional: Default no-argument constructor
    public AccountNotFoundException() {
        super("Account not found");
    }
}
