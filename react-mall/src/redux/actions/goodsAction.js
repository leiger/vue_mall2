export const initGoodsAction = () => dispatch => {
  fetch('')
    .then(res => res.json())
    .then(data => dispatch({
      type: 'INIT_GOODS',
      goods: data
    }));
};