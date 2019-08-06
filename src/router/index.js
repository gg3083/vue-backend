import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const constantRouterMap = [{
    path: '/list',
    component: () => import('@/views/list'),
    hidden: true
  },
  {
    path: '/',
    // component: Layout,
    redirect: 'list',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/list'),
      name: '首页',
      meta: {
        title: '首页',
        icon: 'dashboard',
        noCache: true
      }
    }]
  },

]

export default new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

export const asyncRouterMap = [

]
