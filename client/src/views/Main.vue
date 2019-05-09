<template>
  <div class="main">
    <EntryBoard/>
    <NavHeader class="header"/>

    <transition mode="out-in" :name="transitionName">
      <router-view/>
    </transition>

    <NavFooter/>
  </div>
</template>

<script>
import EntryBoard from "./../components/EntryBoard.vue";
import NavHeader from "./../components/NavHeader.vue";
import NavFooter from "./../components/NavFooter.vue";
import axios from "axios";
import WOW from "wow.js";

export default {
  data() {
    return {
      transitionName: ""
    };
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
    new WOW().init();
  },
  components: {
    EntryBoard,
    NavHeader,
    NavFooter
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        this.transitionName = "fold-left";
      } else {
        this.transitionName = "fold-right";
      }
    }
  }
};
</script>

<style scoped>
.header {
  position: relative;
  z-index: 100;
  width: 100%;
}
.fold-left-enter-active {
  animation-name: fold-left-in;
  animation-duration: 0.3s;
}
.fold-left-leave-active {
  animation-name: fold-left-out;
  animation-duration: 0.3s;
}
.fold-right-enter-active {
  animation-name: fold-right-in;
  animation-duration: 0.3s;
}
.fold-right-leave-active {
  animation-name: fold-right-out;
  animation-duration: 0.3s;
}
@keyframes fold-left-in {
  0% {
    transform: translate3d(100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-left-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(-100%, 0, 0);
  }
}
@keyframes fold-right-in {
  0% {
    transform: translate3d(-100%, 0, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fold-right-out {
  0% {
    transform: translate3d(0, 0, 0);
  }
  100% {
    transform: translate3d(100%, 0, 0);
  }
}
</style>
