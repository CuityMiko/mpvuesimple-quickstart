# mpvuesimple-quickstart  

> 结合了[@spencer1994](https://github.com/spencer1994)的[mpvuecli](https://github.com/spencer1994/mpvue-cli) 
   与[@JJJYY](https://github.com/JJJYY/)的[mpvue-iview](https://github.com/JJJYY/mpvue-iview) 两个项目
   
   *感谢[@spencer1994](https://github.com/spencer1994)告诉我mpvue本来就自带原生组件的引入功能！！现在把mpvue-entry重新加了回来。*
   
   [在这里查看文档！](https://blackjack0v0.github.io/mpvuesimple-quickstart) 
   
## 基本用法
``` bash
$ npm install -g vue-cli
$ vue init blackjack0v0/mpvuesimple-quickstart  mpvuesimple
$ cd  mpvuesimple
$ cnpm install
$ git clone https://github.com/blackjack0v0/static 
$ cnpm run dev
```


##  引入原生组件用法
> 1.下载组件到根目录下static文件夹中，注意：本示例引入了一个wux.js文件在utils文件夹中，
如果你不用wux-weapp的话请手动删除，以免编译报错！！！


> 2.在src/router文件夹中的index.js为每个页面设置引入的组件 
``` js
    config: {
      navigationBarTitleText: '首页',
      usingComponents: {
        'i-card': '../../static/iview/card/index'
        }
``` 
>3.然后就可以直接在每个页面的index.vue组件中引用了
``` html
    <div>
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

需要手动修改组件库中click事件名称，在这里修改iview文件中的modal/index.js文件：
``` js
this.triggerEvent('click', { index }) => this.triggerEvent('iclick', { index })
``` 
对应的模板中修改@click => @iclick：
``` js
<i-modal title="删除确认" :visible="visible5" :actions="actions5" @iclick="handleClick5">
    <div>删除后无法恢复哦</div>
</i-modal>
``` 

###  在项目中 wux-weapp UI

![示例图片2](http://wx1.sinaimg.cn/mw690/0060lm7Tly1fsye68kj3pg309i0grjwq.gif)



步骤与前面相同，先下载组件到static文件夹

> 1.在src/router文件夹中的index.js需要用到的页面处引入
``` javascript
'usingComponents': {
'wux-floating-button': '/wux-weapp/dist/floating-button/index'
 }
```
> 2.在index.vue中使用

``` javascript
 <div><wux-floating-button v-bind:buttons="buttons" @iclick="handleClick6">
 </wux-floating-button>
 </div>
```

> 3.在方法中添加setdata的方法

``` javascript
 methods: {
    setData (data) {
      Object.keys(data).forEach(key => {
        this[key] = data[key]
      })
    }
   } 
```

到这里你就成功引入一个原生的小程序组件了！！！

> #### 组件具体参数的配置

查看wux的文档[api](https://wux-weapp.github.io/wux-weapp/#/floating-button)发现
悬浮按钮一共有几个参数，如position属性、click事件

- **string、number属性**---直接用position="topLeft"这种形式传递
- **array数组类的或者需要接受一个变量的**---可以使用 v-bind:buttons="buttonsarray"，这里buttons属性接受一个
buttonsarray数组，然后我们使用v-bind来把buttonsarray传递给buttons这个属性。
``` javascript
 data () {
    return {
      buttonsarray: [{
        label: '查看计数器',
        icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAOGSURBVGje7VhLSFVRFF1HLROtLHtmhVJmz0c/NUstoQ84KAuSauKkdJDQh2pghRAFkTQwiKIoMppFk0ALKioKggbmQEJCsAQjKIMc9Ochymqg73Pf3ed+n4PgreG+e6+1zn7nnbvPBVJI4X8Dq3iOA5Twhq1cPZ3S63mPTnCNoeSL1/OnI/EIBrgpeeKVHHElHkEPV/gXz+QVT+IRnKLyIx/kuC/5yR+jwKt8nW/xCMq8yO9NmjxJ1rqV351UeZKsciNfk3R5kiyWtIQ9ygKMeNw21pjAHPU3MZhmkk/Do4TQHzz3IBfGg4RIOq47af9BU+uOAADX8q7jZrdzEQAIFXV28vkCXWn0aYB34uIf+ZJd7OYrfomLXmRWNH+nwDbL2kCnUJJjyNjIowyKtRU8zVWGSLHAdsJKvlBs6EwPO0Dfz4QFGTdhq8gzw6sByO1u1PnN1mypIDxCe5jHLTu+A1s1PPs8d6BFE18p+32i8ZvvuQMhDeMFKXmmJnmz5/UD4H6RM0whtURM7fUjDzBds6y5kYzYHlgjMrT5M6AmcEh8sMxsoFJM9NkBAE/FaHRujhkoFxN/+TYgv1kFA6VC2mc/E+UUxsToUrMBaXQc968PitGA2YB0bOYlwUCaGM00Pw4LaTm+pvoEKQOiajEDX8XEbN8GAmJ01GzgvZgoDpKuIN8Jhs0G3oqJDb4NHBCjg6YI92gOzXQ/6pytYS03d6Bfw7Hd1/qbNPFhU0T7NkwYoVytf4mGcSx2OEQ7oMbwTMPTRU9DGXO1Xe0Q/93cpe1BHxe6lg9RD/nNq50JJ3HMeR84nx2WXGm6wqtxSWeFbyOddvMRFXfwIa3Roi+Pvxf0s5gZPC9SfBJqGzlKZ7Da1LxlSN0AsE2gaBfX/tiR/HHrFgYS0ucxg79NJOIbgkWODFjfDQE2G9JvAgwmUHRrKsEftvLb7Hew4mtDSR7A5fwQF2nW1tp9Sb1hKw8AXGAoOjkVzeUWVttUXraU/27b/ijROkOh47eBjYEipzwAWG8ovW+3dgcGKlzIAwAbtFRNHgzU6Gp0hyJUN3Tfc9zPiWWqx7UBQL1AyG2NgCEsVv36x5ZkahBZMP913MxIZxBUll8dbVajwuowqvHNk4E+hFS7onWSg3aqXpWP+tggbXFfit0t3qFWVapBJBMs422SQ7G7vSmjkGGSl1iSVOEUUphe/AMv8ctn/pO1zAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxNy0wNC0wNFQxMDo0MDo0MiswODowMNlOhSIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTctMDQtMDRUMTA6NDA6NDIrMDg6MDCoEz2eAAAAAElFTkSuQmCC",
        url: '../counter/index'
      },
        { label: '查看logs',
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAM3SURBVGje7VlNSBRRHP8/tU1dd7PNwkwiUqFIb5pGlJZEardIsOwi5iU6SF+XDhVBRFFJdKlbH0hdgkBIO3kptSKiEgKJWAikQrKgxLD9dZB982b2zex7b2ZZof2f/sv+vuYx8z5mGBkVYtRGzdRI1RSmWfpAYzRKI2zeTE3POorTcKtZ9KAgk+YRXEP6OoH8zNgfUDBPVnPQ5kUY1LAHgEvIC86+HDMO+UkcQpEt4EG8dWAmEAnGvtIh/Bg1LsgqPLIhZ7DSv32pw357Gvw2GzqOQn/2DKO2ay9R4JRgSODc8xegS5C6CPXYVwXeHnP7kCBzXYtJuM2ZC8bPA1q5yGfdGQ4hzHN2vTvOO1s37/azBb0A7A91WGzTEfjCr8FgckUhZ78ysycu8NuIzzh/2h0V3HRpWLkAuQC5ALkASzkAI0oeNIpUdwIu9ct0BKZ4Z3LcCPEubhrAWsVWGAQo5d070wDPebfJIIC1d35tGuAl7zpIv1p598aATUSEMF/R/+rfhvjG2Qp7aTeR91xkgyZzjXU28MKlmwesvfBhzeztvBswvn4irBU25iENHsN3ztvoIwARJrlQtwaribPmfE5iaBfGIKrIyUOcc3r8+RMKhAB3FDl9AifsMwAROgS5Ywr4RgF/1Lc9Ech2Qj6VBt0kYOewLIAAtmcaAPo9kLttyNpA7ImIUG8TdlmabKdpoDMweyIi7BCkm1wwmwVMr5qu4o4IMWoRfrpNScuFPiG+xPJ37eW4DHtVuiBXOXD9qjOHu/l63IKzRjzwD1PQZ1Fmal6DB0itYa/FFWE8k3AGUKFrXodhqXmdAncXPkm4dxUXJRAaMCERGES1cnzCVryQaAxhizeRYSemJMSbbredp1otnki0xtEgXR+Rj7aUN8IAcAGr9c25ahXuSzQ/ogXMPmRHIKuTMNmOO0Osww2J9k/sTQIiGJcA+lDs35yHKMN5iUccFYQSfE35o0tn+6UcIorjqRnIMTw/sC9DH1wWQxSj1xnAqjk0226NTIUIoRPTsgD+Py6oh4glTRmSD2WCZXDoUwIwSix2S/kFxX8SwLoHsjYCY9kOcC7LAdhTupJF/zP/AOvS/D0NTmDBAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjQ3OjQ1KzA4OjAwI6N5UAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTo0Nzo0NSswODowMFL+wewAAAAASUVORK5CYII=",
          url: '../logs/index'
        },
        { label: 'View on Demo',
          icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAQAAAAAYLlVAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAYWSURBVGje7ZhtkJZVGcd/9y4E64IMtEO4EyKhaBKTbPDBdCmHbJWMpBEIWYc1X5dxGrEJexFiJouYabYpFNNmdgYXmtpBZHwZqcbRQKIpNxuxHFNwaiZGhBSBD0rprw/3ee7n3A/Ps89LTX1ory/3uf/n5fqf65zrOtc5MCIjMiL/75JUb2InnXTwQUbVPfpxXmIfv0r+0iABp7KeL4afY/wTgDaOljSrjEykOSA9PJhYJ31vU7XfuRF2pXplrlW/2pZDdqgTsr8WV3pKPeWsOixgwgPcyP4yVbNPQ2tBYDZwWfJ0rbO/2z/7n5bfqR+uTf3FWafOHD7OvoA/4w2eny1BAn7UL3kw65ezrB0Z/qbN1dUnHlZ1IE/B7jDIdTaV7IFMnW1+LbRaWKK+R92kXlOdwEXqenXAyQUKjvNxVfvU9lzr/vx8JZvtDsdn6pdCIHAk7wxNZRhcB2wBSF7nA8BuOznEQn7KuBq3EJzJAIs5bgdDwKJkMOCP08aUahY4qTapAwDBCroaoFYLALgk9PxUqNFNfkG9vJoFWnkheS/7eycEoLdrnn1BDoTvyQj7I3BhNQLwSjafhJ2M4uvAZntLLDXPte5lJXDMx7zBibna1PirgH1OzeBjQDvDi/ozSJfAm9RnTMJW6k2XwAmuL+vp+5wTNmFoD3apB2wOS9Cu9tVMwLNUnZzOKPOCHlUPeI2jC6HYUS72N6r+OKMTLOZ31JsaIzCYOlDBqNFcL83Q6CzwPHeXqgfHqNqqbrK7lEBSjkC13RXJZp7nH0xnGefV2GOI3ckdxd/yZ/xgskzZSjd35vBFXALAncBGAGbSwvVsC+q/y5sBP8j9uZ4peg8b+Bu7a1gCJ6n6SmwMr1VfjpZhpUm6BABe4onchrwtN+bzWn4PNA3LZV1xhRzLNuBRYBU/B1YlW+IUI9nLDGAbTwZgk2dGI327korhCTwVlRcCOwHYTBenxQUncxhoZQEAnwWWRdVPN0bgcFReC2wI5Uv5WJ5CUD+fHuAo8EtgY2Sg1xshcLAYkG3lIuAPwP28yN7k9zGFgvpkT/IWtwPwDoNMZFKhfyJP1E/gT1H5bGB/cgo4yN0JUKCQWWp+sgeA7aHHI8DMaIQ99RFYShq3CzKd4o4YCrNKKVwPkXp4DYBbGQ+52PAyAIuoLlUyuzVWkyMeH6b22bwbDheIfpIz232s4wgzgd4cmkqMfYvx9AL30Zv8KJtWF7vqDUS/iLDx6hawzzWF0yGkKv1hZiF3dIpHFFyhfiYaYXldgSh5A+iIgBPACgE+xFdS9cHxgCxxi1d5EfltXCEhr0DAScD7fV9GCO6lmWnALcx1TtHxAHivQMEz0jPAMSwF/hoNeVVdBIKcE5X7Ifg4DOXUU0xf+T7QBlwOrEvezSY0ljmNEFgclZ/jRCCwiiSvPqLQGs6CRyluUIB51C7RaWh8j3GB+lLkUJ+XYkJiR+6k1C/nxtxV6TSsdOe/EdhKN5/MTjeSJ93J1UAhH3gIfILXgO+5EojzgVdpdk00Xlf4dpcq+p9nRMMtwYCr1U9keJwTLs/Q/iLhCjnh2ap2N5KUtqg6JlJfzIr1ZicUCERZ8eY8BRN/q37TKXURSC0Azld/kKnvrHIveMgLKL0XpO8sLfUReLhAAPyq2lsItvHdML0Z+a76oj/0Cov9zSinPedBIDBV3VidwP6IQOJgMdZXv5xSvJwW9kwPZARmq7fHrcsHoo9E5QtZAsAdjqU+OSN8WyJsFukFdVgCW4HwyuW5vEB6xbyav9f4wgOIq9kDrCCfvnZD2aevXOfLLLyQTMu20jkezbyghiXwbfUNp4XbhPaGJdC3qoYZR4e1G4j92SbXBfwBz61EwLO8K7TaYIiyGYWUwPJq+gGXnh5OAJzhUwE/6V1eXCTgBD/nvZFDzsj1uzaqGZ3XVfahUthFF3CoTGW154VDtJft2c6zzGVuMlQDAbCV/Uyv8FLamPyaj7Mk2V5ze1vcHnK++K24r/Sois+CgOyIkeytWBeU0zP8a/mneTjz5n/vtfwe1ibHGrKcs/yGz9monHCbi21qSPWIjMiI/HfkXwSZaWJJZaXhAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE3LTA0LTA0VDExOjQ3OjQ1KzA4OjAwI6N5UAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNy0wNC0wNFQxMTo0Nzo0NSswODowMFL+wewAAAAASUVORK5CYII=",
          url: '../counter/index'
        }
      ]
     }
   }
```

- **事件类型的**---使用@iclick="handleClick6"形式

```
<wux-floating-button position="topLeft" v-bind:buttons="buttons" @iclick="handleClick6">
 </wux-floating-button>
```
```  javascript
    handleClick6 (event) {
      const url = event.target.value.url
      console.log(event.target.value.url)
      wx.navigateTo({ url })
    },
```
- 嵌套组件内各自事件的处理

这里我们的float-button展开后一共有3个按钮，我们可以通过event.target来获取点击事件的信息

查看float-button组件的源码中看到它已经把单个按钮的dataset赋值到value上了，所以我们通过
**event.target.value**来取得展开后每个按钮对应的数据，从而进行特定的处理

```  javascript
    handleClick6 (event) {
      const url = event.target.value.url
      console.log(event.target.value.url)
      wx.navigateTo({ url })
    },
```

> 下面为float-button原生组件的代码

index.wxml中
``` html
	<block wx:for="{{ buttons }}" wx:key="">
			<view class="wux-speed-dial__button {{ item.className }}" data-index="{{ index }}" data-value="{{ item }}" data-label="{{ item.label }}" catchtap="buttonClicked" hover-class="wux-speed-dial__button--hover">
				<image class="wux-speed-dial__icon" src="{{ item.icon }}" />
			</view>
		</block>
```
index.js中
``` javascript
       buttonClicked(e) {
            const { index, value } = e.currentTarget.dataset
            this.triggerEvent('iclick', { index, value })
            this.close()
        },
```

#### 注意
_这里修改了this.triggerEvent中的click为iclick_


###  wux-weapp UI 复杂组件如gallery，toast组件的引入
![示例图片3](http://wx1.sinaimg.cn/mw690/0060lm7Tly1ft0kce6f4jg309h0h87wj.gif)
1. 把wux-weapp根目录下的index.js拷贝到src/utils文件夹中,并改名为wux.js（改名随意） 

2. 在页面router/index.js中引入组件

3. 在index.vue导入wux.js以便使用已经写好的$wuxGallery函数，并使用组件

>*这些组件都需要通过先通过调用 getCurrentPages()获取页面示例，
然后使用selector选择器来选择组件节点，所以需要设置一个id，最终通过$wuxGallery(id)函数来获取节点的实例*

```javascript
<script>
import { formatTime } from '@/utils/index'
import card from '@/components/card'
import { $wuxGallery } from '@/utils/wux'
export default {....}
</script>
```

```html
  <wux-gallery id="wux-gallery"></wux-gallery>
    <div v-for=" (url,index) in urls " >
       <img  :src="url"  @click="showGallery(index)" />
    </div>
```

3.1配置好要显示的图片urls
```javascript
 data(){
    return {
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
     }
```
3.2在方法中添加setdata的方法
   
   ``` javascript
    methods: {
       setData (data) {
         Object.keys(data).forEach(key => {
           this[key] = data[key]
         })
       }
      } 
   ```

4.写showGallery(url,index)函数
> 注意：不用自己写，对着wux-weapp的文档示例修改即可，我们具体内部函数this.$wuxGallery.show
不用修改，只要修改传入的参数，这里this.$wuxGallery.show需要urls列表及当前显示的目标current这两个值。
```javascript
    <div v-for=" (url,index) in urls " >
       <img  :src="url"  @click="showGallery(index)" />
```
```javascript
    showGallery(current) {
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
```
下面是官网文档示例的函数
```javascript
    showGallery(e) {
       /* const { current } = e.currentTarget.dataset
        const { urls } = this.data     */ 这里被修改的部分

        this.$wuxGallery = $wuxGallery()     

        this.$wuxGallery.show({
         ...内容同前
        })
    }
```
*用vue写处理函数传值一对比明显更加简便了....*


#####  其他更多详细文档请查阅[mpvue-iview](https://github.com/JJJYY/mpvue-iview)

###  其他加强功能的说明
> 自动注册store    

优点：多人协作开发不需要担心代码冲突，不需要每个store.js都要import引入。

> 使用[flyio](https://wendux.github.io/dist/#/doc/flyio-en/readme)并封装了请求，

优点：根据[vuex官方推荐](https://vuex.vuejs.org/zh-cn/intro.html)，将background API封装到actions中，具体用法可在代码里查看。


####  其他更多详细文档请查阅[mpvue-cli](https://github.com/spencer1994/mpvue-cli)。

## 踩坑注意
 如果你初始化一个项目后又想改项目的名字，这个时候你运行cnpm run dev 的时候会发现
 
 ` Error: Cannot find module '***'`，这个时候你需要删除node_module文件夹，
 然后再运行cnpm install！！