<template>
  <div class="entryBoard">
    <div class="entry">
      <div class="entryLeft">
        <a @click="toGithubAddress">
          <Icon class="entryLeftIcon" type="logo-github" size="15"/>FIND ME ON GITHUB
        </a>
      </div>
      <div class="entryRight">
        <!-- not login -->
        <template v-if="email === ''">
          <a @click="setModal({type: 1, open: true})">SIGN UP</a>
          <Divider type="vertical"/>
          <a @click="setModal({type: 0, open: true})">
            <Icon type="ios-log-in" size="15"/>SIGN IN
          </a>
        </template>
        <!-- already login -->
        <template v-else>
          <span type="text" v-text="email" key="email"></span>
          <Divider type="vertical" orientation="center"/>
          <a @click="logOut">
            <Icon type="ios-log-out" size="15"/>LOG OUT
          </a>
        </template>
      </div>
    </div>
    <LoginModal @loginValid="handleLoginForm" @signUpValid="handleSignUpForm"/>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import LoginModal from "./../components/LoginModal.vue";

export default {
  components: {
    LoginModal
  },
  computed: {
    id() {
      return this.$store.state.user.userInfo.id;
    },
    email() {
      return this.$store.state.user.userInfo.email;
    }
  },
  async mounted() {
    let result = await this.checkState();
    console.log(this.id);
    if (result) {
      this.getAddresses(this.id);
      this.getCartList(this.id);
    }
  },
  methods: {
    ...mapActions([
      "checkState",
      "handleLogin",
      "getUserInfo",
      "getCartList",
      "getAddresses",
      "handleSignUp",
      "handleLogOut"
    ]),
    ...mapMutations(["setModal"]),

    toGithubAddress() {
      window.open(`https://github.com/leiger/vue_mall2`, "_blank");
    },

    async handleLoginForm({ email, password }) {
      const result = await this.handleLogin({ email, password });
      if (result) {
        this.$Message.success("login success");
        await this.getCartList(this.id);
      }
    },
    async handleSignUpForm({ email, password, rePassword }) {
      const result = await this.handleSignUp({ email, password, rePassword });
      if (result) this.$Message.success("sign up success");
    },
    async handleLogOutConfirm() {
      const result = await this.handleLogOut();
      this.$Notice.destroy();
      if (result) this.$Message.success("logout success");
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
                  click: this.handleLogOutConfirm
                }
              },
              "OK"
            )
          ]);
        }
      });
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
