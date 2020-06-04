### webpack 常见应用,性能优化

#### module 、 chunk、bundle 的区别；

>1、 module 各个源码文件。webpack 中一切皆模块
>
>2、chunk  webpack  分析过程中，一块一块的， 多模块合并成的，如： entry, import(), splitChunk 等
>
>3、bundle  最终的输出文件

#### webpack 性能优化

·考察部分：

* 优化打包构建速度--- 提升开发体验和效率
* 优化产出代码---- 提升产品性能



##### 性能优化---- 构建速度

* 优化 babel-loader-- 只用于开发环境

> 1、开启缓存   ： 第二次，如果 没有改 就启用缓存； 
>
> 2、明确范围
>
> ```javascript
> {
>   test:/\js/$,
>   use:['babel-loader?cacheDirectory'],// 开启缓存
>   include:path.reslove(___dirname,'src')// 明确范围
>   /*
>   排除范围 ，include  和 exclude 两者选一个 
>   exclude:path.resolve(__dirname,'node_modules')
>   */
> }
> ```
>
> 

* IgnorePlugin  **可以用到生成环境**； 不用的话： 生成环境代码提交大

> 忽略无用文件； 避免打包无用文件；**直接不引入代码包，代码中没有**
>
> ```Javascript
> //比如： import moment from 'import'，这样会默认引入所有语言的js 代码，代码过大； 
> // index.js
> 
> import moment from 'import' 254kb 
> import 'moment/locale/zh-cn'// 手动引入中文语言包 50kb
> moment.locale('zh-cn'); // 设置中文语言
> // 在 webpack 中配置
> plugin: [
>   // 忽略 moment 下的 locale 目录
>   new webpack.IgnorePlugin(/\.\/local/,/moment/)
> ]
> 
> ```
>
> 

* noParse -- **可用于生产环境**

> 避免重复打包；** 引入相关代码但是不打包了***；
>
> ```javascript
> module.exports = {
>   module: {
>     /*
>     	react.min.js 忽略对它的重复处理
>     */
>     noParse:[/react\.min\.js$/]
>   }
> }
> ```
>
> 

*  happyPack  ---**可用于生产环境**

> 多**进**程打包
>
> * Js  单线程，nodejs 单线程， 不支持多线程打包；需要开启多进程打包
> * 提高构建速度（特别是多核CPU）
>
> ```javascript
> // webpack.config.js
> const HappyPack = require('happypack');
> module.exports = {
>   module: {
>     rules:[
>       {
>         test:/\.js$/,
>         // 把对.js 的文件处理交给 id 为 babel 的 happyPack实例处理，开启多进程打包
>         use:['happypack/loader?id=babel'],
>         include:srcPath
>       }
>     ]
>   }.
>   plugins:[
>   	new HappyPack({
>   			// 用唯一标识符 id 来代表当前的 HappyPack 是用来处理一类特定的相关
>   			id:'bable',
>   			// 如何处理.js 文件 ，用法 和 Loader 配置中 一样
>   			loaders:['babel-loader?cacheDirectory']
> 		})
>   ]
> }
> ```
>
> 

* ParallelUglifyPlugin ---**必须用于生产环境**

> 多进程压缩 js 
>
> * webpack 内置 Uglify 工具压缩js ;但是 Uglify 是单线程；需要用ParallelUglifyPlugin 开启多进程压缩，效率更高更快
> * 原理和 happypack 一样
>
> ```javascript
> // webpack.prod.js
> const ParallelUglifyPlugin = require('Parallel-uglify-plugin');
> module.exports = {
>   module: {
>     rules:[
>      {}
>     ]
>   }.
>   plugins:[
>   	new ParallelUglifyPlugin({
>   		// 传递UglifyJS 参数
>   		// 还是 使用 UglifyJS 压缩， 只不过帮助开启了多进程
>   		uglifyJS: {
>   			output: {
>   				beautify: false,// 排版的输出， false就是紧凑型 
>   				comments: false,// 删除所有的注释
> 				},
>   			compress: {
>           // 删除所有的 console 语句，可以兼容到 ie 浏览器；
>           drop_console: true,
>             // 内置定义了只用到一次的变量； 就是对变量进行优化；
>             // 比如： var a= 10 ; var b= 20; var c = a+ b ;
>             // 在编译的时候 ；就直接编程成  var c = 30 ,会帮我们直接算出来
>             collapse_vars: true,
>               // 提取出现多次但是没有定义成变量去引用的静态值；
>               reduce_vars: true,
>         }
> 			}
> 		})
>   ]
> }
> ```
>
> **关于开启多进程： **
>
> * 项目较大，打包较慢，开启多进程打包会提高速度
> * 项目较小，打包很快，开启多进程会降低速度（进程开销）
> * 按需使用
>
> 

