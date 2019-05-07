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
              <p>ORDER ID: {{ orderInfo._id }}</p>
              <p>ORDER TOTAL: {{ orderInfo.orderTotal | currency }}</p>
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
      orderInfo: {}
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
  created() {
    this.getOrder();
  },
  watch: {
    $route: "getOrder"
  },
  methods: {
    async getOrder() {
      let orderId = this.$route.query.orderId;
      if (orderId) {
        let { data } = await axios.post("/order/orderDetail", {
          orderId
        });
        if (data.status === "0") {
          this.orderInfo = data.result;
        } else if (data.status === "5") {
          this.$Message.info("this order Not exist !");
          this.$router.push("/");
        } else {
          console.log("no order");
        }
      }
    }
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


