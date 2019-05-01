import { combineReducers } from 'redux';
import goodsReducer from './goodsReducer';
import userReducer from './userReducer';
import commonReducer from "./commonReducer";

export default combineReducers({
  common: commonReducer,
  goods: goodsReducer,
  user: userReducer
});