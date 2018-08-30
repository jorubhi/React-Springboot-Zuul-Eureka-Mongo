package com.myapp.spring;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class MessagingRMQNotificationService {

	public static void main(String[] args) {
		SpringApplication.run(MessagingRMQNotificationService.class, args);
	}
}
