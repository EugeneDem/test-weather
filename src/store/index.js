import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// https://webpack.js.org/guides/dependency-management/#requirecontext
const modulesFiles = require.context('./modules', true, /\.js$/)

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

const store = new Vuex.Store({
  state: {
    currentCity: {},
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
    async init({ dispatch }) {
      await dispatch('localStorageApp/setStateFromLocalStorage')
    },
    setCurrentCity({commit}, data) {
      commit('setCurrentCity', data);
    },
    setListCity({commit}, data) {
      commit('setListCity', data);
    },
  },
  modules,
})

export default store
