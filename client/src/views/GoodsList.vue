<template>
  <Layout>
    <EntryBoard/>
    <NavHeader/>
    <!-- banner -->
    <div class="bannerBox">
      <div class="banner"/>
    </div>

    <Content class="layoutBox">
      <!--main content-->
      <!--sort & filter-->
      <div class="filterBox">
        <div class="cardBox">
          <h4>SORT</h4>
          <ul>
            <li v-for="(name, index) in sortNames">
              <a
                class="wow fadeInDown"
                @click="sortGoods(index)"
                :class="{tagSelected: sortSelected[index]}"
                :data-wow-delay="index*0.05+'s'"
              >
                {{name}}
                <template v-if="index === 1">
                  <Icon v-if="sortPriceArrow" type="ios-arrow-round-up" size="18"/>
                  <Icon v-else type="ios-arrow-round-down" size="18"/>
                </template>
              </a>
            </li>
          </ul>
        </div>
        <div class="cardBox">
          <h4>FILTER BY PRICE RANGE</h4>
          <ul>
            <li v-for="(price, index) in priceRange">
              <a
                class="wow fadeInDown"
                :data-wow-delay="index*0.05+'s'"
                @click="setPriceFilter(index)"
                :class="{tagSelected: priceFilterSelected[index]}"
              >{{price}}</a>
            </li>
          </ul>
        </div>
      </div>
      <Title class="title" :postTitle="mainTitle"/>
      <!--goods-->
      <div class="goods">
        <template v-for="(good, index) in goods">
          <div class="goodsBox wow zoomIn" :data-wow-delay="index%2*0.3+'s'">
            <router-link :to="'/products/'+good.productId" class="imgBox">
              <img :src="'/static/images/'+good.productImage" :alt="good.productName">
              <div class="goodsDetail">
                <h4>{{ good.productName }}</h4>
                <span>{{ good.salePrice | currency}}</span>
              </div>
              <div class="mask">
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
  </Layout>
</template>

<script>
import EntryBoard from "./../components/EntryBoard.vue";
import NavHeader from "./../components/NavHeader.vue";
import Title from "./../components/Title.vue";
import NavFooter from "./../components/NavFooter.vue";

import axios from "axios";
import loadingSvg from "./../../static/loading-svg/loading-spin.svg";

import getCartList from "./../services/getCartList.js";
import { currency } from "./../utils/currency";
import WOW from "wow.js";

export default {
  data() {
    return {
      mainTitle: "All",
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
    Title,
    NavFooter
  },
  filters: {
    currency
  },
  mounted: function() {
    this.getGoodsList();
    new WOW().init();
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
          this.$Message.info("Login First!");
          setTimeout(() => {
            this.$store.commit("updateLoginModal", { action: true, type: 0 });
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
.bannerBox {
  height: 420px;
  overflow: hidden;
}
.banner {
  width: 100%;
  height: 420px;
  background-position: center center;
  background-image: url(./../../static/goodsList/goodsList1.jpg);
  transition: all 2s ease-in-out;
}
.banner:hover {
  transform: scale(1.1);
}
.title {
  margin: 30px;
}
.layoutBox {
  padding: 0 30px;
  max-width: 1600px;
  width: 100%;
  margin: 30px auto;
}
.filterBox {
  background-color: #fff;
  padding: 7px 20px;
  margin: 14px 7px;
}
.cardBox {
  margin: 7px;
}
.cardBox h4 {
  font-weight: 300;
  font-size: 16px;
  display: inline-block;
  margin-right: 10px;
}
.cardBox ul {
  list-style: none;
  display: inline-block;
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
/* below part */
.goods {
  display: flex;
  flex-wrap: wrap;
}
.goodsBox {
  position: relative;
  width: 50%;
}
.imgBox {
  position: relative;
  display: block;
  text-align: center;
  background-color: #fff;
  margin: 0 7px 14px;
  cursor: pointer;
  font-size: 0;
}
.imgBox:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transform: translate3d(0, -5px, 0);
  transition: all 0.2s linear;
}
.imgBox img {
  width: 50%;
}
.goodsDetail {
  padding: 0 48px 20px;
  display: flex;
  justify-content: space-between;
}
.goodsDetail h4 {
  text-align: left;
  color: rgba(51, 51, 51, 0.9);
  font-weight: 300;
  line-height: 1.8;
  font-size: 24px;
}
.goodsDetail span {
  display: block;
  text-align: center;
  font-size: 30px;
  color: #ff6700;
}

.goodsBox .addToCart {
  background-color: #555;
  width: 100%;
  height: 60px;
  border: none;
  color: #fff;
  font-size: 14px;
  padding: 9px 30px;
  text-align: center;
  cursor: pointer;
}
.goodsBox .addToCart:hover {
  background-color: #212121;
}

.load_more {
  height: 50px;
  line-height: 50px;
  text-align: center;
}
</style>


