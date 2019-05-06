<template>
  <Layout>
    <EntryBoard/>
    <NavHeader/>
    <div class="container">
      <Breadcrumb class="breadCrumb">
        <BreadcrumbItem to="/">Home</BreadcrumbItem>
        <BreadcrumbItem>{{categoryName}}</BreadcrumbItem>
        <BreadcrumbItem>{{product.productName}}</BreadcrumbItem>
      </Breadcrumb>
      <Title class="title" :postTitle="product.productName"/>
      <div class="productIntro">
        <div class="productLeft">
          <img :src="'./static/images/'+product.productImage" :alt="product.productName">
        </div>
        <Affix class="productRight" :offset-top="100">
          <div class="infoBox">
            <div class="productName">{{product.productName}}</div>
            <div class="productPrice">
              <span class="price">{{product.salePrice | currency}}</span>
            </div>
            <div class="productQuantity">
              <span>Quantity</span>
              <QuantitySelector
                :value="selectedNum"
                :min="1"
                @changeValue="handleChangeValue(product.productId, arguments)"
              />
            </div>
            <div class="addToCart">
              <MainBtn @click="addToCart()" type="primary" long>ADD TO CART +</MainBtn>
            </div>
            <div class="guarantee">
              <span>
                <Icon type="ios-checkmark-circle-outline" size="20"/>No Reason Returned
              </span>
              <span>
                <Icon type="ios-checkmark-circle-outline" size="20"/>After-Sales Service
              </span>
            </div>
          </div>
        </Affix>
      </div>
    </div>
    <div class="detail">
      <div class="productIntro">
        <div class="productLeft">
          <div v-if="product.desc" class="descBox" v-for="detail in product.desc">
            <p class="descTitle">{{detail.title}}</p>
            <p class="descDetail">{{detail.detail}}</p>
          </div>
        </div>
        <div class="productRight"/>
      </div>
    </div>
    <NavFooter/>
  </Layout>
</template>

<script>
import NavHeader from "./../components/NavHeader.vue";
import EntryBoard from "./../components/EntryBoard.vue";
import Title from "./../components/Title.vue";
import NavFooter from "./../components/NavFooter.vue";
import MainBtn from "./../components/MainBtn.vue";
import QuantitySelector from "./../components/QuantitySelector.vue";

import { currency } from "./../utils/currency";
import axios from "axios";
import getCartList from "../services/getCartList";

export default {
  data() {
    return {
      product: {},
      selectedNum: 1
    };
  },
  components: {
    NavHeader,
    EntryBoard,
    Title,
    MainBtn,
    QuantitySelector,
    NavFooter
  },
  computed: {
    // avoid render error before get data
    categoryName() {
      return Object.keys(this.product).length === 0
        ? ""
        : this.product.categoryId[0].categoryName;
    }
  },
  created() {
    this.getProductDetail(this.$route);
  },
  watch: {
    $route(to, from) {
      this.getProductDetail(to);
    }
  },
  filters: {
    currency: currency
  },
  methods: {
    async getProductDetail(route) {
      let id = route.params.id;
      let params = {
        productId: id
      };
      try {
        let { data } = await axios.get("/good/product", {
          params
        });
        if (data.status === "0") {
          this.product = data.result.productDetail;
        }
      } catch (err) {
        console.log(err);
      }
    },
    handleChangeValue(id, arg) {
      this.selectedNum = this.selectedNum + arg[0];
    },
    async addToCart() {
      let { productId } = this.product;

      if (this.selectedNum > 0) {
        try {
          let cartList = this.$store.state.cartList;
          let numIncart = 0;
          cartList.forEach(item => {
            if (item.productId === productId) {
              numIncart = item.productNum;
            }
          });
          let { data } = await axios.post("/cart/cartEdit", {
            productId,
            productNum: this.selectedNum + numIncart
          });
          if (data.status === "0") {
            this.$Message.success("Add Success!");
            getCartList(this);
          } else if (data.status === "3") {
            this.$Message.info("Login First!");
            setTimeout(() => {
              this.$store.commit("updateLoginModal", { action: true, type: 0 });
            }, 2000);
          } else {
            this.$Message.error("Add Fail!");
          }
        } catch (err) {
          console.log(err);
        }
      } else {
        this.$$Message.error("Invalid!");
      }
    }
  }
};
</script>

<style scoped>
.container {
  padding: 0 30px;
  max-width: 1600px;
  width: 100%;
  margin: 30px auto;
}
.breadCrumb {
  text-align: center;
}
.container .title {
  margin: 30px 0 50px;
}
.productIntro {
  max-width: 1200px;
  margin: auto;
  display: flex;
}
.productLeft {
  flex: 4;
  margin-right: 30px;
  padding: 0 50px 0;
  background-color: #fff;
}
.productLeft img {
  width: 100%;
}
.productRight {
  flex: 3;
}
.productRight .infoBox {
  width: 100%;
  height: 350px;
  background-color: #fff;
  padding: 24px;
}
.productName {
  color: #212121;
  font-size: 28px;
  font-weight: 600;
  text-align: left;
  margin: 10px 0 20px;
}
.productQuantity {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 25px;
}
.productQuantity span {
  font-size: 15px;
}
.productPrice {
  font-weight: lighter;
  margin-bottom: 20px;
  color: #ff6700;
}
.productPrice span.price {
  font-size: 24px;
  font-weight: 600;
}
.addToCart {
  margin-bottom: 20px;
}
.guarantee span {
  display: inline-block;
  margin-right: 10px;
  font-size: 14px;
  color: #b0b0b0;
}
.guarantee i {
  margin-right: 5px;
}

/* detail */
.detail {
  background-color: #fff;
  margin: 50px 0 0;
  padding: 60px 0;
}
.descBox {
  margin-bottom: 20px;
}
.detail .descTitle {
  font-size: 18px;
  margin-bottom: 10px;
}
.detail .descDetail {
  font-size: 15px;
}
</style>
