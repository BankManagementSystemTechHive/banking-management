// package com.example.bankapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/")
public class HomeController {

    private double balance = 0.0;

    @GetMapping
    public String home(Model model) {
        model.addAttribute("activeFeature", "welcome");
        model.addAttribute("balance", balance);
        return "home";
    }

    @PostMapping("/transaction")
    public String handleTransaction(
            @RequestParam("type") String type,
            @RequestParam("amount") double amount,
            Model model
    ) {
        String message = "";
        if (amount <= 0) {
            message = "Please enter a valid positive amount.";
        } else {
            switch (type) {
                case "deposit":
                    balance += amount;
                    message = "Successfully deposited R" + amount + ".";
                    break;
                case "withdraw":
                    if (amount > balance) {
                        message = "Insufficient balance.";
                    } else {
                        balance -= amount;
                        message = "Successfully withdrew R" + amount + ".";
                    }
                    break;
                case "transfer":
                    if (amount > balance) {
                        message = "Insufficient balance.";
                    } else {
                        balance -= amount;
                        message = "Successfully transferred R" + amount + ".";
                    }
                    break;
                default:
                    message = "Invalid transaction type.";
            }
        }
        model.addAttribute("message", message);
        model.addAttribute("balance", balance);
        model.addAttribute("activeFeature", "balance");
        return "home";
    }

    @GetMapping("/view-balance")
    public String viewBalance(Model model) {
        model.addAttribute("balance", balance);
        model.addAttribute("activeFeature", "balance");
        return "home";
    }
}
