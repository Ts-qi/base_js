### 什么是客户端渲染？

 







### 什么是 服务端渲染 ?

特点：页面上的内容在服务器就生成好了，页面拿到后直接渲染就行；不用在请求数据；

react为例： 流程： 浏览器发送请求， 服务器运行 React代码生成页面，服务器返回页面，浏览器渲染就可以了

### React 客户端渲染的优势与弊端

客户端渲染： 前后端分离，前端请求接口，后端发送数据； 

弊端：

​	客户端流程：

* 浏览器下载 html 文档；

* 浏览器下载 js 文件；

* 浏览器运行 react代码； 

* 页面准备就绪加载； 

  1 、以上流程就导致， 用户的**首屏加载速度慢**

​	2 、 seo：百度爬虫只认识 html 上的内容， 不能识别 js中的内容； 所以 在SSR 有利于 seo 

​	3、react 在浏览器执行，消耗的是浏览器的性能；

**服务端渲染：**

	*   服务端有了相应的 html , 前端拿到只需要渲染就可以 了；
	*   react 代码在服务器上执行，消耗的是服务器的性能；-- 增加机器 等



注意： node 是 common js模式； 只能有  require 的方式引入； 不支持 es6 的 import 的方式引入；

### SSR  

虚拟 DOM， 以字符串等从后端返回来， 浏览器在解析js 字符串，转变为对象， 在进行渲染；

### 同构

* 一套 react代码 在服务端执行一次，在客户端在执行一次；
* 服务端渲染中在 后端渲染的 代码 HTML 中 不要有文本节点；





**如何在浏览器执行 react 的代码** ？





Webpack-merge 合并 webpack 的配置



同构流程： 服务器运行 React 代码渲染出 html, 发送HTML 给浏览器； 浏览器接收到内容展示，浏览器加载 js 文件， js 中的 React 代码在浏览器端重新执行，然后 react 代码接管页面操作；



### SSR 中的路由 

利用 staticRouter;  客户端渲染利用的是 browserRouter;









### Redux 

Reducer 是一个纯函数；

```javascript
// reducer.js
const defaultState = {
  list:[]
}
export default  (state=defaultState,action)=> {
  	switch (action.type) {
      default:
        return state
    }
}
//
```

