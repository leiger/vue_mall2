import { getAddresses, setAddress, deleteAddress } from '@/services/users';

const state = {
  // id, email
  addressList: [],
  addressModalState: false
}

const mutations = {
  setAddressses: (state, addressList) => {
    state.addressList = addressList
  },
  setModalState: (state, status) => {
    state.addressModalState = status;
  }
}

const actions = {
  // user login
  async getAddresses({ commit }) {
    try {
      const { data } = await getAddresses();
      commit('setAddresses', data);
    }
    catch (err) {
      console.log(err);
    }
  },
  async setAddress({ dispatch }, payload) {
    try {
      await setAddress(payload);
      await dispatch('getAddresses');
    } catch (err) {
      console.log(err);
    }
  },
  async deleteAddress({ dispatch }, payload) {
    try {
      await deleteAddress(payload);
      await dispatch('getAddresses');
    } catch (err) {
      console.log(err);
    }
  },
}

export default {
  state,
  mutations,
  actions
}
