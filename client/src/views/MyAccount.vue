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
          <Avatar v-if="userInfo.email" class="avatar" size="large">{{ userInfo.email[0].toUpperCase()}}</Avatar>
          <div class="name">
            Hello,
            <span>{{userInfo.email}}</span>
          </div>
        </div>

        <Divider class="divider" id="personal_info" orientation="left">Personal Information</Divider>
        <div class="personal">
          <div>
            <Avatar icon="ios-person"></Avatar>
            <p>
              ID:
              <span>{{userInfo.id}}</span>
            </p>
          </div>
          <div>
            <Avatar icon="ios-mail"></Avatar>
            <p>
              Email:
              <span>{{userInfo.email}}</span>
            </p>
          </div>
        </div>

        <Divider class="divider" id="order_history" orientation="left">Order History</Divider>
        <div id="order_history"></div>
        <div id="address_book"></div>
      </div>
    </div>
  </layout>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    userInfo() {
      return this.$store.state.user.userInfo;
    },
    addressList() {
      return this.$store.state.addresses.addressList;
    },
    orderList() {
      return this.$store.state.order.orderList;
    }
  },
  methods: {
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
  &>div {
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
</style>
