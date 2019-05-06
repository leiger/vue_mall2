<template>
  <div class="main">
    <EntryBoard/>
    <NavHeader class="header"/>
    <CarouselShow class="carousel"/>
    <div class="content">
      <StarProducts/>
      <ImageGrid/>
    </div>

    <NavFooter/>
  </div>
</template>

<script>
import EntryBoard from "./../components/EntryBoard.vue";
import NavHeader from "./../components/NavHeader.vue";
import CarouselShow from "./../components/CarouselShow.vue";
import StarProducts from "./../components/StarProducts.vue";
import ImageGrid from "./../components/ImageGrid.vue";
import NavFooter from "./../components/NavFooter.vue";
import axios from "axios";

export default {
  data() {
    return {};
  },
  components: {
    EntryBoard,
    NavHeader,
    CarouselShow,
    ImageGrid,
    StarProducts,
    NavFooter
  }
};
</script>

<style scoped>
.header {
  position: relative;
  z-index: 100;
}
.carousel {
  position: relative;
  margin-top: -80px;
}
.content {
  width: 95%;
  margin: 50px auto;
}
</style>
