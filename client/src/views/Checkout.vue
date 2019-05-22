<template>
  <div>
    <div class="layoutBox">
      <div class="section address">
        <h3 class="title">Shipping Address</h3>
        <AddressList :selectable="true" @on-change="handleChange" @initAddress="initAddress"/>
      </div>
      <Divider/>
      <div class="section goods">
        <h3 class="title">Products</h3>
        <div class="products">
          <ul>
            <li v-for="item in cartList">
              <img :src="'http://localhost:3000/images/products/'+item.images[0]" alt="img">
              <span class="goodName">{{item.name}}</span>
              <span class="goodPrice">{{item.newPrice|currency}} x {{item.numInCart}}</span>
              <span class="subTotal">{{item.newPrice * item.numInCart | currency}}</span>
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
  </div>
</template>

<script>
import MainBtn from "./../components/MainBtn.vue";
import AddressList from "../components/AddressList.vue";
import { currency } from "./../utils/currency.js";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      selectAddress: "",
      discount: {
        code: "EXTRA10",
        typed: ""
      }
    };
  },
  components: {
    MainBtn,
    AddressList
  },
  filters: {
    currency
  },
  computed: {
    ...mapGetters(["totalPrice"]),
    id() {
      return this.$store.state.user.userInfo.id;
    },
    cartList() {
      return this.$store.state.cart.cartList;
    },
    totalNum() {
      let total = 0;
      this.$store.state.cart.cartList.forEach(item => {
        total += item.numInCart;
      });
      return total;
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
    orderId() {
      return this.$store.state.orders.order._id;
    }
    // discountState() {
    //   return this.$store.state.discount;
    // }
  },
  methods: {
    ...mapActions(["addOrder", "getCartList"]),
    ...mapMutations(["setAddressModalState"]),
    useCode() {
      // if (this.discount.used === true) {
      //   this.$Message.warning("This code can only use once!");
      // }
      // if (this.discount.typed.trim() === this.discount.code) {
      //   this.$store.commit("updateDiscount", true);
      //   this.$Message.success("Congratulations!");
      // } else {
      //   this.$Message.warning("Sorry, Invalid Code!");
      //   this.discount.typed = "";
      // }
      this.$Message.warning("Sorry, this function not support now!");
    },
    initAddress(addressId) {
      this.selectAddress = addressId;
    },
    handleChange(addressId) {
      this.selectAddress = addressId;
    },
    async nextStep() {
      const result = await this.addOrder({
        userId: this.id,
        totalPrice: this.finalPrice,
        addressId: this.selectAddress
      });
      if (result) {
        this.$router.push({
          path: `/payment/${this.orderId}`
        });
        this.getCartList(this.id);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/variables";

.layoutBox {
  margin: 0 40px 40px;
  padding: 30px 40px;
  background-color: #f5f5f5;
}
.shippingMethods {
  display: flex;
  flex-wrap: wrap;
}
.title {
  color: @title-color;
  font-size: 18px;
  line-height: 20px;
  font-weight: normal;
  margin-bottom: 20px;
}

.shippingBox {
  position: relative;
  width: 268px;
  height: 178px;
  border: 1px solid #e0e0e0;
  background-color: #fff;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.4s ease;
  padding: 15px 24px;
  margin: 0 15px 15px 0;
}

.goods ul {
  list-style: none;
  padding: 5px 0;

  li {
    padding: 10px 0;
    display: flex;

    img {
      width: 45px;
      height: 30px;
      margin-right: 10px;
    }
    span {
      display: inline-block;
      line-height: 30px;
      color: #424242;
      font-size: 14px;
      vertical-align: top;
      flex: 1;
    }
    .goodName {
      flex: 3;
    }
    .goodPrice,
    .subTotal {
      text-align: right;
    }
    span.subTotal {
      color: @price-color;
    }
  }
}

.shipping .title,
.discount .title {
  display: inline-block;
  margin-right: 50px;
  margin-bottom: 0;
}
.shipping span {
  font-size: 16px;
  color: @secondary-color;
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
  ul {
    list-style: none;
    li {
      display: flex;
      line-height: 2;

      label {
        flex: 1;
        text-align: right;
        margin-right: 20px;
        color: #757575;
        font-size: 14px;
      }
      span {
        font-size: 14px;
        flex: 1;
        color: #ff6700;
        text-align: right;
      }
      span.finalPrice {
        font-size: 30px;
      }
    }
    .finalLi {
      align-items: baseline;
    }
  }
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


