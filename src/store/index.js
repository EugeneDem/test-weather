import Vue from 'vue'
import Vuex from 'vuex'
import localStorageApp from './modules/localStorageApp'
import popup from './modules/popup'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentCity: '',
    listCity: [],
  },
  mutations: {
    setListCity(state, data) {
      Vue.set(state, 'listCity', data)
    },
    setCurrentCity(state, data) {
      state.currentCity = data;
    },
    setStateFromLocalStorage(state, data) {
      for (const key in data) {
        Vue.set(state, key, data[key])
      }
    }
  },
  actions: {
    async init({ commit }) {
      await commit('setStateFromLocalStorage')
    },
    setCurrentCity({commit}, data) {
      commit('setCurrentCity', data);
    },
    setListCity({commit}, data) {
      commit('setListCity', data);
    },
  },
  modules: {
    localStorageApp,
    popup
  }
})

export default store
