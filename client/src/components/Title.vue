<template>
  <transition appear appear-class appear-active-class="animated fadeInUp">
    <div class="title">
      <h2>{{postTitle}}</h2>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: { postTitle: String }
};
</script>

<style scoped>
.title {
  margin-bottom: 42px;
}
.title h2 {
  position: relative;
  text-align: center;
  font-size: 26px;
  color: #212121;
  font-weight: normal;
}
.title h2:after {
  content: "";
  width: 36px;
  height: 3px;
  background: #212121;
  position: absolute;
  left: 0;
  bottom: -12px;
  left: 50%;
  margin-left: -18px;
}
</style>
