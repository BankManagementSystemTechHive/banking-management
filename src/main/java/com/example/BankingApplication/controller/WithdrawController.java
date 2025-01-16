package com.example.BankingApplication.controller;

import com.example.BankingApplication.exception.AccountNotFoundException;
import com.example.BankingApplication.service.CustomerService;
import com.example.BankingApplication.exception.InsufficientFundsException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@RestController
@RequestMapping("/api/withdraw")
public class WithdrawController {

    @Autowired
    private CustomerService accountService;


    @PostMapping
    public ResponseEntity<String> withdraw(@RequestParam String accountId,
                                           @RequestParam Double amount) {
        try {
            // Assuming the variable is 'amount' and it's of type Double
            BigDecimal withdrawAmount = BigDecimal.valueOf(amount);

// Pass `withdrawAmount` to wherever it's needed

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

