<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar" title="登录" @click-left="backToPrePage">
      <template #left>
        <van-icon name="cross" />
      </template>
    </van-nav-bar>

    <!-- 手机号/验证码表单 -->
    <!--  <van-field></van-field> : 输入框 包括各种type类型的输入,text,password.. textarea -->
    <!-- form里input 必须给name, 用于标识 -->
    <van-form class="form" @submit="login">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号', trigger: 'onChange' }
        ]"
      >
        <template #label>
          <span class="toutiao toutiao-shouji"></span>
        </template>
      </van-field>
      <van-field
        v-model="code"
        type="text"
        name="code"
        placeholder="请输入验证码"
        :rules="[{ required: true, message: '请输入验证码' }]"
      >
        <!-- 左侧字体图标 -->
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>

        <!-- 右侧验证码图标 -->
        <template #right-icon>
          <van-button class="code-btn" size="mini" round>发送验证码</van-button>
        </template>
      </van-field>

      <!-- 登录按钮 -->
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <!-- 登录按钮 -->
  </div>
</template>

<script>
// 引入api
import { login } from '@/api/user'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '',
      code: ''
    }
  },
  methods: {
    // 返回来之前的页面
    backToPrePage () {
      this.$router.back()
    },
    // 登录
    async login () {
      const res = await login(this.mobile, this.code)
      console.log(res)
    }
  }
}
</script>

<style scoped lang="less">
// 自定义导航栏样式
//  :deep() 穿透scoped样式
.navbar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }

  .van-icon {
    color: #fff;
  }
}

// 表单域样式
.form {
  :deep(.van-field__label) {
    flex: 1;
  }

  :deep(.van-cell__value) {
    flex: 20;
  }

  .toutiao {
    font-size: 0.49333rem;
  }
  .code-btn {
    background-color: #eee;
    padding: 0 10px;
    color: #666;
  }
}
</style>
