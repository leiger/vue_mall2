<template>
  <div class="article">
    <Title :postTitle="postTitle"/>
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Title from './Title.vue';

export default {
  data() {
    return {};
  },
  props: { postTitle: String },
  components: {
    Title
  }
};
</script>

<style scoped>
.article {
  max-width: 740px;
  margin: 30px auto 66px;
  overflow: hidden;
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
