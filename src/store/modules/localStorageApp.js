const localStorageApp = {
  namespaced: true,
  state: {
    stateObjectsForSave: [
      'currentCity',
      'listCity'
    ]
  },
  actions: {
    saveToLocalStorage({state, rootState}) {
      const savedObjects = state.stateObjectsForSave.reduce((result, item) => {
        if (item in rootState)
        result[item] = rootState[item]
        return result
      }, {})
      localStorage.setItem(`stateObjects`, JSON.stringify(savedObjects))
    },
    setStateFromLocalStorage({commit}) {
      const rowData = localStorage.getItem(`stateObjects`)
      if (rowData) {
        const data = JSON.parse(rowData)
        commit('setStateFromLocalStorage', data, { root: true })
      }
    }
  },
}

export default localStorageApp
