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
      <Title class="title" :postTitle="mainTitle"/>
      <!--goods-->
      <div class="goods">
        <template v-for="(good, index) in products">
          <div class="goodsBox wow zoomIn" :data-wow-delay="index%2*0.3+'s'">
            <router-link :to="'/products/'+good._id" class="imgBox">
              <img :src="'http://localhost:3000/images/products/'+good.images[0]" :alt="good.name">
              <div class="goodsDetail">
                <h4>{{ good.name }}</h4>
                <span>{{ good.newPrice | currency}}</span>
              </div>
              <div class="mask">
                <button @click.stop.prevent="addCart(good._id)" class="addToCart">ADD TO CART</button>
              </div>
            </router-link>
          </div>
        </template>
      </div>
    </Content>
  </Layout>
</template>

<script>
import Title from "./../components/Title.vue";
import { mapActions, mapMutations, mapGetters } from "vuex";
import { currency } from "./../utils/currency";

export default {
  data() {
    return {
      products: [],
      mainTitle: "All"
    };
  },
  components: {
    Title
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
  max-width: 1226px;
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
  margin-right: 20px;
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
  font-size: 20px;
}
.goodsDetail span {
  display: block;
  text-align: center;
  font-size: 24px;
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


