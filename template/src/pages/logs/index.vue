<template>
  <div>
    <wux-gallery id="wux-gallery"></wux-gallery>
    <div v-for=" (url,index) in urls " >
        <img  :src="url"  @click="showGallery(url,index)" />
    </div>
    <wux-row>
      <wux-col  span="6" ><span style="background-color: green" >一半是6</span></wux-col>
      <wux-col  span="6" ><span  style="background-color: green">另一半是6</span></wux-col>
    </wux-row>
    <ul class="container log-list">
      <li v-for="(log, index) in logs" :class="{ red: aa }" :key="index" class="log-item">
        <card :text="(index + 1) + ' . ' + log"></card>
      </li>
    </ul>
  </div>
</template>

<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'
import { $wuxGallery } from '@/utils/wux'

export default {
  components: {
    card
  },

  data() {
    return {
      logs: [],
      show: true,
      urls: [
        'https://unsplash.it/200/200',
        'https://unsplash.it/300/300',
        'https://unsplash.it/400/400',
        'https://unsplash.it/600/600',
        'https://unsplash.it/800/800',
        'https://unsplash.it/900/900',
        'https://unsplash.it/1000/1000',
        'https://unsplash.it/1200/1200',
      ]
    }
  },

  created() {
    const logs = (wx.getStorageSync('logs') || [])
    this.logs = logs.map(log => formatTime(new Date(log)))
  },
  methods: {
    showgallery(url,current){
      const urls=this.urls
      console.log(current)
      wx.previewImage({
        current,
        urls,
      })
    },
    setData (data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    showGallery(url,current) {
      const urls=this.urls
      this.$wuxGallery = $wuxGallery()
      this.$wuxGallery.show({
        current,
        urls,
        [`delete`]: (current, urls) => {
          urls.splice(current, 1)
          this.setData({
            urls,
          })
          return true
        },
        cancel() {
          console.log('Close gallery')
        },
        onTap(current, urls) {
          console.log(current, urls)
          return true
        },
        onChange(e) {
          console.log(e)
        }
      })
    }
  }
}
</script>

<style>
.log-list {
  display: flex;
  flex-direction: column;
  padding: 40rpx;
}

.log-item {
  margin: 10rpx;
}
</style>
