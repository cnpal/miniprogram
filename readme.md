小程序基础#
数组的遍历wx:for#
类似vue，但不同于vue
用法：

 
	people = [
	{name:'xiaohong'},
	{name:'xiaowang'},
	{name:'xiaozi'}
]
 
<view wx:for="{{people}}">{{item.name}}</view>
监听事件点击bindtab#
 
<button bindtap='clickMe'></button>

data:{
	count:0;
},
clickMe(){
	//错误的做法，页面并不会发生改变
	//this.count++;
	this.setData({
		count:this.data.count +1
	})
}
MVVM架构#
小程序的MVVM与Vue的MVVM一样。

MVVM的好处

ViewModel层可以将DOM的监听绑定到Model层
ViewModel层可以将数据的变量，相适应的反应到View层
project.config和sitemap的作用#
project.config是为了保存当前参数，为了防止在多个电脑开发参数不一致。
sitemap是一个搜索选项，一般为通配符*。意味着小程序所有页面都能被用户搜索到。

全局配置#
在小程序中有很多配置，这里只列举三个最重要的

pages#
可以直接新建page，自动在app.json中自动注册。
也可以直接在app.json中直接注册，系统会自动帮我们创建文件

window#
window一般默认的配置就可以，其余查看官方文档

tabBar#
直接在app.json中输入tabBar敲Tab即可

注意：selectedColor和list同级

局部配置#
直接在单页面json中设置属性即可，无需加window

页面渲染的整体流程#
逻辑层与渲染层

在渲染层，宿主环境会把WXML转化成对应的JS对象；
将JS对象再次转成真是DOM树，交由渲染层线程渲染；
数据变化时，逻辑层提供最新的变化数据，JS对象发生变化啊比较diff算法进行对比；
将最新变化的内容反应到最真实的DOM树中，更新UI；
app生命周期函数#
onLaunch() //一般用来获取用户信息

onShow() //用来判断小程序进入场景
里面可以传入参数options，通过options.scene来判断用户场景，来做对应的事，如获取个人信息保存到服务器

这里只记录两个重要的。其他创建app时自动会显示

保存全变量#
我们除了在app中使用生命周期，还可以保存全局属性

 
globalData:{
	name:'vicer',
	age:18
}
使用方法

 
const app = getApp();
console.log(app.globalData.name);
获取个人信息的方式#
在生命周期函数中获取
onLaunch只获取一次。onShow()有可能会获取多次。
这种获取方式有可能会被废弃
 
	wx.getUserInfo({
      success:function(res){
        console.log(res)
      }
    })
使用button的方式授权获取

 
<button open-type="getUserInfo" bindgetuserinfo="getUser">获取授权</button>
 
getUser(event){
console.log(event)
}
使用open-data来展示用户信息
这里只能展示，不能获取。具体的type类型可以去看官方文档

 
<open-data type='userNickName'></open-data>
page生命周期函数#
page生命周期

onLoad() //页面加载时调用
onShow() //页面显示时
onReady() //页面初次渲染完成时
onHide() //页面隐藏时
onUnload() //页面跳转时

一般在page页面需要做什么#
发送网络请求，从服务器获取数据
这里注意，请求服务器数据成功回调时，要使用箭头函数的this，就近指向当前的page
初始化数据
监听wxml中的事件，绑定对应的事件函数
其他一些监听，如页面滚动，上拉刷新，下拉加载等
page内置函数示例

text的用法#
行级元素

属性

selectable 文本是否可选 直接把属性添加进去即可
space 空格大小 选项ensp/emsp/nbsp
decode 文本解码 直接把属性添加进去即可
button的用法#
块级元素，如果设置size='mini'则是行内块元素

属性
size, //大小
type, //类型
plain, //镂空
disabled, //禁用
loading, //加载
hover-class,//按下去样式
open-type //微信开放功能，如获取个人信息

属性太多就不一一列举
button用法

view的用法#
块级元素，并且是容器组件

hover-class //按下去的样式 设置class
hover-stop-propagation //阻止事件冒泡 布尔值，默认不阻止
hover-start-time //按住后多久出现点击态 number
hover-stay-time number //手指松开后点击态保留时间 number

