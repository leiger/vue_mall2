<template>
  <Layout>
    <!-- banner -->
    <div class="bannerBox">
      <div class="banner"/>
    </div>
    <Content class="layoutBox">
      <!--main content-->
      <!--sort & filter-->
      <div class="filterBox">
        <div class="cardBox">
          <h4>CATEGORY</h4>
          <ul>
            <li v-for="(category, index) in categories">
              <a
                class="wow fadeInDown"
                @click="filterProducts(category, index)"
                :class="{tagSelected: category.name === mainTitle}"
                :data-wow-delay="index*0.05+'s'"
              >{{category.name}}</a>
            </li>
          </ul>
        </div>
      </div>
      <!--goods-->
      <div class="goods" v-if="products.length > 0">
        <template v-for="(good, index) in products">
          <div class="goodsBox wow zoomIn" :data-wow-delay="index%2*0.3+'s'">
            <router-link :to="'/products/'+good._id" class="imgBox">
              <img :src="'http://localhost:3000/images/products/'+good.images[0]" :alt="good.name">
              <div class="goodsDetail">
                <div class="detailLeft">
                  <h4>{{ good.name }}</h4>
                </div>
                <div class="detailRight">
                  <div class="price">
                    <span>{{ good.newPrice | currency}}</span>
                    <del v-if="good.oldPrice" class="oldPrice">{{good.oldPrice | currency}}</del>
                  </div>

                  <button @click.stop.prevent="addCart(good._id)" class="addToCart">ADD TO CART</button>
                </div>
              </div>
            </router-link>
          </div>
        </template>
      </div>
      <div class="archive" v-else>
        <Icon type="ios-archive-outline"/>
        <span>No Product</span>
      </div>
    </Content>
  </Layout>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
import { currency } from "./../utils/currency";

export default {
  data() {
    return {
      products: [],
      mainTitle: "All"
    };
  },
  computed: {
    categories() {
      return [{ name: "All" }, ...this.$store.state.products.categoriesInfo];
    },
    id() {
      return this.$store.state.user.userInfo.id;
    }
  },
  filters: {
    currency
  },
  mounted: async function() {
    await this.getProducts();
    await this.getCategories();
    this.products = this.$store.state.products.productsInfo;
  },
  methods: {
    ...mapActions(["getProducts", "getCategories", "updateCartList"]),
    ...mapMutations(["setModal"]),
    filterProducts(category) {
      this.products = this.$store.state.products.productsInfo;
      if (category._id) {
        this.products = this.products.filter(
          product => product.category._id === category._id
        );
      }
      this.mainTitle = category.name;
    },
    async addCart(productId) {
      if (!this.id) {
        this.$Message.info("Login First!");
        setTimeout(() => {
          this.setModal({ type: 0, open: true });
        }, 2000);
      } else {
        let result = this.updateCartList({
          id: this.id,
          productId,
          changeNum: 1
        });
        if (result) this.$Message.success("Add success!");
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
  transition: all 4s ease-in-out;
}
.banner:hover {
  transform: scale(1.1);
}
.title {
  margin: 30px;
}
.layoutBox {
  padding: 0 30px;
  max-width: 1226px;
  width: 100%;
  margin: 30px auto;
}
.filterBox {
  background-color: #fff;
  padding: 20px;
  margin: 20px 7px 50px;
}
.cardBox {
  margin: 7px;
}
.cardBox h4 {
  font-weight: 600;
  font-size: 20px;
  display: inline-block;
  margin-right: 30px;
}
.cardBox ul {
  list-style: none;
  display: inline-block;
}
.cardBox li {
  display: inline-block;
  padding-right: 12px;
}
.cardBox a {
  display: inline-block;
  border: 1px solid #e4e4e4;
  padding: 0 20px;
  letter-spacing: 0.5px;
  width: auto;
  font-size: 16px;
  color: rgba(33, 33, 33, 0.8);
  line-height: 40px;
  transition: 0.5s;
}
.cardBox a:hover {
  color: 666;
  border: 1px solid #666;
}
.cardBox a.tagSelected {
  border-color: #ff6700;
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
  width: 100%;
  height: 358px;
}
.goodsDetail {
  padding: 0 28px 28px;
  display: flex;
  justify-content: space-between;
}
.goodsDetail h4 {
  margin-top: 35px;
  font-weight: 400;
  font-size: 24px;
  display: block;
  color: #242424;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goodsDetail .price {
  display: flex;
  margin-top: 25px;
  justify-content: flex-end;
  align-items: baseline;
}
.goodsDetail span {
  display: block;
  letter-spacing: 1px;
  font-size: 24px;
  color: #ff6700;
}
.goodsDetail .oldPrice {
  font-size: 14px;
  margin-left: 10px;
  display: inline-block;
  color: #666;
}
.goodsBox .addToCart {
  background-color: #555;
  border: none;
  color: #fff;
  font-size: 14px;
  margin-top: 5px;
  padding: 9px 30px;
  text-align: center;
  cursor: pointer;
}
.goodsBox .addToCart:hover {
  background-color: #212121;
}
.archive {
  text-align: center;
  margin-bottom: 80px;
}
.archive i {
  font-size: 60px;
  color: #666;
}
.archive span {
  display: block;
  color: #666;
}
</style>


