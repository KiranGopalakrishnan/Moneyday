package com.projector.common.mongo

import com.mongodb.DB
import com.mongodb.MongoClient
import com.mongodb.client.MongoDatabase
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.data.mongodb.core.MongoTemplate

@Configuration
public class MongoConfig {

    @Bean
    public fun mongoClient(): MongoClient {
        return MongoClient("localhost",27017)
    }

   public fun getDatabase(): MongoDatabase {
       return this.mongoClient().getDatabase("projector-main")
   }

}