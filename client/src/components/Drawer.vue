<template>
  <Drawer width="700" v-model="drawerState" :scrollable="true">
    <Divider>SHOPPING CART</Divider>

    <div class="cartListBox">
      <div class="itemBox" v-for="item in cartList">
        <div class="imgBox">
          <img :src="'/static/images/'+item.productImage" alt="img">
        </div>
        <h5 class="itemName">{{item.productName}}</h5>
        <QuantitySelector
          :value="item.productNum"
          :min="0"
          @changeValue="changeQuantity({id:item.productId, preNum:item.productNum}, arguments)"
        />
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
        <MainBtn @click="closeCart">CONTINUE SHOPPING</MainBtn>
        <MainBtn
          type="primary"
          :disabled="totalMoney === 0?true:false"
          @click="checkout"
        >CHECK OUT ></MainBtn>
      </div>
    </div>
  </Drawer>
</template>

<script>
import axios from "axios";
import MainBtn from "./../components/MainBtn.vue";
import QuantitySelector from "./../components/QuantitySelector.vue";
import { currency } from "./../utils/currency";
import getCartList from "./../services/getCartList.js";

export default {
  components: {
    MainBtn,
    QuantitySelector
  },
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
    async changeQuantity({ id, preNum }, arg) {
      let newQuantity = preNum + arg[0];
      let params = {},
        postAddress = "";

      // modify
      if (newQuantity > 0) {
        params = {
          productId: id,
          productNum: newQuantity
        };
        postAddress = "cart/cartEdit";
      } else {
        // delete
        params = {
          productId: id
        };
        postAddress = "cart/delCart";
      }
      try {
        let { data } = await axios.post(postAddress, params);
        if (data.status === "0") {
          console.log("success");
          // update cart list data in vuex
          getCartList(this);
        } else if (data.status === "6") {
          this.$Message.error("Session Expired!");
          setTimeout(() => {
            this.$store.commit("updateLoginModal", true);
          }, 2000);
        } else {
          this.$Error.error("Error!");
        }
      } catch (err) {
        console.log(err);
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
.cartListBox {
  margin-bottom: 180px;
}
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
  width: 684px;
  position: fixed;
  bottom: 0;
  right: 16px;
  padding: 10px 14px 10px 30px;
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
</style>


