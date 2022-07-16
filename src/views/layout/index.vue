<template>
  <div >
    <router-view></router-view>
    <van-tabbar route>
      <van-tabbar-item replace to="/Home"
        ><i slot="icon" class="toutiao toutiao-shouye"> </i
        ><span class="test">首页</span>
      </van-tabbar-item>
      <van-tabbar-item replace to="/QA"
        ><i slot="icon" class="toutiao toutiao-wenda"> </i
        ><span class="test">问答</span></van-tabbar-item
      >
      <van-tabbar-item replace to="/Video"
        ><i slot="icon" class="toutiao toutiao-shipin"> </i
        ><span class="test">视频</span></van-tabbar-item
      >
      <van-tabbar-item replace to="/My"
        ><i slot="icon" class="toutiao toutiao-wode"> </i
        ><span class="test">我的</span></van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
:deep(.van-tabbar-item) {
  display: flex;
  height: 100%;
  .toutiao {
    font-size: 0.5rem;
  }
  .test {
    font-size: 0.25rem;
  }
}
</style>
