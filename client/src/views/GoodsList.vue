<template>
  <Layout>
    <EntryBoard/>
    <NavHeader/>
    <!-- banner -->
    <div class="banner">
      <!-- <img :src="bannerImgSrc" alt="bannerImg"> -->
    </div>
    <!-- intro -->
    <Article :postTitle="mainTitle">
      <p>Choose well and buy less. We believe in owning fewer, quality things and making them last a long time. That’s why if any of our product ever breaks down, you can send it back to us and we’ll repair it.</p>
    </Article>

    <Content class="layoutBox">
      <!--main content-->
      <!--left-->
      <div class="leftBox">
        <div class="cardBox">
          <h4>FILTER BY PRICE RANGE</h4>
          <ul>
            <li v-for="(price, index) in priceRange">
              <a
                @click="setPriceFilter(index)"
                :class="{tagSelected: priceFilterSelected[index]}"
              >{{price}}</a>
            </li>
          </ul>
        </div>

        <div class="cardBox">
          <h4>SORT</h4>
          <ul>
            <li v-for="(name, index) in sortNames">
              <a @click="sortGoods(index)" :class="{tagSelected: sortSelected[index]}">
                {{name}}
                <template v-if="index === 1">
                  <Icon type="ios-arrow-round-up" v-if="sortPriceArrow"/>
                  <Icon type="ios-arrow-round-down" v-else/>
                </template>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!--right-->
      <div class="rightBox">
        <template v-for="(good, index) in goods">
          <div class="goodsBox">
            <router-link :to="'/products/'+good.productId" class="imgBox">
              <img :src="'/static/images/'+good.productImage" :alt="good.productName">
              <div class="goodsDetail">
                <h4>{{ good.productName }}</h4>
                <span>$ {{ good.salePrice }}</span>
                <button @click.stop.prevent="addCart(good.productId)" class="addToCart">ADD TO CART</button>
              </div>
            </router-link>
          </div>
        </template>
        <!--load more-->
        <div
          class="load_more"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="busy"
          infinite-scroll-distance="10"
          v-if="loading.imageShow"
        >
          <img :src="loading.imageUrl" alt="loading...">
        </div>
      </div>
    </Content>
    <nav-footer/>
    <BackTop/>
  </Layout>
</template>

<script>
import EntryBoard from "./../components/EntryBoard.vue";
import NavHeader from "./../components/NavHeader.vue";
import Article from "./../components/Article.vue";
import NavFooter from "./../components/NavFooter.vue";

import axios from "axios";
import loadingSvg from "./../../static/loading-svg/loading-spin.svg";

import getCartList from "./../services/getCartList.js";
import { currency } from "./../utils/currency";

