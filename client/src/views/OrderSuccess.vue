<template>
  <Layout>
    <EntryBoard/>
    <NavHeader/>
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
              <p>ORDER ID: {{ orderId }}</p>
              <p>ORDER TOTAL: {{ orderTotal | currency }}</p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
    <NavFooter/>
  </Layout>
</template>

<script>
import EntryBoard from "./../components/EntryBoard.vue";
import NavHeader from "./../components/NavHeader.vue";
import NavFooter from "./../components/NavFooter.vue";
import Drawer from "./../components/Drawer.vue";
import { currency } from "./../utils/currency";
import axios from "axios";

export default {
  data() {
    return {
      orderId: "",
      orderTotal: 0
    };
  },
  components: {
    EntryBoard,
    NavHeader,
    NavFooter
  },
  filters: {
    currency: currency
  },
  mounted() {
    let orderId = this.$route.query.orderId;
    if (!orderId) {
      return;
    }
    axios
      .get("/order/orderDetail", {
        params: {
          orderId: orderId
        }
      })
      .then(res => {
        let data = res.data;
        if (data.status === "0") {
          this.orderId = orderId;
          this.orderTotal = data.result.orderTotal;
        }
      });
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


