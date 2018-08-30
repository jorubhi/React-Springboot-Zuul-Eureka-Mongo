package com.myapp.spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

import com.myapp.spring.controller.TradeRepository;


@SpringBootApplication
@EnableEurekaClient
public class TradeServiceApplication implements CommandLineRunner{
	
	@Autowired
	TradeRepository trp;
	
	public static void main(String[] args) {
		SpringApplication.run(TradeServiceApplication.class, args);
	}
	
	public void run(String... strings) throws Exception {
		
		
			
    }
}
