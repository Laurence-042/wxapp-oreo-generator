我跟你讲，就像动漫里干大事的时候往往有BGM，写这个教程时我也是带着BGM码字截图敲代码的，感觉不赖。看教程时也可以试试，毕竟看教程又不是什么严肃的事，不过记得不要打扰到身边的人（笑）

 VA-11 HALL-A 插曲 [Every Day Is Night](http://music.163.com/song?id=1349927611&userid=262081248) 

文件说明：

| 文件名（目录名）    | 用途                                                         |
| ------------------- | ------------------------------------------------------------ |
| README.md           | 就是这个文件                                                 |
| LICENSE             | 协议，本项目使用MIT协议开源                                  |
| /oreo               | 本次教程需要用到的资源，内含三张oreo图片                     |
| /oreo-generator-pre | 写这个教程前为验证可行性与难度评估写的oreo生成器             |
| /oreo-generator     | 你将随着本次教程做出来的成品，比起上面的少了wx.request演示，但css是优化后的版本 |

# 这个系列将讲些什么

考虑到微信小程序和网页应用重合极大，所以本系列将以微信小程序为载体，将带着新手做一个能用的程序的实践作为主要内容，以此来帮助新手完成从“只会写控制台应用”到“能做真正的应用”的过渡。所以建议各位不用过于注重微信小程序的语法，而要注重设计程序的思想（也就是知道实现一个功能需要用到什么东西），以及从什么都不了解的状态下如何通过查阅文档和互联网上的资料最后得以成功设计一个程序的能力

# 前置技能

知道html，css是啥（基本上看过俱乐部里的前端基础系列教程的第一节就行）

# 什么是微信小程序

简单来说就是**依赖微信和腾讯提供的框架**运行的一种**特殊的网页应用**

所以它和制作网页应用所用的技术重合很大……到底有多大呢，举个例子，微信小程序的wxss和css几乎没什么两样，微信小程序的wxml和html都是xml而且能在wxml里找到大量html的标签，而且如果只是做个简单应用的话，很可能都分不出使用vue的网页应用源码和微信小程序的源码（当然其实这俩差别不小，但他们的列表渲染和条件渲染语法几乎一致）

# 为什么用微信小程序

担有大量方便API（比如request，路由，微信内置的功能（比如登录功能，微信地图之类的）的接入，多到一页放不下的那么大量，而且还在持续增加中） 

开发并不困难，基本上只要有基础的网页应用开发技术就足以做出一个微信小程序（我当年刚刚入门微信小程序的开发时js都是现学的）

便于传播，用户可以通过微信进行方便地分享并使用（相信你们已经被那些帮忙砍价，抢票的微信小程序分享弄得不胜其烦了（笑））

可以利用腾讯提供的服务使用serverless开发模式进行微信小程序的开发（通过前端js调用腾讯提供的接口对数据库进行增删改查，你甚至不需要租一个服务器并在它上面实现后端！不过这个系列在计划中并不准备使用serverless开发模式，因为serverless模式极大地模糊了前后端的概念，方便了前端但容易造成维护困难。而本系列将介绍的前后端分离的开发模式更为通用，网页应用后端、微信小程序后端、安卓应用后端都可以使用这里提到的后端开发方式，前后端分离的开发模式里因为前后端不需要关心彼此的实现，在维护时也有校大优势）

现在我们可以开始教程了

------



# 首先，信息获取渠道——搜索引擎

就像**“这个系列将讲些什么”**段里提到的，这个系列将包含“如何从什么都不了解的状态下如何通过查阅文档和互联网上的资料最后得以成功设计一个程序”的基本培训。首先你需要一个足够靠谱的信息获取渠道，据我观察即使到大三了还有大量同学依旧在用百度……当他们抱怨百度搜不到想要的东西而Google又没法用时，我问他们为啥不用网络工具或者用一些其他国内也能用的不错的搜索引擎时，看着他们一脸懵逼的表情我就知道这已经是个问题了……

有能力的话推荐使用Google，毕竟老牌搜索引擎。如果没有相应网络工具的话，可以使用下面这俩

* DogeDoge搜索 
  * 搜索格式： [https://www.dogedoge.com/results?q=微信小程序](https://www.dogedoge.com/results?q=微信小程序) 
  * 特点：号称不追踪用户信息，因此也不会根据用户搜索的关键词对搜索结果进行过滤（没错，你可以拿他搜索shadowsocksr），搜索能力不低
* mengso搜索
  * 搜索格式： [https://mengso.com/search?q=微信小程序](https://mengso.com/search?q=微信小程序) 
  * 特点： 对专否的教程和stackoverflow有额外支持（比如当你搜索css border这俩关键词时它会把专否的教程中关于css的border属性的教程放在第一条。搜索异常信息时会将stackoverflow的相关回答作为第一条），对编程初学者很友好 ，搜索能力不低，和DogeDoge相当
  * 缺点： 然而你无法用它搜素“**独立**与线性无关的区别”，“**共产**主义与社会主义的区别”之类的关键词，过于怂 

------



# 现在我们可以正式开始了

我们这次的实践项目是“奥利奥生成器”，其实这个项目的灵感来源为[Github](https://github.com)（全球领先的~~同性交友（划掉）~~软件开发平台）上的一个项目[oreoo]( https://github.com/ddiu8081/oreooo)。这个项目是个使用网页canvas实现的一个网页应用，但我们这次的项目将使用微信小程序提供的列表渲染，条件渲染，数据绑定等方式来实现它。思路差不多，都是图层叠加，但实现方式是可以说完全不同的

# 首先我们需要到微信小程序的官网下载微信小程序的开发工具

微信小程序官网： https://mp.weixin.qq.com/cgi-bin/wx 

![1.PNG](https://i.loli.net/2019/11/02/gJfpOUty2Q9YnoZ.png)

没错，就是这个。当然，左边的[开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)我们稍后也会用到。这个页面也先别关，我们一会儿等待下载开发者工具时可以先去注册账号，有了账号后才能进行微信小程序的发布。等下载时闲着也是闲着对吧（笑）

![2.PNG](https://i.loli.net/2019/11/02/A8LFKlJqZeytGrY.png)![3.PNG](https://i.loli.net/2019/11/02/egz2VwsXYSGPt14.png)

好吧，企鹅非常相信各位的信息获取能力，所以刚刚那个“开发者工具”的链接并不是指向下载页面的链接……以及很遗企鹅没有提供Linux的版本……

![4.PNG](https://i.loli.net/2019/11/02/b9w4pEWT5xUosdV.png)

还记得刚刚我们说的要注册嘛？注册入口就在官网的最下面。注册的流程就不赘述了，根据自己的情况填写就是了。信息部分的身份可以填“个人”，放心，这个账号是可以注销的，所以即使以后你去为一个公司开发微信小程序了，现在填个人也不会有什么问题的。

然后当开发工具下载完毕后就可以开始愉悦的敲代码了，当你打开时就会看到微信传统的扫码登陆操作（题外话：微信电脑客户端的强制扫码登录简直有毒，如果我手机在身边为啥要用电脑端嘞）

![5.PNG](https://i.loli.net/2019/11/02/FnkMX4vrjat8ob5.png)

![6.PNG](https://i.loli.net/2019/11/02/UjEzvNox4LHmF7c.png)

当你完成扫码并在手机上确认后就可以看到这个界面了，点击红色部分可以新建一个项目，蓝色部分可以进入管理模式删除项目

![7.PNG](https://i.loli.net/2019/11/02/GW7Lr1HOsSJxEwV.png)

填好项目名称和路径后，由于我们还在练手，所以可以使用测试号，其他保持默认然后新建就行

![8.PNG](https://i.loli.net/2019/11/02/U8TLWKOMHCvo5jE.png)

理论上新建完毕后你将会看到这个界面。左侧为预览，也就是你做出的微信小程序的样子。中间为项目目录结构，右侧为打开的文件内容，下方为开发时会用到的一些工具，当用到它们时会进行介绍的

微信小程序可以有多个页面（pages，比如上图所示的index和logs这两个页面），通常约定俗成地把页面放在pages目录下，并把小程序刚启动时的主页面命名为index。声明哪个页面才是小程序刚启动时的主页面的内容在app.json中，app.json文件的内容为一种叫做JSON的数据格式，常用于复杂的数据传输或配置文件。如果不了解的话可以在[JSON在线编辑器](http://www.bejson.com/jsoneditoronline/)（如下图）这个网站对比下左右的对应关系就差不多能理解了。

![9.PNG](https://i.loli.net/2019/11/02/MyAx39VfqJZgCri.png)

![10.PNG](https://i.loli.net/2019/11/02/eYFMUSlJAIOjwQX.png)

app.json文件的内容如上图，pages属性里的第一个值（目前是"pages/index/index"）就是小程序启动时展示的首页了。

然后我们可以在这个基础上做我们的奥利奥了，首先清空index.wxml和index.wxss并删除inedx.js的暂时用不到的内容。inedx.js剩下的代码如下所示（你也可以直接把这个复制到inedx.js中）

```javascript
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {

  },
  
})

```

当你按下`Ctrl+S`时就会保存文件修改并重新加载预览，现在它变成空白的了，变成了一切开始的状态（笑）

![11.PNG](https://i.loli.net/2019/11/02/jEMmRpInebBHxQh.png)

现在把这个项目里附带的三张图导入到这个项目中，放在`pages/index/img`目录下（你可以在目录结构部分点击右键然后选择“硬盘打开”就可以在文件管理器中打开相应的目录了，在index目录下建一个img目录并把那三张图放进去就行）

![12.PNG](https://i.loli.net/2019/11/02/GWsIuVSR54XnPKT.png)

当你导入完成后目录结构应该是这样的（顺便一提，各个分区的大小是可以通过拖拽边缘来调整的，我这里把consol区向下拉了点，以便相对完整地看一下oreo的O）

然后我们在index.wxml里输入如下代码，代码的含义已经尽可能详细地注释了

```html
<!--index.wxml-->
<!-- view和网页中的div基本可以看作是一个东西，都是简单的容器
由于微信小程序不像网页那样有body块，而用page的话又会有一堆问题，所以我习惯于使用body类的view包裹页面元素来达到相似效果 -->
<view class="body">
  <!-- 一个奥利奥当然要包装起来，否则只是饼干和奶油罢了 -->
  <view class="oreo">
    <!-- 考虑到oreo的每一层都应该有同一的一些样式，而o，re，ob这些应该有自己的一些特点有样式，所以将每一层的图片统一用一个oreo-layer类的view包裹。这也有之后在样式部分使用缩减view大小使image重叠的考量 -->
    <view class="oreo-layer">
      <!-- 基本就是网页的那个image，不再赘述 -->
      <image class="oreo-o" src="img/O.png"></image>
    </view>
    <view class="oreo-layer">
      <image class="oreo-re" src="img/R.png"></image>
    </view>
    <view class="oreo-layer">
      <image class="oreo-o" src="img/Ob.png"></image>
    </view>
  </view>
</view>
```

![13.PNG](https://i.loli.net/2019/11/02/XhHkrVzeU5YAayp.png)

按下`Ctrl+S`保存并重新加载预览后就能看见可爱的oreo啦，不过由于没有给它们指定样式，所以它们并没有那么美观地摞在一起，接下来是css时间

```css
/**index.wxss**/
.body{
  /**为元素设置边距，毕竟紧贴边框的oreo看起来不太好**/
  paddimg: 5vh
}

.oreo{
  /**使用flex布局排列每层oreo**/
  display: flex;
  /**排列方向为按列排列**/
  flex-direction: column;
  /**垂直于主轴方向（由于是按列排列，所以主轴是上下的）的对齐为居中对齐**/
  align-items: center;
}

.oreo-layer {
  /**让包裹每层oreo的view更小，这样每层oreo在保持大小的前提下占的垂直位置就会变小，结果就是可以让每层oreo叠在一起**/
  height: 20vh;
}

.oreo-o {
  /**饼干应该比馅大点**/
  width: 50vh;
}

.oreo-re {
  width: 45vh;
}
```

![14.PNG](https://i.loli.net/2019/11/02/VY8wu4zqJNeStbL.png)

奥利奥叠起来啦！呃……先不要在意层叠次序，我们先注意一下`paddimg: 5vh`，vh是个啥？基本上……你可以把它当作某种em，它会根据用户屏幕分辨率决定一个元素有多大，所以如果不要求特别精确，使用vh是个好选择

然后我们再注意一下上面提到的那个`.oreo`里的`display: flex;`。虽然网页应用的前端也能用这个属性，但实际开发时用的不多，因为只有比较新的浏览器才支持它。不过在这里我们可以放心使用，因为微信小程序不存在浏览器内核版本过旧的情况（毕竟几乎没有人还在用5.0版本的微信）。

flex布局可以很容易地处理元素排布并自动使其中的元素（被带有`display: flex;`的标签包裹的标签，这里就是一堆oreo图）的大小适应容器（就是带有`display: flex;`的标签，这里是class为oreo的那个view）大小。考虑到篇幅、连贯性以及与前端系列的重合，这里不对其做详细介绍，但这个在微信小程序开发中还是挺常用的，你可以在[一劳永逸的搞定 flex 布局](https://juejin.im/post/58e3a5a0a0bb9f0069fc16bb)里得到更详细的介绍。

现在我们再把关注点移到这个不靠谱的层叠顺序上吧。我们并不想让下层oreo的图层显示在上层的图层上面，所以怎么办？去互联网上找一下吧！通常情况下，使用以空格分隔的关键词进行搜索（比如“css 层叠顺序”）往往比使用一句完整的话（比如“如何使用css修改html元素的层叠顺序”）进行搜索效果更好，因为这样更符合搜索引擎的工作方式（按词进行匹配）。不过在这个问题中由于我们的问题非常明确，这两种搜索方式得到的结果差别并不是很大，但有些时候后者更倾向于得到知乎和百度知道之类的结果

![15.PNG](https://i.loli.net/2019/11/02/mvVQ3L8T6Hkyntj.png)

啊哈！第一个就是我们想要的，现在我们知道使用`z-index`就可以修正oreo的层叠顺序了！不过由于每层oreo的`z-index`都不同，所以不能使用类进行指定了，转而在wxml里对单个元素进行指定。

```html
<!--index.wxml-->
<!-- view和网页中的div基本可以看作是一个东西，都是简单的容器
由于微信小程序不像网页那样有body块，而用page的话又会有一堆问题，所以我习惯于使用body类的view包裹页面元素来达到相似效果 -->
<view class="body">
  <!-- 一个奥利奥当然要包装起来，否则只是饼干和奶油罢了 -->
  <view class="oreo">
    <!-- 考虑到oreo的每一层都应该有同一的一些样式，而o，re，ob这些应该有自己的一些特点有样式，所以将每一层的图片统一用一个oreo-layer类的view包裹。这也有之后在样式部分使用缩减view大小使image重叠的考量 -->
    <view class="oreo-layer" style="z-index:3">
      <!-- 基本就是网页的那个image，不再赘述 -->
      <image class="oreo-o" src="img/O.png"></image>
    </view>
    <view class="oreo-layer" style="z-index:2">
      <image class="oreo-re" src="img/R.png"></image>
    </view>
    <view class="oreo-layer" style="z-index:1">
      <image class="oreo-o" src="img/Ob.png"></image>
    </view>
  </view>
</view>
```

![16.PNG](https://i.loli.net/2019/11/02/bXmK6DlHBqWApEf.png)

现在oreo的层叠顺序对劲了！注意到了吗，画圈的部分，我们为每层oreo指定了一个z轴次序，值越大的元素就会显示在越上层

现在我们可以稍微再修改下oreo层的view的高度让每层oreo看起来像是贴合在一起而不是分散开的。经测试当height为5vh时效果相对最好，不过似乎馅过高了……哦，刚刚只调了饼干和馅的宽度，但忘记调他们的高度了！

![17.PNG](https://i.loli.net/2019/11/02/7hnt3pY2GPyXIud.png)

在添加上高度限制后，一个完美的oreo出炉了！

![18.PNG](https://i.loli.net/2019/11/02/nqDbfAeypGjF3r6.png)

OK，你现在已经知道了如何使用类似开发静态html网页的方式制作静态微信小程序页面了。

但这就是我们能做的全部了吗？

不！

------

# 这才刚刚开始！

> 但你可以先休息一下，但别忘了回来

只有一个oreo实在太单调了，我更喜欢orereo（双倍夹心，双倍满足，虽然每制作一个orereo都会留下一个全是饼干的oo……），有些调皮鬼还会搞出oreoreo（另一种意义上的3+2夹心脆啥的……）。所以，我们能不能让使用微信小程序的用户自行选择他们喜欢的oreo呢？当然可以

还记得之前提到的那个[开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)吗（在下载开发者工具的时候提到的），翻开它，然后查看[框架篇，WXML语法参考节](https://developers.weixin.qq.com/miniprogram/dev/reference/wxml/)，主要是数据绑定，列表渲染，条件渲染三小节……嘿你还在等我放图或者把它复制过来嘛？你已经是个成熟的秃头程序猿了，要学会自己翻文档啊！（[**RTFM**]( https://en.wikipedia.org/wiki/RTFM )…… Read The Friendly Manual 的意思，绝对不是 Read The F**king Manual 。嗯，绝对不是）

> 蛤？你说这个教程不就是讲“数据绑定，列表渲染，条件渲染”的，为啥还要你自己去找手册？以及为啥不直接看手册反而浪费时间看这个教程？实际上，如果你真的能略过这个教程直接去看手册，那就再好不过了。要知道，要系统性地了解一个工具（比如微信小程序），最好的方式还是看文档（否则为啥腾讯不用这篇教程当官方教程反而要用文档呢），遇到零碎问题再去Stackoverflow或者CSDN。不过如果直接叫新人去全部看文档，估计会直接浇灭大部分人的热情吧（毕竟当年我也是一看文档就头大，我的俩舍友至今还是一看文档就头大）……这也就是这系列教程存在的意义了——一个比大部分单篇博客更系统，比文档接地气的更容易操作的，发挥手册与实际项目之间桥梁作用的教程。
>
> 题外话：比起去CSDN之类的地方看不知道什么人在什么“年代”写的不知道有没有运行过的代码，翻文档真的更高效~~（除了抄实验的时候）~~。而且这些年来知名工具的文档已经越来越平易近人了。想试试不平易近人的老式文档的话可以找一下Apache系列产品的文档，详细是详细，但排版简直让人毫无阅读欲望……

哦，感谢上帝，你们这帮棒小伙子们没有一听要看文档就弃我老人家于不顾（画外音：哦！写这个的人如果再用这该死的翻译腔讲话的话，我跟你打赌，我绝对会狠狠地踢他的屁股）。现在我们知道可以使用index.js里的data部分进行数据绑定，配合列表条件渲染就能做出任意oreo了。（蛤？还是不知道？上代码！）

```html
<!--index.wxml-->
<!-- 清理了下之前的注释，便于写新注释 -->
<view class="body">
  <view class="oreo">
    <!-- 把之前的三个重复的view使用wx:for实现。遍历oreo属性，将oreo属性里的每个元素称作oreo_layer。将z-index设为oreo_layer的属性z的值 -->
    <view class="oreo-layer" wx:for="{{oreo}}" wx:for-item="oreo_layer" style="z-index:{{oreo_layer.z}}">
      <!-- 根据oreo_layer的属性code的值决定使用哪个图片，0为上层饼干，1为夹心，2为下层饼干 -->
      <!-- 用复制粘贴时别忘了修改class和src，以及注意wx:if还是wx:elif -->
      <image class="oreo-o" wx:if="{{oreo_layer.code==0}}" src="img/O.png"></image>
      <image class="oreo-re" wx:elif="{{oreo_layer.code==1}}" src="img/R.png"></image>
      <image class="oreo-o" wx:elif="{{oreo_layer.code==2}}" src="img/Ob.png"></image>
    </view>
  </view>
</view>
```

```javascript
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    oreo: [{
      code: 0,
      z: 4
    }, {
      code: 1,
      z: 3
    }, {
      code: 1,
      z: 2
    }, {
      code: 2,
      z: 1
    }]
  },

})
```
也许上面那个对新人来说看起来有点别扭，让我们换种写法
```
Page({
  data: {
    oreo: [{code:0, z:4}, {code:1, z:3}, {code:1, z:2}, {code:2, z:1}]
  },
})
```
很明显oreo是一个以字典（dict，有些语言里，比如golang，叫它map）为元素的列表（list，可以理解为一个大小可变的数组）。值得一提的是，在index.wxml里并没有使用`oreo_layer["code"]`这样的字典式写法，而是用了`oreo_layer.code`这样的对象式写法。这里纯粹是个人喜好以及js的对象字典边界模糊的原因（不过一般都是把它当对象使用的，毕竟写起来方便），对js对象与字典的关系感兴趣的可以自行查找相关资料（直接搜“js 对象 字典”就行）。

![19.PNG](https://i.loli.net/2019/11/02/dEvnK7UqZawijub.png)

是我喜欢的orereo（笑），顺便一提，我发现还是把`.oreo`这个class的height设为6vh比较好，这样能看到每层之间的缝。

但难道要用户去自己改data的属性？好吧，我们给用户留一个输入栏吧。现在翻开[开发文档](https://developers.weixin.qq.com/miniprogram/dev/framework/)的[组件篇，表单组件节，textarea小节]( https://developers.weixin.qq.com/miniprogram/dev/component/textarea.html )。现在不用太在意那一堆属性，直接拉到最下面看一下示例。我在这里把我们要用的参考范例单独写在下面

```html
<view class="section">
  <form bindsubmit="bindFormSubmit">
    <textarea placeholder="form 中的 textarea" name="textarea"/>
    <button form-type="submit"> 提交 </button>
  </form>
</view>
```

```javascript
Page({
  data: {
    height: 20,
    focus: false
  },
  bindFormSubmit: function(e) {
    console.log(e.detail.value.textarea)
  }
})
```

写个测试页面测试运行一下，可以发现`e.detail.value.textarea`的值就是按下“提交”按钮时输入栏里的内容。只要我们解析输入，然后把它转化为data里的那个oreo列表就可以了！等等……我有没有说过我们可以用Page的setData方法修改Page的data属性？没说过？好吧，现在你不是知道了嘛（笑）。通常可以在`bindFormSubmit`这样的函数里使用`this.setData(【包含想要替换data中的属性的字典】)`。这里的`this`指向的为当前的这个Page对象。比如原先data为

```
Page({
  data: {
    something: "OK"
    message: "No message"
  },
  ......
})
```

使用

```javascript
this.setData({
    message: "you get an oreo"
})
```

就可以把数据变为

```javascript
Page({
  data: {
    something: "OK"
    message: "you get an oreo"
  },
  ......
})
```

很简单对吧？

在index.wxml里加入form，在index.js里加上对输入的处理以及data的更新，我们很容易（？）就可以写出下面的代码（相信我这真的不算复杂）

增加了一个form用于输入oreo字符串，并添加一个书写提示信息的view

```html
<!--index.wxml-->
<view class="body">
  <!-- 当按下提交按钮时触发bindCommentSubmit函数 -->
  <form bindsubmit="bindCommentSubmit">
    <!-- 默认以oreo占位，当进行输入时触发bindOreoInput函数，按下提交按钮后传到bindCommentSubmit函数里的数据对象e可以使用e.detail.value.oreo_input来获取这个textarea里的内容 -->
    <textarea placeholder="oreo" bindinput="bindOreoInput" name="oreo_input"></textarea>
    <button form-type="submit"> Get my {{oreo_str}} </button>
  </form>
  <view class="message">{{message}}</view>
  <view class="oreo">
    <!-- 把之前的三个重复的view使用wx:for实现。遍历oreo属性，将oreo属性里的每个元素称作oreo_layer。将z-index设为oreo_layer的属性z的值 -->
    <view class="oreo-layer" wx:for="{{oreo}}" wx:for-item="oreo_layer" style="z-index:{{oreo_layer.z}}">
      <!-- 根据oreo_layer的属性code的值决定使用哪个图片，0为上层饼干，1为夹心，2为下层饼干 -->
      <!-- 用复制粘贴时别忘了修改class和src，以及注意wx:if还是wx:elif -->
      <image class="oreo-o" wx:if="{{oreo_layer.code==0}}" src="img/O.png"></image>
      <image class="oreo-re" wx:elif="{{oreo_layer.code==1}}" src="img/R.png"></image>
      <image class="oreo-o" wx:elif="{{oreo_layer.code==2}}" src="img/Ob.png"></image>
    </view>
  </view>
</view>
```

添加了textarea和.message的样式（注意textarea的样式是套用到所有textarea标签上的，这个应该会在前端基础部分学到）

```css
/**index.wxss**/
.body{
  /**为元素设置边距，毕竟紧贴边框的oreo看起来不太好**/
  padding: 5vh
}

textarea{
  background: #eee;
  color: #444;
  width: 100%;
}

.message{
  background: #eee;
  text-align: center;
  margin: 5vh;
  padding: 1vh;
}

.oreo{
  /**使用flex布局排列每层oreo**/
  display: flex;
  /**排列方向为按列排列**/
  flex-direction: column;
  /**垂直于主轴方向（由于是按列排列，所以主轴是上下的）的对齐为居中对齐**/
  align-items: center;
}

.oreo-layer {
  /**让包裹每层oreo的view更小，这样每层oreo在保持大小的前提下占的垂直位置就会变小，结果就是可以让每层oreo叠在一起**/
  height: 6vh;
}

.oreo-o {
  /**饼干应该比馅大点**/
  height: 50h;
  width: 50vh;
}

.oreo-re {
  height: 45vh;
  width: 45vh;
}
```

然后就是重头戏了，index.js部分，逻辑其实很简单，而且注释量不少，写注释的用时都快赶上敲代码的用时了

```javascript
//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    oreo: [],
    real_oreo_str: "",
    message: "",
    image_url: ""
  },

  onLoad: function() {
    // 在页面加载时默认生成一个oreo
    this.generate_oreo("oreo");
  },

  generate_oreo: function(input) {
    // 每层oreo的code存在这里
    let res = [];

    // 标记是否出现了错误
    let error = false;
    // 真正的oreo字符串，如果输入有误则值为更正后的oreo字符串，如果输入无误则和输入一样
    let real_oreo_str = ""
    // 对输入中的每一个字符进行遍历，以oreorreo为例（这是个有问题的输入）
    for (let i = 0; i < input.length; i++) {
      let char = input[i];
      switch (char) {
        case 'o':
          // 如果是o，新加一层2（底层饼干），并使真正的oreo字符串后附加一个o
          res.push(2);
          real_oreo_str += 'o'
          break;
        case 'r':
          // 其实if的条件可以直接写input[i + 1] == 'e'，在js里如果数组越界会返回undefined而不会抛异常。但仍然建议不要养成越界毫无问题的观念，毕竟也就js这种奇葩才可以这么干，而且js里无意识的数组越界经常会引发隐秘的bug
          if (i + 1 < input.length && input[i + 1] == 'e') {
            // 如果是r，则查看后一个字符是不是e，如果是，则加一层1（夹心），并使真正的oreo字符串后附加一个re，i自增跳过e这个字符
            res.push(1);
            real_oreo_str += 're'
            i++;
            break;
          } else {
            error = true;
          }
        default:
          error = true;
      }
    }

    // 如果最上面一层是o（饼干），由于之前都是当底层饼干处理的，现在把它改成顶层饼干
    if (res[0] == 2) {
      res[0] = 0;
    }

    // 根据出错与否设置不同的提示信息
    if (error) {
      this.setData({
        message: "oops, some character is illegal, but you still get an " + real_oreo_str
      })
    } else {
      this.setData({
        message: "you get an " + real_oreo_str
      })
    }

    // 构建oreo这个字典列表，值得一提的是，js里字典和对象的边界非常模糊，感兴趣的可以自行查找相关资料（直接搜“js 对象 字典”就行）
    for (let i = 0; i < res.length; i++) {
      res[i] = {
        id: i,
        code: res[i],
        z: res.length - i
      }
    }

    // 设置oreo属性
    this.setData({
      oreo: res,
    })
  },

  bindCommentSubmit: function(e) {
    // 当提交输入时，在控制台（就是下面那个区域的console）里输出输入的内容，并根据内容生成一个oreo
    console.log(e.detail.value.oreo_input);
    this.generate_oreo(e.detail.value.oreo_input);
  },

  bindOreoInput: function(e) {
    // 每次输入更新时，将oreo_str设为输入的内容
    // console.log(e.detail.value);
    this.setData({
      oreo_str: e.detail.value
    })
  }
})
```

现在`Ctrl+S`，制作你自己的奥利奥吧！

![20.PNG](https://i.loli.net/2019/11/02/bu7QetBwG4rEOUd.png)

orereo赛高！顺便贴心（？）地标注了console的位置（笑）

这期微信小程序教程就到这里了，感觉信息量已经超出我之前的计划了（之前计划的信息量大概也就这个的3/7左右，差不多只是做个静态页面）让我们总结下今天的内容：

* 替代百度的搜索引擎
* 安装开发者工具并注册账号，新建项目
* 将图片之类的资源导入项目
* 使用view，image标签
* 使用class和css美化页面
* flex布局简单的使用
* 使用数据绑定将js里的data中的属性和wxml中的值关联起来
* 试图习惯阅读文档并从中获取自己想要的信息
* 列表渲染，条件渲染
* form的简单使用，输入事件（在textarea里输入时动态变更按钮中的字符串）和提交事件（根据提交时的textarea里的内容生成oreo）的处理

下期教程（如果有的话）的预定内容：

* 版本1
  * 微信小程序导航栏的使用，以及页面路由
  * 页面间的数据传递
  * 组件（component）的使用
  * 组件间的数据传递
* 版本2
  * 利用Bing的今日美图API介绍API，以及使用wx.request接口进行网络请求
  * 介绍如何使用Python3的aiohttp库构建一个无数据库的后端服务器程序
  * 如果时间允许的话，初步介绍一下使用sqlalchemy这个ORM（Object Relational Mapping 对象关系映射）库操作mysql的概念（毕竟要实现一个完整后端需要的技术不少，就Python3和aiohttp都够喝一壶的了，何况再加个MySQL和ORM）

为可爱的新人们着想我压倒性倾向于版本2，但摸了摸感觉有点凉的脑袋，我又无法义无反顾地抛弃版本1……

所以看教程效果吧，如果感兴趣的人不少那就拼上我的头发做版本2，如果没人……（画外音：请不要讲这么恐怖的事）

(ˉ▽￣～) 这里是末尾
