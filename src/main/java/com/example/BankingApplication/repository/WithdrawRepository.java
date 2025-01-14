package com.example.BankingApplication.repository;

import com.example.BankingApplication.model.Withdraw;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List; // Import List

public interface WithdrawRepository extends MongoRepository<Withdraw, String> {

    List<Withdraw> findByAccountId(String accountId);
}
