import React, {Component} from 'react';
import ReactNotifications from 'react-browser-notifications';

class Notify extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ws: {},
      message: '',
      i: 0
    }
  }
  showNotifications() {
    if(this.n.supported()) this.n.show();
  }
  
  handleClick(event) { 
    this.n.close(event.target.tag);
  }

  render() {
    let {i} = this.state;
    let {ws} = this.state;
    if (i === 0) {
      ws = new WebSocket('ws://localhost:3003/trade');
      this.state.i = 2;
    }
    let message1;
    let {message} = this.state;
    let obj = this;
    ws.onmessage = function (data) {
      message1 = data.data;
      console.log(message1);
      obj.setState({message: message1});
      obj.showNotifications();
    }

    this.setState(message1);
    return (
          <ReactNotifications
          onRef={ref => (this.n = ref)}
          title={message} 
          body="Metallica"
          icon="icon.png"
          timeout="5000"
          onClick={event => this.handleClick(event)}
        />
    );
  }
}
export default Notify;