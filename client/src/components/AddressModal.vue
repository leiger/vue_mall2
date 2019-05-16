<template>
  <!--login model-->
  <Modal
    class-name="loginModal"
    :title="modalTitle"
    :value="modalState"
    width="750"
    @on-cancel="setAddressModalState(false)"
  >
    <Form ref="form" :model="form" :rules="ruleValidate" :label-width="100">
      <div class="row">
        <FormItem label="First Name" prop="firstname">
          <Input v-model="form.firstname" placeholder="First name (optional)"/>
        </FormItem>
        <FormItem label="Last Name" prop="lastname">
          <Input v-model="form.lastname" placeholder="Last name"/>
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
      <MainBtn size="small" @click="setAddressModalState(false)" type="primary">CANCEL</MainBtn>
    </div>
  </Modal>
</template>

<script>
import canada from "canada";
import MainBtn from "./MainBtn.vue";
import { mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      modalTitle: "Add Shipping Address",
      form: {
        firstname: "",
        lastname: "",
        address: "",
        city: "",
        province: "",
        postalCode: ""
      },
      ruleValidate: {
        lastname: [
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
    id() {
      return this.$store.state.user.userInfo.id;
    },
    modalState() {
      return this.$store.state.addresses.addressModalState;
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
    ...mapMutations(["setAddressModalState"]),
    ...mapActions(["addAddress", "getAddresses"]),
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
      if (this.id) {
        let result = await this.addAddress({
          id: this.id,
          payload: this.form
        });
        if (result) {
          this.$Message.success("Add Success!");
          this.setAddressModalState(false);
        }
      }
    }
    // async saveSubmit() {
    //   let userName = this.$store.state.nickName;
    //   if (userName) {
    //     try {
    //       let { data } = await axios.post("/address/add", this.form);
    //       console.log(data);
    //       if (data.status === "0") {
    //         this.$store.commit("updateAddressModal", false);
    //         this.$Message.success("Add Success!");
    //         getAddressList(this);
    //       }
    //     } catch (err) {
    //       console.log(err);
    //       this.$Message.error("Error!");
    //     }
    //   }
    // }
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
.row:first-child {
  margin-top: 24px;
}
</style>
