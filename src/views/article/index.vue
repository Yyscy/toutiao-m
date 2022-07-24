<template>
  <div>
    <header>
      <van-nav-bar
        :fixed="true"
        class="navbar"
        left-arrow
        title="黑马头条"
        @click-left="$router.back()"
      >
      </van-nav-bar>
    </header>

    <main class="details">
      <Thearticledetails
        :details="Thearticledetails"
        @loading="Newsdetails"
      ></Thearticledetails>

      <van-divider>正文结束</van-divider>
      <van-list
        offset="1"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="Loadnext"
      >
        <div class="comment">
          <CommentNape
            v-for="(item, index) in comments"
            :key="index"
            :nape="item"
            :verdict="true"
          ></CommentNape>
        </div>
      </van-list>
      <Commentpopuplayer :artIdi="id"></Commentpopuplayer>
    </main>
    <ArticleBottom
      :shortComments="short_comments"
      :details="Thearticledetails"
      :id="id"
      @loading="Newsdetails"
    ></ArticleBottom>
    <Review></Review>
  </div>
</template>

<script>
import { gitNewsdetails, getcomments } from '@/api'
import Thearticledetails from './component/Thearticledetails.vue'
import CommentNape from './component/CommentNape.vue'
import Commentpopuplayer from './component/Commentpopuplayer.vue'
import ArticleBottom from './component/ArticleBottom.vue'
import Review from './component/Review.vue'
import eventBus from './EventBus'
export default {
  data () {
    return {
      loading: false, // 加载
      finished: false, // 完成
      error: false, // 失败 加载
      Thearticledetails: {}, // 文章详情
      id: this.$route.params.id, // 文章id
      comments: [], // 文章评论
      lastId: '', // 本次结果最后一项评论的id
      short_comments: '', // 评论总数
      content: '' // 评论内容
    }
  },
  created () {
    this.Newsdetails()
    this.getcomments()
    eventBus.$on('Updatethecomments', () => {
      this.Refresh()
    })
  },
  methods: {
    // 文章详情
    async Newsdetails () {
      try {
        const { data } = await gitNewsdetails(this.$route.params.id)
        this.Thearticledetails = data.data
        // console.log(data)
      } catch (err) {
        this.$toast(err)
      }
    },
    // 获取文章评论
    async getcomments () {
      try {
        const { data } = await getcomments('a', this.id, this.lastId)
        if (data.data.total_count === 0) {
          this.finished = true
        } else {
          this.comments = data.data.results // 文章评论
          this.short_comments = data.data.total_count // 评论总数
          this.lastId = data.data.last_id // 本次结果最后一项评论的id
        }
      } catch (err) {
        const status = err.response.status
        if (status === 400 || status === 507) {
          this.$toast(err)
        } else {
          this.$toast.fail('获取评论失败，请重新刷新')
        }
      }
    },
    async Loadnext () {
      try {
        const { data } = await getcomments('a', this.id, this.lastId)
        if (data.data.last_id !== data.data.end_id) {
          this.comments.push(...data.data.results)
          this.lastId = data.data.last_id // 本次结果最后一项评论的id
        } else {
          this.finished = true
        }
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    Refresh () {
      this.lastId = ''
      this.getcomments()
    }
  },
  components: {
    Thearticledetails, // 文章详情
    CommentNape, // 评论项
    Commentpopuplayer, // 评论回复
    ArticleBottom, // 底部
    Review
  }
}
</script>

<style lang="less" scoped>
// 自定义导航栏样式
//  :deep() 穿透scoped样式
.navbar {
  width: 100%;
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}
.details {
  margin-top: 1.22667rem;
  margin-bottom: 1.22667rem;
}
.statusbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90px;
  background-color: #fff;
  color: rgb(119, 119, 119);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  .statusbar-btn {
    height: 40px;
    width: 280px;
    font-size: 0.4rem;
    line-height: 0.61333rem;
    color: #a7a7a7;
  }
}
</style>
