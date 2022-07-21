<template>
  <van-cell-group>
    <van-cell title="历史记录">
      <div v-if="judge">
        <span class="cell-span" @click="empty">全部删除</span>
        <span class="cell-span" @click="judge = !judge">完成</span>
      </div>
      <div v-else @click="judge = !judge">
        <van-icon name="delete-o" />
      </div>
    </van-cell>
    <van-cell v-for="(item, index) in history" :key="index" :title="item">
      <template #default>
        <van-icon v-show="judge" @click="remove(index)" name="cross" />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>
export default {
  data () {
    return {
      judge: false,
      history: this.$store.state.history
    }
  },
  methods: {
    empty () {
      this.history = []
      this.$store.commit('setHistory')
    },
    remove (index) {
      this.history.splice(index, 1)
      this.$store.commit('setHistory', this.history)
    }
  }
}
</script>

<style lang="less" scoped>
.cell-span {
  margin: 5px;
}
</style>
