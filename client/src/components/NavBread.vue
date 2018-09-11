<template>
    <b-breadcrumb :items="items"/>
</template>

<script>
  export default {
    data() {
      return {
        items: [{
          text: 'Home',
          href: '#'
        }, {
          text: 'Goods',
          active: true
        }]
      }
    }
  }
</script>

<style>

</style>


