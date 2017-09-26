<template>
  <div>
    <div>
      Search
      <!-- 1 bind searchText to an input element -->
      <input type="text" v-model="searchText" />
    </div>
    <link-item v-for="(link, index) in allLinks" :key="link.id" :link="link" :index="index"></link-item>
  </div>
</template>

<script>
// 2 import the ALL_LINKS_SEARCH_QUERY
import { ALL_LINKS_SEARCH_QUERY } from '../constants/graphql'
import LinkItem from './LinkItem.vue'

export default {
  name: 'Search',
  data() {
    return {
      allLinks: [],
      searchText: ''
    }
  },
  // 3 define a smart query. Note that variables is a function rather than an object. This means that each time this.searchText is updated, variables will trigger the smart query to re-run. You also define skip which ensures this query will not run if there is no searchText to search
  apollo: {
    allLinks: {
      query: ALL_LINKS_SEARCH_QUERY,
      variables() {
        return {
          searchText: this.searchText
        }
      },
      skip() {
        return !this.searchText
      }
    }
  },
  components: {
    LinkItem
  }
}
</script>
