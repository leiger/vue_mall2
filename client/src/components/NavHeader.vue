<template>
  <header class="headerBox">
    <div class="headerNav">
      <div class="headerLeft pulse wow">
        <router-link to="/">
          <img :src="logoImg" alt="vmall">
          <h1 class="headerLogo">Vmall</h1>
        </router-link>
      </div>

      <div class="headerRight">
        <ul>
          <li
            v-for="(item,index) in menu"
            class="fadeInDown wow"
            :data-wow-delay="(index+1)*0.05+'s'"
          >
            <router-link :to="item.link">{{item.name}}</router-link>
          </li>
          <li class="fadeInDown wow" key="5" :data-wow-delay="menu.length*0.05">
            <a @click="openDrawer">
              <Badge :count="cartNum" type="primary">
                <Icon class="cartIcon" size="22" type="md-cart"/>
              </Badge>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <Drawer/>
  </header>
</template>

<script>
import Drawer from "./../components/Drawer.vue";
import { mapMutations, mapActions } from "vuex";
import logoImg from "../assets/images/logo.svg";

export default {
  data() {
    return {
      logoImg,
      menu: [
        {
          name: "HOME",
          link: "/"
        },
        {
          name: "STORE",
          link: "/collections"
        },
        {
          name: "ABOUT",
          link: "/about"
        }
      ]
    };
  },
  components: {
    Drawer
  },
  computed: {
    cartNum() {
      return this.$store.state.cart.cartList.length;
    },
    id() {
      return this.$store.state.user.userInfo.id;
    }
  },
  methods: {
    ...mapMutations(["setModal", "setDrawerState"]),
    ...mapActions(["getCartList"]),
    openDrawer() {
      if (this.id === "") {
        this.$Message.info("Login First!");
        setTimeout(() => {
          this.setModal({ type: 0, open: true });
        }, 2000);
      } else {
        this.setDrawerState(true);
        this.getCartList(this.id);
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/variables";

.headerBox {
  height: 80px;

  .headerNav {
    width: 95%;
    height: 80px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
  }
}

/* left */
.headerLeft {
  a {
    margin-top: 24px;
    display: flex;
    align-items: center;

    img {
      display: inline-block;
      height: 32px;
      vertical-align: middle;
    }

    .headerLogo {
      display: inline-block;
      font-size: 20px;
      margin-left: 12px;
      color: @title-color;
    }
  }
}

/* menu */
ul {
  list-style: none;
  margin: auto;
  height: 80px;

  li {
    float: left;
    margin: 28px 25px;
    height: 24px;

    a {
      position: relative;
      color: @menu-color;
      vertical-align: middle;
      font-size: 14px;
      font-weight: 600;
      transition: all 0.5s;

      &::before {
        content: "";
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: @menu-color-hover;
        visibility: hidden;
        transform: scaleX(0);
        transition-duration: 0.2s;
        transition-delay: 0;
        clear: both;
      }

      &:hover {
        color: @menu-color-hover;

        &::before {
          visibility: visible;
          transform: scaleX(1);
        }
      }
    }
  }
  .badge {

    .cartIcon {
      vertical-align: text-bottom;
    }
  }
}
</style>


