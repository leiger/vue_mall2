<template>
  <div class="article">
    <transition appear appear-class appear-active-class="animated fadeInUp">
      <div class="title">
        <h2>{{postTitle}}</h2>
      </div>
    </transition>
    <div class="content">
      <slot></slot>
    </div>
  </div>
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
.article {
  max-width: 740px;
  margin: 30px auto 66px;
  overflow: hidden;
}
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
p {
  margin-bottom: 1rem;
  font-size: 15px;
  line-height: 30px;
}
img {
  width: 100%;
}
img:hover {
  animation: scaleUp 4s;
}
@keyframes scaleUp {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1)
  }
}
</style>
