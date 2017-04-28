import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const TOAST_LIFETIME = 3000
let nextToastId = 0

const store = new Vuex.Store({
  state: {
    data: [],
    toasts: []
  },
  getters: {
    getVisibleToasts: (state, time) => state.toasts.filter(t => !t.hidden)
  },
  mutations: {
    saveData: (state, data) => { state.data = data },
    createToast: (state, text) => { state.toasts.push({ text, firedAt: new Date().getSeconds() }) },
    hideToast: (state, toastId) => { state.toasts.find(t => t.id === toastId).hidden = true }
  },
  actions: {
    saveData (context, data) {
      context.commit('saveData', data)
    },
    createToast (context, text) {
      const id = nextToastId++
      context.commit('createToast', { id, text })
      setTimeout(() => { context.commit('hideToast', id) }, TOAST_LIFETIME)
    }
  }
})

export default store
