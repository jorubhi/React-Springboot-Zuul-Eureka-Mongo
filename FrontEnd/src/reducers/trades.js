
export function tradesReducer(state = [], action) {
    switch (action.type) {
        case 'LOAD_TRADES':
        return [...action.trades]; break;
        case 'LOAD_ONE_TRADE':
        return [action.tradesH]; break;
        case 'LOAD_MARKET':
        return [...action.tradesM]; break;
        default:
        return state;
        } 
}