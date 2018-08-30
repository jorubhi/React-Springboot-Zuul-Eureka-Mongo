package com.myapp.spring.controller;

import java.net.URISyntaxException;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.util.concurrent.TimeoutException;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

public class Send {
	private final static String QUEUE_NAME = "tradeMade";

	public static void main(String[] argv)
			throws java.io.IOException, KeyManagementException, NoSuchAlgorithmException, URISyntaxException {
		ConnectionFactory factory = new ConnectionFactory();

		factory.setHost("localhost");
		Connection connection = null;
		try {
			connection = factory.newConnection();
		} catch (TimeoutException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		Channel channel = connection.createChannel();
		channel.queueDeclare(QUEUE_NAME, false, false, false, null);
		String message = "Hello my name is jorawar";
		channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
		String message1 = "Hello my name is mishra";
		channel.basicPublish("", QUEUE_NAME, null, message1.getBytes());
		
		System.out.println("HHHH");
	}
}