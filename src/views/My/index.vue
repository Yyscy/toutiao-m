<template>
  <div class="my">
    <header>
      <!-- 登录 -->
      <div v-if="isLogin" class="my-tou enter">
        <van-row></van-row>
        <van-row class="row-2" type="flex" justify="space-between">
          <van-col>
            <van-row type="flex" align="center">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="list.photo"
              />
              <span class="enter-text">{{ list.name }}</span>
            </van-row>
          </van-col>
          <van-col>
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button class="code-btn" type="primary" @click="Editdata"
                >编辑资料</van-button
              >
            </van-row>
          </van-col>
        </van-row>
        <van-grid class="grid" :border="false">
          <van-grid-item text="头条">
            <template #icon>
              <span class="gridtext">{{ list.art_count }}</span>
            </template>
          </van-grid-item>
          <van-grid-item text="粉丝">
            <template #icon>
              <span class="gridtext">{{ list.fans_count }}</span>
            </template>
          </van-grid-item>
          <van-grid-item text="关注">
            <template #icon>
              <span class="gridtext">{{ list.follow_count }}</span>
            </template>
          </van-grid-item>
          <van-grid-item text="获赞">
            <template #icon>
              <span class="gridtext">{{ list.like_count }}</span>
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <!-- 未登录 -->
      <div v-else class="my-tou notLogin">
        <div class="notLogin-img">
          <img src="~@/assets/images/mobile.png" alt="" />
        </div>
        <div class="notLogin-text" @click="register">登录 / 注册</div>
      </div>
    </header>
    <main>
      <div class="xia main-grid">
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
import { myMessage } from '@/api'
export default {
  data () {
    return {
      list: {} // 个人信息
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
          console.log(this.$store.state.user)
          // this.$router.push('/Login')
          this.$store.commit('setUser', {})
        })
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
    },
    Editdata () {
      this.$router.push('/editdata')
    }
  },
  computed: {
    isLogin () {
      return this.$store.state.user.token
    }
  }
}
</script>

<style lang="less" scoped>
.my {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
}
.grid {
  :deep(.van-grid-item__content) {
    background-color: unset;
  }
  .gridtext {
    font-size: 0.34667rem;
    display: block;
  }
}
.xia {
  margin-bottom: 10px;
}
header {
  .my-tou {
    width: 100%;
    height: 400px;
    background: url('@/assets/images/banner.png') no-repeat;
    background-size: cover;
  }
  .enter {
    display: flex;
    flex-direction: column;
    > .van-row {
      flex: 1;
    }
    .row-2 {
      padding: 0 0.42667rem;
      .van-col {
        height: 100%;
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

      .enter-text {
        font-size: 0.4rem;
        color: #fff;
        padding-left: 0.29333rem;
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
  .main-grid {
    background-color: #fff;
  }
}
.login-ban {
  :deep(.van-button__text) {
    color: red;
  }
}
</style>
