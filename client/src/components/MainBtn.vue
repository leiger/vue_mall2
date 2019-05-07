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
    size: {
      type: String,
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
        btnDisabled: this.disabled === "disabled",
        btnSmall: this.size === "small",
        btnExtraSmall: this.size === "extraSmall"
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
  border-radius: 3px;
  letter-spacing: 1px;
  border: none;
  font-size: 13px;
}
.btnDisabled {
  opacity: 0.5;
}
.btn.btnLong {
  width: 100% !important;
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
.btn.btnSmall {
  height: 40px;
  width: 200px;
}
.btn.btnExtraSmall {
  width: 50px;
  height: 32px;
  padding: 3px;
}
</style>
