<template>
  <button :class="classes" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    long: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      validator(value) {
        return ["default", "primary"].includes(value);
      },
      default: "default"
    },
    disabled: Boolean
  },
  computed: {
    classes() {
      return {
        btn: true,
        btnLong: this.long,
        btnDefault: this.type === "default",
        btnPrimary: this.type === "primary",
        btnDisabled: this.disabled === "disabled"
      };
    }
  },
  methods: {
    handleClick(event) {
      this.$emit("click", event);
    }
  }
};
</script>

<style scoped>
.btn {
  width: 300px;
  height: 48px;
  padding: 9px 30px;
  line-height: 30px;
  border-radius: 3px;
  letter-spacing: 1px;
  border: none;
  font-size: 13px;
}
.btnDisabled {
  opacity: 0.5;
}
.btnLong {
  width: 100%;
}
.btnDefault {
  color: #fff;
  background-color: #212121;
}
.btnDefault:hover {
  background-color: #141414;
}
.btnPrimary {
  color: #111;
  background-color: #e4e4e4;
}
.btnPrimary:hover {
  background-color: #bbb;
}
</style>
