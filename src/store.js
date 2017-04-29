import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

import * as api from './api'

Vue.use(Vuex)

const TOAST_LIFETIME = 3000
let nextToastId = 0

const NOW = moment().valueOf()
const WEEK = moment().add(7, 'days').valueOf()

const store = new Vuex.Store({
  state: {
    startTime: NOW,
    endTime: WEEK,
    data: [],
    foodData: [],
    toasts: []
  },
  getters: {
    getVisibleToasts: (state, time) => state.toasts.filter(t => !t.hidden),
    startTime: state => new Date(state.startTime),
    endTime: state => new Date(state.endTime),
    foodData: state => state.foodData
  },
  mutations: {
    setData: (state, data) => { state.data = data },
    createToast: (state, text) => { state.toasts.push({ text, firedAt: new Date().getSeconds() }) },
    hideToast: (state, toastId) => { state.toasts.find(t => t.id === toastId).hidden = true },
    setFoodData: (state, data) => { state.foodData = data }
  },
  actions: {
    saveData (context, data) {
      context.commit('saveData', data)
    },
    createToast (context, text) {
      const id = nextToastId++
      context.commit('createToast', { id, text })
      setTimeout(() => { context.commit('hideToast', id) }, TOAST_LIFETIME)
    },
    loadAllData (context) {
      api.getJSON('weightData')
        .then(json => context.commit('setData', json))
    },
    loadDataBetweenPoints (state, context) {
      // take points from store or use default ones
      // default start = now, default end = now + 7 days
      const start = state.startTime
      const end = state.endTime
      console.log(start, end)
      api.getJSON(`weightDataBetween?start=${start}&end=${end}`)
        .then(json => context.commit('setData', json))
    },
    loadFoodData (context) {
      api.getJSON('foodData')
        .then(json => context.commit('setFoodData', json))
    }
  }
})

export default store

/*
const start = 0
    const end = 600
    api.getJSON(`weightDataBetween?start=${start}&end=${end}`)
      .then(json => console.log(json))
 */
