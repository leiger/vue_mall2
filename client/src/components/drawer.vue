<template>
  <Drawer width="700" v-model="drawerState">
    <Divider orientation="left">Cart List</Divider>
    <Table border ref="selection" _checked :columns="cartTitle" :data="cartList"></Table>
  </Drawer>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      return {
        cartTitle: [
          {
            type: 'selection',
            width: 50,
            align: 'center'
          },
          {
            title: 'IMAGES',
            key: 'productImage',
            render: (h, params) => {
              // console.log(params);
              return h('img', {
                attrs: {
                  src: '/static/' + params.row.productImage
                }
              });
            }
          },
          {
            title: 'ITEMS',
            key: 'productName'
          },
          {
            title: 'PRICE',
            key: 'salePrice',
            render: (h, params) => {
              return h('span', {}, '$' + params.row.salePrice);
            }
          },
          {
            title: 'QUANTITY',
            key: 'productNum',
            align: 'center',
//          <InputNumber v-model="value3" size="small"></InputNumber>
            render: (h, params) => {
              let self = this;
              return h('InputNumber', {
                props: {
                  size: 'small',
                  value: params.row.productNum,
                  min: 0
                },
                style: {
                  width: '50px'
                },
                on: {
                  'on-change': function (newValue) {
                    console.log(newValue);
                    self.$store.commit("updateCartListOne", {index: params.index, newValue: newValue})
                  }
                }
              });
            }
          },
          {
            title: 'SUBTOTAL',
            key: 'subtotal',
            render: (h, params) => {
              return h('span', {}, '$' + params.row.salePrice * params.row.productNum);
            }
          },
          {
            title: 'ACTIONS',
            key: 'action',
            align: 'center',
            dashed: true,
            render: (h, params) => {
              return (
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    shape: 'circle',
                    icon: 'ios-trash-outline',
                    ghost: true
                  },
                  on: {
                    click: () => {
                      this.$Modal.confirm({
                        title: 'REMOVE FROM CART',
                        content: `Remove ${params.row.productName} from cart?`,
                        okText: 'OK',
                        cancelText: 'Cancel',
                        onOk: () => {
                          console.log('ok');
                          this.delCart(params.row.productId);
                        }
                      });
                    }
                  }
                })
              )
            }
          }
        ],
        tableList: []
      }
    },
    computed: {
      drawerState: {
        get() {
          return this.$store.state.drawerState;
        },
        set(drawerState) {
          this.$store.commit("updateDrawerState", drawerState);
        }
      },
      cartList() {
        return this.$store.state.cartList;
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        axios.get('/users/cartList').then((res) => {
          let data = res.data;
          if(data.status === '0') {
            this.$store.commit("updateCartList", data.result);
//          this.cartList = data.result;
          }
        });
      },
      delCart(id) {
        axios.post('goods/delCart', {
          productId: id
        }).then((res) => {
          let data = res.data;
          if(data.status === '0') {
            this.init();
            this.$Message.success('Delete success');
          }
          else {
            this.$Message.error('Delete fail');
          }
        });
      }
    }
  }
</script>

<style>
  table img {
    width: 100%;
  }
</style>


