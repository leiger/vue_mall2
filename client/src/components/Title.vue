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

<style lang="less" scoped>
@import "../assets/css/variables";

.title {
  margin-bottom: 42px;

  h2 {
    position: relative;
    text-align: center;
    font-size: 24px;
    color: @title-color;
    font-weight: normal;

    &:after {
      content: "";
      width: 36px;
      height: 3px;
      background: @primary-color;
      position: absolute;
      left: 0;
      bottom: -12px;
      left: 50%;
      margin-left: -18px;
    }
  }
}
</style>
