<template>
  <Layout>
    <nav-header/>
    <!--<nav-bread/>-->

    <Content class="layoutBox">
      <Row :gutter="16">
        <Col span="4">
        <Card class="cardBox" title="Price Filter" icon="ios-options" :padding="0" shadow>
          <CellGroup>
            <template v-for="(price, index) in priceRange">
              <Cell :title="price" @click="setPriceFilter(index)"/>
            </template>
          </CellGroup>
        </Card>

        <Card class="cardBox" title="Sort" icon="ios-funnel-outline" :padding="0" shadow>
          <CellGroup>
            <template v-for="name in sortNames">
              <Cell :title="name" @click="sortGoods(name)"/>
            </template>
          </CellGroup>
        </Card>
        </Col>

        <Col span="20">
        <Row :gutter="16">
          <template v-for="(good, index) in goods">
            <Col span="6">
            <Card class="cardBox">
              <img :src="'/static/'+good.productImage" :alt="good.productName">
              <p>{{ good.productName }}</p>
              <p>{{ good.salePrice }}</p>
              <Button icon="ios-cart" type="primary" ghost long @click="addCart(good.productId)">
                add to cart
              </Button>
            </Card>
            </Col>
          </template>
          <!--load more-->
          <div class="load_more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
               infinite-scroll-distance="10" v-if="loading.imageShow">
            <img :src="loading.imageUrl" alt="loading...">
          </div>
        </Row>
        </Col>
      </Row>
    </Content>

    <nav-footer/>
  </Layout>
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
        },
        list1: [1, 2]
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
          sortFlag: this.sort.sortFlag ? 1 : -1,
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
            if (res.data.status === "0") {
              // flag means first page or later page
              if (flag) {
                this.goods = this.goods.concat(res.data.result.list);
                // no more data
                if (res.data.result.count < 8) {
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
        if (name === 'Price') {
          this.sort.sortFlag = !this.sort.sortFlag;
        }
        else {
          this.sort.sortFlag = 1;
        }
        this.page = 1;
        this.sort.sortWay = name === 'Default' ? 0 : 1;
        this.getGoodsList();
      },
      setPriceFilter(level) {
        this.page = 1;
        this.priceLevel = level;
        this.getGoodsList();
      },
      loadMore: function () {
        // forbid load frequently
        this.busy = true;

        setTimeout(() => {
          this.page++;
          console.log(this.page);
          this.getGoodsList(true);
          // this.busy = false;
        }, 1000);
      },
      addCart(productId) {
        axios.post("/goods/addCart", {
          productId: productId
        }).then(res => {
          console.log(res);
          if (res.data.status === '0') {
            alert("add success");
          }
          else {
            alert(`msg:${res.msg}`);
          }
        });
      }
    }
  }
</script>

<style scoped>
  .layoutBox {
    width: 95%;
    margin: 20px auto;
  }

  .cardBox {
    overflow: hidden;
    margin-bottom: 16px;
  }

  .cardBox img {
    width: 100%;
  }

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


