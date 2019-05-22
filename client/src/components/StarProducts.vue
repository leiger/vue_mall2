<template>
  <div class="starProducts">
    <Title postTitle="STAR PRODUCTS"/>
    <Row class="starProductsBox">
      <Col
        class="starProductsCard wow fadeIn"
        :lg="8"
        v-for="(product,index) in starProducts"
        :key="product.name"
      >
        <div class="startProductsContent" :bordered="false" :data-wow-delay="(index+1)*0.2+'s'">
          <router-link :to="product.link">
            <div class="cardContent">
              <p>{{product.name}}</p>
              <Rate disabled :value="5" />
              <img :src="product.src">
            </div>
          </router-link>
        </div>
      </Col>
    </Row>
  </div>
</template>

<script>
import Title from "./../components/Title.vue";
import product1 from "../assets/images/star-products/6.png";
import product2 from "../assets/images/star-products/11.png";
import product3 from "../assets/images/star-products/2.png";

export default {
  data() {
    return {
      starProducts: [
        {
          name: "air fresher",
          src: product1,
          link: "/products/5ce49cf2fa33a1076c51a0af"
        },
        {
          name: "sphere camera",
          src: product2,
          link: "/products/5ce49d5cfa33a1076c51a0b7"
        },
        {
          name: " phone case",
          src: product3,
          link: "/products/5ce49b39fa33a1076c51a092"
        }
      ]
    };
  },
  components: {
    Title
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/variables";

.starProductsCard {
  padding: 10px;

  .startProductsContent {
    cursor: pointer;
    transition: all 0.2s linear;
    background-color: #fff;

    &:hover {
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
      transform: translate3d(0, -5px, 0);
    }
  }
}

.cardContent {
  padding: 20px 0 0px;
  text-align: center;

  img {
    width: 80%;
  }

  p {
    font-size: 22px;
    color: @title-color;
  }
}
</style>
