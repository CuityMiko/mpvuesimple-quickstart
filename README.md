# mpvuesimple-quickstart

> 结合了[@spencer1994](https://github.com/spencer1994)的[mpvuecli](https://github.com/spencer1994/mpvue-cli) 
   与[@JJJYY](https://github.com/JJJYY/)的[mpvue-iview](https://github.com/JJJYY/mpvue-iview) 两个项目

## 基本用法
``` bash
$ npm install -g vue-cli
$ vue init blackjack0v0/mpvuesimple-quickstart  mpvuesimple
$ cd  mpvuesimple
$ npm install
$ npm run dev
```

##  引入原生组件用法
在你的项目如mpvuesimple里的pages组件中的index.js中引入
``` js
export default {
  config:
    {
      'navigationBarTitleText': '首页',
      'usingComponents': {
        'i-card': '/iview/card/index'
      }
    }

}
``` 
然后就可以直接在index.vue组件中引用了
``` html
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
``` 

![示例图片](http://wx1.sinaimg.cn/mw690/0060lm7Tly1fsx1fp3clmg309p0gkdr3.gif)

>示例的ask a question 使用了axios对api进行访问

### 注意
>若原生组件通过click事件，即this.triggerEvent('click', { index })来进行父子组件通信，mpvue无法从event.mp中读取到正确的detail，原因是因为mpvue将click事件编译为tap导致this.triggerEvent('click', { index })无法找到click句柄

需要手动修改组件库中click事件名称，在这里修改iview文件加重modal/index.js文件：
``` js
this.triggerEvent('click', { index }) => this.triggerEvent('iclick', { index })
``` 
对应的模板中修改@click => @iclick：
``` js
<i-modal title="删除确认" :visible="visible5" :actions="actions5" @iclick="handleClick5">
    <div>删除后无法恢复哦</div>
</i-modal>
``` 
####  详见[mpvue-iview](https://github.com/JJJYY/mpvue-iview)


> 自动注册store    

优点：多人协作开发不需要担心代码冲突，不需要每个store.js都要import引入。

> 使用[flyio](https://wendux.github.io/dist/#/doc/flyio-en/readme)并封装了请求，

优点：根据[vuex官方推荐](https://vuex.vuejs.org/zh-cn/intro.html)，将background API封装到actions中，具体用法可在代码里查看。


####  其他更多详细文档请查阅[mpvue-cli](https://github.com/spencer1994/mpvue-cli)。

