<template>
  <Layout>
    <div class="layoutBox">
      <Row class="mainBox" type="flex" justify="center">
        <Col :lg="8" :sm="12" :xs="24">
          <Card class="cardBox" :dis-hover="true">
            <Icon class="suc" type="ios-checkmark-circle-outline" size="70"/>
            <div class="info">
              <p>CONGRATULATIONS!</p>
              <p>Your order is under processing!</p>
            </div>
            <Divider :dashed="true"/>
            <div class="detail">
              <p>ORDER ID: {{ orderInfo._id }}</p>
              <p>ORDER TOTAL: {{ orderInfo.total | currency }}</p>
            </div>
          </Card>
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

<style scoped>
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

.suc {
  display: block;
  text-align: center;
  color: #19be6b;
  margin-bottom: 20px;
}

.cardBox {
  padding: 20px;
}

.info {
  text-align: center;
  font-size: 16px;
}

.detail {
  color: #c5c8ce;
}

.mainBox {
  margin: 80px 0;
}
</style>


