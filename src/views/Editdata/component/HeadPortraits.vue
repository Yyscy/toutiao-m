<template>
  <div>
    <img :src="photo" alt="" ref="img" />
    <van-nav-bar
      class="bramm"
      left-text="返回"
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { uploadPhoto } from '@/api'
export default {
  props: ['photo'],

  mounted () {
    const img = this.$refs.img
    this.myCropper = new Cropper(img, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      cropBoxResizable: false,
      cropBoxMoveable: false,
      background: false
    })
  },
  methods: {
    onClickRight () {
      const fm = new FormData()
      // console.log(fm)
      this.myCropper.getCroppedCanvas().toBlob(async (blob) => {
        fm.append('photo', blob)
        // console.log(blob)
        try {
          await uploadPhoto(fm)
          this.$emit('updateinfo')
        } catch (e) {
          this.$toast('修改失败')
        }
      })
    },
    onClickLeft () {
      this.$emit('calloff')
    }
  }
}
</script>

<style lang="less" scoped>
.bramm {
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;
  background: none;
}
img {
  display: block;
  max-width: 10rem;
  height: 18rem;
}
</style>
