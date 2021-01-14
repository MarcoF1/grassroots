import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('./views/Main.vue')
    },
    {
      path: '/team',
      name: 'team',
      component: () => import('./views/Team.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('./views/Account.vue')
    },
    {
      path: '/find',
      name: 'find',
      component: () => import('./views/Find.vue')
    },
    { 
      path: '/district/:id', 
      name: 'district',
      component: () => import('./components/District.vue') 
    },
    { 
      path: '/rep/:id', 
      name: 'rep',
      component: () => import('./components/Representative.vue') 
    },
    { 
      path: '/bill/:id', 
      name: 'bill',
      component: () => import('./components/Bill.vue') 
    },
    { 
      path: '/feed', 
      name: 'feed',
      component: () => import('./views/Feed.vue') 
    },
    { 
      path: '/people', 
      name: 'people',
      component: () => import('./views/People.vue') 
    },
    { 
      path: '/user/:id', 
      name: 'user',
      component: () => import('./components/User.vue') 
    }
  ]
})
