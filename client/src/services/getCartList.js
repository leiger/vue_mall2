import axios from 'axios';

let getCartList = async that => {
  try {
    let {
      data
    } = await axios.get("/users/cartList");
    if (data.status === "0") {
      that.$store.commit('updateCartList', data.result);
    }
  } catch (err) {
    console.log(err);
  }
}

export default getCartList;
