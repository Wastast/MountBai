import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/analysis',
      name: 'Analysis',
      component: () => import(/* webpackChunkName: "about" */ './views/Analysis/index.vue')
    },
    {
      path: '/control',
      name: 'control',
      component: () => import(/* webpackChunkName: "about" */ './views/control/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import(/* webpackChunkName: "about" */ './views/login/index.vue')
    }
  ]
})
