<template>
  <div>
    <van-cell
      v-for="(item, index) in SearchHighlight"
      :key="item"
      @click="clicksearch(Suggestions[index])"
    >
      <template #icon>
        <van-icon name="search" class="search-icon" />
      </template>
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { SearchSuggestions } from '@/api'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      Suggestions: []
    }
  },
  watch: {
    value: {
      immediate: true,
      handler () {
        this.Searchsuggestions()
      }
    }
  },
  methods: {
    async Searchsuggestions () {
      try {
        const { data } = await SearchSuggestions(this.value.trim())
        this.Suggestions = data.data.options.filter(Boolean)
        console.log(this.Suggestions)
      } catch (err) {
        // console.log(err)
        this.$toast('获取数据失败')
      }
    },
    clicksearch (value) {
      this.$emit('clicksearch', value)
      const history = this.$store.state.history
      history.unshift(value)
      this.$store.commit('setHistory', history)
    }
  },
  computed: {
    SearchHighlight () {
      const reg = new RegExp(this.value, 'ig')
      return this.Suggestions.map((str) =>
        str.replace(reg, (match) => `<span style="color: red">${match}</span>`)
      )
    }
  }
}
</script>

<style lang="less" scoped>
.search-icon {
  padding-top: 10px;
}
</style>
