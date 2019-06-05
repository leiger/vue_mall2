<template>
  <Layout>
    <!-- banner -->
    <div class="bannerBox">
      <div class="banner"/>
    </div>
    <div class="layoutBox">
      <Row>
        <!--main content-->
        <!--sort & filter-->
        <Col :lg="6" class="filterBox">
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
        </Col>
        <!--products-->
        <Col :lg="18" class="products" v-if="products.length > 0">
          <Row>
            <Col
              v-for="(product, index) in products"
              :key="product._id"
              :md="12"
              class="productsBox wow zoomIn"
              :data-wow-delay="index%2*0.3+'s'"
            >
              <router-link :to="'/products/'+product._id" class="imgBox">
                <img
                  :src="'http://images.leiger.tech/vmall2/products/'+product.images[0]"
                  :alt="product.name"
                >
                <div class="productsDetail">
                  <div class="detailLeft">
                    <h4>{{ product.name }}</h4>
                  </div>
                  <div class="detailRight">
                    <div class="price">
                      <span>{{ product.newPrice | currency}}</span>
                      <del v-if="product.oldPrice" class="oldPrice">{{product.oldPrice | currency}}</del>
                    </div>
                    <Button
                      class="addToCart"
                      type="primary"
                      @click.stop.prevent="addCart(product._id)"
                    >ADD TO CART +</Button>
                  </div>
                </div>
              </router-link>
            </Col>
          </Row>
        </Col>
        <Col :lg="18" class="archive" v-else>
          <Icon type="ios-archive-outline"/>
          <span>No Product</span>
        </Col>
      </Row>
    </div>
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

<style lang="less" scoped>
@import "../assets/css/variables";

.bannerBox {
  height: 300px;
  overflow: hidden;

  .banner {
    width: 100%;
    height: 300px;
    background-position: center center;
    background-image: url(../assets/images/banners/collectionBanner.png);
    transition: all 4s ease-in-out;

    &:hover {
      transform: scale(1.05);
    }
  }
}

.layoutBox {
  margin: auto;
  max-width: 1224px;
  width: 100%;
  padding: 48px 0;
}
// category
.filterBox {
  .cardBox {
    margin: 0 12px 24px;
    h4 {
      font-weight: 600;
      font-size: 20px;
      margin-bottom: 16px;
      color: @title-color;
    }

    ul {
      list-style: none;
      a {
        color: @secondary-color;
        line-height: 30px;
        font-size: 14px;
        letter-spacing: 1px;

        &:hover {
          color: @primary-color;
        }

        &.tagSelected {
          font-weight: bold;
        }
      }
    }
  }
}
.productsBox {
  margin-bottom: 24px;
  padding: 0 12px;

  .imgBox {
    position: relative;
    display: block;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
    font-size: 0;

    &:hover {
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      transform: translate3d(0, -5px, 0);
      transition: all 0.2s linear;
    }
    img {
      width: 100%;
      height: 280px;
    }
  }
}

.productsDetail {
  padding: 0 20px 20px;
  display: flex;
  justify-content: space-between;

  h4 {
    margin-top: 30px;
    font-weight: 400;
    font-size: 20px;
    display: block;
    color: @title-color;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .price {
    display: flex;
    margin-top: 20px;
    justify-content: flex-end;
    align-items: baseline;
  }
  span {
    display: block;
    font-size: 20px;
    color: @price-color;
  }

  .oldPrice {
    font-size: 14px;
    margin-left: 10px;
    display: inline-block;
    color: @disabled-color;
  }

  .addToCart {
    margin-top: 5px;
  }
}

.archive {
  text-align: center;
  margin-top: 80px;

  i {
    font-size: 60px;
    color: @disabled-color;
  }

  span {
    display: block;
    color: @disabled-color;
  }
}
</style>


