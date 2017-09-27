import Vue from 'vue'
import Router from 'vue-router'

// 1 import components to be rendered for each route
import CreateLink from '../components/CreateLink.vue'
import LinkList from '../components/LinkList.vue'
import AppLogin from '../components/AppLogin.vue'
import Search from '../components/Search.vue'

Vue.use(Router)

export default new Router({
  // 2 map each route to the proper component to be rendered
  routes: [
    {
      path: '/',
      redirect: '/new/1'
    },
    {
      path: '/create',
      component: CreateLink
    },
    {
      path: '/login',
      component: AppLogin
    },
    {
      path: '/new/:page',
      component: LinkList
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/top',
      component: LinkList
    }
  ],
  // 3 set mode to 'history' to remove the hash from URLs
  mode: 'history'
})
