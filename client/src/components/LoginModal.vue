<template>
  <!--login model-->
  <Modal
    class-name="loginModal"
    :value="modalState"
    width="550"
    @on-cancel="setModal({type: modalType, open: false})"
    :footer-hide="true"
  >
    <div class="loginContent">
      <div class="loginHead">
        <h2>
          <img src="../assets/images/logo.svg" alt>
        </h2>
        <Divider v-if="modalType">Sign up a new Account</Divider>
        <Divider v-else>Sign in to your Account</Divider>
      </div>
      <div class="loginBox">
        <div class="modalBox">
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
            <a @click="setModal({type: 1, open: true})">Create a account</a>

            <Divider class="divider" size="small">More options</Divider>
            <!-- more options -->
            <div class="moreOptions">
              <Icon title="google" @click="unAvailableInfo()" type="logo-google" size="28"/>
              <Icon title="facebook" @click="unAvailableInfo()" type="logo-facebook" size="28"/>
              <Icon title="github" @click="unAvailableInfo()" type="logo-github" size="28"/>
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
            <a @click="setModal({type: 0, open: true})">Sign in</a>
          </Form>
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

<style lang="less">
@import "../assets/css/variables";

/* vertical */
.loginModal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}

.loginContent {
  padding: 20px 20px 30px;

  .loginHead h2 {
    text-align: center;
    margin-bottom: 10px;
    font-size: 0;
    img {
      width: 50px;
    }
  }
}

/* modalBox */
.modalBox {
  .divider {
    padding: 10px;
    color: @subsidiary-color;
  }
  a {
    float: right;
    color: @disabled-color;
    margin-top: 5px;
  }
  .moreOptions {
    display: flex;
    justify-content: space-around;

    i {
      color: @subsidiary-color;
      transition: 0.5s;
      cursor: pointer;

      &:hover {
        color: @secondary-color;
      }
    }
  }
}
</style>

