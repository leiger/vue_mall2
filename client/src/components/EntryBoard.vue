<template>
  <div class="entryBoard">
    <div class="entry">
      <div class="entryLeft">
        <a @click="toGithubAddress">
          <Icon class="entryLeftIcon" type="logo-github" size="14"/>
        </a>
      </div>
      <div class="entryRight">
        <!-- not login -->
        <template v-if="email === ''">
          <a @click="setModal({type: 1, open: true})">Sign up</a>
          <Divider type="vertical"/>
          <a @click="setModal({type: 0, open: true})">
            <Icon type="ios-log-in" size="12"/>Login
          </a>
        </template>
        <!-- already login -->
        <template v-else>
          <Dropdown placement="bottom-end" @on-click="handleDropDown">
            <a href="javascript:void(0)">
              <Icon type="md-person"/>
              {{email}}
              <Icon type="ios-arrow-down"/>
            </a>
            <DropdownMenu slot="list">
              <DropdownItem name="account">My Account</DropdownItem>
              <DropdownItem name="logOut" divided>
                <Icon type="ios-log-out" size="12"/>Log out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
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
    // console.log(result);
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
      if (result) {
        this.$Message.success("sign up success");
        this.setModal({ type: 0, open: true });
      }
    },
    async handleLogOutConfirm() {
      const result = await this.handleLogOut();
      this.$Notice.destroy();
      if (result) {
        this.$Message.success("logout success");
        this.$router.push("/");
      }
    },
    handleDropDown(name) {
      if (name === "account") {
        this.$router.push("/MyAccount");
      } else {
        this.$Modal.confirm({
          title: "Warning",
          content: "Are you sure to log out?",
          okText: "OK",
          cancelText: "Cancel",
          onOk: this.handleLogOutConfirm
        });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/variables";

.entryBoard {
  height: 40px;
  line-height: 40px;
  background-color: @header-bg-color;

  .entry {
    width: 95%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .entryLeft a {
      font-size: 0;
    }
  }
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
  vertical-align: middle;
  padding-right: 5px;
}
</style>
