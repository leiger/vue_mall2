<template>
  <header class="headerBox">
    <div class="headerNav">
      <transition appear appear-class appear-active-class="animated fadeInDown">
        <div class="headerLeft">
          <router-link to="/">
            <h1 class="headerLogo">VUE MALL</h1>
          </router-link>
        </div>
      </transition>
      <div class="headerRight">
        <transition-group appear appear-class appear-active-class="animated fadeInDown" tag="ul">
          <li key="0">
            <router-link to="/">HOME</router-link>
          </li>
          <li key="1">
            <router-link to="/all">STORE</router-link>
          </li>
          <li key="2">
            <router-link to="/about">ABOUT</router-link>
          </li>
          <li key="3">
            <router-link to="/faq">FAQ</router-link>
          </li>
          <li key="4">
            <router-link to="/contact">CONTACT</router-link>
          </li>
          <li key="5">
            <a @click="openDrawer">
              CART
              <span v-if="nickName">({{cartNum}})</span>
            </a>
          </li>
        </transition-group>
      </div>
    </div>
    <LoginModal/>
    <Drawer/>
  </header>
</template>

<script>
import LoginModal from "./../components/LoginModal.vue";
import Drawer from "./../components/Drawer.vue";

export default {
  data() {
    return {
      showAnimated: false
    };
  },
  components: {
    LoginModal,
    Drawer
  },
  computed: {
    cartNum() {
      return this.$store.state.cartList.length;
    },
    nickName() {
      return this.$store.state.nickName;
    }
  },
  mounted() {
    this.showAnimated = true;
  },
  methods: {
    openDrawer() {
      if (this.nickName === "") {
        this.$Message.error("Login First!");
        setTimeout(() => {
          this.$store.commit("updateLoginModal", { action: true, type: 1 });
        }, 2000);
      } else {
        this.$store.commit("updateDrawerState", true);
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
  content: "";
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
ul li a:hover {
  color: #808695;
}
ul li a:hover::before {
  visibility: visible;
  transform: scaleX(1);
}
</style>


