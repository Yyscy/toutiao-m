<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="Changethebirthday"
    @cancel="onCancel"
  />
</template>

<script>
import dayis from '@/utils/dayjs'
import { EditYourInformation } from '@/api'
export default {
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: dayis(this.list.birthday).$d
    }
  },
  props: {
    list: {
      type: Object,
      required: true
    }
  },
  methods: {
    async Changethebirthday (value) {
      const val = dayis(value).format('YYYY-MM-DD')
      //   console.log(val)
      try {
        await EditYourInformation({ birthday: val })
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
