import React, { Component } from 'react';
import store from '../store';
import { saveTrade, saveEditedTrade, search } from '../actions/trades';
import 'react-notifications/lib/notifications.css';
import {
    withRouter
} from "react-router-dom";

class SearchBar extends Component {
    constructor(props) {
        super(props);
        let { trades } = this.props;
        this.state = {
            trade: {
                id: '',
                fdate: '',
                tdate: '',
                commodity: '',
                side: '',
                quantity: '',
                price: '',
                counterparty: '',
                location: ''
            }

            
        }
    }

    handleChange(e) {
        let { trade } = this.state;
        trade[e.target.idd] = e.target.value
        this.setState({ trade });
    }

    

    search(trade) {
        console.log(trade)

        let api = `http://localhost:9010/trades/search`;
        fetch(api, {
            method: "GET",
            body: JSON.stringify(trade),
            headers: { 'Content-Type': 'application/json' }
        })


    }

    handleSubmit(e) {
        e.preventDefault();
        let sTrade = {

            commodity: this.refs.name.value,
            side: this.refs.side.value,
            counterparty: this.refs.counterparty.value,
            location: this.refs.location.value,
            fdate: this.refs.fdate.value,
            tdate: this.refs.tdate.value
        }

        store.dispatch(search(sTrade))
        //window.location.reload()

    }
    reloadd() {
        window.location.reload()
    }
   


    render() {
        let { trade } = this.state;


        return (
            <div>
                <div className="row">
                    <div className="col-sm-11 col-md-11">
                        <div className="" >
                            <div className="">
                                <div className="">

                                    <form onSubmit={(e) => this.handleSubmit(e)}>
                                        <div class="form-row">
                                            <div class="col-2">
                                                <input id="date" type="date" ref="fdate" class="form-control" />
                                            </div>&nbsp;
<h2>
                                                <i class="fa fa-long-arrow-right" aria-hidden="true"></i></h2> &nbsp;
                                            <div class="">
                                                <input id="date" type="date" ref="tdate" class="form-control" />
                                            </div>
                                            <div class="col">
                                                <select ref="name" className="form-control"  >
                                                    <option value="null" disabled selected> Commodity</option>
                                                    <option value="Copper">Copper</option>
                                                    <option value="Gold"> Gold</option>
                                                    <option value="Platinum">Platinum</option>
                                                    <option value="Rubber"> Rubber</option>
                                                    <option value="Wool"> Wool</option>
                                                    <option value="Corn"> Corn</option>
                                                    <option value="Wheat"> Wheat</option>
                                                    <option value="Milk"> Milk</option>
                                                    <option value="Tin"> Tin</option>
                                                </select>
                                            </div>
                                            <div class="col">

                                                <select ref="side" className="form-control" >
                                                    <option value="null" disabled selected> Side</option>
                                                    <option value="Buy"> Buy</option>
                                                    <option value="Sell"> Sell</option>
                                                </select>
                                                {/* &nbsp;
                                            <input type="radio" name="side" value="Buy" ref="side" className="form-control"/>Buy &nbsp;
                                            <input type="radio" name="side" value="Sell" ref="side" className="form-control"/>Sell 
                                            
                                            <br/> */}
                                            </div>
                                            <div class="col">
                                                <select ref="counterparty" className="form-control" >
                                                    <option value="null" disabled selected> Counterparty</option>
                                                    <option value="Rebecca"> Rebecca</option>
                                                    <option value="Jorawar"> Jorawar</option>
                                                    <option value="Mohana"> Mohana</option>
                                                    <option value="Abhishek"> Abhishek</option>
                                                    <option value="Raghav"> Raghav</option>
                                                    <option value="Sumukh"> Sumukh</option>
                                                    <option value="Sweta"> Sweta</option>
                                                    <option value="Akarsh"> Akarsh</option>
                                                    <option value="Bhargo"> Bhargo</option>

                                                </select>
                                            </div>
                                            <div class="col">
                                                <select ref="location" className="form-control"  >
                                                <option value="null" disabled selected>Location</option>>
                                                    <option value="India"> India</option>
                                                    <option value="US"> US</option>
                                                    <option value="China"> China</option>
                                                    <option value="England"> England</option>
                                                    <option value="France"> France</option>
                                                    <option value="Mexico"> Mexico</option>
                                                    <option value="Bangladesh"> Bangladesh</option>
                                                    <option value="Pakistan"> Pakistan</option>
                                                    <option value="Syria"> Syria</option>
                                                </select>                                            </div>
                                            &nbsp;<button className="btn float-right"><i class="fa fa-search" aria-hidden="true"></i></button> &nbsp; &nbsp;
                                            <button onClick={this.reloadd} className="btn float-right" overrides={{Color:"red"}}><i class="fa fa-refresh" aria-hidden="true"></i></button>
                                        </div>
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

export default withRouter(SearchBar);

