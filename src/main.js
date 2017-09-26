// 1
import { ApolloClient, createBatchingNetworkInterface } from 'apollo-client'
import 'tachyons'
import Vue from 'vue'
// 2
import VueApollo from 'vue-apollo'

import App from './App'
// import router from './router'

Vue.config.productionTip = false

// 3
const networkInterface = createBatchingNetworkInterface({
  uri: 'https://api.graph.cool/simple/v1/cj80yaozs09yp0125x224lo1x'
})

// 4
const apolloClient = new ApolloClient({
  networkInterface,
  connectToDevTools: true
})

// 5
Vue.use(VueApollo)

// 6
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // 7
  apolloProvider,
  // router,
  render: h => h(App)
})
