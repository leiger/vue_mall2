<template>
  <!--login model-->
  <Modal
    class-name="loginModal"
    :value="modalState"
    width="750"
    @on-cancel="closeModal"
    :footer-hide="true"
  >
    <div class="loginContent">
      <div class="loginHead">
        <transition appear name="scaleUp">
          <h2>VUE MALL</h2>
        </transition>
        <Divider>Sign in to your Account</Divider>
      </div>
      <div class="loginBox">
        <div class="modalLeft">
          <Form ref="login" :model="login" :rules="loginRule">
            <!--username-->
            <FormItem prop="username">
              <Input type="text" size="large" v-model="login.username" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <!--password-->
            <FormItem prop="password">
              <Input
                type="password"
                v-model="login.password"
                placeholder="Password"
                @on-enter="handleSubmit('login')"
                size="large"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <!-- button -->
            <button class="submitBtn" @click="handleSubmit('login')">Sign in</button>
            <Divider class="divider" size="small">More options</Divider>
            <!-- more options -->
            <div class="moreOptions">
              <Icon @click="unAvailableInfo()" type="logo-google" size="28"/>
              <Icon @click="unAvailableInfo()" type="logo-facebook" size="28"/>
              <Icon @click="unAvailableInfo()" type="logo-github" size="28"/>
            </div>
          </Form>
        </div>
        <div class="modalRight">
          <Divider>
            <Icon type="md-bulb" size="24" color="#ff9900"/>
          </Divider>
          <p>
            Username:
            <span>admin</span>
          </p>
          <p>
            Password:
            <span>123456</span>
          </p>
        </div>
      </div>
    </div>
  </Modal>
</template>

<script>
import axios from "axios";
import getCartList from "./../services/getCartList.js";

export default {
  data() {
    return {
      login: {
        username: "",
        password: ""
      },
      loginRule: {
        username: [
          {
            required: true,
            message: "Please fill in the user name",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please fill in the password.",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    modalState() {
      return this.$store.state.loginModalState;
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("closeLoginModal");
    },
    // check input data valid or not
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loginLoading = true;
          this.onSubmit();
          this.loginLoading = false;
        } else {
          this.$Message.error("Fail");
        }
      });
    },
    async onSubmit() {
      try {
        let { data } = await axios.post("/users/login", this.login);
        // login success
        if (data.status === "0") {
          this.$Message.success("Login Success!");
          this.$store.commit("updateUserInfo", data.result.userName);
          // get cart list
          getCartList();
          this.closeModal();
        } else if (data.status === "2") {
          this.$Message.error("Wrong Username or Password!");
        }
      } catch (err) {
        console.log(err);
      }
    },
    // click third part login ways
    unAvailableInfo() {
      this.$Notice.warning({
        title: "Sorry",
        desc: "Third Part Login is not supported Now!"
      });
    }
  }
};
</script>

<style>
/* vertical */
.loginModal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginModal .ivu-modal {
  top: 0;
}

.loginContent {
  padding: 30px;
}

.loginHead h2 {
  text-align: center;
  margin-bottom: 30px;
}
.loginBox {
  display: flex;
}
/* modalLeft */
.modalLeft {
  flex: 2;
  padding: 20px 38px 0 20px;
}
.modalLeft .submitBtn {
  width: 100%;
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  border-radius: 3px;
  border: 1px solid #757575;
  color: #fff;
  background-color: #212121;
  text-align: center;
  outline: none;
  cursor: pointer;
  transition: 0.5s;
}
.modalLeft .submitBtn:hover {
  background-color: #fff;
  color: #17233d;
}
.modalLeft .divider {
  padding: 16px;
  color: #b0b0b0;
}
.modalLeft .moreOptions {
  display: flex;
  justify-content: space-around;
}
.modalLeft .moreOptions i {
  color: #b0b0b0;
  transition: 0.5s;
  cursor: pointer;
}
.modalLeft .moreOptions i:hover {
  color: #515a6e;
}
/* modalRight */
.modalRight {
  flex: 1;
  padding: 0 20px 0 38px;
}
.modalRight p {
  color: #b0b0b0;
  font-size: 12px;
  margin-bottom: 10px;
}
.modalRight p span {
  color: #515a6e;
  font-size: 14px;
  float: right;
}
</style>

