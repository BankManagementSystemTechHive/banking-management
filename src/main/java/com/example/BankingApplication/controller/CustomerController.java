package com.example.BankingApplication.controller;

import com.example.BankingApplication.model.Customer;
import com.example.BankingApplication.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@Controller
@RequestMapping("/account")
public class CustomerController {

    @Autowired
    private CustomerService customerService; // Correcting this typo

    // View customer details
    @GetMapping("/{id}")
    public String viewAccountDetails(@PathVariable String id, Model model) {
        Customer customer = customerService.getCustomerById(id).orElse(null);
        if (customer != null) {
            model.addAttribute("customer", customer);
            return "customerDetails"; // Thymeleaf template for showing customer details
        } else {
            model.addAttribute("message", "Customer not found");
            return "error"; // Error page template if customer is not found
        }
    }

    // Deposit into customer's account
    @PostMapping("/{id}/deposit")
    public String deposit(@PathVariable String id, @RequestParam Double amount, Model model) {
        Customer customer = customerService.getCustomerById(id).orElse(null);
        if (customer != null) {
            customerService.deposit(id, amount);  // Update deposit logic within service
            model.addAttribute("customer", customer);
            model.addAttribute("message", "Deposit successful!");
            return "customerDetails";
        } else {
            model.addAttribute("message", "Customer not found");
            return "error";
        }
    }

    // Withdraw from customer's account
    @PostMapping("/{id}/withdraw")
    public String withdraw(@PathVariable String id, @RequestParam Double amount, Model model) {
        Customer customer = customerService.getCustomerById(id).orElse(null);
        if (customer != null) {
            customerService.withdraw(id, amount);  // Update withdrawal logic within service
            model.addAttribute("customer", customer);
            model.addAttribute("message", "Withdrawal successful!");
            return "customerDetails";
        } else {
            model.addAttribute("message", "Customer not found");
            return "error";
        }
    }

    // Transfer between customers' accounts
    @PostMapping("/{fromId}/transfer")
    public String transfer(@PathVariable String fromId,
                           @RequestParam String toId,
                           @RequestParam Double amount, Model model) {
        boolean transferSuccessful = customerService.transfer(fromId, toId, amount); // Transfer logic in service
        if (transferSuccessful) {
            model.addAttribute("message", "Transfer successful!");
            return "success";  // Thymeleaf template for transfer success
        } else {
            model.addAttribute("message", "Transfer failed!");
            return "error";  // Error page template if transfer fails
        }
    }
}

