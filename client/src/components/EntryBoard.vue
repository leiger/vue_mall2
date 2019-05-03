<template>
  <div class="entryBoard">
    <div class="entry">
      <div class="entryLeft">
        <a @click="toGithubAddress">
          <Icon class="entryLeftIcon" type="logo-github" size="15"/>FIND ME ON GITHUB
        </a>
      </div>
      <div class="entryRight">
        <template v-if="nickName === ''">
          <a @click="openLoginModel">
            <Icon type="ios-log-in" size="15"/>SIGN IN
          </a>
        </template>
        <template v-else>
          <span type="text" v-text="nickName" key="nickName"></span>
          <Divider type="vertical" orientation="center"/>
          <a @click="logOut">
            <Icon type="ios-log-out" size="15"/>LOG OUT
          </a>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import getCartList from "./../services/getCartList.js";

export default {
  mounted() {
    this.checkLogin();
  },
  computed: {
    nickName() {
      return this.$store.state.nickName;
    }
  },
  methods: {
    async checkLogin() {
      try {
        let { data } = await axios.get("/users/checkLogin");
        if (data.status === "0") {
          // this.nickName = data.result;
          this.$store.commit("updateUserInfo", data.result);
          getCartList(this);
        }
      } catch (err) {
        console.log(err);
      }
    },

    toGithubAddress() {
      window.open(`https://github.com/leiger/vue_mall2`, "_blank");
    },

    openLoginModel() {
      this.$store.commit("updateLoginModal", true);
    },

    logOut() {
      this.$Notice.warning({
        title: "Warning",
        duration: 0,
        name: "logout",
        render: h => {
          return h("span", [
            "Confirm Logout?",
            h(
              "a",
              {
                style: { display: "inline-block", paddingLeft: "10px" },
                on: {
                  click: this.confirmLogout
                }
              },
              "OK"
            )
          ]);
        }
      });
    },
    async confirmLogout() {
      try {
        let { data } = await axios.post("/users/logout");

        if (data.status === "0") {
          this.$store.commit("updateUserInfo", "");
        } else {
          this.$Message.error("logout fail");
        }

        this.$Notice.close("logout");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
.entryBoard {
  height: 40px;
  line-height: 40px;
  background-color: #212121;
}
.entry {
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}
span {
  color: #b0b0b0;
}
a {
  vertical-align: middle;
  color: #b0b0b0;
}
a:hover {
  color: #fff;
}
i {
  vertical-align: text-bottom;
  padding-right: 5px;
}
</style>
