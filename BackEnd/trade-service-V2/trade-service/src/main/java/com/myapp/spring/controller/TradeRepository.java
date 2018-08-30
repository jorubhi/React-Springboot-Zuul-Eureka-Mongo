package com.myapp.spring.controller;

import java.util.Date;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.myapp.spring.model.Trade;

@Component
@Repository
public interface TradeRepository extends MongoRepository<Trade,String> {

	
	Trade findByIdd(String idd);
	Trade findByCommodity(String commodity);
	Trade findTopByOrderByIddDesc();
	
	void deleteByIdd(String idd);
	
	List<Trade> findAllByCommodity(String string);
	List<Trade> findByMydateBetween(Date f, Date t);
	List<Trade> findByCommodityAndSideAndCounterpartyAndLocation(String commodity,String side, String cParty,String Location);
	List<Trade> findAllBySide(String side);
	List<Trade> findAllByLocation(String location);
	List<Trade> findAllByCounterparty(String counterparty);
	List<Trade> findAllByCounterpartyAndLocation(String counterparty, String location);
	List<Trade> findAllByCommodityAndLocation(String commodity, String location);
	List<Trade> findAllByLocationAndSide(String location, String side);
	List<Trade> findAllByCounterpartyAndSide(String counterparty, String side);
	List<Trade> findAllByCommodityAndSide(String commodity, String side);
	List<Trade> findAllByCommodityAndCounterparty(String commodity, String counterparty);
	List<Trade> findAllByCommodityAndCounterpartyAndSide(String commodity, String counterparty, String side);
	List<Trade> findAllByLocationAndCounterpartyAndSide(String location, String counterparty, String side);
	List<Trade> findAllByCommodityAndLocationAndSide(String commodity, String location, String side);
	List<Trade> findAllByCommodityAndCounterpartyAndLocation(String commodity, String counterparty, String location);
	
	
	
	
	
//	Trade findByDate(String idd);
	
//	Trade findByDate(LocalDate date);
	
	
}
