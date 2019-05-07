<template>
  <div id="app">
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(()=> {
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style>
a, button {
  transition: .5s all;
  cursor: pointer;
}
button {
  outline: none;
}
</style>
