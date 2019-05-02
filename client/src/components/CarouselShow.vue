<template>
  <div class="carousel">
    <Carousel autoplay :autoplay-speed="5000">
      <CarouselItem>
        <div class="imgBox">
          <a>
            <img :src="carouselItem[0]" alt="carouselImg1">
          </a>
          <div class="carouselIntro">
            <h4>LED Desk Lamp</h4>
            <div class="desc">
              <p>Flicker-free</p>
              <p>Intuitive brightness and color temperature adjustment</p>
              <p>Works with the Google Assistant</p>
            </div>
            <button>Learn More</button>
          </div>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="imgBox">
          <a>
            <img :src="carouselItem[1]" alt="carouselImg1">
          </a>
          <div class="carouselIntro">
            <h4>Laser Projector</h4>
            <div class="desc">
              <p>Ultra-short throw distance</p>
              <p>A massive screen for your home</p>
            </div>
            <button>Learn More</button>
          </div>
        </div>
      </CarouselItem>
      <CarouselItem>
        <div class="imgBox">
          <a>
            <img :src="carouselItem[2]" alt="carouselImg1">
          </a>
          <div class="carouselIntro">
            <h4>Electric Scooter</h4>
            <div class="desc">
              <p>Intuitive and easy-to-learn</p>
              <p>18.6 miles long-range battery life</p>
              <p>Double braking system</p>
              <p>Portable folding design</p>
            </div>
            <button>Learn More</button>
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

export default {
  data() {
    return {
      carouselItem: [bg1, bg2, bg4]
    };
  }
};
</script>

<style scoped>
.imgBox {
  position: relative;
}
.imgBox a {
  position: relative;
  display: block;
  width: 100%;
  text-align: center;
}

img {
  width: 100%;
  height: auto;
}
.carouselIntro {
  position: absolute;
  z-index: 10;
  top: 30%;
  left: 20%;
}
h4 {
  font-size: 54px;
}
.desc {
  margin-bottom: 40px;
}
.desc p {
  font-size: 16px;
}
button {
  background-color: transparent;
  width:200px;
  height: 38px;
  line-height: 38px;
  font-size: 14px;
  border: 1px solid #757575;
  text-align: center;
  outline: none;
  cursor: pointer;
}
button:hover {
  color: #fff;
  background-color: #757575;
}
</style>
