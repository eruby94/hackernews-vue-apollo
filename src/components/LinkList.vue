<template>
  <div>
    <!-- 1 use v-if to display a loading indicator while data is being fetched -->
    <h4 v-if="loading">Loading...</h4>
    <link-item v-for="(link, index) in allLinks" :key="link.id" :link="link" :index="index">
    </link-item>
  </div>
</template>

<script>
// 2 import the query as created
import { ALL_LINKS_QUERY, NEW_LINKS_SUBSCRIPTION } from '../constants/graphql'
import LinkItem from './LinkItem'

export default {
  name: 'LinkList',
  data() {
    return {
      // 3 initialize the data properties as needed (loading will be incremented to 1 when the data is laoded)
      allLinks: [],
      loading: 0
    }
  },
  components: {
    LinkItem
  },
  // 4 Add an apollo object to your component and add an allLinks property to it
  apollo: {
    allLinks: {
      query: ALL_LINKS_QUERY,
      subscribeToMore: [
        // Each object in this array contains a document prop, which represents the subscription itself. In this case, it will fire for created events on the link type, i.e. every time a new link is created
        {
          document: NEW_LINKS_SUBSCRIPTION,
          // The other propery here is updateQuery: similar to udpate, this function allows you to determine how the store should be udpated with the information sent by the server
          updateQuery: (previous, { subscriptionData }) => {
            const newAllLinks = [
              subscriptionData.data.Link.node,
              ...previous.allLinks
            ]
            const result = {
              ...previous,
              allLinks: newAllLinks.slice(0, 5)
            }
            return result
          }
        }
      ]
    }
  }
}
</script>
