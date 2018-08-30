package com.myapp.spring.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.rabbitmq.client.AMQP;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.Consumer;
import com.rabbitmq.client.DefaultConsumer;
import com.rabbitmq.client.Envelope;

@Component
public class SockController extends TextWebSocketHandler {

	private final static String QUEUE_NAME = "tradeMade";
	public WebSocketSession globalSession;

	List<WebSocketSession> socketList = new ArrayList<WebSocketSession>();// add broadcast

	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		globalSession = session;
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		Connection connection = factory.newConnection();
		Channel channel = connection.createChannel();
		channel.queueDeclare(QUEUE_NAME, false, false, false, null);
		System.err.println("connected 2");
		Consumer consumer = new DefaultConsumer(channel) {
			@Override
			public void handleDelivery(String consumerTag, Envelope envelope, AMQP.BasicProperties properties,
					byte[] body) throws IOException {
				System.err.println("connected");
				String message1;

				message1 = new String(body, "UTF-8");

				globalSession.sendMessage(new TextMessage(message1));// ws

			}
		};
		channel.basicConsume(QUEUE_NAME, true, consumer);
	}

}
