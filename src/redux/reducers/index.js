import { combineReducers } from 'redux';
import  {productReducer} from '../reducers/productReducers';

const reducers = combineReducers({
    allProducts: productReducer,
});

export default reducers;