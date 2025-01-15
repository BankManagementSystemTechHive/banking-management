package com.example.BankingApplication.controller;

import com.example.BankingApplication.exception.AccountNotFoundException;
import com.example.BankingApplication.service.AccountService;
import com.example.BankingApplication.exception.InsufficientFundsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/transfer")
public class TransferController {

    @Autowired
    private AccountService accountService;

    /**
     * Endpoint to transfer money between two accounts.
     *
     * @param fromAccountNumber The account number to transfer from.
     * @param toAccountNumber The account number to transfer to.
     * @param amount The amount to transfer.
     * @return A response indicating success or failure.
     */
    @PostMapping
    public ResponseEntity<String> transfer(@RequestParam String fromAccountNumber,
                                           @RequestParam String toAccountNumber,
                                           @RequestParam Double amount) {
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
