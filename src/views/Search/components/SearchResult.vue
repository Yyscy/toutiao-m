<template>
  <div>
    <van-list
      offset="1"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="Loadnext"
    >
      <Articleitam
        v-for="item in searchresult"
        :key="item.art_id"
        :articleitam="item"
      ></Articleitam>
    </van-list>
  </div>
</template>

<script>
import Articleitam from '@/views/Home/component/Articleitam.vue'
import { gitSearchResult } from '@/api'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loading: false,
      finished: false,
      error: false,
      searchresult: [], // 搜素结果
      page: 1, // 页码
      totalcount: 1, // 文章总数
      SearchHistory: [] // 搜索记录
    }
  },
  // created () {
  //   this.gitSearchResult()
  //   console.log(11)
  // },
  methods: {
    async gitSearchResult () {
      try {
        const { data } = await gitSearchResult(this.page, this.value)
        this.totalcount = data.data.total_count
        this.page = data.data.page + 1
        this.searchresult.push(...data.data.results)
      } catch (error) {
        this.$toast.fail('获取文章列表失败，请重新刷新')
      }
    },
    async Loadnext () {
      try {
        if (this.searchresult.length <= this.totalcount) {
          await this.gitSearchResult()
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  },
  components: {
    Articleitam
  }
}
</script>

<style></style>
