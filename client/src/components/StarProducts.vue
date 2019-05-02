<template>
  <div class="starProducts">
    <Divider>STAR PRODUCTS</Divider>
    <div class="starProductsBox">
      <Card :bordered="false" class="starProductsCard">
        <div style="text-align:center">
          <p>LapTop i7</p>
          <img :src="starProductsSrc[0]">
        </div>
      </Card>
      <Card :bordered="false" class="starProductsCard">
        <div style="text-align:center">
          <p>Air Fresher</p>
          <img :src="starProductsSrc[1]">
        </div>
      </Card>
      <Card :bordered="false" class="starProductsCard">
        <div style="text-align:center">
          <p>Ceiling Light</p>
          <img :src="starProductsSrc[2]">
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import product1 from "./../../static/star-products/6.png";
import product2 from "./../../static/star-products/2.png";
import product3 from "./../../static/star-products/3.png";

export default {
  data() {
    return {
      starProductsSrc: [product1, product2, product3]
    };
  }
};
</script>

<style scoped>
.starProductsBox {
  display: flex;
}
.starProductsCard {
  flex: auto;
  width: 250px;
  margin: 20px;
}
.starProductsCard:first-child {
  background-color: rgb(219, 225, 228);
}
.starProductsCard:nth-child(2) {
  background-color: #e9e0e1;
}
.starProductsCard:nth-child(3) {
  background-color: #dae4df;
}
img {
  width: 50%;
}
p {
  font-size: 16px;
}
</style>
