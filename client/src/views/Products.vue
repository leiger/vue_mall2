<template>
  <Layout>
    <Breadcrumb class="breadCrumb">
      <BreadcrumbItem to="/collections">All Products</BreadcrumbItem>
      <BreadcrumbItem v-if="product.category">{{product.category.name}}</BreadcrumbItem>
      <BreadcrumbItem>{{product.name}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="container">
      <Row class="productIntro">
        <Col :sm="24" :lg="12" class="productLeft wow fadeIn" data-wow-delay="0.2s">
          <Carousel class="productCarousel" v-if="product.images">
            <CarouselItem v-for="image of product.images" :key="image">
              <img :src="'http://images.leiger.tech/vmall2/products/'+image" :alt="product.name">
            </CarouselItem>
          </Carousel>
        </Col>
        <Col :sm="24" :lg="12" class="productRight">
          <div class="infoBox wow fadeIn" data-wow-delay="0.4s">
            <div class="productName">{{product.name}}</div>
            <div class="productPrice">
              <span class="price">{{product.newPrice | currency}}</span>
              <del>
                <span v-if="product.oldPrice">{{product.oldPrice | currency}}</span>
              </del>
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
              <MainBtn @click="addToCart()" long>ADD TO CART +</MainBtn>
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
          <Tabs class="infoBox wow fadeIn" data-wow-delay="0.6s" value="Shipping">
            <TabPane
              label="SHIPPING"
              name="Shipping"
            >Orders processed here will take 5-7 business days to arrive. Overseas deliveries can take anywhere from 7-16 days.</TabPane>
            <TabPane
              label="TAXES"
              name="Taxes"
            >You will be responsible for paying for your own tax costs for your item. Tax costs are non-refundable. If you receive a refund, the cost of return tax will be deducted from your refund</TabPane>
            <TabPane
              label="RETURNS"
              name="Returns"
            >We always aim for make sure our customers love our products, but if you do need to return an order, we’re happy to help.</TabPane>
          </Tabs>
        </Col>
      </Row>
    </div>
    <div class="detail wow fadeIn" data-wow-delay="0.2s">
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
  </Layout>
</template>

<script>
import MainBtn from "./../components/MainBtn.vue";
import QuantitySelector from "./../components/QuantitySelector.vue";
import { mapActions, mapMutations } from "vuex";
import { currency } from "./../utils/currency";

export default {
  data() {
    return {
      selectedNum: 1
    };
  },
  components: {
    MainBtn,
    QuantitySelector
  },
  computed: {
    product() {
      return this.$store.state.products.currentProduct;
    },
    id() {
      return this.$store.state.user.userInfo.id;
    }
  },
  mounted() {
    this.getProductById(this.$route.params);
  },
  // watch: {
  //   $route(to, from) {
  //     console.log(to);
  //     this.getProductById(to);
  //   }
  // },
  filters: {
    currency: currency
  },
  methods: {
    ...mapActions(["getProductById", "updateCartList"]),
    ...mapMutations(["setModal"]),

    handleChangeValue(id, arg) {
      this.selectedNum = this.selectedNum + arg[0];
    },
    async addToCart() {
      if (!this.id) {
        this.$Message.info("Login First!");
        setTimeout(() => {
          this.setModal({ type: 0, open: true });
        }, 2000);
      } else {
        let result = await this.updateCartList({
          id: this.id,
          productId: this.product._id,
          changeNum: this.selectedNum
        });
        if (result) this.$Message.success("Add success!");
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/variables";

.container {
  margin: 24px auto 40px;
  max-width: 1226px;
}
.breadCrumb {
  margin-top: 24px;
  text-align: center;
}
.productIntro {
  padding: 24px;
  background-color: #fff;
}

// left
.productLeft {
  .productCarousel {
    margin: 24px;
  }
  img {
    width: 100%;
  }
}
// right
.productRight .infoBox {
  height: 350px;
  background-color: #fff;
  margin: 24px;
}
.productRight .infoBox:nth-child(2) {
  height: 150px;
  margin-bottom: 0;
}
.productName {
  color: @title-color;
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
  color: @price-color;

  span.price {
    font-size: 24px;
    font-weight: 600;
  }

  del {
    color: @disabled-color;
  }
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
  padding: 40px 0;

  .descBox {
    margin-bottom: 20px;
  }

  .descTitle {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .descDetail {
    font-size: 15px;
  }
}
</style>
