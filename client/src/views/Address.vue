<template>
  <div>
    <EntryBoard/>
    <NavHeader/>
    <AddressModal/>
    <div class="layoutBox">
      <div class="section address">
        <h3 class="title">Shipping Address</h3>
        <div class="addressList">
          <template v-for="(address,index) in addressList">
            <div
              class="addressBox"
              :class="{selected: selected === index}"
              @click.stop.prevent="chooseAddress(index)"
            >
              <dl>
                <dt class="uname">{{address.firstName}} {{address.lastName}}</dt>
                <dd class="uaddress">
                  <span>{{address.address}} -</span>
                  <span>{{address.city}} -</span>
                  <span>{{address.province}}</span>
                </dd>
                <dd class="ucode">{{address.postalCode}}</dd>
              </dl>
              <Icon
                @click.stop.prevent="deleteAddress(address._id)"
                size="20"
                class="trash"
                type="ios-trash-outline"
              />
            </div>
          </template>
          <!-- addnew -->
          <div class="addNew" @click="addNewAddress">
            <Icon type="md-add-circle"/>Add New Address
          </div>
        </div>
      </div>
      <Divider/>
      <div class="section goods">
        <h3 class="title">Products</h3>
        <div class="products">
          <ul>
            <li v-for="item in cartList">
              <img :src="'/static/images/'+item.productImage" alt="img">
              <span class="goodName">{{item.productName}}</span>
              <span class="goodPrice">{{item.salePrice|currency}} x {{item.productNum}}</span>
              <span class="subTotal">{{item.salePrice * item.productNum | currency}}</span>
            </li>
          </ul>
        </div>
      </div>
      <Divider/>
      <div class="section shipping">
        <h3 class="title">Shipping Methods</h3>
        <span>FREE SHIPPING</span>
      </div>
      <Divider/>
      <div class="section count">
        <div class="left discount">
          <h3 class="title">Discount Code</h3>
          <Tooltip content="Can you find it?" placement="top-start">
            <Input v-model="discount.typed" class="discountInput"/>
          </Tooltip>
          <MainBtn @click="useCode()" size="extraSmall" type="primary">Add</MainBtn>
        </div>
        <div class="right moneyBox">
          <ul>
            <li>
              <label>Total Number:</label>
              <span>{{totalNum}}</span>
            </li>
            <li>
              <label>Products Price:</label>
              <span>{{totalPrice | currency}}</span>
            </li>
            <li>
              <label>Shipping Fee:</label>
              <span>+{{ 0 | currency}}</span>
            </li>
            <li>
              <label>Discount Price:</label>
              <span>-{{discountPrice | currency}}</span>
            </li>
            <li>
              <label>Tax:</label>
              <span>+{{tax | currency}}</span>
            </li>
            <li class="finalLi">
              <label>Final Price:</label>
              <span class="finalPrice">{{finalPrice | currency}}</span>
            </li>
          </ul>
        </div>
      </div>
      <Divider/>
      <div class="clearfix">
        <MainBtn @click="nextStep" class="continue">Continue to Payment</MainBtn>
      </div>
    </div>
    <NavFooter/>
  </div>
</template>

<script>
import EntryBoard from "./../components/EntryBoard.vue";
import NavHeader from "./../components/NavHeader.vue";
import AddressModal from "./../components/AddressModal.vue";
import NavFooter from "./../components/NavFooter.vue";
import MainBtn from "./../components/MainBtn.vue";

import getAddressList from "./../services/getAddressList.js";
import getCartList from "./../services/getCartList.js";
import { currency } from "./../utils/currency.js";

import axios from "axios";

