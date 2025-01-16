
package com.example.BankingApplication.controller;

import com.example.BankingApplication.service.DepositService;
import com.example.BankingApplication.model.Customer;
import com.example.BankingApplication.model.Deposit;
import com.example.BankingApplication.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.math.BigDecimal;

@Controller
public class DepositController {

    @Autowired
    private CustomerRepository customerRepository; // Inject CustomerRepository

    @Autowired
    private DepositService depositService;

    // Handle deposit
    @PostMapping("/deposit")
    public String handleDeposit(@RequestParam("accountId") String accountId,
                                @RequestParam("amount") double amount,
                                Model model) {
        // Fetch customer from the repository
        Customer customer = customerRepository.findById(accountId)
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Convert amount to BigDecimal for precision
        Double depositAmount = amount;

        // Call the DepositService to process the deposit
        Deposit deposit = depositService.processDeposit(customer.getId(), depositAmount);

        // Add the deposit amount and success message to the model
        model.addAttribute("message", "Successfully deposited " + deposit.getAmount());
        return "deposit-success";  // Ensure this template exists in your resources/templates
    }
}
