<template>
  <div>
    <van-cell class="remark" center>
      <template #icon>
        <van-image round :src="nape.aut_photo" fit="cover"></van-image>
      </template>
      <template #title>
        <div class="remark-name-top">
          <span class="top-name">{{ nape.aut_name }}</span>
          <div @click="Like">
            <van-icon name="good-job-o" />
            <span>{{ nape.like_count === 0 ? '赞' : nape.like_count }}</span>
          </div>
        </div>
        <div class="remark-name">
          <p class="comment-content">{{ nape.content }}</p>
          <div class="remark-date">
            <span class="comment-pubdate"> {{ articleDesc }} </span>
            <van-button class="remark-btn" @click="remark" round type="default"
              >回复 {{ nape.reply_count }}</van-button
            >
          </div>
        </div>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayis from '@/utils/dayjs'
import eventBus from '../EventBus'
import { givealike } from '@/api'
export default {
  props: {
    nape: {
      type: Object,
      required: true
    },
    verdict: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      target: ''
    }
  },
  computed: {
    articleDesc () {
      const art = this.nape.pubdate
      const sss = dayis(art.pubdate).fromNow()
      return sss
    }
  },
  methods: {
    remark () {
      if (this.verdict) {
        eventBus.$emit('send', this.nape)
      }
    },
    async Like () {
      if (this.target === '') {
        try {
          const { data } = await givealike(this.nape.com_id)
          this.target = data.target
          this.$emit('refurbish')
        } catch (err) {
          this.$toast(err)
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.remark {
  display: flex;
  align-items: flex-start;
  justify-content: space-evenly;

  .van-cell::after {
    border-bottom: 0.02667rem solid #ebedf0;
  }
  .van-image {
    width: 0.93333rem;
    height: 0.93333rem;
    margin-right: 0.22667rem;
  }
  .remark-name-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #323233;
    font-size: 0.37333rem;
    line-height: 0.64rem;
    .top-name {
      color: #406599;
      font-size: 0.34667rem;
    }
  }
  .remark-name {
    color: #969799;
    font-size: 0.32rem;
    line-height: 0.48rem;
    .comment-content {
      font-size: 0.42667rem;
      color: #222;
      word-break: break-all;
      text-align: justify;
    }
    .remark-date {
      display: flex;
      align-items: center;
      .remark-btn {
        width: 1.8rem;
        height: 0.64rem;
        line-height: 0.64rem;
        font-size: 0.28rem;
        color: #222;
      }
      .comment-pubdate {
        font-size: 0.25333rem;
        color: #222;
        margin-right: 0.33333rem;
      }
    }
  }
}
</style>
