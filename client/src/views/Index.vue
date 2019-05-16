<template>
  <div>
    <CarouselShow class="carousel"/>
    <div class="content">
      <StarProducts/>
      <ImageGrid/>
    </div>
  </div>
</template>

<script>
import CarouselShow from "./../components/CarouselShow.vue";
import StarProducts from "./../components/StarProducts.vue";
import ImageGrid from "./../components/ImageGrid.vue";

export default {
  data() {
    return {};
  },
  components: {
    CarouselShow,
    ImageGrid,
    StarProducts
  }
};
</script>

<style scoped>
.carousel {
  position: relative;
  margin-top: -80px;
}
.content {
  width: 95%;
  margin: 50px auto;
}
</style>
