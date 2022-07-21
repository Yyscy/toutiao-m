<template>
  <!-- 自定义图标 -->
  <van-popup
    v-model="show"
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '100%' }"
  >
    <div class="popupMain">
      <div class="my-channel">
        <van-cell title="我的频道">
          <van-button
            size="small"
            round
            class="edit-btn"
            @click="judge = !judge"
            >{{ judge ? '完成' : '编辑' }}</van-button
          >
        </van-cell>
        <!-- 我的频道 -->
        <van-grid :badge="false" gutter="10px">
          <van-grid-item
            v-for="(itan, index) in list"
            :key="itan.id"
            :text="itan.name"
            :class="{ aabbcc: itan.name == '推荐' }"
            @click="Deletethechannel(itan, index)"
            ><template #icon>
              <van-icon name="cross" v-show="judge && itan.name !== '推荐'"
            /></template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 推荐频道 -->
      <div class="recommend-channel">
        <!-- 推荐频道标题 -->
        <van-cell title="推荐频道"> </van-cell>
        <!-- 推荐频道 -->
        <van-grid :badge="false" gutter="10px">
          <van-grid-item
            v-for="itan in recommendChannels"
            :key="itan.id"
            icon="plus"
            :text="itan.name"
            @click="addChannel(itan)"
          />
        </van-grid>
      </div>
    </div>
  </van-popup>
</template>

<script>
import { gitAllChannels } from '@/api'
export default {
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      show: false,
      allChannels: [],
      judge: false
    }
  },
  created () {
    this.gitAllChannels()
  },
  methods: {
    async gitAllChannels () {
      const { data } = await gitAllChannels()
      this.allChannels = data.data.channels
      // console.log(data)
    },
    // 删除频道
    Deletethechannel (item, index) {
      if (this.judge && item.name !== '推荐') {
        return this.$emit('delChannel', item.id)
      }
      if (!this.judge) {
        this.show = false
        return this.$emit('switchTo', index)
      }
    },
    addChannel (itan) {
      this.$emit('addChannel', { ...itan })
    }
  },
  computed: {
    recommendChannels () {
      return this.allChannels.filter((item) => {
        return !this.list.find((i) => i.id === item.id)
      })
    }
  }
}
</script>

<style lang="less" scoped>
:deep(.aabbcc) {
  color: red;
}
:deep(.van-grid-item__text) {
  color: unset;
}
.popupMain {
  padding-top: 100px;
  .edit-btn {
    color: red;
    padding: 0 30px;
    height: 48px;
    border: 1px solid red;
  }
  .my-channel {
    :deep(.van-grid-item__content) {
      position: relative;

      .van-grid-item__icon-wrapper {
        position: absolute;
        top: 0;
        right: 0;

        .van-icon-cross {
          position: absolute;
          top: 0;
          right: 0;
          transform: translate(20%, -35%);
          border: 0.02667rem solid #000;
          border-radius: 50%;
          text-align: center;
          z-index: 99;
          //   line-height: 0.32rem;
        }
        .van-icon {
          font-size: 12px;
        }
      }
    }
  }
  // 推荐频道的样式
  .recommend-channel {
    // 推荐频道加号样式
    :deep(.van-grid-item__content) {
      flex-direction: row;

      .van-grid-item__icon {
        font-size: 0.5rem;
      }

      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
