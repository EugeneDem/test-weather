export default {
  namespaced: true,
  state: {
    activePopup: ''
  },
  actions: {
    async showPopup({ commit }, value) {
      commit('CHANGE_ACTIVE_POPUP', value)
    }
  },
  mutations: {
    CHANGE_ACTIVE_POPUP: (state, val) => {
      state.activePopup = val
    }
  },
  getters: {
  }
}
