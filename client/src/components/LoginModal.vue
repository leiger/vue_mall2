<template>
  <!--login model-->
  <Modal
    class-name="loginModal"
    :value="modalState"
    width="750"
    @on-cancel="setModal({type: 0, open: false})"
    :footer-hide="true"
  >
    <div class="loginContent">
      <div class="loginHead">
        <h2>VUE MALL</h2>
        <Divider v-if="modalType">Sign up a new Account</Divider>
        <Divider v-else>Sign in to your Account</Divider>
      </div>
      <div class="loginBox">
        <div class="modalLeft">
          <Form v-if="!modalType" ref="login" :model="login" :rules="loginRule" key="login">
            <!--email-->
            <FormItem prop="email">
              <Input type="text" size="large" v-model="login.email" placeholder="Email">
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
            <MainBtn long size="small" @click.prevent="handleSubmit('login')">Sign in</MainBtn>
            <Divider class="divider" size="small">More options</Divider>
            <!-- more options -->
            <div class="moreOptions">
              <Icon @click="unAvailableInfo()" type="logo-google" size="28"/>
              <Icon @click="unAvailableInfo()" type="logo-facebook" size="28"/>
              <Icon @click="unAvailableInfo()" type="logo-github" size="28"/>
            </div>
          </Form>
          <Form v-else ref="signUp" :model="signUp" :rules="signUpRule" key="signUp">
            <!--email-->
            <FormItem prop="email">
              <Input type="text" size="large" v-model="signUp.email" placeholder="Email">
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
            <MainBtn long size="small" @click.prevent="handleSubmit('signUp')">Sign Up</MainBtn>
          </Form>
        </div>
        <div class="modalRight">
          <a v-if="!modalType" @click="setModal({type: 1, open: true})">Create a account</a>
          <a v-else @click="setModal({type: 0, open: true})">Sign in</a>
          <Divider/>
          <p class="test">create one OR using this:</p>
          <p>
            Email:
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
import MainBtn from "./MainBtn.vue";
import { mapActions, mapMutations } from "vuex";

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
        email: "",
        password: ""
      },
      loginRule: {
        email: [
          {
            required: true,
            message: "Please enter your email",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
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
        email: "",
        password: "",
        rePassword: ""
      },
      signUpRule: {
        email: [
          {
            required: true,
            message: "Please fill in the email",
            trigger: "blur"
          },
          { type: "email", message: "Incorrect email format", trigger: "blur" }
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
  components: {
    MainBtn
  },
  computed: {
    modalState() {
      return this.$store.state.user.modal.open;
    },
    modalType() {
      return this.$store.state.user.modal.type;
    }
  },
  // inject: ["reload"],
  methods: {
    ...mapMutations(["setModal"]),

    // check input data valid or not
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (name === "login") this.$emit("loginValid", this.login);
          else this.$emit("signUpValid", this.signUp);
        } else {
          this.$Message.error("Fail");
        }
      });
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

