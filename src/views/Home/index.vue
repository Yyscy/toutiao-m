<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round @click="$router.push('/search')">
          <van-icon name="search" />搜索</van-button
        >
      </template>
    </van-nav-bar>

    <van-tabs v-model="activeName">
      <van-tab
        v-for="(itam, index) in MyChannel"
        :key="itam.id"
        :title="itam.name"
        :name="index"
      >
        <Articlelist :id="itam.id"></Articlelist>
      </van-tab>
      <samp class="toutiao toutiao-gengduo" @click="popup"></samp>
      <EditChannelPopup
        ref="popup"
        :list="MyChannel"
        @delChannel="delChannel"
        @switchTo="switchTo"
        @addChannel="addChannel"
      ></EditChannelPopup>
    </van-tabs>
  </div>
</template>

<script>
import EditChannelPopup from './component/EditChannelPopup.vue'
import {
  gitMyChannel,
  setLocalchannel,
  getLocalchannel,
  delMyChannel,
  addMyChannel
} from '@/api'
import Articlelist from './component/Articlelist.vue'
export default {
  data () {
    return {
      activeName: 0,
      MyChannel: getLocalchannel() || [],
      show: false
    }
  },
  created () {
    this.loadUser()
  },

  methods: {
    async loadUser () {
      if (this.MyChannel.length === 0) {
        try {
          const { data } = await gitMyChannel()
          this.MyChannel = data.data.channels
          setLocalchannel(this.MyChannel)
          console.log(data)
        } catch (err) {
          // console.log(err)
          this.$toast('获取数据失败')
        }
      }
    },
    popup () {
      this.$refs.popup.show = !this.$refs.popup.show
    },
    // 删除频道
    async delChannel (id) {
      this.MyChannel = this.MyChannel.filter((ele) => ele.id !== id)
      if (this.isLogin) {
        try {
          await delMyChannel(id)
        } catch (e) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      setLocalchannel(this.MyChannel)

      this.$toast.success('删除用户频道成功')
    },
    // 切换频道
    switchTo (index) {
      // console.log(index)
      this.activeName = index
    },
    // 添加频道
    async addChannel (ele) {
      this.MyChannel.push(ele)
      if (this.isLogin) {
        try {
          await addMyChannel(ele.id, this.MyChannel.length)
        } catch (e) {
          return this.$toast.fail('添加用户频道失败')
        }
      }
      setLocalchannel(this.MyChannel)
      this.$toast.success('添加用户频道成功')
    }
  },
  // methods: {
  //   async loadUser () {
  //     if (!this.isLogin) {
  //       const channel = getLocalchannel()
  //       if (channel) {
  //         this.channelList = channel
  //       } else {
  //         const { data } = await gitMyChannel()
  //         this.channelList = data.data.channels
  //       }
  //     } else {
  //       const { data } = await gitMyChannel()
  //       this.channelList = data.data.channels
  //     }
  //     // console.log(this.channelList)
  //   },
  //   // 删除
  //   async delChannel (id) {
  //     this.channelList = this.channelList.filter((ele) => ele.id !== id)
  //     if (!this.user) {
  //       setLocalchannel(this.channelList)
  //       this.$toast('删除成功')
  //     } else {
  //       try {
  //         await delMyChannel(id)
  //         this.$toast('删除成功')
  //       } catch (err) {
  //         this.$toast('删除失败')
  //       }
  //     }
  //   },
  //   // 切换
  //   switchTo (index) {
  //     this.active = index
  //   },
  //   // 添加
  //   async addChannel (ele) {
  //     this.channelList.push(ele)
  //     if (!this.user) {
  //       setLocalchannel(this.channelList)
  //       this.$toast('添加成功')
  //     } else {
  //       try {
  //         await addMyChannel(ele.id, this.channelList.length)
  //         this.$toast('添加成功')
  //       } catch (err) {
  //         this.$toast('添加失败')
  //       }
  //     }
  //   },
  //   popup () {
  //     this.$refs.popup.show = !this.$refs.popup.show
  //   }
  // },

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
