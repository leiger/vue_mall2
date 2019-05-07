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
        <Divider v-if="modalType">Sign up a new Account</Divider>
        <Divider v-else>Sign in to your Account</Divider>
      </div>
      <div class="loginBox">
        <div class="modalLeft">
          <Form v-if="!this.modalType" ref="login" :model="login" :rules="loginRule">
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
          <Form v-else ref="signUp" :model="signUp" :rules="signUpRule">
            <!--username-->
            <FormItem prop="username">
              <Input type="text" size="large" v-model="signUp.username" placeholder="Username">
                <Icon type="ios-person-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <!--password-->
            <FormItem prop="password">
              <Input type="password" v-model="signUp.password" placeholder="Password" size="large">
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <!--password-->
            <FormItem prop="rePassword">
              <Input
                type="password"
                v-model="signUp.rePassword"
                placeholder="Confirm Password"
                @on-enter="handleSubmit('register')"
                size="large"
              >
                <Icon type="ios-lock-outline" slot="prepend"></Icon>
              </Input>
            </FormItem>
            <!-- button -->
            <button class="submitBtn" @click="handleSubmit('signUp')">Sign Up</button>
          </Form>
        </div>
        <div class="modalRight">
          <a v-if="!this.modalType" @click="changeLoginModalType">Create a account</a>
          <a v-else @click="changeLoginModalType">Sign in</a>
          <Divider/>
          <p class="test">create one OR using this:</p>
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
    const validatePassCheck = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please enter your password again"));
      } else if (value !== this.signUp.password) {
        callback(new Error("The two input passwords do not match!"));
      } else {
        callback();
      }
    };
    return {
      login: {
        username: "",
        password: ""
      },
      loginRule: {
        username: [
          {
            required: true,
            message: "Please enter your username",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "Please enter your password again.",
            trigger: "blur"
          }
        ]
      },
      signUp: {
        username: "",
        password: "",
        rePassword: ""
      },
      signUpRule: {
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
        ],
        rePassword: [
          {
            trigger: "blur",
            validator: validatePassCheck
          }
        ]
      }
    };
  },
  computed: {
    modalState() {
      return this.$store.state.loginModalState;
    },
    modalType() {
      return this.$store.state.loginModalType;
    }
  },
  inject: ['reload'],
  methods: {
    closeModal() {
      this.$store.commit("updateLoginModal", { action: false });
    },
    // check input data valid or not
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.loginLoading = true;
          this.onSubmit(name);
          this.loginLoading = false;
        } else {
          this.$Message.error("Fail");
        }
      });
    },

    async onSubmit(name) {
      try {
        if (name === "login") {
          let { data } = await axios.post("/user/login", this.login);
          // login success
          if (data.status === "0") {
            this.$Message.success("Login Success!");
            this.$store.commit("updateUserInfo", data.result.userName);
            // close modal
            this.closeModal();
            // get cart list
            getCartList(this);
            this.reload();
          } else if (data.status === "2") {
            this.$Message.error("Wrong Username or Password!");
          }
        }
        // sign up
        else {
          let { data } = await axios.post("/user/signup", this.signUp);
          if (data.status === "0") {
            this.$Message.success("Sign up Success!");
            setTimeout(() => {
              this.$store.commit("updateLoginModal", { action: true, type: 0 });
            }, 1000);
          } else if (data.status === "7") {
            this.$Message.info("Username is already exist!");
          } else {
            this.$Message.error("Fail!");
          }
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
    },
    changeLoginModalType() {
      this.$store.commit("updateLoginModal", {
        action: true,
        type: this.modalType === 1 ? 0 : 1
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
  padding: 20px 20px 0 38px;
}
.modalRight a {
  font-size: 14px;
}
.modalRight .test {
  color: #b0b0b0;
  font-size: 14px;
  margin-bottom: 10px;
}
.modalRight p {
  color: #515a6e;
  font-size: 14px;
}
.modalRight span {
  float: right;
}
</style>

