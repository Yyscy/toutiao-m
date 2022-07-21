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
        @blur="onSearch"
      />
    </form>
    <component
      ref="mychild"
      :is="componentName"
      :value="keywwords"
      @clicksearch="clicksearch"
    ></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
export default {
  data () {
    return {
      keywwords: '', // 搜索框内容
      isShowSearchResults: false, // 搜索结果组件
      Suggestions: '' // 搜索意见
    }
  },
  methods: {
    loadmore () {
      this.gitSearchResult(this.keywwords)
    },
    async onSearch () {
      if (this.keywwords.trim()) {
        console.log('正在搜索')
        this.isShowSearchResults = true
        const history = this.$store.state.history
        history.unshift(this.keywwords)
        this.$store.commit('setHistory', history) // 添加历史记录
      }
    },
    onCancel () {
      this.$router.go(-1)
    },
    visibleSearchSuggestion () {
      this.isShowSearchResults = false
    },
    clicksearch (value) {
      this.keywwords = value
      this.onSearch()
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
