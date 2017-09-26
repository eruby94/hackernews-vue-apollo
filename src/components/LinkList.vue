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
import { ALL_LINKS_QUERY } from '../constants/graphql'
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
      query: ALL_LINKS_QUERY
    }
  }
}
</script>
