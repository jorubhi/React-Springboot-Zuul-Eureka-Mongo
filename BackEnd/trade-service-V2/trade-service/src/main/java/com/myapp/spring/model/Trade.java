package com.myapp.spring.model;

import java.io.Serializable;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.stereotype.Component;

@SuppressWarnings("serial")
@Component
@Document(collection = "Trades")
public class Trade implements Serializable {

	@Id
	private String idd;

	// private String date;

	private String date;
	private Date mydate;
	private String commodity;
	private String side;
	private int quantity;
	private Double price;
	private String counterparty;
	private String location;

	public Trade() {
		// TODO Auto-generated constructor stub
	}

	public Trade(String idd, String date, String commodity, String side, int quantity, Double price,
			String counterparty, String location) {
		super();
		this.idd = idd;
		this.date = date;
		this.commodity = commodity;
		this.side = side;
		this.quantity = quantity;
		this.price = price;
		this.counterparty = counterparty;
		this.location = location;
	}

	public Date getMydate() {
		return mydate;
	}

	public void setMydate(Date mydate) {
		this.mydate = mydate;
	}

	public String getSide() {
		return side;
	}

	public void setSide(String side) {
		this.side = side;
	}

	public String getIdd() {
		return idd;
	}

	public void setIdd(String idd) {
		this.idd = idd;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getCommodity() {
		return commodity;
	}

	public void setCommodity(String commodity) {
		this.commodity = commodity;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getCounterparty() {
		return counterparty;
	}

	public void setCounterparty(String counterparty) {
		this.counterparty = counterparty;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	@Override
	public String toString() {
		return "Trade [idd=" + idd + ", date=" + date + ", commodity=" + commodity + ", quantity=" + quantity
				+ ", price=" + price + ", counterparty=" + counterparty + ", location=" + location + "]";
	}

}