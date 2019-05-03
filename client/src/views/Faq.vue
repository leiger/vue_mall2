<template>
  <div>
    <EntryBoard/>
    <NavHeader/>
  </div>
</template>

<script>
import NavHeader from "./../components/NavHeader.vue";
import EntryBoard from "./../components/EntryBoard.vue";
import NavFooter from "./../components/NavFooter.vue";

import axios from "axios";

export default {
  data() {
    return {};
  },
  components: {
    NavHeader,
    EntryBoard,
    NavFooter
  }
};
</script>

<style scoped>
</style>
