<template>
  <header class="headerBox">
    <div class="headerNav">
      <transition
        appear
        appear-class
        appear-active-class="animated fadeInDown"
      >
        <div class="headerLeft">
          <router-link to="/">
            <h1 class="headerLogo">VUE MALL</h1>
          </router-link>
        </div>
      </transition>
        <div class="headerRight">
          <transition-group appear appear-class
        appear-active-class="animated fadeInDown" tag="ul">
            <li key="0" data-index="0">
              <router-link to="/">HOME</router-link>
            </li>
            <li key="1" data-index="1">
              <router-link to="/all">STORE</router-link>
            </li>
            <li key="2" data-index="2">
              <router-link to="/about">ABOUT</router-link>
            </li>
            <li key="3" data-index="3">
              <router-link to="/blog">BLOG</router-link>
            </li>
          </transition-group>
        </div>
      </transition>
      <!--
      <div class="headerRight">
        <div class="links">

          <template v-else>

            <Badge :dot="cartNum !== 0">
              <Button type="dashed" shape="circle" icon="ios-cart" @click="openDrawer"></Button>
            </Badge>

            <Button shape="circle" icon="ios-log-out" @click="logout" key="logout"></Button>
          </template>
        </div>
      </div>
      -->
    </div>
  </header>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      showAnimated: false,
      cartList: []
    };
  },
  computed: {
    cartNum() {
      return this.cartList.length;
    }
  },
  mounted() {
    this.showAnimated = true;
  },
  methods: {
    openDrawer() {
      if (this.$route.path === "/") {
        this.$store.commit("updateDrawerState", true);
      } else {
        this.$router.push({
          path: "/"
        });
      }
    }
  }
};
</script>

<style scoped>
.headerNav {
  width: 95%;
  height: 80px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

/* left */
.headerBox {
  height: 80px;
}
.headerLogo {
  font-size: 18px;
  line-height: 80px;
  color: rgba(0, 0, 0, 0.9);
}

ul {
  list-style: none;
  margin: auto;
  height: 80px;
}
ul li {
  float: left;
  margin: 28px 25px;
  height: 24px;
}
ul li a {
  position: relative;
  color: #616161;
  vertical-align: middle;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.5s;
}
ul li a:before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #515a6e;
  visibility: hidden;
  transform: scaleX(0);
  transition-duration: 0.2s;
  transition-delay: 0;
  clear: both;
}
ul li a:hover{
  color: #808695;
}
ul li a:hover::before {
  visibility: visible;
  transform: scaleX(1);
}
</style>


