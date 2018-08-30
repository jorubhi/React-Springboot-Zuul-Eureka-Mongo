import React, { Component } from 'react';
import store from '../store';
import { loadTrades } from '../actions/trades';
import 'font-awesome/css/font-awesome.css';
import { Link } from 'react-router-dom';

class TradeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trades: []
        }
    }
    componentWillMount() {
        store.subscribe(() => {

            let trades = store.getState().trades;
            this.setState({ trades });
        });

        store.dispatch(loadTrades());
        console.log(this.trades);
    }

    deleteItem(idd) {
        fetch(`http://localhost:9010/trades/${idd}`, { method: 'DELETE' })
            .then(r => {
                let { trades } = this.state;
                trades = trades.filter(trade => trade.idd !== idd)
                this.setState({ trades });
            })
    }

    renderTrades() {
        let { trades } = this.state;
        return trades.map((trade, idx) => {
            return (
                <tr key={idx}>
                    <td>{trade.date}</td>
                    <td>{trade.commodity}</td>
                    <td>{trade.side}</td>
                    <td>{trade.quantity}</td>
                    <td>{trade.price}</td>
                    <td>{trade.counterparty}</td>
                    <td>{trade.location}</td>
                    <td><Link to={`edit-trade/${trade.idd}/${trade.commodity}/${trade.side}/${trade.quantity}/${trade.price}/${trade.counterparty}/${trade.location}`}><i className="fa fa-edit"></i></Link></td>
                    <td><a href="/" onClick={() => { this.deleteItem(trade.idd) }}><i className="fa fa-trash"></i></a></td>

                </tr>
            );
        });
    }
    render() {
        return (
            <div className="card">
                <div className="card-header">

                   <h2> Trade<Link className="btn btn float-right btn-round" to="/add-new"><span class="glyphicon glyphicon-plus"><i class="fa fa-plus" aria-hidden="true"></i></span></Link></h2>

                </div>

                <div className="card-body">
                    <table className="table table-bordered table-sm-col-md-8">
                        <th>Date</th>
                        <th>Commodity</th>
                        <th>Side</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Counterparty</th>
                        <th>Location</th>
                        <tbody>{this.renderTrades()}</tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default TradeList;