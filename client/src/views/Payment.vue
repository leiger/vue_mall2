<template>
  <div>
    <EntryBoard/>
    <NavHeader/>
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
        <div class="notice">
          <div class="noticeBox">
            <Title postTitle="Notice"/>
            <p>Just Click Pay Now to Create a Order.</p>
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
      </div>

      <Divider/>
      <div class="payNowBtn">
        <MainBtn @click="createOrder">Pay Now</MainBtn>
      </div>
    </div>
    <NavFooter/>
  </div>
</template>

<script>
import NavHeader from "./../components/NavHeader.vue";
import EntryBoard from "./../components/EntryBoard.vue";
import NavFooter from "./../components/NavFooter.vue";
import MainBtn from "./../components/MainBtn.vue";
import Title from "./../components/Title.vue";

import axios from "axios";

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
      // ruleValidata: {
      //   cardNumber: [
      //     {
      //       required: true,
      //       type: 'number',
      //       message: "Please enter your card number",
      //       trigger: "blur"
      //     }
      //   ],
      //   name: [
      //     {
      //       required: true,
      //       message: "Please enter the name on card",
      //       trigger: "blur"
      //     }
      //   ],
      //   expireDate: [
      //     {
      //       required: true,
      //       message: "Please enter the expire date",
      //       trigger: "blur"
      //     }
      //   ],
      //   securityCode: [
      //     {
      //       required: true,
      //       message: "Please enter security code",
      //       trigger: "blur"
      //     }
      //   ]
      // }
    };
  },
  components: {
    NavHeader,
    EntryBoard,
    NavFooter,
    MainBtn,
    Title
  },
  methods: {
    async createOrder() {
      try {
        let { data } = await axios.post("/payment/payment", {
          addressId: this.$route.query._id,
          orderTotal: this.orderTotal
        });
        if (data.status === "0") {
          this.$Message.success("Create Success!");
          setTimeout(() => {
            this.$router.push({
              path: "/OrderSuccess",
              query: {
                orderId: data.result.orderId
              }
            });
          }, 2000);
        } else {
        }
      } catch (err) {
        console.log(err);
        this.$Message.error("Error!");
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
.totalMoney,
.billingAddress {
  width: 50%;
  float: left;
}
.creditCardBox,
.billingAddressBox {
  padding: 40px 40px 16px 40px;
  background-color: #fff;
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
.notice {
  width: 300px;
  float: right;
}
.noticeBox {
  margin-top: 40px;
  background-color: rgba(255, 255, 204, 0.5);
  padding: 50px 20px;
}
.noticeBox p {
  font-size: 14px;
  text-align: center;
}
</style>
