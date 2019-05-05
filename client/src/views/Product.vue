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
      <Article :postTitle="product.productName"/>
      <div class="productIntro">
        <div class="productLeft">
          <img :src="'./static/images/'+product.productImage" :alt="product.productName">
        </div>
        <div class="productRight">
          <div class="infoBox">
            <div class="productName">{{product.productName}}</div>
            <div class="productPrice">
              <span class="price">{{product.salePrice | currency}}</span>
            </div>
            <div class="productQuantity">
              <span>Quantity</span>
              <QuantitySelector :min="0" @changeValue="handleChangeValue"/>
            </div>
            <div class="addToCart">
              <MainBtn type="primary" long>ADD TO CART +</MainBtn>
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
        </div>
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
import Article from "./../components/Article.vue";
import NavFooter from "./../components/NavFooter.vue";
import MainBtn from "./../components/MainBtn.vue";
import QuantitySelector from "./../components/QuantitySelector.vue";

import { currency } from "./../utils/currency";
import axios from "axios";

export default {
  data() {
    return {
      productDetail: {},
      selectedNum: 0
    };
  },
  components: {
    NavHeader,
    EntryBoard,
    Article,
    MainBtn,
    QuantitySelector,
    NavFooter
  },
  computed: {
    // avoid render error before get data
    categoryName() {
      return Object.keys(this.productDetail).length === 0
        ? ""
        : this.productDetail.categoryId[0].categoryName;
    },
    product() {
      return this.productDetail;
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
          this.productDetail = data.result.productDetail;
        }
      } catch (err) {
        console.log(err);
      }
    },
    handleChangeValue(value) {
      this.selectedNum = value;
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
.productIntro {
  max-width: 1200px;
  margin: auto;
  display: flex;
}
.productLeft {
  flex: 3;
  margin-right: 60px;
  padding: 0 50px 0;
  background-color: #fff;
}
.productLeft img {
  width: 100%;
}
.productRight {
  flex: 2;
}
.productRight .infoBox {
  width: 100%;
  height: 350px;
  border: 1px solid #e4e4e4;
  background-color: #fff;
  padding: 24px;
}
.productName {
  color: #212121;
  font-size: 30px;
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
  margin-bottom: 20px;
}
.productPrice span.price {
  font-size: 28px;
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
