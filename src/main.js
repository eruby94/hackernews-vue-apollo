// 1 import required dependencies from apollo-client package
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client'
import 'tachyons'
import Vue from 'vue'
// 2 import vue-apollo package
import VueApollo from 'vue-apollo'

import App from './App'
import router from './router'

import { GC_USER_ID, GC_AUTH_TOKEN } from './constants/settings'
import {
  SubscriptionClient,
  addGraphQLSubscriptions
} from 'subscriptions-transport-ws'

Vue.config.productionTip = false

// 3 create the networkInterface
const networkInterface = createBatchingNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj80yaozs09yp0125x224lo1x'
})

const wsClient = new SubscriptionClient(
  'wss://subscriptions.us-west-2.graph.cool/v1/cj80yaozs09yp0125x224lo1x',
  {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(GC_AUTH_TOKEN)
    }
  }
)

const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface,
  wsClient
)

networkInterface.use([
  {
    applyBatchMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {}
      }
      const token = localStorage.getItem(GC_AUTH_TOKEN)
      req.options.headers.authorization = token ? `Bearer ${token}` : null
      next()
    }
  }
])
// 4 instantiate the ApolloClient by passing in the networkInterface
const apolloClient = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions,
  connectToDevTools: true
})

// 5 install the VueApollo plugin
Vue.use(VueApollo)

// 6 Create a new ApolloClient instance through VueApollo and set the defaultClient to the apolloClient
//   also set the $loadingKey to 'loading' so that we can easily display a loading indicator in the UI
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

// 1-2 get the current GC_USER_ID from localStorage if there is one
let userId = localStorage.getItem(GC_USER_ID)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 7 specify the apolloProvider on the root component
  apolloProvider,
  router,
  // 2-2 set this usjerId on the $root $data object
  data: {
    userId
  },
  render: h => h(App)
})
