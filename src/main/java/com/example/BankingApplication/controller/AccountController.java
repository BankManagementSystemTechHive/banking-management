package com.example.BankingApplication.controller;

import com.example.BankingApplication.model.Account;
import com.example.BankingApplication.service.AccountService;
import com.example.BankingApplication.exception.AccountNotFoundException;
import com.example.BankingApplication.exception.InsufficientFundsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    /**
     * Endpoint to deposit money into an account.
     *
     * @param accountNumber The account number to deposit into.
     * @param amount The amount to deposit.
     * @return The updated account object.
     */
    @PostMapping("/{accountNumber}/deposit")
    public ResponseEntity<Account> deposit(@PathVariable String accountNumber, @RequestParam Double amount) {
        try {
            Account updatedAccount = accountService.deposit(accountNumber, amount);
            return ResponseEntity.ok(updatedAccount);
        } catch (AccountNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * Endpoint to withdraw money from an account.
     *
     * @param accountNumber The account number to withdraw from.
     * @param amount The amount to withdraw.
     * @return The updated account object.
     */
    @PostMapping("/{accountNumber}/withdraw")
    public ResponseEntity<Account> withdraw(@PathVariable String accountNumber, @RequestParam Double amount) {
        try {
            Account updatedAccount = accountService.withdraw(accountNumber, amount);
            return ResponseEntity.ok(updatedAccount);
        } catch (AccountNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (InsufficientFundsException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    /**
     * Endpoint to get the current balance of an account.
     *
     * @param accountNumber The account number to check.
     * @return The current balance.
     */
    @GetMapping("/{accountNumber}/balance")
    public ResponseEntity<Double> getBalance(@PathVariable String accountNumber) {
        try {
            Double balance = accountService.getBalance(accountNumber);
            return ResponseEntity.ok(balance);
        } catch (AccountNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    /**
     * Endpoint to transfer money between two accounts.
     *
     * @param fromAccountNumber The account number to transfer from.
     * @param toAccountNumber The account number to transfer to.
     * @param amount The amount to transfer.
     * @return A response indicating success or failure.
     */
    @PostMapping("/transfer")
    public ResponseEntity<String> transfer(@RequestParam String fromAccountNumber, @RequestParam String toAccountNumber, @RequestParam Double amount) {
        try {
            accountService.transfer(fromAccountNumber, toAccountNumber, amount);
            return ResponseEntity.ok("Transfer successful");
        } catch (AccountNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
        } catch (InsufficientFundsException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient funds");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid transfer amount");
        }
    }
}
