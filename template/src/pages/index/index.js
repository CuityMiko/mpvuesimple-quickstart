import Vue from 'vue'
import App from './index.vue'

const app = new Vue(App)
app.$mount()

export default {
  config:
    {
      'navigationBarTitleText': '首页',
      'usingComponents': {
        'i-card': '/mpvue-iview/iview/card/index',
        'i-steps':'/mpvue-iview/iview/steps/index',
        'i-step': '/iview/step/index',
        'i-button': '/iview/button/index'
      }
    }

}
