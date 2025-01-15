package com.example.BankingApplication.controller;

import com.example.BankingApplication.exception.AccountNotFoundException;
import com.example.BankingApplication.service.AccountService;
import com.example.BankingApplication.exception.InsufficientFundsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/withdraw")
public class WithdrawController {

    @Autowired
    private AccountService accountService;


    @PostMapping
    public ResponseEntity<String> withdraw(@RequestParam String accountId,
                                           @RequestParam Double amount) {
        try {
            accountService.withdraw(accountId, amount);
            return ResponseEntity.ok("Withdrawal successful");
        } catch (AccountNotFoundException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Account not found");
        } catch (InsufficientFundsException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Insufficient funds");
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid withdrawal amount");
        }
    }
}

