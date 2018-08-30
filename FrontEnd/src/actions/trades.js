
// THIS IS THE GET FUNCTION ACTION

export function loadTrades() {
    return function (dispatch) {
        let api = "http://localhost:9010/trades/all";
        fetch(api)
        
            .then(resp => resp.json())
            .then(trades => dispatch({ type: 'LOAD_TRADES', trades }))
    }
}


export function search(sTrade) {
    console.log(sTrade);
   
    
    return function (dispatch) {
        let sendfdate;
        let sendTdate;
        if(sTrade.fdate=="" || sTrade.tdate=="undefined"){
            sendfdate="1996-03-29";
        } else
            sendfdate=sTrade.fdate
        if(sTrade.tdate==""  || sTrade.tdate=="undefined"){
            sendTdate="2099-03-29";
        }
        else
        sendTdate=sTrade.tdate;
        let api = "http://localhost:9010/trades/search";
        fetch(api+"/"+sendfdate+"/"+sendTdate+"/"+sTrade.location+
                "/"+sTrade.counterparty+"/"+sTrade.side+"/"+sTrade.commodity)
            .then(resp => resp.json())
            .then(trades => dispatch({ type: 'LOAD_TRADES', trades }))
    }
}




export function loadMarketData() {
return function (dispatch) {
let api = "http://localhost:9010/trades/all";
fetch(api)
.then(resp => resp.json())
.then(tradesM => dispatch({ type: 'LOAD_MARKET', tradesM }))
}
}

export function loadNotification() {
return function (dispatch) {
let api = "http://localhost:9010/trades/last";
fetch(api)
.then(resp => resp.json())
.then(tradesH => dispatch({ type: 'LOAD_ONE_TRADE', tradesH }))
}
} 


// THIS IS THE POST FUNCTION ACTION

export function saveTrade(trade) {
    return function (dispatch) {
        let api = "http://localhost:9010/trades";
        fetch(api, {
            method: "POST",
            body: JSON.stringify(trade),
            headers: { 'Content-Type': 'application/json' }
        })
            
            .then(trades => dispatch({ type: 'SAVE_TRADE', trades }))
    }
}

export function saveEditedTrade(trade) {
   console.log(trade)
    return function (dispatch) {
        let api = `http://localhost:9010/trades`;
        fetch(api, {
            method: "PUT",
            body: JSON.stringify(trade),
            headers: { 'Content-Type': 'application/json' }
        })
            
            .then(trades => dispatch({ type: 'SAVE_TRADE', trades }))
    }
}


 
