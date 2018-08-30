import React, { Component } from 'react';
import store from '../store';
import { saveTrade, saveEditedTrade } from '../actions/trades';

import 'react-notifications/lib/notifications.css';
import {
    withRouter
} from "react-router-dom";

class TradeFormEdit extends Component {
    constructor(props) {
        super(props);
        let { trades } = this.props;
        this.state = {
            trade: {
                id: '',

                commodity: '',
                side: '',
                quantity: '',
                price: '',
                counterparty: '',
                location: '',
                date: ''
            }
        }
    }

    handleChange(e) {
        let { trade } = this.state;
        trade[e.target.idd] = e.target.value
        this.setState({ trade });
    }

    saveEditedTrade(trade) {
        console.log(trade)

        let api = `http://localhost:9010/trades`;
        fetch(api, {
            method: "PUT",
            body: JSON.stringify(trade),
            headers: { 'Content-Type': 'application/json' }
        })


    }

    handleSubmit(e) {
        e.preventDefault();

        let newTrade = {
            idd: this.props.match.params.idd,
            commodity: this.refs.commodity.value,
            side: this.refs.side.value,
            quantity: this.refs.quantity.value,
            price: this.refs.price.value,
            counterparty: this.refs.counterparty.value,
            location: this.refs.location.value,
            // date: this.refs.date.value
        }
        let { trade } = this.state;
        this.saveEditedTrade(newTrade)

        window.location.reload()

        
        
    }


    render() {
        let { trade } = this.state;
        let id = this.props.match.params.idd;
        let commodity = this.props.match.params.commodity;
        let side = this.props.match.params.side;
        let quantity = this.props.match.params.quantity;
        // let price = this.props.match.params.price;
        let counterparty = this.props.match.params.counterparty;
        let location = this.props.match.params.location;
        // let date = this.props.match.params.date;

        return (
            <div>
                <div className="row">
                    <div className="col-11">
                        <div className="card" >
                            <div className="card-header"><h4>Edit Trade</h4>
                                <a href="/home"><i className="fa fa-trash">Discard</i></a>&nbsp; &nbsp;
                            </div>
                            <div className="card-body">
                                <form onSubmit={(e) => { this.handleSubmit(e) }}>
                                    {/* <div className="form-group">
                                        <label>Date</label>
                                        <input id="date" type="date" onChange={(e) => { this.handleChange(e) }} value={date} ref="date" className="form-control" ></input>
                                    </div> */}
                                    <div className="form-group">
                                        <label>Commodity Name</label>

                                        <input id="commodity" onChange={(e) => { this.handleChange(e) }} value={commodity} ref="commodity" className="form-control" ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Side</label>

                                        <input id="side" onChange={(e) => { this.handleChange(e) }} value={side} ref="side" className="form-control" ></input>
                                       
                                    </div>
                                    
                                    <div className="form-group">
                                        <label>Quantity</label>

                                        <input id="quantity" onChange={(e) => { this.handleChange(e) }} ref="quantity" className="form-control" placeholder="Enter new quantity" ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Price</label>

                                        <input id="price" onChange={(e) => { this.handleChange(e) }} ref="price" className="form-control" placeholder="Enter new price"></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Counterparty</label>

                                        <input id="counterparty" onChange={(e) => { this.handleChange(e) }} value={counterparty} ref="counterparty" className="form-control" ></input>
                                    </div>
                                    <div className="form-group">
                                        <label>Location</label>

                                        <input id="location" onChange={(e) => { this.handleChange(e) }} value={location} ref="location" className="form-control" ></input>
                                    </div>

                                    <button className="btn btn-primary" >Edit</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TradeFormEdit);

