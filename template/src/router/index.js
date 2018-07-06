module.exports = [
  {
    path: '/pages/index/index',
    config: {
      navigationBarTitleText: '首页',
      usingComponents: {
        'i-card': '../../static/iview/card/index',
        'i-steps': '../../static/iview/steps/index',
        'i-step': '../../static/iview/step/index',
        'i-button': '../../static/iview/button/index',
        'wu-input-number': '../../static/wux-weapp/input-number/index',
        'wux-vcode': '../../static/wux-weapp/vcode/index',
        'wux-floating-button': '../../static/wux-weapp/floating-button/index',
        'wux-qrcode': '../../static/wux-weapp/qrcode/index'
      }
    }
  },
  {
    path: '/pages/counter/index',
    config: {
      navigationBarTitleText: 'vuex例子'
    }
  },
  {
    path: '/pages/logs/index',
    config: {
      navigationBarTitleText: '日志',
      usingComponents: {
        'wux-gallery': '../../static/wux-weapp/gallery/index',
        'wux-row': '../../static/wux-weapp/row/index',
        'wux-col': '../../static/wux-weapp/col/index'
      }
    }
  }
]
