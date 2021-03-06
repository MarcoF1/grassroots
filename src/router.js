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
      path: '/governments',
      name: 'governments',
      component: () => import('./views/Governments.vue')
    },
    { 
      path: '/government/:id', 
      name: 'government',
      component: () => import('./components/Government.vue') 
    },
    { 
      path: '/rep/:id', 
      name: 'rep',
      component: () => import('./components/RepresentativePage.vue') 
    },
    { 
      path: '/bill/:id', 
      name: 'bill',
      component: () => import('./components/Bill.vue') 
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
    },
    { 
      path: '/feedback', 
      name: 'feedback',
      component: () => {location.href = 'https://forms.gle/4W8FqR2n7Uu1MYJE7'}
    }
  ]
})
