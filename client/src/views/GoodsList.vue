<template>
  <div>
    <nav-header/>
    <nav-bread/>

    <b-container fluid>
      <!--sort-->
      <b-row>
        <b-col offset-md="10">
          <span>Sort by:</span>
          <template v-for="name in sortNames">
            <b-button size="sm" variant="link">
              {{ name }}
            </b-button>
          </template>
        </b-col>
      </b-row>

      <b-row>
        <template v-for="(good, index) in goods">
          <b-col>
            <b-card :img-src="good.productImg"
                    :img-alt="good.productName"
                    img-top>
              <p class="card-text">
                {{ good.productName }}
              </p>
              <b-button size="sm" variant="outline-primary" block=true>add to cart</b-button>
            </b-card>
          </b-col>
          <template v-if="(index+1)%5 === 0 && index!=0">
            <div class="w-100"></div>
            <br/>
          </template>
        </template>

      </b-row>
    </b-container>

    <nav-footer/>
  </div>
</template>

<script>
  import NavHeader from './../components/NavHeader.vue';
  import NavBread from './../components/NavBread.vue';
  import NavFooter from './../components/NavFooter.vue';
  import axios from 'axios';

  //  import mock data
  import './../../mock/mock';

  export default {
    data() {
      return {
        sortNames: ['Default', 'Price'],
        goods: []
      }
    },
    components: {
      NavHeader,
      NavBread,
      NavFooter
    },
    mounted: function () {
      this.getGoodsList();
    },
    methods: {
      getGoodsList() {
        axios.get('/goods')
          .then((res) => {
            console.log(res);
            this.goods = res.data.results;
            console.log(this.goods)
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
</script>

<style>

</style>


