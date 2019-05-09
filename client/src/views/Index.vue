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
import axios from "axios";

export default {
  data() {
    return {};
  },
  mounted() {
    const redirect = this.$route.query.redirect;
    // not login and redirect to this page
    if (redirect) {
      this.$Message.error("Not Login");
      setTimeout(() => {
        this.$store.commit("updateLoginModal", { action: true, type: 0 });
      }, 2000);
    }
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
