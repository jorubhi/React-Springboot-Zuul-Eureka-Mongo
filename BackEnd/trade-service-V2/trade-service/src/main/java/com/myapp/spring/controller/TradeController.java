package com.myapp.spring.controller;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeoutException;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.myapp.spring.model.Trade;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

@CrossOrigin
@Component
@RestController
@RequestMapping("/trades")
public class TradeController {
	private final static String QUEUE_NAME = "Notification";

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

	@CrossOrigin("http://localhost:3001")
	@GetMapping(value = "/search/{fdate}/{tdate}/{loc}/{cpt}/{side}/{com}", produces = MediaType.APPLICATION_JSON_VALUE)

	public List<Trade> searcht(@PathVariable String fdate, @PathVariable String tdate,
			@PathVariable("loc") String location, @PathVariable("cpt") String counterparty,
			@PathVariable("side") String side, @PathVariable("com") String commodity) throws ParseException {

		System.out.println(fdate + tdate + location + counterparty + side + commodity);

		SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = formatter1.parse(fdate);
		Date date2 = formatter1.parse(tdate);

		System.out.println(date1 + " -- " + date2);
		List<Trade> ListBydate = tradeRepository.findByMydateBetween(date1, date2);

		List<Trade> trades = tradeRepository.findByCommodityAndSideAndCounterpartyAndLocation(commodity, side,
				counterparty, location);

		List<Trade> t = new ArrayList<Trade>();

		if (!(fdate.equals("null") || tdate.equals("null") || location.equals("null") || counterparty.equals("null")
				|| side.equals("null") || commodity.equals("null"))) {

			for (Trade t1 : ListBydate) {

				for (Trade t2 : trades) {

					if (t1.getMydate().equals(t2.getMydate())) {
						t.add(t1);

					}

				}
			}

		}

		else if (location.equals("null") && counterparty.equals("null") && side.equals("null")
				&& commodity.equals("null")) {
			t = ListBydate;
		}
		
		

		// --------------Only single attribute filter-----------------
		
		
		else if ((!(side.equals("null")) && location.equals("null") && counterparty.equals("null")
				&& commodity.equals("null"))) {
			t = tradeRepository.findAllBySide(side);
		} else if ((!(location.equals("null")) && side.equals("null") && counterparty.equals("null")
				&& commodity.equals("null"))) {

			t = tradeRepository.findAllByLocation(location);
		} else if ((!(counterparty.equals("null")) && side.equals("null") && location.equals("null")
				&& commodity.equals("null"))) {

			t = tradeRepository.findAllByCounterparty(counterparty);
		} else if ((!(commodity.equals("null")) && side.equals("null") && location.equals("null")
				&& counterparty.equals("null"))) {

			t = tradeRepository.findAllByCommodity(commodity);
		}

		////// ------------2 attribute filter------------------
		
		
		else if ((!(commodity.equals("null") && side.equals("null")) && location.equals("null")
				&& counterparty.equals("null"))) {

			t = tradeRepository.findAllByCommodityAndSide(commodity, side);
		} else if ((!(counterparty.equals("null") && side.equals("null")) && location.equals("null")
				&& commodity.equals("null"))) {

			t = tradeRepository.findAllByCounterpartyAndSide(counterparty, side);
		} else if ((!(location.equals("null") && side.equals("null")) && counterparty.equals("null")
				&& commodity.equals("null"))) {

			t = tradeRepository.findAllByLocationAndSide(location, side);
		}

		else if ((!(commodity.equals("null") && location.equals("null")) && side.equals("null")
				&& counterparty.equals("null"))) {

			t = tradeRepository.findAllByCommodityAndLocation(commodity, location);
		} else if ((!(counterparty.equals("null") && location.equals("null")) && side.equals("null")
				&& commodity.equals("null"))) {

			t = tradeRepository.findAllByCounterpartyAndLocation(counterparty, location);
		} else if ((!(commodity.equals("null") && counterparty.equals("null")) && side.equals("null")
				&& location.equals("null"))) {

			t = tradeRepository.findAllByCommodityAndCounterparty(commodity, counterparty);
		}
		

		// ----------3 attribute filter-------------
		
		
		else if ((!(commodity.equals("null") && counterparty.equals("null") && side.equals("null"))
				&& location.equals("null"))) {

			t = tradeRepository.findAllByCommodityAndCounterpartyAndSide(commodity, counterparty, side);
		} else if ((!(location.equals("null") && counterparty.equals("null") && side.equals("null"))
				&& commodity.equals("null"))) {

			t = tradeRepository.findAllByLocationAndCounterpartyAndSide(location, counterparty, side);
		}

		else if ((!(commodity.equals("null") && location.equals("null") && side.equals("null"))
				&& counterparty.equals("null"))) {

			t = tradeRepository.findAllByCommodityAndLocationAndSide(commodity, location, side);
		} else if ((!(commodity.equals("null") && counterparty.equals("null") && location.equals("null"))
				&& side.equals("null"))) {

			t = tradeRepository.findAllByCommodityAndCounterpartyAndLocation(commodity, counterparty, location);
		}

		return t;

	}

	@PostMapping
	public void insert(@RequestBody Trade trade) throws IOException, TimeoutException, ParseException {

		Trade t = new Trade();
		t = trade;
		SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd");
		Date date1 = formatter1.parse(t.getDate());
		t.setMydate(date1);
		ConnectionFactory factory = new ConnectionFactory();
		factory.setHost("localhost");
		Connection connection = null;
		connection = factory.newConnection();
		Channel channel = connection.createChannel();
		channel.queueDeclare(QUEUE_NAME, false, false, false, null);
		String message = trade.getCommodity() + " @Rs " + trade.getPrice();
		channel.basicPublish("", QUEUE_NAME, null, message.getBytes());
		this.tradeRepository.save(t);
	}

	@PutMapping
	public void updateAnOrder(@RequestBody Trade trade) {
		System.out.println(trade.getIdd() + "Put Mapping By Id");
		Trade existingTrade = tradeRepository.findByIdd(trade.getIdd());
		String s1= existingTrade.getDate();
		Date s2= existingTrade.getMydate();
		BeanUtils.copyProperties(trade, existingTrade);
		existingTrade.setDate(s1);
		existingTrade.setMydate(s2);
		tradeRepository.save(existingTrade);
		System.out.println(trade.getIdd() + "Put Mapping By Idd");

	}

	@DeleteMapping("/{idd}")
	public void delete(@PathVariable("idd") String idd) {
		this.tradeRepository.deleteByIdd(idd);
	}

}
