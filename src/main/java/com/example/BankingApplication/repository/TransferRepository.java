package com.example.BankingApplication.repository;

import com.example.BankingApplication.model.Transfer;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List; // Import List

public interface TransferRepository extends MongoRepository<Transfer, String> {
    // Example custom query: Find transfers by sender account ID
    List<Transfer> findBySenderAccountId(String senderAccountId);

    // Example custom query: Find transfers by recipient account ID
    List<Transfer> findByRecipientAccountId(String recipientAccountId);
}


