import React, { Component } from 'react';
import store from '../store';
import { saveTrade, saveEditedTrade, loadTrades } from '../actions/trades';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {
    withRouter
} from "react-router-dom";

class TradeForm extends Component {
    constructor(props) {
        super(props);
        let { trades } = this.props;
        this.state = {
            trade: {
                id: '',
                date: '',
                commodity: '',
                side: '',
                quantity: '',
                price: '',
                counterparty: '',
                location: ''
            }, side: "",
            trades: []
        }
    }
    renderCommmodity() {
        let { trades } = this.state;
        return trades.map((trade, idx) => {
            return (
                <option key={idx} value={trade.commodity}>{trade.commodity}</option>


            );
        });
    }
    renderCounterparty() {
        let { trades } = this.state;
        return trades.map((trade, idx) => {
            return (
                <option key={idx} value={trade.counterparty}>{trade.counterparty}</option>


            );
        });
    }
    renderLocation() {
        let { trades } = this.state;
        return trades.map((trade, idx) => {
            return (
                <option key={idx} value={trade.location}>{trade.location}</option>


            );
        });
    }


    loadMarketData() {
        let api = "http://localhost:9010/market/all";
        fetch(api)
            .then(resp => resp.json())
            .then(trades => {
                this.setState({ trades });
            })
    }
    componentWillMount() {

        this.loadMarketData();

        clearInterval(this.interval);
    }

    handleChange(e) {
        let { trade } = this.state;
        trade[e.target.idd] = e.target.value
        this.setState({ trade });
    }



    handleSubmit(e) {
        e.preventDefault();

        let newTrade = {

            commodity: this.refs.name.value,
            side: this.refs.side.value,
            quantity: this.refs.qty.value,
            price: this.refs.price.value,
            counterparty: this.refs.counterparty.value,
            location: this.refs.location.value,
            date: this.refs.date.value
        }


        store.dispatch(saveTrade(newTrade))
        window.location.reload()
        //this.props.history.push('/');
    }

    render() {


        return (
            <div>
                <div className="row">
                    <div className="col-11 ">
                        <div className="card" >

                            <div className="card-header">
                            <h4>New Trade</h4>
                                <a href="/home"><i className="fa fa-trash">Discard</i></a>&nbsp; &nbsp;
                            </div>

                            <div className="card-body">
                                <div className="">
                                    <form onSubmit={(e) => this.handleSubmit(e)}>
                                        <div className="form-group">
                                            <div className="form-group">
                                                <label>Date</label>
                                                <input id="date" type="date" ref="date" />

                                            </div>

                                            <select ref="name" className="form-control"  >
                                                <option value="" disabled selected> Commodity</option>
                                                {this.renderCommmodity()}


                                            </select>


                                        </div>
                                        <div className="form-group">
                                            <select ref="side" className="form-control" >
                                                <option value="" disabled selected> Side</option>
                                                <option value="Buy"> Buy</option>
                                                <option value="Sell"> Sell</option>
                                            </select>
                                        </div>
                                        <div className="form-group">

                                            {/* <input ref="qty" type="number" onChange={(e) => { this.handleChange(e) }} value={trade.quantity} className="form-control" required aria-required="true" pattern="[0-9]+" /> */}
                                            <input ref="qty" type="number" className="form-control" required aria-required="true" pattern="[0-9]+" placeholder="Quantity" />

                                        </div>
                                        <div className="form-group">

                                            {/* <input ref="price" type="number" onChange={(e) => { this.handleChange(e) }} value={trade.price} className="form-control" required aria-required="true" pattern="[0-9]+" /> */}
                                            <input ref="price" type="number" className="form-control" required aria-required="true" pattern="[0-9]+" placeholder="Price" />
                                        </div>
                                        <div className="form-group">

                                            <select ref="counterparty" className="form-control" >
                                                <option value="" disabled selected> Counterparty</option>
                                                {this.renderCounterparty()}
                                            </select>

                                        </div>
                                        <div className="form-group">

                                            <select ref="location" className="form-control"  >
                                                <option value="" disabled selected> Location</option>
                                                {this.renderLocation()}

                                            </select>
                                        </div>



                                        <button className="btn btn-primary" >Save</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(TradeForm);

