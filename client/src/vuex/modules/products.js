import { getProducts, getCategories, getProductById } from '@/services/products';

const state = {
  // id, email
  productsInfo: [],
  categoriesInfo: [],
  currentProduct: {}
}

const mutations = {
  setProducts: (state, productsInfo) => {
    state.productsInfo = productsInfo;
  },
  setCategories: (state, categoriesInfo) => {
    state.categoriesInfo = categoriesInfo;
  },
  setCurrentProduct: (state, product) => {
    state.currentProduct = product;
  }
}

const actions = {
  async getProducts({ commit }) {
    try {
      const { data } = await getProducts();
      commit('setProducts', data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async getCategories({ commit }) {
    try {
      const { data } = await getCategories()
      commit('setCategories', data);
      return true;
    } catch (err) {
      return false;
    }
  },
  async getProductById({ commit }, {id}) {
    try {
      const { data } = await getProductById(id);
      commit('setCurrentProduct', data);
      return true;
    } catch (err) {
      return false;
    }
  },
}

// const getters = {
//   sortByCategory: (state) => id => {
//     console.log(id);
//     console.log(state.productsInfo)
//     if(!id)
//       return state.productsInfo.find(product => product.category._id === id);
//     return state.productsInfo
//   }
// }

export default {
  state,
  mutations,
  actions
}
