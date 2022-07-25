<template>
  <div class="aa">
    <header>
      <van-nav-bar
        :fixed="true"
        class="navbar"
        left-arrow
        title="个人信息"
        @click-left="$router.back()"
      >
      </van-nav-bar>
    </header>
    <main>
      <input type="file" ref="file" hidden accept=".png,.jpg" />
      <van-cell @click="$refs.file.click()" title="头像" center is-link>
        <template #default>
          <van-image width="30" height="30" round :src="list.photo" />
        </template>
      </van-cell>
      <van-cell title="昵称" @click="names" is-link :value="list.name" />
      <van-cell
        title="性别"
        @click="genders"
        is-link
        :value="Genderdistinguish"
      />
      <van-cell
        title="生日"
        @click="birthdays"
        is-link
        :value="list.birthday"
      />
    </main>
    <van-popup v-model="show" position="bottom" :style="{ height: heights }">
      <component
        :is="subassembly"
        :list="list"
        :photo="photo"
        @updateinfo="updateinfo"
        @calloff="calloff"
      />
    </van-popup>
  </div>
</template>
<script>
import { personaldetails } from '@/api'
import Nicknameinput from './component/Nicknameinput.vue'
import SexChoice from './component/SexChoice.vue'
import TimePicker from './component/TimePicker.vue'
import HeadPortraits from './component/HeadPortraits.vue'
export default {
  data () {
    return {
      list: '',
      subassembly: '',
      show: false,
      heights: null,
      photo: ''
    }
  },
  created () {
    this.personaldetails()
  },
  methods: {
    async personaldetails () {
      try {
        const { data } = await personaldetails()
        this.list = data.data
        // console.log(data)
      } catch (err) {
        // console.log(err)
        this.$toast('获取数据失败')
      }
    },
    names () {
      this.heights = '100%'
      this.show = true
      this.subassembly = 'Nicknameinput'
    },
    genders () {
      this.show = true
      this.subassembly = 'SexChoice'
    },
    birthdays () {
      this.show = true
      this.subassembly = 'TimePicker'
    },
    // 更新
    updateinfo () {
      this.personaldetails()
      this.show = false
      this.heights = null
    },
    // 取消
    calloff () {
      this.show = false
      this.heights = null
    }
  },
  computed: {
    Genderdistinguish () {
      if (this.list.gender === 1) {
        return '女'
      } else {
        return '男'
      }
    }
  },
  mounted () {
    this.$refs.file.addEventListener('change', (e) => {
      // e.target 触发事件的元素
      // 图片的src能识别什么?
      //  - 图片相对/绝对路径
      //  - base64 DateUrl
      //  - file,blob对象的url
      const file = e.target.files[0]
      // file = URL.createObjectURL(file) // 将file对象转换成图片可识别的url
      const fr = new FileReader()
      fr.readAsDataURL(file)

      fr.onload = (e) => {
        // console.log(e.target.result)
        this.photo = e.target.result
        this.$refs.file.value = ''
        this.show = true
        this.subassembly = 'HeadPortraits'
        this.heights = '100%'
      }
    })
  },
  components: {
    Nicknameinput, // 昵称
    SexChoice, // 性别
    TimePicker, // 时间
    HeadPortraits // 头像
  }
}
</script>

<style lang="less" scoped>
.navbar {
  width: 100%;
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}
main {
  margin-top: 1.22667rem;
}
</style>
