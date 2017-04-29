import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'

import * as api from './api'

Vue.use(Vuex)

const TOAST_LIFETIME = 5000
let nextToastId = 0

const NOW = moment().subtract(1, 'days').valueOf()
const WEEK = moment().add(7, 'days').valueOf()

const store = new Vuex.Store({
  state: {
    loadingSomething: false,
    startTime: NOW,
    endTime: WEEK,
    data: [],
    foodData: [],
    toasts: [],
    recipies: {},
    recipeList: []
  },
  getters: {
    getVisibleToasts: state => state.toasts,
    startTime: state => new Date(state.startTime),
    weightData: state => state.data,
    endTime: state => new Date(state.endTime),
    foodData: state => state.foodData,
    recipies: state => state.recipies,
    getRecipe: (state, id) => state.recipies[id],
    recipeList: state => state.recipeList,
    loadingSomething: state => state.loadingSomething
  },
  mutations: {
    setLoadingSomething: (state, bool) => { state.loadingSomething = bool },
    setData: (state, data) => { state.data = data },
    addDataPoint: (state, data) => { state.data.push(data) },
    createToast: (state, { id, text }) => { state.toasts.push({ id, text, firedAt: moment().valueOf() }) },
    hideToast: (state, toastId) => {
      const toast = state.toasts.find(t => t.id === toastId)
      if (toast) {
        state.toasts.splice(state.toasts.indexOf(toast), 1)
      }
    },
    setFoodData: (state, data) => { state.foodData = data },
    editFoodDataEntry: (state, { action, type, expires }) => {
      console.log(action, type)
      const entry = state.foodData.find(f => f.type === type)
      if (entry) {
        console.log(entry)
        if (action === 'editing') {
          entry['editing'] = true
        } else {
          if (entry) {
            entry.count = action === 'add' ? entry.count + 1 : entry.count - 1
            entry['editing'] = false
          }
          if (entry.count <= 0) {
            state.foodData.splice(state.foodData.indexOf(entry), 1)
          }
        }
      } else {
        state.foodData.push({ type, expires, count: 1 })
      }
    },
    setStartTime: (state, timestamp) => { state.startTime = timestamp },
    setEndTime: (state, timestamp) => { state.endTime = timestamp },
    saveRecipe: (state, { id, recipe }) => {
      state.recipies = { [id]: recipe, ...state.recipies }
    },
    saveRecipeList: (state, list) => { state.recipeList = list }
  },
  actions: {
    setLoadingSomething (context, bool) {
      context.commit('setLoadingSomething', bool)
    },
    saveData (context, data) {
      context.commit('saveData', data)
    },
    addDataPoint (context, data) {
      context.commit('addDataPoint', data)
    },
    createToast (context, text) {
      const id = nextToastId++
      context.commit('createToast', { id, text })
      setTimeout(() => { context.commit('hideToast', id) }, TOAST_LIFETIME)
    },
    loadAllData (context) {
      context.commit('setLoadingSomething', true)
      api.getJSON('weightData')
        .then(json => {
          context.commit('setLoadingSomething', false)
          context.commit('setData', json)
        })
    },
    loadDataBetweenPoints (context) {
      // take points from store or use default ones
      // default start = now, default end = now + 7 days
      context.commit('setLoadingSomething', true)
      const start = context.state.startTime / 1000
      const end = context.state.endTime / 1000
      console.log(start, end)
      api.getJSON(`weightDataBetween?start=${start}&end=${end}`)
        .then(json => {
          context.commit('setLoadingSomething', false)
          context.commit('setData', json)
        })
    },
    loadFoodData (context) {
      context.commit('setLoadingSomething', true)
      api.getJSON('sortedFood')
        .then(json => {
          context.commit('setFoodData', json)
          context.commit('setLoadingSomething', false)
        })
    },
    editFood (context, command) {
      const { action, type, expires } = command
      context.commit('editFoodDataEntry', { action, type, expires })
    },
    postFood (context, command) {
      // post to either submitItem or removeItem with type in body
      // if success, remove from local foodData
      const { action, type } = command
      if (action === 'add') {
        return api.post('food/' + type, { type })
          .then(res => {
            console.log('post', res)
            if (res.added === type) {
              return true
            }
            return false
          })
      } else if (action === 'remove') {
        return api.del('food/' + type)
          .then(res => {
            console.log('del', res)
            if (res.type === type) {
              return true
            }
            return false
          })
      }
    },
    setStartTime (context, date) {
      const timestamp = date.getTime()
      context.commit('setStartTime', timestamp)
      context.dispatch('loadDataBetweenPoints')
    },
    setEndTime (context, date) {
      const timestamp = date.getTime()
      context.commit('setEndTime', timestamp)
      context.dispatch('loadDataBetweenPoints')
    },
    loadRecipe (context, id) {
      context.commit('setLoadingSomething', true)
      api.getJSON('recipes/' + id)
        .then(json => {
          context.commit('setLoadingSomething', false)
          context.commit('saveRecipe', { id, recipe: json.ingredients })
        })
    },
    loadRecipeList (context) {
      context.commit('setLoadingSomething', true)
      api.getJSON('recipes')
        .then(json => {
          context.commit('saveRecipeList', json.recipes)
          context.commit('setLoadingSomething', false)
        })
    }
  }
})

export default store
