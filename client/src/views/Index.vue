<template>
  <div class="main">
    <EntryBoard/>
    <LoginModal/>
    <NavHeader class="header"/>
    <CarouselShow class="carousel"/>
    <StarProducts class="starProducts"/>
    <NavFooter/>
  </div>
</template>

<script>
import EntryBoard from "./../components/EntryBoard.vue";
import LoginModal from "./../components/LoginModal.vue";
import NavHeader from "./../components/NavHeader.vue";
import CarouselShow from "./../components/CarouselShow.vue";
import StarProducts from "./../components/StarProducts.vue";
import NavFooter from "./../components/NavFooter.vue";
import Drawer from "../components/Drawer.vue";
import axios from "axios";

export default {
  data() {
    return {};
  },
  components: {
    EntryBoard,
    LoginModal,
    NavHeader,
    CarouselShow,
    StarProducts,
    NavFooter,
    Drawer
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
.starProducts {
  width: 70%;
  margin: 30px auto;
}
</style>
