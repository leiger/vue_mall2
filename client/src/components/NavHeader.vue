<template>
  <header class="headerBox">
    <div class="headerNav">
      <router-link to="/"><h1 class="headerLogo">VUE MALL</h1></router-link>

      <div class="headerRight">
        <!--not login-->
        <template v-if="nickName === ''">
          <Button shape="circle" icon="ios-log-in" @click="loginModel" key="login"></Button>
        </template>
        <!--logined-->
        <template v-else>
          <Button type="text" v-text="nickName" key="nickName"></Button>
          <!--shopping cart-->
          <Badge :dot="cartNum !== 0">
            <Button type="dashed" shape="circle" icon="ios-cart" @click="openDrawer"></Button>
          </Badge>
          <Divider type="vertical" orientation="center"/>
          <Button shape="circle" icon="ios-log-out" @click="logout" key="logout"></Button>
        </template>
      </div>
    </div>

    <!--login model-->
    <Modal title="LOGIN FORM" v-model="modalState" width="450">
      <Form ref="login" :model="login" :rules="loginRule">
        <!--username-->
        <FormItem prop="username">
          <Input type="text" v-model="login.username" placeholder="Username">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <!--password-->
        <FormItem prop="password" style="margin-bottom: 0">
          <Input type="password" v-model="login.password" placeholder="Password" @on-enter="handleSubmit('login')">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="resetForm">reset</Button>
        <Button type="primary" :loading="loginLoading" @click="handleSubmit('login')">Sign In</Button>
      </div>
    </Modal>
  </header>

</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        cartList: [],
        login: {
          username: '',
          password: ''
        },
//        nickName: '',
        modalState: false,
        loginRule: {
          username: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'}
          ]
        },
        loginLoading: false
      }
    },
    computed: {
      nickName() {
        return this.$store.state.nickName;
      },
      cartNum() {
        return this.cartList.length;
      }
    },
    mounted() {
      this.checkLogin();
    },
    methods: {
      loginModel() {
        this.modalState = true;
      },
      resetForm() {
        this.login.username = '';
        this.login.password = '';
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid => {
          if (valid) {
            this.loginLoading = true;
            // Simulated real environment
            setTimeout(() => {
              this.onSubmit();
              this.loginLoading = false;
            }, 1000);
          }
          else {
            this.$Message.error('Fail');
          }
        }));
      },
      getCartList() {
        axios.get('/users/cartList').then((res) => {
          let data = res.data;
          if (data.status === '0') {
            this.cartList = data.result;
          }
        });
      },
//      submmit login info
      onSubmit() {
        axios.post('/users/login', this.login).then(res => {
          let data = res.data;
          if (data.status === '0') {
            this.$Message.success('Login Success!');
            // to-do
//            this.nickName = data.result.userName;
            this.$store.commit('updateUserInfo', data.result.userName);
            this.getCartList();
            this.modalState = false;
          }
          else if (data.status === '2') {
            this.$Message.error('Wrong Username or Password!');
          }
        });
      },
//      logout
      logout() {
        this.$Modal.confirm({
          title: 'confirm logout?',
          okText: 'ok',
          cancelText: 'cancel',
          width: '300',
          onOk: () => {
            axios.post('/users/logout')
              .then((res) => {
                let data = res.data;
                if (data.status === '0') {
//                  this.nickName = '';
                  this.$store.commit('updateUserInfo', '');
                  this.$Message.success('logout success');
                }
                else {
                  console.log('error');
                  this.$Message.error('logout fail');
                }
              });

          }
        });

      },
      checkLogin() {
        axios.get('/users/checkLogin').then((res) => {
          let data = res.data;
          if (data.status === '0') {
//            this.nickName = data.result;
            this.$store.commit('updateUserInfo', data.result);
            this.getCartList();
          }
        });
      },

      openDrawer() {
        if(this.$route.path === '/') {
          this.$store.commit("updateDrawerState", true);
        }
        else {
          this.$router.push({
            path: '/'
          });
        }
      }
    }
  }
</script>

<style scoped>
  .headerBox {
    background-color: #fff;
    height: 60px;
    border-bottom: 1px dashed #e8eaec;
  }

  h1 {
    font-size: 18px;
    display: inline-block;
  }

  .headerNav {
    width: 95%;
    height: 60px;
    margin: 0 auto;
  }

  .headerLogo {
    line-height: 60px;
    color: rgba(0, 0, 0, .9);
  }

  .headerRight {
    float: right;
    padding: 14px 0;
  }

</style>