image的用法#
scr
可以使用相对路径/绝对路径/网络路径。注：使用绝对路径前面加个/
lazy-load
图片懒加载
show-menu-by-longpress
图片小程序识别
bindload
图片加载完成调用
mode
图片的缩放模式
widthFix 最常用的缩放模式，宽度不变，高度自动变化，保持原图宽高比不变
其他缩放模式请查看官网
input的用法#
value //input的默认值
type //键盘类型，如数字键盘number/文本键盘text
password //暗文
placeholder //占位符
confirm-type //键盘右下角，显示的文字，如发送/确认
input的事件#
bindinput //键盘输入时触发
bindfocus //获取焦点触发
bindblur //失去焦点触发
更多input属性

scroll-view的用法#
在组件scroll-view中添加scroll-x可横向滚动，scroll-y可纵向滚动

监听滚动距离 bindscroll

 
<scroll-view class="scroll" scroll-y bindscroll="topHeight" scroll-top="{{scrollTop}}">
	ul>li{$}*100   //此处是100个li。按Tab键即可生成
</scroll-view>
<button bind:tap="">返回顶部</button>
 
.scroll{
  height: calc(100% - 120rpx)
}
 
data:{
	scrollTop:0
},
topHeight(e){
	let top =  e.detail.scrollTop;
},
backtop(){
	this.setData({
	  scrollTop: 0
	})
}
scroll-view更多用法

WXSS&WXML&WXS#
wxss的尺寸:rpx#
rpx：指可以根据屏幕宽度进行自适应

设备	rpx换算px(屏幕宽度/750)
iPhone5	1rpx = 0.42px
iPhone6	1rpx = 0.5px
iPhone6 Plus	1rpx = 0.552px
建议：使用iPhone6作为设计稿

导入样式文件#
如果有多个页面需要用到样式，我们可以把样式封装到一个文件中，在需要的地方导入

@import '路径';

官方样式库#
可以引用官方样式库进行修改：github下载

动态改变样式#
这里只能通过三元运算符来修改样式，和vue不一样
通过动态改变isActvice的布尔值来决定class

 
<view class='{{isActive ? "active" : ""}}'>颜色</view>
wx:if/wx:elif/wx:else的使用#
这里使用方法和vue一样。但要注意的是这里是elif，不是elseif

wx:if和hidden的区别#
区别：
wx:if:如果设为隐藏，将组件进行销毁
hidden：如果设为隐藏，将display:none

选择：
隐藏与销毁的频率非常低，选择wx:if
隐藏与销毁的频率非常高，选择hidden

block标签的使用#
block标签和view一样，都可以对一组标签进行包裹。
但view是一个组件，每次还需要渲染，会降低性能
如果我们只需要进行包裹的话，直接使用block即可。

注意：

block是一个标签，不是组件
内部只接收控制属性，如wx:for等就是控制属性。不接受class
显示内容使用view，包裹标签使用block
wx:for中item与index的别名#
当出现多层遍历时，item名字有可能会重复，为了区别我们可以起一个别名

 
wx:for-item='nowItem'
wx:for-index='nowIndex'
 
<block wx:for = "{{list}}" wx:for-item="nowItem">
  <view wx:for="{{nowItem}}">
    {{item}}
  </view>
</block>
wx:key的作用#
没有key的时候，数组如果添加value是依次变化，然后再添加进去。
当有key的时候，diff算法就可以正确找到key的位置，直接把元素进行插入即可

 
wx:key="*this"
template的使用#
在小程序中如果我们想要复用某一段代码，可以使用template。
template中包裹的内容在没有使用之前，不会进行渲染
如果template中不添加元素可以使用单标签
设置模板并设置name
 
	<template name='item'>
		<view>{{currentText}}</view>
		<button>{{btn}}</button>
	</template>
使用is导入模板，并传入data
 
	<template is='item' data="{{currentText:'我是模板',btn:'按钮'}}"/>
wxml的两种导入方式#
template只能在当前页面导入。如果我们想要复用的话可以封装进一个单独wxml中，然后导入使用页面

import导入：

主要是用来导入template，可以用来传递data
特点：不能进行递归导入
 
	<import src='/wxml/template.wxml'/>
