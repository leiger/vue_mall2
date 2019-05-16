<template>
  <Drawer width="700" v-model="drawerState" :scrollable="true">
    <Divider>SHOPPING CART</Divider>
    <div v-if="cartList.length === 0" class="emptyBox">
      <p>YOUR CART IS CURRENTLY EMPTY.</p>
    </div>
    <div v-else class="cartListBox">
      <div class="itemBox" v-for="item in cartList">
        <div class="imgBox">
          <img :src="'http://localhost:3000/images/products/'+item.images[0]" alt="img">
        </div>
        <a @click="selectItem(item._id)">
          <h5 class="itemName">{{item.name}}</h5>
        </a>
        <QuantitySelector
          :value="item.numInCart"
          :min="0"
          @changeValue="changeQuantity(item._id, arguments)"
        />
        <div class="price">{{item.newPrice * item.numInCart | currency}}</div>
      </div>
    </div>

    <div class="checkoutConfirm">
      <Divider/>
      <div class="subTotal">
        <span class="info">Shipping & taxes calculated at checkout</span>
        <span class="totalPrice">
          SUBTOTAL
          <span>{{totalPrice | currency}}</span>
        </span>
      </div>
      <div class="buttonGroup">
        <MainBtn long @click="drawerState = false">CONTINUE SHOPPING</MainBtn>
        <MainBtn
          class="checkoutBtn"
          long
          v-if="cartList.length !== 0"
          type="primary"
          :disabled="totalPrice === 0?true:false"
          @click="checkout"
        >CHECK OUT ></MainBtn>
      </div>
    </div>
  </Drawer>
</template>

<script>
import MainBtn from "./../components/MainBtn.vue";
import QuantitySelector from "./../components/QuantitySelector.vue";
import { currency } from "./../utils/currency";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  components: {
    MainBtn,
    QuantitySelector
  },
  computed: {
    drawerState: {
      get() {
        return this.$store.state.cart.drawerState;
      },
      set(status) {
        this.setDrawerState(status);
      }
    },
    cartList() {
      return this.$store.state.cart.cartList;
    },
    id() {
      return this.$store.state.user.userInfo.id;
    },
    ...mapGetters(["totalPrice"])
  },
  filters: {
    currency
  },
  methods: {
    ...mapActions(["updateCartList"]),
    ...mapMutations(["setDrawerState"]),
    changeQuantity(productId, arg) {
      this.updateCartList({
        id: this.id,
        productId,
        changeNum: arg[0]
      });
    },

    checkout() {
      if (this.totalPrice > 0) {
        this.$router.push({
          path: "/checkout"
        });
        this.drawerState = false;
      }
    },
    selectItem(id) {
      this.drawerState = false;
      this.$router.push("/products/" + id);
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
  display: inline-block;
  font-size: 15px;
  line-height: 90px;
  font-weight: 400;
  padding-left: 10px;
  width: 260px;
  color: #212121;
}
.itemBox .itemName:hover {
  color: #666;
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
  color: #666;
  line-height: 2rem;
  letter-spacing: 1px;
}
.subTotal .totalPrice span {
  color: #ff6700;
}
.buttonGroup {
  display: flex;
  justify-content: space-between;
}
.checkoutBtn {
  margin-left: 15px;
}
</style>


