import React, { Component } from 'react';
import { loadTrades } from '../actions/trades';
import 'font-awesome/css/font-awesome.css';
import { Link } from 'react-router-dom';
class ScrollContent extends Component {
constructor(props) {
super(props);
this.state = {
tradesM: []
}
}

loadMarketData(){
    let api = "http://localhost:9010/market/all";
    fetch(api)
                .then(resp => resp.json())
                .then(tradesM => {
                    this.setState({ tradesM });
                })
}


componentWillMount() {
    

this.loadMarketData();
clearInterval(this.interval);
}




componentDidMount() {
this.interval = setInterval(() => this.setState({ time: Date.now() }), 2000);
}
getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
renderScroll() {
let { tradesM } = this.state;
return tradesM.map((trade, idx) => {
return (

<b key={idx} class="inline">| {trade.commodity} @Rs.{this.getRandomInt(0,trade.price)} </b>
);
});
} 

   
    render() {
        return (
            <div>
              
                {this.renderScroll()}
            
           </div>
        );
    }
}

export default ScrollContent;