<template>
  <div class="imageGrid">
    <Title postTitle="POPULAR COLLECTIONS"/>
    <div class="container">
      <div class="imgBox imgBox1 wow fadeIn" data-wow-delay="0.1s">
        <router-link to="/all" class="firstLeft"/>
        <h3 class="title">{{gridItems[0].title}}</h3>
      </div>
      <div class="firstRight wow fadeIn" data-wow-delay="0.3s">
        <Title postTitle="10% OFF DISCOUNT"/>
        <p>Use code EXTRA10 to save even more on our summer sale. Plus Free shipping all day!</p>
        <MainBtn class="btn" @click="shopNow">SHOP NOW</MainBtn>
      </div>
    </div>
    <div class="container">
      <div class="imgBox imgBox2 wow fadeIn" data-wow-delay="0.5s">
        <router-link to="/all" class="secondLeft"/>
        <h3 class="title">{{gridItems[1].title}}</h3>
      </div>
      <div class="imgBox imgBox3 wow fadeIn" data-wow-delay="0.7s">
        <router-link to="/all" class="secondRight"/>
        <h3 class="title">{{gridItems[2].title}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Title from "./../components/Title.vue";
import MainBtn from "./../components/MainBtn.vue";
import bg1 from "./../../static/imageGrid/1.jpg";
import bg2 from "./../../static/imageGrid/2.jpg";
import bg3 from "./../../static/imageGrid/3.jpg";

export default {
  data() {
    return {
      gridItems: [
        {
          src: bg1,
          title: "Smart Devices"
        },
        {
          src: bg2,
          title: "Outdoor"
        },
        {
          src: bg3,
          title: "Mobile Phone Accessories"
        }
      ]
    };
  },
  components: {
    Title,
    MainBtn
  },
  methods: {
    shopNow() {
      this.$router.push("/categories");
    }
  }
};
</script>

<style scoped>
.imageGrid {
  margin: 50px 0;
}
.container {
  display: flex;
  height: 480px;
  margin-bottom: 30px;
}
.imgBox {
  overflow: hidden;
  position: relative;
}
.imgBox a {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 36px;
  background-size: cover;
  background-position: center center;
  cursor: pointer;
  display: block;
  transition: all 2s ease-in-out;
}
.imgBox a::before {
  content: "";
  background: #111;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 1s ease-in-out;
  opacity: 0.3;
}
.imgBox a:hover {
  transform: scale(1.1);
}
.imgBox a:hover::before {
  opacity: 0.5;
}
.imgBox1 {
  flex: 2;
  margin-right: 30px;
}
.imgBox2 {
  flex: 1;
  margin-right: 30px;
}
.imgBox3 {
  flex: 1;
}
.firstLeft {
  background-image: url(./../../static/imageGrid/1.jpg);
}
.firstRight {
  flex: 1;
}
.secondLeft {
  background-image: url(./../../static/imageGrid/2.jpg);
}
.secondRight {
  background-image: url(./../../static/imageGrid/3.jpg);
}
h3.title {
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 30px;
  font-weight: normal;
  font-size: 28px;
  color: #fff;
  letter-spacing: 1px;
}
h3.title::after {
  content: "";
  width: 36px;
  height: 4px;
  position: absolute;
  left: 0;
  bottom: -9px;
  background: #212121;
}
.firstRight {
  background-color: rgba(0, 0, 0, 0.3);
  padding: 100px 20px;
}
.firstRight p {
  display: block;
  padding: 0 50px;
  font-size: 16px;
}
.btn {
  display: block;
  margin: 50px auto 0;
}
</style>
