<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      success-text="刷新成功~"
    >
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
          v-for="item in articles"
          :key="item.art_id"
          :articleitam="item"
        ></Articleitam>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import Articleitam from './Articleitam.vue'
import { gitArticleList } from '@/api'
export default {
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      articles: [],
      preTimestamp: '',
      loading: false,
      finished: false,
      error: false,
      refreshing: false
    }
  },
  created () {
    this.gitArticleList()
  },
  methods: {
    async gitArticleList () {
      try {
        const { data } = await gitArticleList(this.id, +new Date())
        this.preTimestamp = data.data.pre_timestamp
        this.articles = data.data.results
        console.log(data)
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.methods)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新')
        }
      }
    },
    async Loadnext () {
      try {
        const { data } = await gitArticleList(this.id, this.preTimestamp)
        if (this.preTimestamp !== data.data.pre_timestamp) {
          if (this.refreshing) {
            this.articles.unshift(...data.data.results)
          } else {
            this.articles.push(...data.data.results)
          }
          this.preTimestamp = data.data.pre_timestamp
        }
        if (!this.preTimestamp) {
          this.finished = true
        }
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
        this.refreshing = false
      }
    },
    onRefresh () {
      this.Loadnext()
    }
  },
  components: {
    Articleitam
  }
}
</script>

<style></style>
