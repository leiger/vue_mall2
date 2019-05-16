import { getAddresses, addAddress, deleteAddress } from '@/services/addresses';

const state = {
  // id, email
  addressList: [],
  addressModalState: false
}

const mutations = {
  setAddresses: (state, {addressList}) => {
    state.addressList = [...addressList];
  },
  setAddressModalState: (state, status) => {
    state.addressModalState = status;
  }
}

const actions = {
  // user login
  async getAddresses({ commit }, id) {
    try {
      const { data } = await getAddresses(id);
      commit('setAddresses', data);
    }
    catch (err) {
      console.log(err);
    }
  },
  async addAddress({ dispatch }, {id, payload}) {
    try {
      await addAddress({id, payload});
      await dispatch('getAddresses', id);
      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  },
  async deleteAddress({ dispatch }, {id, addressId}) {
    try {
      await deleteAddress({id, addressId});
      await dispatch('getAddresses', id);
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
