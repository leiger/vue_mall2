<template>
  <!--login model-->
  <Modal title="LOGIN FORM" v-model="modalState" width="450" @on-cancel="closeModal">
    <!--info-->
    <Alert>Username: admin; Password: 123456</Alert>
    <Form ref="login" :model="login" :rules="loginRule">
      <!--username-->
      <FormItem prop="username">
        <Input type="text" v-model="login.username" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <!--password-->
      <FormItem prop="password" style="margin-bottom: 0">
        <Input
          type="password"
          v-model="login.password"
          placeholder="Password"
          @on-enter="handleSubmit('login')"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
    </Form>
    <!--footer-->
    <div slot="footer">
      <Button type="text" @click="resetForm">reset</Button>
      <Button type="primary" :loading="loginLoading" @click="handleSubmit('login')">Sign In</Button>
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
      },
      loginLoading: false
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
    resetForm() {
      this.login.username = "";
      this.login.password = "";
    },
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
          getCartList();
          this.closeModal();
        } else if (data.status === "2") {
          this.$Message.error("Wrong Username or Password!");
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style>
</style>

