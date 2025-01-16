package com.example.BankingApplication.repository;

import com.example.BankingApplication.model.Customer;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface CustomerRepository extends MongoRepository<Customer, String> {

    // This method finds a customer by their account number (which should be unique)
    Optional<Customer> findByAccountNumber(String accountNumber);

    // You could also add more queries based on other fields if needed
    Optional<Customer> findByEmail(String email);
}