include引入：

将公共的组件抽取到一个文件中
特点：可以进行递归导入。但不能导入template/wxs
 
	<include src='/wxml/item.wxml'/>
WXS模块#
WXS的运行环境与JS代码隔离。不能让你和调用JS文件的函数，也不能调用小程序的API
WXS函数不能为组件的事件回调
WXS一般用来做WXML中的数据处理，类似vue的过滤器
WXS官方说和JS不一致，但其实就是JS加commonjs导出的用法
创建一个WXS文件并写入代码
 
var name = 'vicer';
module.exports = {
  name: name
}
在需要的地方导入。注意：这里导入必须要使用相对路径，不能用绝对路径
 
<wxs src="../../wxs/info.wxs" module="info" />
在WXML中使用
 
<view>{{info.name}}</view>
小程序时间戳js代码#
 
// parseInt(timestamp) * 1000中传入的是秒s，如果是毫秒ms则去掉1000
 var dateFormat = function (timestamp, format) { if (!format) { format = "yyyy-MM-dd hh:mm:ss"; } 
 var timestamp = parseInt(timestamp) * 1000;
　　
  var realDate = getDate(timestamp);
  function timeFormat(num) {
    return num < 10 ? '0' + num : num;
  }
  var date = [
    ["M+", timeFormat(realDate.getMonth() + 1)],
    ["d+", timeFormat(realDate.getDate())],
    ["h+", timeFormat(realDate.getHours())],
    ["m+", timeFormat(realDate.getMinutes())],
    ["s+", timeFormat(realDate.getSeconds())],
    ["q+", Math.floor((realDate.getMonth() + 3) / 3)],
    ["S+", realDate.getMilliseconds()],
  ];
  var regYear = getRegExp("(y+)", "i");
  var reg1 = regYear.exec(format);
  // console.log(reg1[0]);
  if (reg1) {
    format = format.replace(reg1[1], (realDate.getFullYear() + '').substring(4 - reg1[1].length));
  }
  for (var i = 0; i < date.length; i++) {
    var k = date[i][0];
    var v = date[i][1];

    var reg2 = getRegExp("(" + k + ")").exec(format);
    if (reg2) {
      format = format.replace(reg2[1], reg2[1].length == 1
        ? v : ("00" + v).substring(("" + v).length));
    }
  }
  return format;
}
//这里应用到小程序中，如果不需要则删除
module.exports = {
  dateFormat: dateFormat
};
 
<wxs module="dateUtil" src="../../../utils/dataTime.wxs"></wxs>

<view class='textCenter'>{{dateUtil.dateFormat(currentTime,'YYYY-MM-dd hh:mm:ss')}}</view>
常用的事件点击#
bindtap等事件在使用时可以写成bind:tap

touchstart 手指触摸动作开始
touchmove 手指触摸后移动
touchend 手指触摸动作结束
tap 手指触摸后马上离开
longpress 手指触摸后，超过350ms再离开，如果指定了事件回调函数并触发了这个事件，tap事件将不被触发
event的事件对象#
当发生点击事件时，函数收到的事件对象列表

type //事件的点击类型
timeStamp //事件生成时的时间戳
target //触发事件的组件的一些属性值集合
currentTarget //当前组件的一些属性值集合
touches //触摸事件，当前停留在屏幕中的触摸点信息的数组
changedTouches //触摸事件，当前变化的触摸点信息的数组

target的区别
当发生事件冒泡时，内部触发外部，target记录的是触发对象，currentTarget记录的是当前对象
touches的区别
当手指点击屏幕时，touches数组中记录的是当前的手指数量，changedTouches记录的是点击数量改变。
如之前一个手指点击，现在变成2个点击。touches数组length为2，changedTouches数组length为1

参数的传递data-#
当我们需要传递参数时，只需要在标签内添加属性
data-被传递的属性
即可在函数中通过event拿到所需要的属性

 
	<block wx:for="abc" wx:key="*this">
	  <view bind:tap="handleBtn" 
			data-index="{{index}}">
			{{item}}
	  </view>
	</block>
 
  handleBtn(e){
    const data = e.currentTarget.dataset;
    console.log(data.index)
  }
