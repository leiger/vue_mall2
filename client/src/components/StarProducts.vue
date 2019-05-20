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
              <p class="sub">{{product.sub}}</p>
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
import product1 from "./../../static/star-products/6.png";
import product2 from "./../../static/star-products/2.png";
import product3 from "./../../static/star-products/3.png";

export default {
  data() {
    return {
      starProducts: [
        {
          name: "LapTop i7",
          sub: "High Performance",
          src: product1,
          link: "/products/201905007"
        },
        {
          name: "Air Fresher",
          sub: "First choice for healthy lifestyle",
          src: product2,
          link: "/products/201905006"
        },
        {
          name: "Ceiling Light",
          sub: "Warm light, Protect eyes",
          src: product3,
          link: "/products/201905005"
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
    background-color: rgb(219, 225, 228);

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
    width: 50%;
  }

  p {
    font-size: 22px;
    color: @title-color;
  }

  .sub {
    font-size: 14px;
    color: @secondary-color;
  }
}
</style>
