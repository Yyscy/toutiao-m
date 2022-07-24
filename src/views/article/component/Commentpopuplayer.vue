<template>
  <van-popup v-model="show" position="bottom" :style="{ height: '100%' }">
    <header>
      <van-nav-bar class="navbar" :title="navbar" @click-left="show = false">
        <template #left>
          <van-icon name="cross" />
        </template>
      </van-nav-bar>
    </header>
    <main>
      <CommentNape :nape="items" :verdict="false"></CommentNape>
      <van-cell class="main-cell" title="全部回复" />
      <van-list
        offset="1"
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="Loadnext"
      >
        <CommentNape
          v-for="item in Commentback"
          :key="item.com_id"
          :nape="item"
          :verdict="false"
          @refurbish="Refresh"
        ></CommentNape>
      </van-list>
    </main>
    <div class="bottom">
      <van-button class="bottom-btn" round type="primary" @click="showPopup"
        >评论</van-button
      >
    </div>
  </van-popup>
</template>

<script>
import { getcomments } from '@/api'
import eventBus from '../EventBus'
import CommentNape from './CommentNape.vue'
export default {
  data () {
    return {
      items: {},
      show: false,
      Commentback: [], // 评论回复
      lastId: '', // 本次结果最后一项评论的id
      loading: false, // 加载
      finished: false, // 完成
      error: false, // 失败 加载
      short_comments: '' // 评论总数
    }
  },
  props: {
    artIdi: {
      type: String,
      required: true
    }
  },
  created () {
    eventBus.$on('send', (item) => {
      this.show = true
      this.items = item
      this.getcomments(item.com_id)
    })
    eventBus.$on('Updatethereply', () => {
      this.Refresh()
    })
  },
  methods: {
    // 获取文章评论
    async getcomments (id) {
      console.log(id)
      try {
        const { data } = await getcomments('c', id, this.lastId)
        if (data.data.total_count === 0) {
          this.finished = true
        } else {
          this.Commentback = data.data.results // 文章评论
          this.short_comments = data.data.total_count // 评论总数
          this.lastId = data.data.last_id // 本次结果最后一项评论的id
        }
      } catch (err) {
        const status = err.response.status
        if (status === 400 || status === 507) {
          this.$toast(err)
        } else {
          this.$toast.fail('获取回复评论失败，请重新刷新')
        }
      }
    },
    async Loadnext () {
      try {
        const { data } = await getcomments('c', this.items.com_id, this.lastId)
        if (data.data.last_id !== data.data.end_id) {
          this.comments.push(...data.data.results)
          this.lastId = data.data.last_id // 本次结果最后一项评论的id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
      } finally {
        this.loading = false
      }
    },
    showPopup () {
      eventBus.$emit('showPopup', this.items.com_id, this.artIdi)
    },
    Refresh () {
      console.log(1)
      this.lastId = ''
      this.getcomments(this.items.com_id)
    }
  },
  computed: {
    navbar () {
      if (this.short_comments === '') {
        return '暂无评论'
      } else {
        return `${this.short_comments}条回复`
      }
    }
  },
  components: {
    CommentNape
  }
}
</script>

<style lang="less" scoped>
.navbar {
  .van-icon {
    color: rgb(0, 0, 0);
  }
}
main {
  .main-cell {
    .van-cell::after {
      border-bottom: 0.02667rem solid #ebedf0;
    }
  }
}
.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: #ff69b4;
  padding: 0.15rem 0;
  .bottom-btn {
    background-color: #fff;
    color: #000;
    width: 80%;
    border: none;
  }
}
</style>
