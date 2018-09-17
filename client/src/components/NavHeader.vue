<template>
  <header>
    <b-navbar toggleable="md">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">VUE MALL</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>

          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right user info -->
        <b-navbar-nav class="ml-auto">

          <template v-if="nickName === ''">
            <b-nav-item href="#" @click="loginModel">Login</b-nav-item>
          </template>
          <template v-else>
            <b-nav-item href="#">{{nickName}}</b-nav-item>
          </template>

          <!--login modal-->
          <b-modal ref="loginRef" title="LOGIN" centered ok-title="SUBMIT" @ok="handleOk">
            <div class="d-block">
              <b-alert :variant="loginInfo.color" dismissible :show="loginInfo.show">{{ loginInfo.msg }}</b-alert>
              <b-form @submit.stop.prevent="onSubmit">
                <b-form-group label="Username:" label-for="username">
                  <b-form-input v-model="login.username" id="username" type="text" required
                                placeholder="Enter your username"></b-form-input>
                </b-form-group>
                <b-form-group label="Password:" label-for="password">
                  <b-form-input v-model="login.password" id="password" type="password" required
                                placeholder="Enter password"></b-form-input>
                </b-form-group>
              </b-form>
            </div>
          </b-modal>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">User</template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
  </header>
</template>

<script>
  //  import HeaderComponent from './components/header.vue'
  import axios from 'axios';

  export default {
    data() {
      return {
        login: {
          username: '',
          password: ''
        },
        loginInfo: {
          show: false,
          msg: '',
          color: ''
        },
        nickName: '',
      }
    },
    methods: {
      loginModel() {
        this.$refs.loginRef.show();
      },
      handleOk(evt) {
//        prevent default close
        evt.preventDefault();
        console.log('123');
        if (!this.login.username || !this.login.password) {
          this.loginInfo.show = true;
          this.loginInfo.color = 'danger';
          this.loginInfo.msg = "Please input your username and password";
        }
        else {
          this.loginInfo.show = false;
          this.onSubmit()
        }
      },
      onSubmit() {
        axios.post('/users/login', {
          username: this.login.username,
          password: this.login.password
        }).then(res => {
          let data = res.data;
          if (data.status === '0') {
            this.loginInfo.show = true;
            this.loginInfo.color = 'success';
            this.loginInfo.msg = 'Login Success';
            // to-do
            this.nickName = data.result.username;

            setTimeout(() => {
              this.$refs.loginRef.hide();
            }, 1000);
          }
          else if (data.status === '2') {
            this.loginInfo.show = true;
            this.loginInfo.color = 'warning';
            this.loginInfo.msg = "wrong username or password!";
          }
        });
//
//        alert("submit success");
      }
    }
  }
</script>

<style>

</style>


