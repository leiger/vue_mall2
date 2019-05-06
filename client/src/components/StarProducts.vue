<template>
  <div class="starProducts">
    <Title postTitle="STAR PRODUCTS"/>
    <div class="starProductsBox">
      <div :bordered="false" class="starProductsCard">
        <router-link to="/products/201905007">
          <div class="cardContent">
            <p>LapTop i7</p>
            <p class="sub">High Performance</p>
            <img :src="starProductsSrc[0]">
          </div>
        </router-link>
      </div>
      <div :bordered="false" class="starProductsCard">
        <router-link to="/products/201905006">
          <div class="cardContent">
            <p>Air Fresher</p>
            <p class="sub">First choice for healthy lifestyle</p>
            <img :src="starProductsSrc[1]">
          </div>
        </router-link>
      </div>
      <div :bordered="false" class="starProductsCard">
        <router-link to="/products/201905005">
          <div class="cardContent">
            <p>Ceiling Light</p>
            <p class="sub">Warm light, Protect eyes</p>
            <img :src="starProductsSrc[2]">
          </div>
        </router-link>
      </div>
    </div>
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
      starProductsSrc: [product1, product2, product3]
    };
  },
  components: {
    Title
  }
};
</script>

<style scoped>
.starProductsBox {
  display: flex;
}
.starProductsCard {
  flex: 1;
  cursor: pointer;
  padding: 20px;
}
.starProductsCard:hover {
  box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  transform: translate3d(0, -5px, 0);
  transition: all .2s linear;
}
.cardContent {
  padding: 20px 0 0px;
  text-align: center;
}
.starProductsCard:first-child {
  background-color: rgb(219, 225, 228);
}
.starProductsCard:nth-child(2) {
  background-color: #e9e0e1;
  margin: 0 30px;
}
.starProductsCard:nth-child(3) {
  background-color: #dae4df;
}
img {
  width: 50%;
}
p {
  font-size: 22px;
  color: #212121;
  letter-spacing: 1px;
  opacity: 0.7;
}
.sub {
  font-size: 14px;
  color: rgba(51,51,51,0.7)
}
</style>
