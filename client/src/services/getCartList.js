import axios from 'axios';

let getCartList = async () => {
  try {
    let {
      data
    } = await axios.get("/users/cartList");
    if (data.status === "0") {
      this.cartList = data.result;
    }
  } catch (err) {
    console.log(err);
  }
}

export default getCartList;