export default {
  data() {
    return {
      selected: 0,
      discount: {
        code: "EXTRA10",
        typed: ""
      }
    };
  },
  components: {
    NavHeader,
    EntryBoard,
    AddressModal,
    NavFooter,
    MainBtn
  },
  filters: {
    currency
  },
  computed: {
    addressList() {
      return this.$store.state.addressList;
    },
    cartList() {
      return this.$store.state.cartList;
    },
    totalNum() {
      let total = 0;
      this.$store.state.cartList.forEach(item => {
        total += item.productNum;
      });
      return total;
    },
    totalPrice() {
      let price = 0;
      this.$store.state.cartList.forEach(item => {
        price += item.productNum * item.salePrice;
      });
      return price;
    },
    discountPrice() {
      if (this.discountState === true) {
        return this.totalPrice * 0.1;
      } else {
        return 0;
      }
    },
    tax() {
      return this.totalPrice * 0.13;
    },
    finalPrice() {
      return this.totalPrice - this.discountPrice + this.tax;
    },
    discountState() {
      return this.$store.state.discount;
    }
  },
  mounted() {
    getAddressList(this);
    getCartList(this);
  },
  methods: {
    addNewAddress() {
      this.$store.commit("updateAddressModal", true);
    },
    chooseAddress(index) {
      this.selected = index;
    },
    async deleteAddress(id) {
      try {
        let { data } = await axios.post("/address/delAddress", {
          _id: id
        });
        if (data.status === "0") {
          this.$Message.success("Delete Success!");
          getAddressList(this);
        }
      } catch (err) {
        this.$Message.error("Error!");
      }
    },
    useCode() {
      if (this.discount.used === true) {
        this.$Message.warning("This code can only use once!");
      }
      console.log(this.discount.typed);
      if (this.discount.typed === this.discount.code) {
        this.$store.commit("updateDiscount", true);
        this.$Message.success("Congratulations!");
      } else {
        this.$Message.warning("Sorry, Invalid Code!");
        this.discount.typed = "";
      }
    },
    async nextStep() {
      if (this.finalPrice > 0) {
        try {
          let { data } = await axios.post("/order/createOrder", {
            addressId: this.addressList[this.selected]._id,
            orderTotal: this.finalPrice
          });
          if (data.status === "0") {
            this.$Message.success("Create Success!");
            getCartList(this);
            setTimeout(() => {
              this.$router.push({
                path: "/payment",
                query: {
                  orderId: data.result.orderId
                }
              });
            }, 2000);
          } else {
          }
        } catch (err) {
          console.log(err);
          this.$Message.error("Error!");
        }
      } else {
        this.$Message.error("Invalid Order!");
      }
    }
  }
};
</script>

<style scoped>
.layoutBox {
  margin: 0 40px 40px;
  padding: 30px 40px;
  background-color: #f5f5f5;
}
.addressList,
.shippingMethods {
  display: flex;
  flex-wrap: wrap;
}
.title {
  color: #333;
  font-size: 18px;
  line-height: 20px;
  font-weight: normal;
  margin-bottom: 20px;
}
.addressBox,
.shippingBox,
.addNew {
  position: relative;
  width: 268px;
  height: 178px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.4s ease;
}
.addressBox,
.shippingBox {
  padding: 15px 24px;
  margin: 0 15px 15px 0;
}
.addressBox:hover {
  border-color: #b0b0b0;
}
.addressBox .uname {
  margin: 0 0 10px;
  line-height: 30px;
  color: #333;
  font-size: 14px;
}
.addressBox .uaddress {
  max-height: 88px;
  overflow: hidden;
  margin: 0;
  line-height: 22px;
  color: #757575;
}
.selected {
  border: 1px solid #ff6700;
}

.selected:hover {
  border-color: #ff6700 !important;
}
.trash {
  position: absolute;
  right: 10px;
  bottom: 10px;
  color: #b0b0b0;
  cursor: pointer;
}
.trash:hover {
  color: #757575;
}

/* addnew */
.addNew {
  text-align: center;
  color: #b0b0b0;
}
.addNew i {
  display: block;
  width: 30px;
  height: 30px;
  margin: 63px auto 8px;
  font-size: 30px;
  line-height: 30px;
  text-align: center;
  color: #e0e0e0;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
.addNew:hover {
  border-color: #b0b0b0;
  color: #757575;
}
.addNew:hover i {
  color: #757575;
}
.goods ul {
  list-style: none;
  padding: 5px 0;
}
.goods li {
  padding: 10px 0;
  display: flex;
}
.goods li img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.goods span {
  display: inline-block;
  line-height: 30px;
  color: #424242;
  font-size: 14px;
  vertical-align: top;
  flex: 1;
}
.goods span.goodName {
  flex: 3;
}
.goods .goodPrice,
.goods .subTotal {
  text-align: right;
}
.goods span.subTotal {
  color: #ff6700;
}
.shipping .title,
.discount .title {
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 0;
}
.shipping span {
  font-size: 16px;
  color: #ff6700;
}
.count {
  display: flex;
  justify-content: space-between;
}
.discount .discountInput {
  display: inline-block;
  width: 200px;
}
.right {
  width: 300px;
}
.right ul {
  list-style: none;
}
.right ul li {
  display: flex;
  line-height: 2;
}
.right ul li label {
  flex: 1;
  text-align: right;
  margin-right: 20px;
  color: #757575;
  font-size: 14px;
}
.right ul li span {
  font-size: 14px;
  flex: 1;
  color: #ff6700;
  text-align: right;
}
.right ul li.finalLi {
  align-items: baseline;
}
.right ul li span.finalPrice {
  font-size: 30px;
}
.clearfix::after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.continue {
  float: right;
  clear: both;
}
</style>