事件冒泡与事件捕获#
bind 可以进行事件冒泡。
capture-bind 可以进行事件捕获。
catch 阻止事件冒泡或捕获

 
<view capture-bind:tap='captureView' 
	  bind:tap='bindView' 
	  catch:tap='catchView'>
</view>
小程序组件化开发#
组件的使用#
创建component，并在需要显示的json中注册。

 
{
  "usingComponents": {
    "my-cpn":"/component/my-cpn/my-cpn"
  }
}
在wxml中使用即可


<my-cpn/>
组件的注意事项#
只能用小写字母，中划线，下划线命名，并不要加'wx-'的前缀
组件内可以嵌套组件
如果在多个页面中使用，可以在app.json中注册全局组件
组件和引用组件的页面不能使用 id选择器/属性选择器/标签名选择器，请改用class选择器，因为只有class样式不会互相影响，相互隔离。
组件样式的互相影响#
默认组件与引用页面是不互相影响的，如果我们希望互相影响，可以更改styleIsolation的取值

isolated 启用样式隔离（默认值）
apply-shared 引用页面将影响自定义组件，但组件不影响引用页面
shared 引用样式和组件互相影响

Component({
  options: {
    styleIsolation: 'apply-shared'
  }
})
注意：希望其互相影响最好也使用class样式

父传子#
父页面向组件传递数据#
在父页面中传递数据

<my-cpn title="我被传递"/>
在组件中通过properties设置传递数据的类型，默认值，及观察新旧数据

properties: {
    title:{
      type:String,
      value:'我是默认标题',
      observer(newVal,oldVal){
        console.log(newVal,oldVal)
      }
    }
}
在组件中接收数据

<view>{{title}}</view>
小技巧：

在js中除了使用data-获取父传子的数据外，还可以使用
this.properties.数据名来获取

父页面向组件传递样式#
在wxss中设置样式，并通过父页面传递

<my-cpn titleclass="redstyle"/>
在组件中通过externalClasses设置被传递样式（数组形式）

externalClasses:["titleclass"]
在组件中设置接收样式名 (注意不能用驼峰)

<view class="titleclass">{{title}}</view>
父页面向组件发送事件#
在父页面中想要操作组件，可以向组件发送事件，但不建议在父页面直接修改组件中的data，有违反设计原则，组件中的数据最好在组件中修改。

使用selectComponent获取组件的class/id（建议获取id）

var my_cpn = this.selectComponent("#mycpn");
调用组件的方法

// my_cpn.setData({
//   current:my_cpn.data.current+10
// })
my_cpn.changeData(10)
通过组件的方法来改变组件的data。而不是直接改变
methods: {
	changeData(num){
	  this.setData({
		current:this.data.current +num
	  })
	}
}
子传父#
组件向父页面发送数据

在组件中点击事件调用methods中的函数
<button bind:tap="btnClick">按钮</button>
在函数中使用triggerEvent触发事件，并指定事件名、发送数据和事件选项（事件选项一般用不到）

methods:{
	btnClick(){
		var myinfo = {name:'vicer',age:18};
		this.triggerEvent('myevent',myinfo,{})
	}
}
在父页面中使用bind监听事件名，传递event并通过event.detail来获取数据

<my-cpn bind:myevent="onMyEvent"/>

onMyEvent(event){
	console.log(event.detail)
}
插槽的使用#
普通插槽和vue的插槽使用方法一样，在组件中添加slot标签

如果需要使用多个插槽，除了给插槽命名，还需要增加一个options

多个插槽的使用#
在组件中给插槽命名
 
<view>
<slot name="slot1"/>
<slot name="slot2"/>
</view>
在组件的js文件中配置options
 
Component({
	  options:{
		multipleSlots:true
	  }
})
使用时给标签添加插槽名
 
<my-slot>
  <button slot="slot1">按钮</button>
  <view slot="slot2">哈哈哈</view>
