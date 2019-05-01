import {getGoods} from '../../goods';

const initState = getGoods().result;

const goodsReducer = (state=initState, {type, payload}) => {
  switch (type) {
    case 'initGoods':
      return payload;
    default:
      return state;
  }
};

export default goodsReducer;