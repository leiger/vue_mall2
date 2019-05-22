<template>
  <layout>
    <div class="layoutBox">
      <Anchor show-ink>
        <AnchorLink href="#personal_info" title="Personal Information"/>
        <AnchorLink href="#order_history" title="Order History"/>
        <AnchorLink href="#address_book" title="Address Book"/>
      </Anchor>
      <div class="contentBox">
        <div class="intro">
          <Avatar v-if="email" class="avatar" size="large">{{ email[0].toUpperCase()}}</Avatar>
          <div class="name">
            Hello,
            <span>{{email}}</span>
          </div>
        </div>

        <Divider class="divider" id="personal_info" orientation="left">Personal Information</Divider>
        <div class="personal">
          <div>
            <Avatar icon="ios-person"></Avatar>
            <p>
              ID:
              <span>{{id}}</span>
            </p>
          </div>
          <div>
            <Avatar icon="ios-mail"></Avatar>
            <p>
              Email:
              <span>{{email}}</span>
            </p>
          </div>
        </div>

        <Divider class="divider" id="order_history" orientation="left">Order History</Divider>
        <Timeline v-if="orderList.length !== 0" class="orderHistory">
          <TimelineItem :key="order._id" v-for="order in orderList">
            <Time class="time" :time="order.date.paid" type="datetime"/>
            <div>
              <img
                v-for="product in order.products"
                :src="'http://localhost:3000/images/products/'+product.images[0]"
                alt
              >
            </div>
            <p class="price">{{order.total | currency}}</p>
          </TimelineItem>
        </Timeline>
        <div v-else class="noOrders">
          <Icon type="ios-archive-outline"/>
          <p>No Orders.</p>
        </div>

        <Divider class="divider" id="address_book" orientation="left">Address Book</Divider>
        <AddressList :selectable="false"/>
      </div>
    </div>
  </layout>
</template>

<script>
import { mapActions } from "vuex";
import { currency } from "./../utils/currency";
import AddressList from "../components/AddressList.vue";

export default {
  data() {
    return {};
  },
  components: {
    AddressList
  },
  computed: {
    id() {
      return this.$store.state.user.userInfo.id;
    },
    email() {
      return this.$store.state.user.userInfo.email;
    },
    addressList() {
      return this.$store.state.addresses.addressList;
    },
    orderList() {
      return this.$store.state.orders.orderList.reverse();
    }
  },
  filters: {
    currency
  },
  async mounted() {
    let result = await this.checkState();
    if (result) {
      this.getOrderList(this.id);
    }
  },
  methods: {
    ...mapActions(["getOrderList", "checkState"]),
    handleMenuItem(name) {
      this.activeMenu = name;
      if (name === "0") {
      }
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/variables";

.layoutBox {
  margin: auto;
  max-width: 1224px;
  width: 100%;
  padding: 48px 0;
  display: flex;
  align-items: flex-start;
}
.contentBox {
  background-color: #fff;
  margin-left: 48px;
  padding: 48px;
  flex-grow: 1;
  min-height: 500px;
}

.divider {
  color: @disabled-color;
}

.intro {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  .avatar {
    background-color: @primary-color;
    margin-right: 10px;
  }
  .name {
    font-size: 14px;

    span {
      font-weight: bold;
      color: @secondary-color;
    }
  }
}

.personal {
  margin-bottom: 40px;
  & > div {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    p {
      margin-left: 10px;
      font-size: 14px;
      color: @subsidiary-color;

      span {
        color: @primary-color;
        margin-left: 5px;
      }
    }
  }
}
.orderHistory {
  .time {
    color: @secondary-color;
    font-size: 14px;
  }
  img {
    width: 70px;
    height: 50px;
    margin: 10px 10px 10px 0;
  }
  .price {
    color: @primary-color;
  }
}
.noOrders {
  margin: 50px auto;
  text-align: center;
  i {
    font-size: 60px;
    color: @disabled-color;
  }
  p {
    color: @disabled-color;
  }
}
</style>
