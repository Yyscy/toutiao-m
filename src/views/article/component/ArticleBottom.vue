<template>
  <div>
    <div class="statusbar">
      <van-button class="statusbar-btn" round type="default" @click="showPopup"
        >写评论</van-button
      >
      <van-badge :content="shortComments">
        <van-icon name="comment-o" />
      </van-badge>
      <span @click="clickhoarding">
        <van-icon v-if="this.details.is_collected" name="star" />
        <van-icon v-else name="star-o" />
      </span>

      <span>
        <!-- 取消不喜欢 -->
        <van-icon
          @click="Canceldislike"
          v-if="this.details.attitude == 0"
          name="good-job"
        />
        <!-- 点赞 -->
        <span v-else @click="clickdislike">
          <van-icon v-if="this.details.attitude == -1" name="good-job-o" />
          <van-icon v-else color="red" name="good-job"
        /></span>
      </span>
      <span>
        <van-icon name="share" />
      </span>
    </div>
  </div>
</template>

<script>
import eventBus from '../EventBus'
import {
  hoarding,
  cancelhoarding,
  dislike,
  postgivealike,
  cancelgivealike
} from '@/api'
export default {
  props: {
    shortComments: {
      type: [Number, String],
      required: true
    },
    id: {
      type: String,
      required: true
    },
    details: {
      type: Object,
      required: true
    }
  },
  methods: {
    showPopup () {
      console.log(this.details)
      eventBus.$emit('showPopup', this.id)
    },
    async clickhoarding () {
      try {
        if (this.details.is_collected) {
          await cancelhoarding(this.details.art_id)
        } else {
          await hoarding(this.details.art_id)
        }
        await this.$emit('loading')
      } catch (e) {
        this.$toast(e)
      }
    },
    async clickdislike () {
      try {
        if (this.details.attitude === -1) {
          await postgivealike(this.details.art_id)
        } else {
          await cancelgivealike(this.details.art_id)
        }
        await this.$emit('loading')
      } catch (e) {
        this.$toast(e)
      }
    },
    async Canceldislike () {
      try {
        await dislike()
        await this.$emit('loading')
      } catch (e) {
        this.$toast(e)
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
