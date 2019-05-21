<template>
  <div class="layoutBox">
    <div class="rowBox">
      <div class="totalMoney">
        <h3 class="title">Credit Card</h3>
        <div class="creditCardBox">
          <Form>
            <FormItem>
              <Input v-model="form.cardNumber" placeholder="Card Number"/>
            </FormItem>
            <FormItem>
              <Input v-model="form.name" placeholder="Name on Card"/>
            </FormItem>
            <div class="inlineInput">
              <FormItem>
                <Input v-model="form.expireDate" placeholder="Expiration date(MM/YY)"/>
              </FormItem>
              <FormItem class="securityCode">
                <Tooltip placement="right-start">
                  <Input
                    v-model="form.securityCode"
                    placeholder="Security Code"
                    icon="ios-help-circle-outline"
                  />
                  <div slot="content">
                    <span>3-digit security code</span>
                    <br>
                    <span>on the back of your card</span>
                  </div>
                </Tooltip>
              </FormItem>
            </div>
          </Form>
        </div>
      </div>
      <div class="orderInfo">
        <h3 class="title">Order Info</h3>
        <div class="orderInfoBox">
          <ul>
            <li>
              <span class="name">Order Id:</span>
              <span>{{orderInfo._id}}</span>
            </li>
            <li>
              <span class="name">Order Time:</span>
              <span v-if="orderInfo.date">{{orderInfo.date.start}}</span>
            </li>
            <li>
              <span class="name">Total:</span>
              <span>{{orderInfo.total | currency}}</span>
            </li>
            <li>
              <span class="name">Status:</span>
              <span>
                <Tag v-if="orderInfo.status === 0" color="warning">Not Pay</Tag>
                <Tag v-else-if="orderInfo.status === 1" color="success">Payed</Tag>
              </span>
            </li>
            <li>
              <span class="name">Receiver:</span>
              <span>{{orderInfo.address.firstname}} {{orderInfo.address.lastname}}</span>
            </li>
            <li v-if="orderInfo.address">
              <span class="name">Order address:</span>
              <span>{{orderInfo.address.address}} - {{orderInfo.address.city}} - {{orderInfo.address.province}}</span>
              <span>{{orderInfo.address.postalCode}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <Divider/>
    <div class="rowBox">
      <div class="billingAddress">
        <h3 class="title">Billing Address</h3>
        <div class="billingAddressBox">
          <RadioGroup class="radioGroup" v-model="billingAddress.radio" vertical>
            <Radio size="large" label="0">
              <span>Same as shipping address</span>
            </Radio>
            <Radio size="large" label="1">
              <span>Use a different billing address</span>
            </Radio>
          </RadioGroup>
          <div v-if="billingAddress.radio === '1'">
            <Form ref="form" :label-width="100">
              <div class="row">
                <FormItem label="First Name" prop="firstName">
                  <Input placeholder="First name (optional)"/>
                </FormItem>
                <FormItem label="Last Name" prop="lastName">
                  <Input placeholder="Last name"/>
                </FormItem>
              </div>
              <div class="row">
                <FormItem label="Address" prop="address">
                  <Input placeholder="Address"/>
                </FormItem>
                <FormItem label="Post Code" prop="postalCode">
                  <Input placeholder="Post Code"/>
                </FormItem>
              </div>

              <div class="row">
                <FormItem label="Province" prop="province">
                  <Select>
                    <Option :value="1">not use</Option>
                  </Select>
                </FormItem>
                <FormItem label="City" prop="city">
                  <Select>
                    <Option :value="2">not use</Option>
                  </Select>
                </FormItem>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <div class="notice">
        <div class="noticeBox">
          <Title postTitle="Notice"/>
          <p>Just Click Pay Now to Finish the order.</p>
          <p>Left Forms are not necessary.</p>
        </div>
      </div>
    </div>

    <Divider/>
    <div class="payNowBtn">
      <MainBtn @click="handlePayment">Pay Now</MainBtn>
    </div>
  </div>
</template>

<script>
import MainBtn from "./../components/MainBtn.vue";
import Title from "./../components/Title.vue";
import { currency } from "./../utils/currency.js";
import { mapActions, mapMutations } from "vuex";

export default {
  data() {
    return {
      form: {
        cardNumber: "",
        name: "",
        expireDate: "",
        securityCode: ""
      },
      orderTotal: 1000,
      billingAddress: {
        radio: "0"
      }
    };
  },
  computed: {
    orderInfo() {
      return this.$store.state.orders.order;
    }
  },
  components: {
    MainBtn,
    Title
  },
  filters: {
    currency
  },
  mounted() {
    this.getOrderById(this.$route.params.id);
  },
  methods: {
    ...mapActions(["getOrderById", "modifyOrderState"]),
    async handlePayment() {
      const result = await this.modifyOrderState({
        orderId: this.$route.params.id,
        status: 1
      });
      if (result) {
        this.$Message.success("Pay Success!");
        setTimeout(() => {
          this.$router.push({
            path: `/orderSuccess/${this.$route.params.id}`
          });
        }, 2000);
      }
    }
  }
};
</script>

<style scoped>
.layoutBox {
  margin: 0 40px 40px;
  padding: 30px 40px;
  background-color: #f5f5f5;
}
.title {
  color: #333;
  font-size: 18px;
  line-height: 20px;
  font-weight: normal;
  margin-bottom: 20px;
}
.rowBox {
  display: flex;
}
.totalMoney,
.orderInfo,
.billingAddress,
.notice {
  flex: 1;
  float: left;
}
.creditCardBox,
.billingAddressBox {
  padding: 40px 40px 16px 40px;
  background-color: #fff;
}
.orderInfoBox {
  padding: 40px;
  background-color: #fff;
}
.orderInfoBox ul {
  list-style: none;
}
.orderInfoBox li {
  font-size: 14px;
  line-height: 2;
}
.orderInfoBox .name {
  width: 120px;
  display: inline-block;
  color: #757575;
}
.totalMoney,
.billingAddress {
  margin-right: 20px;
}
.orderInfo,
.notice {
  margin-left: 20px;
}

.inlineInput {
  display: flex;
}
.inlineInput > div {
  flex: 1;
}
.inlineInput > div:first-child {
  margin-right: 24px;
}
.securityCode {
  position: relative;
}
.radioGroup {
  margin-bottom: 24px;
}
.row {
  display: flex;
}
.row > div {
  flex: 1;
}
.rowBox::after,
.layoutBox::after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.payNowBtn button {
  float: right;
}

.noticeBox {
  width: 300px;
  float: right;
  margin-top: 40px;
  background-color: rgba(255, 255, 204, 0.5);
  padding: 50px 20px;
}
.noticeBox p {
  font-size: 14px;
  text-align: center;
}
</style>
