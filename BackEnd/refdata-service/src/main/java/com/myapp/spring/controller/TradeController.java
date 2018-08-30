package com.myapp.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.spring.model.Trade;

@CrossOrigin
@Component
@RestController
@RequestMapping("/market")
public class TradeController {

	@Autowired
	private TradeRepository tradeRepository;


	@GetMapping(value = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<Trade> getAll() {
		List<Trade> trades = this.tradeRepository.findAll();
		return trades;
	}

	@GetMapping(value = "/last", produces = MediaType.APPLICATION_JSON_VALUE)
	public Trade getLast() {
		return this.tradeRepository.findTopByOrderByIddDesc();
	}

	
}