* 自动刷新--- 用的少，开启了 dev-server 就自动带上了； **不用于生成环境**

> ```javascript
> module.export = {
>   watch:true,// 开启监听，默认是 false
>   // 注意开启监听之后，webpack-dev-server 会自动开启刷新浏览器
>   
>   // 监听配置
>   watchOptions: {
>     ignored: /node_modules/,// 忽略
>     // 监听到变化发生后，会在等 300ms 再去执行动作，防止文件更新太快导致重新编译频率太快
>     aggregateTimeout:300,// 默认 300ms
>     
>     // 判断文件是否发生变化是通过 不停的去询问系统指定文件有没有变化实现的； 
>     poll:1000 // 默认每隔 1000 ms 询问一次
>   }
> }
> ```
>
> 

* 热更新   **不用于生成环境**

> 对比自动刷新： 
>
> 自动刷新： 整个页面全部刷新，速度慢， 各种状态都会丢失-表单填写数据都会丢失； 
>
> 热更新： 新代码生效，网页不刷新，状态不丢失；
>
> 缺点： 增加，热更新代码逻辑。 需要自己配置模块； 需要的模块过多，就很复杂
>
> ```javascript
> if(module.hot) {
>   module.hot.accept([../module name],()=>{
>     //.......
>   })
> }
> ```
>
> 

* DllPlugin **不用于生成环境**

> 动态链接库插件
>
> * webpack 已经内置支持
> * DllPlugin ---先打包出 dll 文件 
>
> > 通过  
>
> * DllReferencePlugin----在使用文件
>
> 用途背景：
>
> * 前端框架 vue React，  体积大，构建慢，但是 比较的稳定，不常升级版本；
> * 同一版本只构建一次即可，不不用每次都重新构建

#### 性能优化---- 产出代码

产出代码特点要求：

* 体积更小
* 合理分包，不重复加载
* 速度更快，内存使用更少

 **小图片 Base64编码**：在配置 loader的时候 ，利用 limit：5*1024； 小于 5kb 的图片 用 base64 格式产出；

**bundle使用 hash** : 在 output 中的 filename: 使用 hash; 

**懒加载**：import(); 大文件，异步加载；和 vue React  router 的异步加载一样；

**提取公共 代码**：利用 cacheGroups ；配置提取公共模块；

**IgnorePlugin**：忽略无用的文件；按需引用

**使用 CDN 加速**：output 中 加一个 publicPath: 'cdn.com'

**使用 production**：见下面

**Scope Hosting**:见下面





#### 使用 production

* 自动开启代码压缩----代码体积更小，速度更快

> Mode: 'production'

* 使用production  Vue  和 React  等会自动删掉调试 代码（入： 控制台的 warning）

* 使用production会启动 Tree-shaking---->  删除 没有使用的方法 属性等；**必须是 ES6 中的 Module 使Tree-shaking-才能生效，使用 commonjs 不能生效**

#### ES6Module 和 Commonjs 的区别

nodejs 使用Commonjs;

* Es6 Module 是静态引入，编译时引入；
* commonjs 是动态引入，执行时引入；
* 只有ES6 Module 才能静态分析，实现 Tree-Shaking

```javascript
// 动态引入， 静态引入 的区别
let apiList = require('../config.api.js')
if(isDev) {
  // 可以动态引入，执行时引入
  apiList = require('../config.api_dev.js')
}
import apiList from '../config.api.js'
if(isDev) {
  // 编译时报错，只能静态引入
 import apiList from '../config.api_dev.js' 
}


```



#### 什么是 Scope Hosting

* 多个函数 合并成一个函数 ； 代码体积更小
* 创建函数作用域更少
* 代码可读性更好

直接在 webpack.config.js  引入 plugin； 在 plugins 中使用 就可以了

```javascript
const ModuleConcatenationPlugin = require('ModuleConcatenationPlugin')
module.export = {
  plugins:[
    // 开启 Scope Hosting
    new ModuleConcatenationPlugin()
  ]
}
```

