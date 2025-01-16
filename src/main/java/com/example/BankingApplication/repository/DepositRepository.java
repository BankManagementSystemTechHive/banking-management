package com.example.BankingApplication.repository;

import com.example.BankingApplication.model.Deposit;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DepositRepository extends MongoRepository<Deposit, String> {

    List<Deposit> findByCustomerId(String CustomerId);
}
