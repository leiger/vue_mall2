<template>
  <div class="addressList">
    <template v-for="(address,index) in addressList">
      <div
        class="addressBox"
        @click.stop.prevent="chooseAddress(index)"
        :class="{selected: select.selectable && select.selected === index}"
      >
        <dl>
          <dt class="uname">{{address.firstname}} {{address.lastname}}</dt>
          <dd class="uaddress">
            <span>{{address.address}} -</span>
            <span>{{address.city}} -</span>
            <span>{{address.province}}</span>
          </dd>
          <dd class="ucode">{{address.postalCode}}</dd>
        </dl>
        <Icon
          @click.stop.prevent="handleDeleteAddress(address._id)"
          size="20"
          class="trash"
          type="ios-trash-outline"
        />
      </div>
    </template>
    <!-- addnew -->
    <div class="addNew" @click="setAddressModalState(true)">
      <Icon type="md-add-circle"/>Add New Address
    </div>
    <AddressModal/>
  </div>
</template>

<script>
import AddressModal from "./AddressModal.vue";
import { mapActions, mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      select: {
        selectable: this.selectable || false,
        selected: 0
      }
    };
  },
  props: ["selectable"],
  components: {
    AddressModal
  },
  computed: {
    id() {
      return this.$store.state.user.userInfo.id;
    },
    addressList() {
      return this.$store.state.addresses.addressList;
    }
  },
  mounted() {
    if (this.id) {
      this.getAddresses(this.id);
      if (this.select.selectable)
        this.$emit("initAddress", this.addressList[0]._id);
    }
  },
  methods: {
    ...mapActions(["getAddresses", "setAddress", "deleteAddress"]),
    ...mapMutations(["setAddressModalState"]),
    chooseAddress(index) {
      if (this.select.selectable) {
        this.select.selected = index;
        this.$emit("on-change", this.addressList[this.select.selected]._id);
      }
    },
    handleDeleteAddress(addressId) {
      this.$Modal.confirm({
        title: "WARN",
        content: "Are you sure to delete this address?",
        okText: "OK",
        cancelText: "Cancel",
        onOk: async () => {
          let result = await this.deleteAddress({
            id: this.id,
            addressId
          });
          if (result) this.$Message.success("Delete Success!");
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../assets/css/variables";

.addressList {
  display: flex;
  flex-wrap: wrap;

  .addressBox,
  .addNew {
    position: relative;
    width: 268px;
    height: 178px;
    border: 1px solid @border-color;
    background-color: #fff;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.4s ease;
  }
  .selected {
    border: 1px solid @primary-color;

    &:hover {
      border-color: @primary-color !important;
    }
  }
}

.addressBox {
  padding: 15px 24px;
  margin: 0 15px 15px 0;

  &:hover {
    border-color: @border-color-hover;
  }
  .uname {
    margin: 0 0 10px;
    line-height: 30px;
    color: @primary-color;
    font-size: 14px;
  }
  .uaddress {
    max-height: 88px;
    overflow: hidden;
    margin: 0;
    line-height: 22px;
    color: @subsidiary-color;
  }
  .ucode {
    color: @subsidiary-color;
  }
  .trash {
    position: absolute;
    right: 10px;
    bottom: 10px;
    color: @disabled-color;
    cursor: pointer;
  }
  .trash:hover {
    color: @error-color;
  }
}

.addNew {
  text-align: center;
  color: @disabled-color;
}
.addNew i {
  display: block;
  width: 30px;
  height: 30px;
  margin: 63px auto 8px;
  font-size: 30px;
  line-height: 30px;
  text-align: center;
  color: @disabled-color;
  -webkit-transition: all 0.4s ease;
  transition: all 0.4s ease;
}
.addNew:hover {
  border-color: @border-color-hover;
  color: @primary-color;
}
.addNew:hover i {
  color: @primary-color;
}
</style>

