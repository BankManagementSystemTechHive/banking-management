package com.example.BankingApplication.repository;
import java.util.List;

import com.example.BankingApplication.model.Deposit;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DepositRepository extends MongoRepository<Deposit, String> {
    // Example custom query (optional): Find all deposits for a specific account
    List<Deposit> findByAccountId(String accountId);
}
