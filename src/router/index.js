import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Charts from '@/components/Charts'
import Recipies from '@/components/Recipies'
import Recipe from '@/components/Recipe'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
    },
    {
      path: '/chart',
      name: 'Chart',
      component: Charts
    },
    {
      path: '/recipies',
      name: 'Recipes',
      component: Recipies
    },
    {
      path: '/recipe/:id',
      name: 'Recipe',
      component: Recipe
    }
  ]
})
