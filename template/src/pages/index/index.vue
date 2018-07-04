<template>

  <div class="container" @click="clickHandle('test click', $event)">
    <div>
      <div style="margin: 16px">默认</div>
      <i-card title="卡片标题" extra="额外内容" thumb="https://i.loli.net/2017/08/21/599a521472424.jpg">
        <div slot="content">内容不错</div>
        <div slot="footer">尾部内容</div>
      </i-card>
      <div style="margin: 16px">通栏</div>
      <i-card full title="卡片标题" extra="额外内容" thumb="https://i.loli.net/2017/08/21/599a521472424.jpg">
        <div slot="content">内容不错</div>
        <div slot="footer">尾部内容</div>
      </i-card>
    </div>
    <div class="i-steps-demo">
      <div class="one-tag">基本用法</div>
      <i-steps>
        <i-step status="finish">
          <div slot="title">
            已完成
          </div>
          <div slot="content">
            这里是该步骤的描述信息
          </div>
        </i-step>
        <i-step status="process">
          <div slot="title">
            进行中
          </div>
          <div slot="content">
            这里是该步骤的描述信息
          </div>
        </i-step>
        <i-step status="">
          <div slot="title">
            错误
          </div>
          <div slot="content">
            这里是该步骤的描述信息
          </div>
        </i-step>
      </i-steps>

      <div class="one-tag">使用 icon 图标</div>
      <i-steps>
        <i-step status="finish" icon="barrage">
          <div slot="title">
            已完成
          </div>
          <div slot="content">
            这里是该步骤的描述信息
          </div>
        </i-step>
        <i-step status="process" icon="brush">
          <div slot="title">
            进行中
          </div>
          <div slot="content" icon="camera">
            这里是该步骤的描述信息
          </div>
        </i-step>
        <i-step  icon="collection">
          <div slot="title">
            错误
          </div>
          <div slot="content">
            这里是该步骤的描述信息
          </div>
        </i-step>
      </i-steps>

      <div class="one-tag">步骤进度</div>
      <i-steps :current="current">
        <i-step>
          <div slot="title">
            已完成
          </div>
          <div slot="content">
            这里是该步骤的描述信息
          </div>
        </i-step>
        <i-step>
          <div slot="title">
            进行中
          </div>
          <div slot="content">
            这里是该步骤的描述信息
          </div>
        </i-step>
        <i-step>
          <div slot="title">
            错误
          </div>
          <div slot="content">
            这里是该步骤的描述信息
          </div>
        </i-step>
      </i-steps>
      <i-button @click="handleClick">下一步</i-button>

      <div class="one-tag">垂直方向</div>
      <i-steps :current="verticalCurrent" direction="vertical">
        <i-step>
          <div slot="title">
            已完成
          </div>
          <div slot="content">
            这里是该步骤的描述信息
          </div>
        </i-step>
        <i-step>
          <div slot="title">
            进行中
          </div>
          <div slot="content">
            这里是该步骤的描述信息
          </div>
        </i-step>
        <i-step>
          <div slot="title">
            错误
          </div>
          <div slot="content">
            这里是该步骤的描述信息
          </div>
        </i-step>
      </i-steps>
    </div>
    <div class="userinfo" >
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
        <button open-type="getUserInfo" @getuserinfo="getUserInfo()">点我登录哦</button>
      </div>
    </div>
    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>
    <div id="watch-example">
      <p>问我一个问题吧:</p>
      <input type="text" class="form-control" v-model="question">
      <p>\{{ answer }}</p>
    </div>
    <form class="form-container">
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>
    <a href="/pages/counter/index" class="counter">去往Vuex示例页面</a>
  </div>
</template>

<script>
import card from '@/components/card'
import _ from 'lodash'


export default {
  data () {
    return {
      motto: 'Hello World',
      userInfo: {},
      question: '',
      answer: '先问问题在回答哦',
      'current': 2, 'verticalCurrent': 2
    }
  },

  components: {
    card
  },
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  },
  created: function () {
    // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
    // 在这个例子中，我们希望限制访问 yesno.wtf/api 的频率
    // AJAX 请求直到用户输入完毕才会发出。想要了解更多关于
    // `_.debounce` 函数 (及其近亲 `_.throttle`) 的知识，
    // 请参考：https://lodash.com/docs#debounce
    this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
  },
  methods: {
    bindViewTap () {
      const url = '../logs/index'
      wx.navigateTo({ url })
    },
    getUserInfo () {
      // 调用登录接口
      wx.getUserInfo({
        success: (res) => {
          this.userInfo = res.userInfo
        }
      })
    },
    clickHandle (msg, ev) {
      console.log('clickHandle:', msg, ev)
    },
    getAnswer: function () {
      this.answer = 'Thinking...'
      var vm= this
      this.$http.get('https://yesno.wtf/api')
        .then(function (response) {
          vm.answer = _.capitalize(response.data.answer)
        })
        .catch(function (error) {
          vm.answer = 'Error! Could not reach the API. ' + error
        })
    },
    setData (data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    },
    handleClick () {
      const addCurrent = this.current + 1
      const current = addCurrent > 2 ? 0 : addCurrent
      this.setData({
        'current': current
      })
    }
  }
}

</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}

.counter {
  display: inline-block;
  margin: 10px auto;
  padding: 5px 10px;
  color: blue;
  border: 1px solid blue;
}
.i-steps-demo{
  margin:20px;
}
.one-tag{
  font-size:14px;
  margin:30px 5px 20px 0;
}
</style>
