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
            <b-button size="sm" variant="link" @click="sortGoods(name)">
              {{ name }}
            </b-button>
          </template>
        </b-col>
      </b-row>

      <b-row>
        <b-col md="2">
          <h3>Price:</h3>
          <b-nav vertical>
            <template v-for="(price, index) in priceRange">
              <b-nav-item @click="setPriceFilter(index)">{{ price }}</b-nav-item>
            </template>
          </b-nav>
        </b-col>
        <b-col md="10">
          <b-row>
            <template v-for="(good, index) in goods">
              <b-col md="3">
                <b-card :img-src="'/static/'+good.productImage"
                        :img-alt="good.productName"
                        img-top>
                  <p class="card-text">
                    {{ good.productName }}
                  </p>
                  <p class="card-text">
                    {{ good.salePrice }}
                  </p>
                  <b-button size="sm" variant="outline-primary" :block=true>add to cart</b-button>
                </b-card>
              </b-col>
              <template v-if="(index+1)%4 === 0 && index!=0">
                <div class="w-100"></div>
                <br/>
              </template>
            </template>
          </b-row>
          <div class="load_more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10" v-if="loading.imageShow">
            <img :src="loading.imageUrl" alt="loading..." >
          </div>
        </b-col>
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
  import loadingSvg from './../../static/loading-svg/loading-spin.svg';

  //  import mock data
  //  import './../../mock/mock';

  export default {
    data() {
      return {
        sortNames: ['Default', 'Price'],
        priceRange: ['All', '0.00 - 100.00', '100.00 - 500.00', '500.00 - 1000.00', '1000.00 - 2000.00'],
        goods: [],
//        sortWay default: 0, price: 1
//        sortFlag asce or desc
        sort: {
          sortWay: 0,
          sortFlag: false
        },
        priceLevel: 0,
        page: 1,
        pageSize: 8,
        // vue-infinite-scroll
        busy: false,
        loading: {
          imageUrl: loadingSvg,
          imageShow: true
        }
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
      getGoodsList(flag) {
        let param = {
          page: this.page,
          pageSize: this.pageSize,
//          1: asce; -1: desc
          sortFlag: this.sort.sortFlag?1:-1,
          // price or default
          sortWay: this.sort.sortWay,
          priceLevel: this.priceLevel
        };

        this.loading.imageShow = true;

        axios.get('/goods', {
          params: param
        })
          .then((res) => {
            // console.log(res);
            if(res.data.status === "0") {
              // flag means first page or later page
              if(flag) {
                this.goods = this.goods.concat(res.data.result.list);
                // no more data
                if(res.data.result.count < 8) {
                  this.busy = true;
                }
                else {
                  this.busy = false;
                }
              }
              else {
                this.goods = res.data.result.list;
                this.busy = false;
              }
            }
            // request false
            else {
              this.goods = [];
              console.log('request false')
            }
            this.loading.imageShow = false;
            // console.log(this.goods)
          })
          .catch((err) => {
            console.log(err);
          });
      },
      sortGoods(name) {
        if(name === 'Price') {
          this.sort.sortFlag = !this.sort.sortFlag;
        }
        else {
          this.sort.sortFlag = 1;
        }
        this.page = 1;
        this.sort.sortWay = name === 'Default'? 0 : 1;
        this.getGoodsList();
      },
      setPriceFilter(level) {
        this.page = 1;
        this.priceLevel = level;
        this.getGoodsList();
      },
      loadMore: function() {
        // forbid load frequently
        this.busy = true;

        setTimeout(() => {
          this.page++;
          console.log(this.page);
          this.getGoodsList(true);
          // this.busy = false;
        }, 1000);
      }
    }
  }
</script>

<style scoped>
  h3 {
    padding: 0 1rem;
    font-size: 18px;
  }
  .load_more {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
</style>