export default {
  data() {
    return {
      mainTitle: "All Products",
      // priceFilter
      priceRange: [
        "All",
        "$0 to $100",
        "$100 to $500",
        "$500 to $1000",
        "$1000 to $2000"
      ],
      priceLevel: 0,
      priceFilterSelected: [true, false, false, false],

      // sort
      // sortWay default: 0, price: 1
      // sortFlag asce or desc
      sortNames: ["Default", "Price"],
      sortSelected: [true, false],
      sort: {
        sortWay: 0,
        sortFlag: true
      },
      sortPriceArrow: true,

      goods: [],
      page: 1,
      pageSize: 12,

      // vue-infinite-scroll
      busy: false,
      loading: {
        imageUrl: loadingSvg,
        imageShow: true
      }
    };
  },
  components: {
    NavHeader,
    EntryBoard,
    Article,
    NavFooter
  },
  mounted: function() {
    this.getGoodsList();
  },
  methods: {
    async getGoodsList(flag) {
      let params = {
        page: this.page,
        pageSize: this.pageSize,
        // 1: asce; -1: desc
        sortFlag: this.sort.sortFlag ? 1 : -1,
        // price or default
        sortWay: this.sort.sortWay,
        priceLevel: this.priceLevel
      };

      this.loading.imageShow = true;

      try {
        let { data } = await axios.get("/good/list", {
          params
        });
        // console.log(res);
        if (data.status === "0") {
          // flag means first page or later page
          if (flag) {
            this.goods = this.goods.concat(data.result.list);
            // no more data
            if (data.result.count < this.pageSize) {
              this.busy = true;
            } else {
              this.busy = false;
            }
          } else {
            this.goods = data.result.list;
            this.busy = false;
          }
        }
        // request false
        else {
          this.goods = [];
          this.$Message.error("Request Fail, Please reload the page");
        }
        this.loading.imageShow = false;
      } catch (err) {
        console.log(err);
      }
    },
    sortGoods(name) {
      // price sort
      if (name === 1) {
        if (this.sortSelected[1] === true) {
          this.sortPriceArrow = !this.sortPriceArrow;
          this.sort.sortFlag = !this.sort.sortFlag;
        }
        this.sortSelected = [false, true];
      }
      // default sort
      else {
        this.sortSelected = [true, false];
      }
      this.page = 1;
      this.sort.sortWay = name;
      this.getGoodsList();
    },
    setPriceFilter(level) {
      this.page = 1;
      this.priceLevel = level;
      this.priceFilterSelected = [false, false, false, false];
      this.priceFilterSelected[level] = true;
      this.mainTitle = this.priceRange[level];
      this.getGoodsList();
    },
    loadMore: function() {
      // forbid load frequently
      this.busy = true;

      setTimeout(() => {
        this.page++;
        //          console.log(this.page);
        this.getGoodsList(true);
        // this.busy = false;
      }, 1000);
    },

    async addCart(productId) {
      try {
        let { data } = await axios.post("/cart/addCart", {
          productId: productId
        });
        if (data.status === "0") {
          // login already
          this.$Message.success("Add Success!");
          getCartList(this);
        } else if (data.status === "3") {
          // not login
          this.$Message.error("Login First!");
          setTimeout(() => {
            this.$store.commit("updateLoginModal", true);
          }, 2000);
        } else {
          // err
          this.$Message.error("Add error!");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.banner {
  width: 100%;
  min-height: 420px;
  overflow: hidden;
  background-position: center center;
  background-image: url(./../../static/goodsList/goodsList1.jpg);
}

.layoutBox {
  padding: 0 30px;
  max-width: 1600px;
  width: 100%;
  margin: 30px auto;
  display: flex;
}
/* left part */
.leftBox {
  flex: 1;
}
.cardBox {
  margin-bottom: 24px;
}
.cardBox h4 {
  font-weight: 300;
  font-size: 16px;
}
.cardBox ul {
  list-style: none;
}
.cardBox li {
  display: inline-block;
  padding: 6px 6px 0 0;
}
.cardBox a {
  display: inline-block;
  border: 1px solid #e4e4e4;
  border-radius: 2px;
  padding: 1px 12px;
  width: auto;
  font-size: 0.9rem;
  color: rgba(33, 33, 33, 0.8);
  line-height: 30px;
  transition: 0.5s;
}
.cardBox a:hover {
  color: 666;
  border: 1px solid #666;
}
.cardBox a.tagSelected {
  font-weight: 600;
}
/* right part */
.rightBox {
  flex: 3;
  display: flex;
  flex-wrap: wrap;
}
.goodsBox {
  position: relative;
  width: 50%;
  overflow: hidden;
}
.imgBox {
  position: relative;
  display: block;
  width: 100%;
  height: 400px;
  text-align: center;
  background-color: #fff;
  margin: 0 20px 40px;
  overflow: hidden;
  cursor: pointer;
  font-size: 0;
}
.imgBox img {
  height: 400px;
  padding: 60px 0;
}
/* mask */
.goodsDetail {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background: rgba(255, 255, 255, 0.8);
  color: #333;
  opacity: 0;
}
.goodsDetail:hover {
  opacity: 1;
}
.goodsBox .goodsDetail h4 {
  text-align: center;
  margin-top: 100px;
  color: #333;
  font-weight: 300;
  line-height: 1.8;
  font-size: 36px;
}
.goodsBox .goodsDetail span {
  display: block;
  text-align: center;
  font-size: 30px;
  color: #212121;
}
.goodsBox .addToCart {
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: #212121;
  width: 100%;
  height: 60px;
  border: 1px solid #212121;
  color: #fff;
  font-size: 14px;
  padding: 9px 30px;
  text-align: center;
  cursor: pointer;
}

.load_more {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>


