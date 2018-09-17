<template>
  <header class="headerBox">
    <div class="headerNav">
      <h1 class="headerLogo">VUE MALL</h1>
      <div class="headerRight">
        <!--not login-->
        <template v-if="nickName === ''">
          <Button shape="circle" icon="ios-log-in" @click="loginModel" key="login"></Button>
        </template>
        <!--logined-->
        <template v-else>
          <Button type="text" v-text="nickName" key="nickName"></Button>
          <Button shape="circle" icon="ios-log-out" @click="logout" key="logout"></Button>
        </template>
        <Divider type="vertical" orientation="center"/>
        <!--shopping cart-->
        <Button type="dashed" shape="circle" icon="ios-cart"></Button>
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
          <Input type="password" v-model="login.password" placeholder="Password">
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
        login: {
          username: '',
          password: ''
        },
        nickName: '',
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
      onSubmit() {
        axios.post('/users/login', this.login).then(res => {
          let data = res.data;
          if (data.status === '0') {
            this.$Message.success('Login Success!');
            // to-do
            this.nickName = data.result.username;
            this.modalState = false;
          }
          else if (data.status === '2') {
            this.$Message.error('Wrong Username or Password!');
          }
        });

      },
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
                  this.nickName = '';
                  this.$Message.success('logout success');
                }
                else {
                  console.log('error');
                  this.$Message.error('logout fail');
                }
              });

          }
        });

      }
    }
  }
</script>

<style scoped>
  .headerBox {
    background-color: #fff;
    height: 60px;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .08);
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
  }

  .headerRight button {
    margin: 14px 0;
  }
</style>


