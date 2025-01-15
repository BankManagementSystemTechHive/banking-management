package com.example.BankingApplication.repository;

import com.example.BankingApplication.model.Transfer;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface TransferRepository extends MongoRepository<Transfer, String> {

    List<Transfer> findByFromAccountId(String fromAccountId);
    List<Transfer> findByToAccountId(String toAccountId);
}


