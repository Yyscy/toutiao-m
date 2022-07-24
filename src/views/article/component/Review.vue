<template>
  <van-popup v-model="show" position="bottom">
    <div class="comments">
      <van-field
        class="comments_field"
        v-model="content"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入留言"
        show-word-limit
      />
      <van-button class="comments_btn" @click="postacomments" type="default"
        >发布</van-button
      >
    </div>
  </van-popup>
</template>

<script>
import eventBus from '../EventBus'
import { Postacomment } from '@/api'
export default {
  // props: {
  //   id: {
  //     type: String,
  //     required: true
  //   },
  //   artId: {
  //     type: String,
  //     required: false
  //   }
  // },
  data () {
    return {
      show: false,
      content: '',
      id: '',
      artId: ''
    }
  },
  created () {
    eventBus.$on('showPopup', (id, artId) => {
      this.id = id
      this.artId = artId
      this.show = true
    })
  },
  methods: {
    // 发布评论
    async remark () {
      try {
        await Postacomment(this.id, this.content, this.artId)
      } catch (err) {
        this.$toast(err)
      }
    },
    async postacomments () {
      try {
        await this.remark()
        this.$toast('评论成功')
        this.content = ''
        this.show = false

        if (this.artId === undefined) {
          // console.log('artId', this.artId)
          eventBus.$emit('Updatethecomments')
        } else {
          // console.log('artId', this.artId)
          eventBus.$emit('Updatethereply')
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>
// 发布评论
.comments {
  display: flex;
  align-items: center;
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
  .comments_field {
    background-color: #f5f7f9;
  }
  .comments_btn {
    width: 2rem;
    border: none;
    padding: 0;
    color: #6ba3d8;
  }
}
</style>
