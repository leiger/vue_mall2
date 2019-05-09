<template>
  <div class="starProducts">
    <Title postTitle="STAR PRODUCTS"/>
    <div class="starProductsBox">
      <template v-for="(product,index) in starProducts">
        <div
          :bordered="false"
          class="starProductsCard wow fadeIn"
          :data-wow-delay="(index+1)*0.2+'s'"
        >
          <router-link :to="product.link">
            <div class="cardContent">
              <p>{{product.name}}</p>
              <p class="sub">{{product.sub}}</p>
              <img :src="product.src">
            </div>
          </router-link>
        </div>
      </template>
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

<style scoped>
.starProductsBox {
  display: flex;
}
.starProductsCard {
  flex: 1;
  cursor: pointer;
  padding: 20px;
  transition: all 0.2s linear;
}
.starProductsCard:hover {
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  transform: translate3d(0, -5px, 0);
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
  color: rgba(51, 51, 51, 0.7);
}
</style>
