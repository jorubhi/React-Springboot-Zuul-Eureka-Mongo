import React, { Component } from 'react';
import { loadTrades } from './actions/trades';
import Home from './components/Home';
import Notifications from './components/Notifications'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import TradeList from './components/TradeList'
import TradeForm from './components/TradeForm'
import ScrollContent from './components/ScrollContent'
import TradeFormEdit from './components/TradeFormEdit';
import SearchBar from './components/SearchBar';
import NotifyFromSocket from './components/NotificationSocket';

class App extends Component {

   
  

  render() {
    var divStyle = {
      decoration: 'none',
      color:'white'
     
    };
   return (
      <div className="container">
        <Router>
          <div className="float-right">
            
            <div>
            
              <NotifyFromSocket />
            </div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light"><img src="http://www.pngmart.com/files/4/Metallica-PNG-File.png" width="300px" height="80px"/>

             
            </nav>
            <div className="float-right">
            <button className="btn btn-danger" ><a href="http://localhost:3000/auth/logout" style={divStyle}>Logout</a></button>
            
                
              </div>
              <Notifications />
              
             
            <hr />
           
            <marquee><ScrollContent /> </marquee>
            <hr />
            <hr />

            <div className="">
              <SearchBar />
            </div>
            <hr />

            <div className="row">
              <div className="col-xs-6">

                <TradeList />


              </div>



              <div className="col-xs-6">

                <div className="col-sm-12 col-md-12">
                  <Route path="/home" component={Home} />
                  <Route path="/add-new" component={TradeForm} />
                  <Route path="/edit-trade/:idd/:commodity/:side/:quantity/:price/:counterparty/:location" component={TradeFormEdit} />

                </div>
              </div>
            </div>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
