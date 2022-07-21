<template>
  <div class="my">
    <header>
      <div v-if="isLogin" class="my-tou enter">
        <van-row></van-row>
        <van-row class="row-2">
          <van-col span="12">
            <van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="list.photo"
              >
                ></van-image
              >
              <span class="enter-text">{{ list.name }}</span>
            </van-row>
          </van-col>
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button class="code-btn" type="primary">编辑资料</van-button>
            </van-row>
          </van-col>
        </van-row>

        <van-grid class="grid" :border="false">
          <van-grid-item text="头条">
            <template #icon>10</template>
          </van-grid-item>
          <van-grid-item text="粉丝">
            <template #icon>10</template>
          </van-grid-item>
          <van-grid-item text="关注">
            <template #icon>10</template>
          </van-grid-item>
          <van-grid-item text="获赞">
            <template #icon>10</template>
          </van-grid-item>
        </van-grid>
      </div>
      <div v-else class="my-tou notLogin">
        <div class="notLogin-img">
          <img src="~@/assets/images/mobile.png" alt="" />
        </div>
        <div class="notLogin-text" @click="register">登录 / 注册</div>
      </div>
    </header>
    <main>
      <div class="xia">
        <van-grid :column-num="2" class="grid">
          <van-grid-item text="收藏">
            <template #icon>
              <span class="toutiao toutiao-shoucang"></span>
            </template>
          </van-grid-item>
          <van-grid-item text="历史">
            <template #icon>
              <span class="toutiao toutiao-lishi"></span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="link xia">
        <van-cell is-link title="消息通知" />
        <van-cell is-link title="小智同学" />
      </div>
    </main>
    <van-button v-if="isLogin" block class="login-ban" @click="logout"
      >退出登录</van-button
    >
  </div>
</template>

<script>
import { myMessage, Fanlist, watchlist, setLocalchannel } from '@/api'
export default {
  data () {
    return {
      list: {}, // 个人信息
      fans: {}, // 粉丝数据
      watch: {} // 关注数据
    }
  },
  created () {
    if (this.isLogin) {
      // 用户个人信息
      this.loadUser()
    }
  },
  methods: {
    // 登录
    register () {
      setLocalchannel([])
      this.$router.push('/Login')
    },
    // 退出
    logout () {
      this.$dialog
        .confirm({
          title: '退出提示',
          message: '确认退出？'
        })
        .then(() => {
          setLocalchannel([])
          // console.log(this.$store)
          this.$store.commit('setUser', {})
        })
        .catch(() => {})
    },
    async loadUser () {
      try {
        const { data } = await myMessage()
        this.list = data.data
        // console.log(data)
      } catch (err) {
        // console.log(err)
        this.$toast('获取数据失败')
      }
      try {
        const { data } = await Fanlist()
        this.fans = data.data
        // console.log(data)
      } catch (err) {
        // console.log(err)
        this.$toast('粉丝数据失败')
      }
      try {
        const { data } = await watchlist()
        this.watch = data.data
        // console.log(data)
      } catch (err) {
        // console.log(err)
        this.$toast('粉丝数据失败')
      }
    }
  },
  computed: {
    isLogin () {
      return !!this.$store.state.user.token
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  background-color: #f4f7f9c0;
  height: calc(100vh - 100px);
}
.grid {
  :deep(.van-grid-item__content) {
    background-color: unset;
  }
}
.xia {
  margin-bottom: 10px;
}
header {
  .my-tou {
    width: 100%;
    height: 5rem;
    background-color: #3296fa;
  }
  .enter {
    display: flex;
    flex-direction: column;
    > .van-row {
      flex: 1;
    }
    .row-2 {
      .van-col {
        height: 100%;
      }
      .enter-text {
        color: #fff;
        font-size: 14px;
      }
      .code-row {
        height: 100%;
      }
      .code-btn {
        width: 1.53333rem;
        height: 0.42667rem;
        background: #fff;
        border-radius: 0.21333rem;
        font-size: 0.26667rem;
        color: #666;
        padding: 0;
      }
    }

    .van-grid-item {
      color: #fff;
      :deep(.van-grid-item__text) {
        color: #fff;
      }
    }
  }
}
.notLogin {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .notLogin-img {
    width: 1.65rem;
    height: 1.65rem;
    margin-bottom: 0.1875rem;
    img {
      width: 100%;
    }
  }
  .notLogin-text {
    font-size: 0.35rem;
    font-family: 'MicrosoftYaHei';
    color: #ffffff;
  }
}

// 主体区域
main {
  .grid {
    color: #646566;
    // 字体图标
    .toutiao {
      font-size: 0.6rem;

      &.toutiao-lishi {
        color: #ffb31d;
      }
      &.toutiao-shoucang {
        color: #ed5253;
      }
    }
  }
}
.login-ban {
  :deep(.van-button__text) {
    color: red;
  }
}
</style>
