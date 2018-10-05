<template>
  <Layout>
    <NavHeader/>
    <!--steps-->
    <div class="stepsBox">
      <Steps :current="1" class="steps">
        <Step title="Confirm Address"></Step>
        <Step title="View Your Order"></Step>
        <Step title="Make Payment"></Step>
        <Step title="Order Confirmation"></Step>
      </Steps>
    </div>
    <div class="layoutBox">
      <Row :gutter="32">

        <Col :lg="18" :xs="24">
        <Card :dis-hover="true" :bordered="false">

          <!--order content-->
          <Divider orientation="left">ORDER CONTENT</Divider>
          <Table ref="selection" :stripe	="true" :columns="cartTitle" :data="cartConfirm"></Table>

          <!--shipping address-->
          <Divider orientation="left">SHIPPING ADDRESS</Divider>
          <Row>
            <Col :lg="6" :md="8" :sm="12" :xs="24">
            <Card class="cardBox selected" :dis-hover="true">
              <p class="username">{{ address.userName }}</p>
              <p class="address">{{ address.streetName }}</p>
              <p class="zipcode">{{ address.postCode }}</p>
              <p class="tel">{{ address.tel }}</p>
            </Card>
            </Col>
          </Row>

          <!--shipping method-->
          <Divider orientation="left">SHIPPING METHOD</Divider>
          <Row>
            <Col :lg="6" :md="8" :sm="12" :xs="24">
            <Card class="cardBox selected" :dis-hover="true">
              <p class="shipMethod">Standard Shipping</p>
              <p class="shipFee">FREE!</p>
            </Card>
            </Col>
          </Row>

        </Card>
        </Col>
        <!--total-->
        <Col :lg="6" :xs="24">
        <Divider orientation="center">TOTAL</Divider>
        <Card class="cardBox selected" :dis-hover="true" :padding="0">
          <CellGroup>
            <Cell title="Item Subtotal:" :extra="subTotal|currency"/>
            <Cell title="Shipping:" :extra="shipping|currency"/>
            <Cell title="Tax(13%):" :extra="tax|currency"/>
            <Cell title="OrderTotal:" :extra="orderTotal|currency"/>
          </CellGroup>
        </Card>

        <Button type="primary" style="float: right; margin-top: 10px;" @click="payment" :disabled="disableButton">
          PROCEED TO PAYMENT
          <Icon type="ios-arrow-forward"></Icon>
        </Button>
        </Col>
      </Row>

    </div>
    <NavFooter/>
  </Layout>
</template>

<script>
  import NavHeader from './../components/NavHeader.vue';
  import NavFooter from './../components/NavFooter.vue';
  import Drawer from './../components/Drawer.vue';
  import {currency} from './../utils/currency';
  import axios from 'axios'

  export default {
    data() {
      return {
        cartList: [],
        cartTitle: [
          {
            title: 'IMAGES',
            key: 'productImage',
            render: (h, params) => {
              // console.log(params);
              return h('img', {
                attrs: {
                  src: '/static/images/' + params.row.productImage,
                  height: '30px'
                }
              });
            }
          },
          {
            title: 'ITEMS',
            key: 'productName'
          },
          {
            title: 'PRICE',
            key: 'salePrice',
            render: (h, params) => {
              return h('span', {}, '$' + params.row.salePrice);
            }
          },
          {
            title: 'QUANTITY',
            key: 'productNum',
//          <InputNumber v-model="value3" size="small"></InputNumber>
            render: (h, params) => {
              return h('span', params.row.productNum);
            }
          },
          {
            title: 'SUBTOTAL',
            key: 'subtotal',
            render: (h, params) => {
              return h('span', {}, '$' + params.row.salePrice * params.row.productNum);
            }
          }
        ],
        address: {},
        subTotal: 0,
        shipping: 0,
        tax: 0,
        disableButton: false
      }
    },
    filters: {
      currency: currency
    },
    components: {
      NavHeader,
      NavFooter
    },
    computed: {
      cartConfirm() {
        let data = [];
        this.cartList.forEach((item) => {
          if (item.checked === '1') {
            data.push(item);
          }
        });
        return data;
      },
      orderTotal() {
        return this.subTotal + this.tax + this.shipping;
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        axios.get('/users/cartList').then((res) => {
          let data = res.data;
//          console.log(data);
          this.cartList = data.result;

          this.cartList.forEach((item) => {
            if (item.checked === '1') {
              this.subTotal += (parseInt(item.productNum) * parseInt(item.salePrice));
            }
          });
          this.tax = parseFloat(this.subTotal * 0.13);
        });

        axios.post('/users/getAddress', {
          addressId: this.$route.query.addressId
        }).then((res) => {
          let data = res.data;
          if (data.status === '0') {
            this.address = data.result;
          }
        });
      },
      payment() {
        axios.post('/users/payment', {
          addressId: this.address.addressId,
          orderTotal: this.orderTotal
        }).then((res) => {
          let data = res.data;
          if (data.status === '0') {
            this.disableButton = true;
            console.log('order created suc.');
            this.$router.push({
              path: '/OrderSuccess',
              query: {
                'orderId': data.result.orderId
              }
            });
          }
        });
      }
    }
  }
</script>

<style>
  .layoutBox {
    width: 95%;
    margin: 20px auto;
  }

  .stepsBox {
    background-color: #fff;
  }

  .steps {
    padding: 17px;
    width: 95%;
    margin: auto;
  }

  .username {
    font-size: 16px;
    font-weight: 600;
    padding-bottom: 5px;
  }

  .address, .zipcode {
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

  .selected {
    border: 1px dashed #5cadff !important;
  }

  .ivu-cell-extra {
    font-size: 14px;
  }

  .ive-cell {
    cursor: default !important;
  }
</style>