</my-slot>
监听事件的改变#
observers （等同于vue中的watch）
监听properties/data的改变

 
observers:{
	//不同于observer，这里只能监听newVal
	corrent:function(newVal){
		console.log(newVal)
	}
}
组件中监听生命周期函数#
监听所在页面的生命周期#
show 组件所在的页面被展示时执行
hide 组件所在的页面被隐藏时执行
resize 组件所在的页面尺寸变化时执行
 
  pageLifetimes: {
    show: function() {
      // 页面被展示
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
监听组件本身的生命周期#
created 在组件实例刚刚被创建时执行
attached 在组件实例进入页面节点树时执行
ready 在组件在视图层布局完成后执行
moved 在组件实例被移动到节点树另一个位置时执行
detached 在组件实例被从页面节点树移除时执行
error 每当组件方法抛出错误时执行
 
  lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    }
  }
小程序网络请求#
网络请求基本使用#
wx.request(Object)

关键属性解析：

url 请求地址
data 请求参数
method 请求方式
success 成功回调
fail 失败回调
使用promiese进行网络封装#
原因：

微信的封装方法太老旧
防止回调地狱
防止微信更换网络请求方法
网络封装

 
export default function(options){
  return new Promise((reslove,reject)=>{
    wx.request({
      url: options.url,
	  timeout: options.timeout || 5000,
      method: options.method || 'get',
      data: options.data || {},
      success:reslove,
      fail:reject
    })
  })
}
使用方法

 
import request from '../../server/request';

onLoad(){
    request({
      url:'接口地址',
      method:'get'
    }).then(res=>{
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })

}
小程序交互#
Toast弹窗#
微信小程序弹窗wx.showToast

使用方法，直接在函数中调用即可

 
btnClick(){
	wx.showToast({
		title:"我是弹窗",
		duration:2000
	})
}
Toast的其他参数

showModal对话框#
微信小程序对话框wx.showModal

点击确定或取消，来进行事件操作

 
wx.showModal({
  title: '提示',
  content: '这是一个模态弹窗',
  success (res) {
    if (res.confirm) {
      console.log('用户点击确定')
    } else if (res.cancel) {
      console.log('用户点击取消')
    }
  }
})
showModal的其他参数

showLoading加载中弹框#
类似于showToast。需主动调用 wx.hideLoading 才能关闭提示框
所以showLoading更多用于网络请求

 
wx.showLoading({
  title: '加载中',
})

setTimeout(function () {
  wx.hideLoading()
}, 2000)
showLoading的其他参数

showActionSheet下拉操作菜单#
一般用于上传相册或文件等其他操作
tapIndex属性用于显示序列号，用于获取用户点击按钮的下标。
可以用switch来判断并执行操作

 
wx.showActionSheet({
  itemList: ['A', 'B', 'C'],
  success (res) {
    console.log(res.tapIndex)
  },
  fail (res) {
    console.log(res.errMsg)
  }
})
showActionSheet的更多参数

分享小程序#
当我们需要分享小程序时，在page中添加onShareAppMessage函数

title //设置分享页标题
path //分享后打开的页面
imgUrl //分享时展示的图片

除了点击右上角分享，我们还可以通过button设置open-type='share'来调用此函数

<button open-type="share">转发</button>

  onShareAppMessage(res){
    console.log(res)
    return {
      title:'我是标题',
      path: "pages/category/category"
    }
  }

小程序登入#

我们前端需要做的操作

调用wx.login获取code
调用wx.request发送code到我们自己的服务器（我们的服务器会返回一个登入态标识，比如token）
将登录态标识token进行储存，以便下次使用
请求登录态标识的接口时，携带token
下面代码中用到的接口
请求token接口

接口地址：/login
请求方式：post
参数列表：code
返回值：token

验证token接口

