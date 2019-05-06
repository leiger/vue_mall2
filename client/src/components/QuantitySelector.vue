<template>
  <div class="quantity">
    <button class="minus" @click="minus">-</button>
    <span>{{num1}}</span>
    <button @click="plus" class="plus">+</button>
  </div>
</template>

<script>
export default {
  computed: {
    num1() {
      return this.value;
    }
  },
  props: {
    value: {
      type: Number,
      default: 1
    },
    min: {
      type: Number
    }
  },
  methods: {
    minus() {
      if (this.num1 - 1 >= this.min) {
        this.$emit("changeValue", -1);
      }
    },
    plus() {
      this.num++;
      this.$emit("changeValue", 1);
    }
  }
};
</script>

<style scoped>
.quantity button {
  font-size: 15px;
  height: 36px;
  width: 36px;
  line-height: 34px;
  text-align: center;
  border: 1px solid rgba(17, 17, 17, 0.2);
  float: left;
  margin: 0;
  padding: 0;
  cursor: pointer;
  color: #111;
  background-color: #fff;
}
.quantity span {
  font-size: 15px;
  height: 36px;
  width: 36px;
  line-height: 34px;
  text-align: center;
  border: 1px solid rgba(17, 17, 17, 0.2);
  float: left;
  margin: 0 0 0 -1px;
  padding: 0;
  cursor: pointer;
  color: #111;
  background-color: #f5f5f5;
}
.quantity button.plus {
  margin-left: -1px;
}
</style>
