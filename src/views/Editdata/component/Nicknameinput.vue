<template>
  <div>
    <van-nav-bar
      :fixed="true"
      title="更新昵称"
      left-text="返回"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { EditYourInformation } from '@/api'
export default {
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  data: function () {
    return {
      message: this.list.name
    }
  },
  methods: {
    async onClickRight () {
      try {
        await EditYourInformation({ name: this.message })
        this.$emit('updateinfo')
      } catch (e) {
        this.$toast('修改失败')
      }
    },
    onClickLeft () {
      this.$emit('calloff')
    }
  }
}
</script>

<style lang="less" scoped>
.agname {
  //   width:100%;
  height: 10rem;
}
</style>
