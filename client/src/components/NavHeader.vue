<template>
  <header class="headerBox">
    <div class="headerNav">
      <div class="headerLeft">
        <router-link to="/">
          <h1 class="headerLogo">VUE MALL</h1>
        </router-link>
      </div>
      <div class="headerRight">
        <ul>
          <li>
            <router-link to="/">HOME</router-link>
          </li>
          <li>
            <router-link to="/all">STORE</router-link>
          </li>
          <li>
            <router-link to="/about">ABOUT</router-link>
          </li>
          <li>
            <router-link to="/blog">BLOG</router-link>
          </li>

        </ul>
      </div>
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
      cartList: []
    };
  },
  computed: {
    cartNum() {
      return this.cartList.length;
    }
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
  color: #616161;
  vertical-align: middle;
  font-size: 14px;
  font-weight: 600;
}
ul li a:hover {
  color: #808695;
  border-bottom: 2px solid #515a6e;
}
.links {
  float: right;
}
</style>


