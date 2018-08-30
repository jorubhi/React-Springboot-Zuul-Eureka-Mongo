package com.myapp.spring;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;


@SpringBootApplication
@EnableEurekaClient
public class TradeServiceApplication implements CommandLineRunner{
	

	
	public static void main(String[] args) {
		SpringApplication.run(TradeServiceApplication.class, args);
	}
	
	public void run(String... strings) throws Exception {
	
    }
}
