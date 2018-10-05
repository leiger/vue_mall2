<template>
  <Layout>
    <NavHeader/>

    <!--steps-->
    <div class="stepsBox">
      <Steps :current="0" class="steps">
        <Step title="Confirm Address"></Step>
        <Step title="View Your Order"></Step>
        <Step title="Make Payment"></Step>
        <Step title="Order Confirmation"></Step>
      </Steps>
    </div>

    <div class="layoutBox">
      <Divider orientation="left">SHIPPING ADDRESS</Divider>

      <div class="shippingAddress">
        <Row :gutter="32" type="flex" align="middle">
          <template v-for="(item,index) in addressListFilter">
            <Col :lg="6" :md="8" :sm="12" :xs="24">
            <div @click.stop.prevent="selectCard(index)">
              <Card v-bind:class="{'selected': selected===index}" class="cardBox" :dis-hover="true">
                <p class="username">{{ item.userName }}</p>
                <p class="address">{{ item.streetName }}</p>
                <p class="zipcode">{{ item.postCode }}</p>
                <p class="tel">{{ item.tel }}</p>
                <Divider class="divider" dashed/>
                <Row type="flex" justify="center" align="middle">
                  <Col span="12">
                  <a v-if="item.isDefault === false && selected === index" class="salePrice"
                     @click.stop.prevent="setDefault(item.addressId)" >Set Default</a>
                  <p v-if="item.isDefault" class="defAdd">Default Address</p>
                  </Col>
                  <Col span="12">
                  <Button icon="ios-trash-outline" shape="circle" type="dashed"
                          style="float: right" @click.stop.prevent="deleteAddress(item.addressId)"></Button>
                  </Col>
                </Row>
              </Card>
            </div>
            </Col>
            <!--add new-->
          </template>
        </Row>
        <!--more-->
        <template v-if="addressList.length > 3">
          <Button v-if="limit===3" icon="ios-arrow-down" shape="circle" type="dashed" class="more"
                  @click="loadMore"></Button>
          <Button v-else icon="ios-arrow-up" shape="circle" type="dashed" class="more" @click="loadMore"></Button>
        </template>
      </div>

      <Divider orientation="left">SHIPPING METHOD</Divider>

      <Row :gutter="32" type="flex" align="middle">
        <Col :lg="6" :md="8" :sm="12" :xs="24">
        <Card class="cardBox selected" :dis-hover="true">
          <p class="shipMethod">Standard Shipping</p>
          <p class="shipFee">FREE!</p>
        </Card>
        </Col>
      </Row>

      <Button type="primary" style="float: right" @click="nextStep()">
        NEXT
        <Icon type="ios-arrow-forward"></Icon>
      </Button>
    </div>


    <NavFooter/>
  </Layout>
</template>

<script>
  import NavHeader from './../components/NavHeader.vue';
  import NavFooter from './../components/NavFooter.vue';
  import Drawer from './../components/Drawer.vue';
  import axios from 'axios'

  export default {
    data() {
      return {
        limit: 3,
        addressList: [],
        selected: 0
      }
    },
    components: {
      NavHeader,
      NavFooter
    },
    computed: {
      addressListFilter() {
        return this.addressList.slice(0, this.limit);
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      init() {
        axios.get('/users/addressList').then((res) => {
          let data = res.data;
          this.addressList = data.result;
        });
      },
      loadMore() {
        if (this.limit === 3) {
          this.limit = this.addressList.length;
        }
        else {
          this.limit = 3;
        }
      },
      selectCard(index) {
        this.selected = index;
      },
      setDefault(id) {
        axios.post('/users/setDefault', {
          addressId: id
        }).then((res) => {
          let data = res.data;
          if (data.status === '0') {
//            console.log('suc');
            this.init();
            this.$Message.success('Set Success!');
          }
          else {
            this.$Message.error('Set Fail');
          }
        });
      },
      deleteAddress(id) {
        this.$Modal.warning({
          title: 'WARN',
          content: 'Are you sure to delete this address?',
          okText: 'OK',
          cancelText: 'CANCEL',
          onOk: () => {
            axios.post('/users/delAddress', {
              addressId: id
            }).then((res) => {
              let data = res.data;
              if (data.status === '0') {
                console.log('del suc');
                this.init();
                this.$Message.success('Delete Success!');
              }
            })
          }
        });
      },
      nextStep() {
        this.$router.push({
          path: '/orderConfirm',
          query: {
            'addressId': this.addressList[this.selected].addressId
          }
        });
      }
    }
  }
</script>

<style scoped>
  .layoutBox {
    width: 95%;
    margin: 10px auto 20px;
  }

  .cardBox {
    margin: 0 0 16px;
    cursor: pointer;
  }

  .stepsBox {
    background-color: #fff;
  }

  .steps {
    padding: 17px;
    width: 95%;
    margin: auto;
  }

  .divider {
    margin: 10px 0;
  }

  .more {
    display: block;
    margin: auto;
  }

  .selected {
    border: 1px dashed #5cadff;
  }

  .selected:hover {
    border-color: #5cadff !important;
  }
  .defAdd {
    color: #c5c8ce;
  }
  .username {
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 5px;
  }
  .address,.zipcode {
    padding-bottom: 5px;
  }
  .shipMethod {
    padding-bottom: 14px;
    text-align: center;
    font-size: 16px;
  }
  .shipFee {
    font-weight: 600;
    text-align: center;
    font-size: 16px;
  }
</style>


