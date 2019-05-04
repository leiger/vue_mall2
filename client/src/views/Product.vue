<template>
  <div>
    <EntryBoard/>
    <NavHeader/>
    <Breadcrumb>
      <BreadcrumbItem to="/">Home</BreadcrumbItem>
      <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
      <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>

<script>
import NavHeader from "./../components/NavHeader.vue";
import EntryBoard from "./../components/EntryBoard.vue";
import NavFooter from "./../components/NavFooter.vue";

import axios from "axios";

export default {
  data() {
    return {
      productDetail: {}
    };
  },
  components: {
    NavHeader,
    EntryBoard,
    NavFooter
  },
  mounted() {
    this.getProductDetail(this.$route);
  },
  watch: {
    $route(to, from) {
      this.getProductDetail(to);
    }
  },
  methods: {
    async getProductDetail(route) {
      let id = route.params.id;
      let params = {
        productId: id
      };
      try {
        let { data } = await axios.get("/goods/product", {
          params
        });
        if (data.status === "0") {
          this.productDetail = data.result.productDetail;
          console.log(this.productDetail);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped>
</style>
