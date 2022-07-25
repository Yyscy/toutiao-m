<template>
  <div>
    <van-cell
      @click="redirect"
      v-if="articleitam.cover.type == 0"
      :title="articleitam.title"
      :label="articleDesc"
    />
    <van-cell
      @click="redirect"
      v-if="articleitam.cover.type == 1"
      :title="articleitam.title"
      :label="articleDesc"
      ><van-image
        width="3rem"
        height="2rem"
        :src="articleitam.cover.images[0]"
      />
    </van-cell>
    <van-cell
      @click="redirect"
      v-if="articleitam.cover.type == 3"
      :title="articleitam.title"
    >
      <template #label>
        <div>
          <van-image
            v-for="(imgs, index) in articleitam.cover.images"
            :key="index"
            width="3rem"
            height="2rem"
            :src="imgs"
          />
        </div>
        <span>{{ articleDesc }}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import dayis from '@/utils/dayjs'
export default {
  props: {
    articleitam: {
      type: Object,
      required: true
    }
  },
  computed: {
    articleDesc () {
      const art = this.articleitam
      const sss = dayis(art.pubdate).fromNow()
      return `${art.aut_name}   ${art.comm_count}评论  ${sss} `
    }
  },
  methods: {
    redirect () {
      const id = this.articleitam.art_id
      this.$router.push({ path: `/article/${id}` })
    }
  }
}
</script>

<style></style>
