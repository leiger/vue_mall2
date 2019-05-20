<template>
  <Layout>
    <div class="layoutBox">
      <Row class="mainBox" type="flex" justify="center">
        <Col :sm="16" :xs="24">
          <div class="cardBox" :dis-hover="true">
            <Icon class="suc" type="ios-checkmark-circle-outline" size="70"/>
            <div class="info">
              <p>CONGRATULATIONS!</p>
              <p>Your order is under processing!</p>
            </div>
            <div class="detail">
              <p>ORDER ID: {{ orderInfo._id }}</p>
              <p>ORDER TOTAL: {{ orderInfo.total | currency }}</p>
              <Steps :current="2">
                <Step title="Init Order" :content="orderInfo.date.start"></Step>
                <Step title="Payment" :content="orderInfo.date.paid"></Step>
                <Step title="Shipping"></Step>
                <Step title="delivered"></Step>
              </Steps>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  </Layout>
</template>

<script>
import { currency } from "./../utils/currency";
import { mapActions } from "vuex";

export default {
  filters: {
    currency: currency
  },
  computed: {
    orderInfo() {
      return this.$store.state.orders.order;
    }
  },
  mounted() {
    this.getOrderById(this.$route.params.id);
  },
  methods: {
    ...mapActions(["getOrderById"])
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/variables";

.layoutBox {
  margin: 40px;
  padding: 30px 40px;
  background-color: #fff;
}
.mainBox {
  margin: 20px 0;

  .cardBox {
    padding: 20px;

    .suc {
      display: block;
      text-align: center;
      color: @success-color;
      margin-bottom: 20px;
    }

    .info {
      text-align: center;
      font-size: 16px;
    }

    .detail {
      margin-top: 20px;
      // background-color: #f5f5f5;
      padding: 20px;

      p {
        margin-bottom: 10px;
      }
    }
  }
}
</style>


