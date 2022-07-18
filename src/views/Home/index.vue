<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round> <van-icon name="search" />搜索</van-button>
      </template>
    </van-nav-bar>

    <van-tabs v-model="activeName">
      <van-tab
        v-for="itam in MyChannel"
        :key="itam.id"
        :title="itam.name"
        :name="itam.id"
      >
        <Articlelist :id="itam.id"></Articlelist>
      </van-tab>
      <samp class="toutiao toutiao-gengduo" @click="popup"></samp>
      <EditChannelPopup ref="popup" :list="MyChannel"></EditChannelPopup>
    </van-tabs>
  </div>
</template>

<script>
import EditChannelPopup from './component/EditChannelPopup.vue'
import { gitMyChannel } from '@/api'
import Articlelist from './component/Articlelist.vue'
export default {
  data () {
    return {
      activeName: '',
      MyChannel: [],
      show: false
    }
  },
  created () {
    if (this.isLogin) {
      this.loadUser()
    }
  },
  methods: {
    async loadUser () {
      try {
        const { data } = await gitMyChannel()
        this.MyChannel = data.data.channels
        console.log(data)
      } catch (err) {
        // console.log(err)
        this.$toast('获取数据失败')
      }
    },
    popup () {
      this.$refs.popup.show = !this.$refs.popup.show
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  },
  components: {
    Articlelist,
    EditChannelPopup
  }
}
</script>

<style lang="less" scoped>
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 99;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}
</style>
