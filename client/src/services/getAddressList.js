import axios from 'axios';

let getAddressList = async that => {
  try {
    let {
      data
    } = await axios.get("/address/addressList");
    if (data.status === "0") {
      that.$store.commit('updateAddressList', data.result);
    } else if (data.status === '1') {
      that.$Message.error("Error!");
    }
  } catch (err) {
    console.log(err);
  }
}

export default getAddressList;
