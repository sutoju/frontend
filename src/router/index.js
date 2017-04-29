import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard'
import Charts from '@/components/Charts'
import Recipies from '@/components/Recipies'

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
      name: 'Recipies',
      component: Recipies
    }
  ]
})
