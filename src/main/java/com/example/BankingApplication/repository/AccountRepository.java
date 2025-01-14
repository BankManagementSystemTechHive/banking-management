package com.example.BankingApplication.repository;
import com.example.BankingApplication.model.Account;
import jakarta.persistence.Id;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AccountRepository extends MongoRepository<Account, Long> {
    // Example custom query (optional): Find by account number
    Account findByAccountNumber(String accountNumber);
}
