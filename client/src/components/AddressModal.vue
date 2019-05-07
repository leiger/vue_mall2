<template>
  <!--login model-->
  <Modal
    class-name="loginModal"
    :title="modalTitle"
    :value="modalState"
    width="750"
    @on-cancel="closeModal"
  >
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
      <div class="row">
        <FormItem label="First Name" prop="firstName">
          <Input v-model="form.firstName" placeholder="First name (optional)"/>
        </FormItem>
        <FormItem label="Last Name" prop="lastName">
          <Input v-model="form.lastName" placeholder="Last name"/>
        </FormItem>
      </div>
      <FormItem label="Address" prop="address">
        <Input v-model="form.address" placeholder="Address"/>
      </FormItem>
      <div class="row">
        <FormItem label="Province" prop="province">
          <Select v-model="form.province">
            <Option v-for="province in provinceList" :key="province" :value="province">{{province}}</Option>
          </Select>
        </FormItem>
        <FormItem label="City" prop="city">
          <Select v-model="form.city">
            <Option v-for="city in cityList" :key="city" :value="city">{{city}}</Option>
          </Select>
        </FormItem>
        <FormItem label="Post Code" prop="postalCode">
          <Input v-model="form.postalCode" placeholder="Post Code"/>
        </FormItem>
      </div>
    </Form>
    <div slot="footer">
      <MainBtn size="small" @click="handleSubmit('form')">SAVE</MainBtn>
      <MainBtn size="small" @click="closeModal" type="primary">CANCEL</MainBtn>
    </div>
  </Modal>
</template>

<script>
import axios from "axios";
import canada from "canada";

import MainBtn from "./MainBtn.vue";
import getAddressList from "./../services/getAddressList.js";

export default {
  data() {
    return {
      modalTitle: "Add Shipping Address",
      form: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        province: "",
        postalCode: "",
        _default: false
      },
      ruleValidate: {
        lastName: [
          {
            required: true,
            message: "Please enter your last name",
            trigger: "blur"
          }
        ],
        address: [
          {
            required: true,
            message: "Please enter your address",
            trigger: "blur"
          }
        ],
        province: [
          {
            required: true,
            message: "Please enter a province",
            trigger: "change"
          }
        ],
        city: [
          {
            required: true,
            message: "Please choose a city",
            trigger: "change"
          }
        ],
        postalCode: [
          {
            required: true,
            message: "Please enter your postal code",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    modalState() {
      return this.$store.state.addressModalState;
    },
    provinceList() {
      return Object.keys(canada.provinces);
    },
    cityList() {
      let citiesInProvince = [];
      canada.cities.forEach(cityData => {
        if (cityData[1] === this.form.province) {
          citiesInProvince.push(cityData[0]);
        }
      });
      return citiesInProvince;
    }
  },
  methods: {
    closeModal() {
      this.$store.commit("updateAddressModal", false);
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.saveSubmit();
        } else {
          this.$Message.error("Error!");
        }
      });
    },
    async saveSubmit() {
      let userName = this.$store.state.nickName;
      if (userName) {
        try {
          let { data } = await axios.post("/address/add", this.form);
          console.log(data);
          if (data.status === "0") {
            this.$store.commit("updateAddressModal", false);
            this.$Message.success("Add Success!");
            getAddressList(this);
          }
        } catch (err) {
          console.log(err);
          this.$Message.error("Error!");
        }
      } else {
        this.$Message.info("Not Login!");
        this.$store.commit("updateAddressModal", false);
        setTimeout(() => {
          this.$store.commit("updateLoginModal", { action: true, type: 0 });
        }, 2000);
      }
    }
  },
  components: {
    MainBtn
  }
};
</script>

<style scoped>
.loginModal {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loginModal .ivu-modal {
  top: 0;
}
.row {
  display: flex;
}
.row > div {
  flex: 1;
}
</style>
