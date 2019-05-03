<template>
  <Drawer width="700" v-model="drawerState" :scrollable="true">
    <Divider>SHOPPING CART</Divider>

    <div class="cartListBox">
      <div class="itemBox" v-for="item in cartList">
        <div class="imgBox">
          <img :src="'/static/images/'+item.productImage" alt="img">
        </div>
        <h5 class="itemName">{{item.productName}}</h5>
        <div class="quantity">
          <button class="minus" @click="changeQuantity(item.productId, item.productNum-1)">-</button>
          <span>{{item.productNum}}</span>
          <button @click="changeQuantity(item.productId, item.productNum+1)" class="plus">+</button>
        </div>
        <div class="price">{{item.salePrice * item.productNum | currency}}</div>
      </div>
    </div>

    <div class="checkoutConfirm">
      <Divider/>
      <div class="subTotal">
        <span class="info">Shipping & taxes calculated at checkout</span>
        <span class="totalPrice">SUBTOTAL {{totalMoney | currency}}</span>
      </div>
      <div class="buttonGroup">
        <button class="continue" @click="closeCart">CONTINUE SHOPPING</button>
        <button class="checkout" :disabled="totalMoney === 0?true:false" @click="checkout">CHECK OUT ></button>
      </div>
    </div>
  </Drawer>
</template>

<script>
import axios from "axios";
import { currency } from "./../utils/currency";
import getCartList from "./../services/getCartList.js";

export default {
  computed: {
    drawerState: {
      get() {
        return this.$store.state.drawerState;
      },
      set(drawerState) {
        this.$store.commit("updateDrawerState", drawerState);
      }
    },
    cartList() {
      return this.$store.state.cartList;
    },
    totalMoney() {
      let tempMoney = 0;
      this.cartList.forEach(temp => {
        tempMoney += temp.productNum * parseInt(temp.salePrice);
      });
      return tempMoney;
    }
  },
  filters: {
    currency: currency
  },
  methods: {
    async changeQuantity(id, newQuantity) {
      // valid quantity
      if (newQuantity > 0) {
        try {
          if (newQuantity > 0) {
          }
          let { data } = await axios.post("users/cartEdit", {
            productId: id,
            productNum: newQuantity
          });
          if (data.status === "0") {
            console.log("success");
            // update cart list data in vuex
            getCartList(this);
          } else if (data.status === "10001") {
            this.$Message.error("Session Expired!");
            setTimeout(() => {
              this.$store.commit("updateLoginModal", true);
            }, 2000);
          }
        } catch (err) {
          console.log(err);
        }
      }
      // quantity <= 0, delete the item
      else {
        try {
          let { data } = await axios.post("goods/delCart", {
            productId: id
          });
          // success
          if (data.status === "0") {
            getCartList(this);
          } else if (data.status === "10001") {
            this.$Message.error("Session Expired!");
            setTimeout(() => {
              this.$store.commit("updateLoginModal", true);
            }, 2000);
          }
        } catch (err) {
          console.log(err);
        }
      }
    },
    closeCart() {
      this.$store.commit("updateDrawerState", false);
    },
    checkout() {
      if (this.totalMoney > 0) {
        this.$router.push({
          path: "/address"
        });

        this.$store.commit("updateDrawerState", false);
      }
    }
  }
};
</script>

<style scoped>
.itemBox {
  display: flex;
  padding: 14px;
}
.itemBox img {
  width: 90px;
  height: 90px;
}
.itemBox .itemName {
  font-size: 15px;
  line-height: 90px;
  font-weight: 400;
  padding-left: 10px;
  width: 260px;
}
.quantity {
  margin-top: 30px;
}
.quantity button {
  font-size: 15px;
  height: 36px;
  width: 36px;
  line-height: 34px;
  text-align: center;
  border: 1px solid rgba(17, 17, 17, 0.2);
  float: left;
  margin: 0;
  padding: 0;
  cursor: pointer;
  color: #111;
  background-color: #fff;
}
.quantity span {
  font-size: 15px;
  height: 36px;
  width: 36px;
  line-height: 34px;
  text-align: center;
  border: 1px solid rgba(17, 17, 17, 0.2);
  float: left;
  margin: 0 0 0 -1px;
  padding: 0;
  cursor: pointer;
  color: #111;
  background-color: #f5f5f5;
}
.quantity button.plus {
  margin-left: -1px;
}
.itemBox .price {
  color: #212121;
  font-weight: 400;
  font-style: normal;
  letter-spacing: 1px;
  font-size: 15px;
  line-height: 95px;
  margin-left: 70px;
}
.checkoutConfirm {
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 10px 30px;
  text-align: right;
  background: #fff;
}
.subTotal {
  display: flex;
  justify-content: space-between;
  margin: 24px 0;
}
.subTotal .info {
  font-size: 0.9rem;
  margin: 0;
  line-height: 2rem;
}
.subTotal .totalPrice {
  font-size: 1.1rem;
  color: #212121;
  line-height: 2rem;
  letter-spacing: 1px;
}
.buttonGroup {
  display: flex;
  justify-content: space-between;
}
.buttonGroup button {
  width: 300px;
  height: 48px;
  padding: 9px 30px;
  line-height: 30px;
  border-radius: 3px;
  letter-spacing: 1px;
  border: none;
}
.buttonGroup .continue {
  color: #111;
  background-color: #e4e4e4;
}
.buttonGroup .continue:hover {
  background-color: #bbb;
}
.buttonGroup .checkout {
  color: #fff;
  background-color: #212121;
}
.buttonGroup .checkout:hover {
  background-color: #141414;
}
</style>


