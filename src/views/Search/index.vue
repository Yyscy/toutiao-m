<template>
  <div>
    <form action="/">
      <van-search
        background="#3296FA"
        v-model="keywwords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="visibleSearchSuggestion"
      />
    </form>
    <component :is="componentName" :value="keywwords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  data () {
    return {
      keywwords: '',
      isShowSearchResults: false,
      isShowSearch: '',
      Suggestions: ''
    }
  },
  methods: {
    onSearch () {
      console.log('正在搜索')
      this.isShowSearchResults = true
    },
    onCancel () {
      this.$router.go(-1)
    },
    visibleSearchSuggestion () {
      this.isShowSearchResults = false
    }
  },
  computed: {
    componentName () {
      if (this.keywwords.trim() === '') {
        return 'SearchHistory'
      }
      if (this.isShowSearchResults) {
        return 'SearchResult'
      }

      return 'SearchSuggestion'
    }
  },
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggestion
  }
}
</script>

<style lang="less" scoped></style>
