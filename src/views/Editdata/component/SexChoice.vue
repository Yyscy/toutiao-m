<template>
  <van-picker
    title="更新性别"
    show-toolbar
    :default-index="list.gender"
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
  />
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
  data () {
    return {
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm (value, index) {
      try {
        await EditYourInformation({ gender: index })
        this.$emit('updateinfo')
      } catch (e) {
        this.$toast('修改失败')
      }
    },
    onCancel () {
      this.$emit('calloff')
    }
  }
}
</script>

<style></style>
