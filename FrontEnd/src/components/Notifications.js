import React, { Component } from 'react';
import store from '../store';
import { loadTrades, loadNotification } from '../actions/trades';
import 'font-awesome/css/font-awesome.css';
import { Link } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css'; 
class TradeList extends Component {
constructor(props) {
super(props);
this.state = {
trades: {}
}
}
componentDidMount() {
this.interval = setInterval(() => this.setState({ time: Date.now() }), 2000);
}
componentWillUnmount() {
clearInterval(this.interval);
}

loadNotification() {

let api = "http://localhost:9010/trades/last";
fetch(api)
.then(resp => resp.json())
.then(trades => {
this.setState({ trades });
})

}

renderNotification() {

this.loadNotification();
let trade = this.state.trades;
return (
<b>{trade.commodity} was traded @Rs {trade.price}</b>
);
}
render() {

return (
<div className="card">
Latest updates
{this.renderNotification()}
</div>);

}
}
export default TradeList; 
