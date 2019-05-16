<template>
  <div class="exceptionBox">
    <div class="left">
      <img :src="img" alt="404">
    </div>
    <div class="right">
      <h1>404</h1>
      <p class="desc">Sorry, the page you visited does not exist</p>
      <MainBtn @click="backHome">Back Home</MainBtn>
    </div>
  </div>
</template>

<script>
import MainBtn from "./../components/MainBtn.vue";
import notFoundImg from "./../../static/exception/404.svg";

export default {
  data() {
    return {
      img: notFoundImg
    };
  },
  components: {
    MainBtn
  },
  methods: {
    backHome() {
      this.$router.push({
        path: "/"
      });
    }
  }
};
</script>

<style scoped>
.exceptionBox {
  margin: 100px 0;
  display: flex;
}
.left {
  flex: 1;
}
.left img {
  float: right;
}
.right {
  flex: 1;
  margin: 50px 0 0 50px;
}
.right h1 {
  color: #434e59;
  font-size: 72px;
  font-weight: 600;
  line-height: 72px;
  margin-bottom: 24px;
}
.right p {
  color: rgba(0, 0, 0, 0.45);
  font-size: 20px;
  line-height: 28px;
  margin-bottom: 16px;
}
</style>
