<template>
  <div class="carousel">
    <Carousel autoplay :autoplay-speed="5000" @on-change="carouselChange">
      <CarouselItem v-for="(item,index) in carouselItems" :key="index">
        <div class="imgBox">
          <router-link :to="'/products/'+item.id">
            <transition appear name="scaleUp">
              <img v-if="currentCarouselIndex === index" :src="item.src" alt="carouselImg1">
            </transition>
          </router-link>
          <div class="carouselIntro">
            <transition appear enter-active-class="animated fadeInDown">
              <h4 v-if="currentCarouselIndex === index">{{item.title}}</h4>
            </transition>
            <transition appear enter-active-class="animated fadeInLeft">
              <div v-if="currentCarouselIndex === index" class="desc" v-html="item.desc"></div>
            </transition>
            <transition appear enter-active-class="animated fadeInUp">
              <!-- <router-link
                :to="'/products/'+item.id"
                class="learnMore"
                v-if="currentCarouselIndex === index"
              >LEARN MORE</router-link> -->
              <MainBtn size="small" @click="learnMore(item.id)">LEARN MORE</MainBtn>
            </transition>
          </div>
        </div>
      </CarouselItem>
    </Carousel>
  </div>
</template>

<script>
import bg1 from "./../../static/carousel/bg_1.jpg";
import bg2 from "./../../static/carousel/bg_2.jpg";
import bg4 from "./../../static/carousel/bg_4.jpg";
import MainBtn from './MainBtn.vue';

export default {
  components: {
    MainBtn
  },
  data() {
    return {
      carouselItems: [
        {
          src: bg1,
          title: "LED Desk Lamp",
          desc: `<p>Flicker-free</p>
                  <p>Intuitive brightness and color temperature adjustment</p>
                  <p>Works with the Google Assistant</p>`,
          id: "201905008"
        },
        {
          src: bg2,
          title: "Laser Projector",
          desc: `<p>Ultra-short throw distance</p>
                  <p>A massive screen for your home</p>`,
          id: "201905010"
        },
        {
          src: bg4,
          title: "Electric Scooter",
          desc: `<p>Intuitive and easy-to-learn</p>
                  <p>18.6 miles long-range battery life</p>
                  <p>Double braking system</p>`,
          id: "201905009"
        }
      ],
      currentCarouselIndex: 0
    };
  },
  methods: {
    carouselChange(oldIndex, newIndex) {
      this.currentCarouselIndex = newIndex;
    },
    learnMore(id) {
       this.$router.push("/products/" + id);
    }
  }
};
</script>

<style>
.carousel .imgBox {
  position: relative;
}
.carousel .imgBox a {
  position: relative;
  display: block;
  width: 100%;
  text-align: center;
}

.carousel img {
  width: 100%;
  height: auto;
  min-height: 550px;
}
.scaleUp-enter-active {
  animation: scaleUp 5s;
}
@keyframes scaleUp {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

.carousel .carouselIntro {
  position: absolute;
  z-index: 10;
  top: 35%;
  left: 18%;
}
.carousel h4 {
  font-size: 36px;
  color: #212121;
}
.carousel .desc {
  margin-bottom: 30px;
}
.carousel p {
  font-size: 16px;
}
</style>
