<template>
  <div>
    <header>
      <h1 class="article-title">{{ details.title }}</h1>
      <van-cell center>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #icon>
          <van-image round :src="details.aut_photo" fit="cover"></van-image>
        </template>
        <template #title>
          <div class="user-name">{{ details.aut_name }}</div>
          <div class="publish-date">
            <span>
              {{ articleDesc }}
            </span>
          </div>
        </template>

        <template #right-icon
          ><van-button
            v-if="details.is_followed"
            @click="unfollow"
            class="right-btn"
            round
            type="default"
          >
            <span v-if="replace">已关注</span>
            <van-loading v-else size="14px" type="spinner"
          /></van-button>
          <van-button
            v-else
            @click="focusontheuser"
            class="right-btn"
            round
            type="info"
            ><div v-if="replace">
              <van-icon name="plus" />
              <span>关注</span>
            </div>

            <van-loading v-else size="14px" type="spinner"
          /></van-button>
        </template>
      </van-cell>
    </header>
    <article
      class="article-content markdown-body"
      style="text-align: left"
      v-html="details.content"
    ></article>
  </div>
</template>

<script>
import { Focusontheuser, unfollow } from '@/api'
import 'github-markdown-css/github-markdown.css'
// 时间处理
import dayis from '@/utils/dayjs'
export default {
  props: {
    details: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      content: '',
      replace: true
    }
  },
  methods: {
    // 关注
    async focusontheuser () {
      try {
        this.replace = !this.replace
        await Focusontheuser(this.details.aut_id)
        await this.$emit('loading')
        this.replace = !this.replace
      } catch (err) {
        const arr = err.response.data.message
        this.$toast(arr)
        this.replace = true
      }
    },
    // 取消关注
    async unfollow () {
      try {
        this.replace = !this.replace
        await unfollow(this.details.aut_id)
        await this.$emit('loading')
        this.replace = !this.replace
      } catch (err) {
        this.$toast(err)
      }
    }
  },
  computed: {
    articleDesc () {
      const art = this.details
      const sss = dayis(art.pubdate).fromNow()
      return sss
    }
    // judge () {
    //   return this.details.like_count
    // }
  }
}
</script>

<style lang="less" scoped>
//这个要配合移动端 不是很理解
header {
  .article-title {
    font-size: 0.53333rem;
    padding: 0.66667rem 0.42667rem;
    margin: 0;
    color: #3a3a3a;
  }
  .van-cell {
    padding: 0 0.42667rem;
  }
  .van-image {
    width: 0.93333rem;
    height: 0.93333rem;
    margin-right: 0.22667rem;
  }
  .user-name {
    font-size: 0.32rem;
    color: #3a3a3a;
  }
  .publish-date {
    font-size: 0.30667rem;
    color: #b7b7b7;
    line-height: 0.48rem;
  }
  .right-btn {
    width: 2.26667rem;
    height: 0.77333rem;
    font-size: 0.32rem;
  }
}
.article-content {
  padding: 0.73333rem 0.42667rem;
  @media (max-width: 767px) {
    .markdown-body {
      -webkit-text-size-adjust: 100%;
      color: #24292e;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Helvetica, Arial,
        sans-serif, Apple Color Emoji, Segoe UI Emoji;
      font-size: 0.21333rem;
      line-height: 1.5;
      word-wrap: break-word;
    }
  }
}
</style>