接口：/auth
请求：post
参数：header:{token} 本地保存的token
返回值：
错误码：
1001 没有传入token
1002 传入错误的token
1003 token过期

 
const TOKEN = 'token';
App({
  globalData:{
    token:''
  },
  onLaunch: function () {
    //3. 获取token
    const token = wx.getStorageSync(TOKEN);
    //4. 验证是否得到token
    if(token && token.length !==0){
      //5. 验证是否过期
      this.checkToken(token)
    }else{
      this.login()
    }
  },
  checkToken(token){
    wx.request({
      url: '接口/auth',
      method:'post',
      header:{
        token
      },
      success:(res)=>{
        //6. 验证token过期代码，过期则重新登入，不过期则保存到全局变量
        if(!res.data.errorCode){
          console.log('得到token并储存到全局变量')
          this.globalData.token  = token;
        }else{
          console.log('token过期，执行登入')
          this.login()
        }
      }
    })
  },
  login(){
    //1. 登入小程序
    console.log('执行登入操作');
    wx.login({
      success: (res) => {
        const code = res.code
        wx.request({
          url: '接口/login',
          method: 'post',
          data: {
            code
          },
          success: (res) => {
            //2. 进行保存token
            const token = res.data.token
            this.globalData.token = token;
            wx.setStorageSync(TOKEN, token);
          }, 
          fail: (err) => {
            console.log(err)
          }
        })
      }
    })
  }
})
页面跳转navigator#
navigator跳转标签

属性：

url //要跳转的链接
open-type //跳转方式
delta //退回的层数
open-type属性：

navigate //默认跳转。保留当前页面跳转，不能跳转tab页面
redirect //关闭当前页面跳转，不能跳转tab页面
switchTab //跳转到tab页面
reLaunch //关闭所有页面重定向
navigateBack //返回上一个页面，可以配合delta使用
 
<navigator url="/pages/detail/detail">保留当前页面跳转</navigator>
页面跳转的数据传递#
跳转时数据传递#
在navigator的url中插入查询参数
直接输入常量 ?name='vicer'&age=18
也可以使用保存在data中的数据?name={{name}}&age={{age}}
使用代码跳转的方式，传入参数'/pages/detail/detail?iid=' + iid
 
<navigator url="/pages/detail/detail?name='vicer'&age=18">保留当前页面跳转</navigator>
在跳转页面中通过onLoad生命周期函数的参数来获取值
 
onLoad: function (options) {
    console.log(options)	
}
返回时数据传递#
返回时不能通过navigator来传递数据，页面返回时会调用onUnload，
所以要通过onUnload生命周期函数来获取getCurrentPages的数据来进行改变

 
  onUnload(){
    const pages = getCurrentPages()
    const home = pages[pages.length - pages.length];
    home.setData({
      name:'tace'
    })
  }
通过代码进行跳转#
当我们不希望有navigator时，可以使用代码进行跳转

open-type属性对应的代码：

navigate 对应 wx.navigateTo 的功能
redirect 对应 wx.redirectTo 的功能
switchTab 对应 wx.switchTab 的功能
reLaunch 对应 wx.reLaunch 的功能
navigateBack 对应 wx.navigateBack 的功能
通过绑定监听事件，再函数中运行跳转功能，如

 
btnClick(){
	wx.navigateTo({
		url:'/pages/detail/detail'
	})
}
小程序高级技巧#
setData的使用技巧#
在修改data中的参数时，data中保存的不一定直接就是单一的属性，还有可能保存的对象或者数组，那么我们该如何在setData中修改对象和数组呢？

 
data:{
	name:'vicer',	//属性
	info:{			//对象
		name:'viceroy'
	},
	arr:[1,2,3,4],	//数组
	obj:{
		people:{
			name:'xiaowang'
		}
	}
}
 
//let objname = this.data.obj.people.name     错误用法
let objname = `obj.people.name`

this.setData({
  name:'tace',
  'info.name':'VICEROY',	//对象的修改方法
  arr:[10 ,20 ,30 ,40 ],	//数组的修改方法1
  'arr[3]': 999,			//数组的修改方法2
  [objname]:'xiaohong'		//对象&数组的修改方法
})
解释：

""的用法： 对象和数组可以加引号，来进行修改

[ ]的用法： 意为着这里直接把方括号中对应的值进行修改
例如

 
//let objname = this.data.obj.people.name     错误用法
let objname = `obj.people.name`		//使用模板字符串拼接
this.setData({
  [objname]:'xiaohong'
})
这里修改的不是objname，而是obj.people.name对应的值。

在setData中还有回调函数，但回调函数经过测试并能不修改参数，也可自己进行测试或，进行一些其他操作


this.setData({
      text: 'Set some data for updating view.'
    }, function() {
      // this is setData callback
	  console.log(this)
    })