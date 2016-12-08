import {Redux, ReactRouterRedux} from 'src/vendor';
import reducers from 'src/reducers';

const {createStore, combineReducers} = Redux;
const {routerReducer} = ReactRouterRedux;

const store = createStore(
    combineReducers({
        ...reducers,
        routing: routerReducer
    })
);

export default store;