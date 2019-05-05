import axios from 'axios';

let getCartList = async that => {
  try {
    let {
      data
    } = await axios.get("/cart/cartList");
    if (data.status === "0") {
      that.$store.commit('updateCartList', data.result);
    } else if (data.status === '1') {
      that.$Message.error("Error!");
    }
  } catch (err) {
    console.log(err);
  }
}

export default getCartList;
