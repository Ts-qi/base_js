### webpack 基本配置

* 拆分配置  和 merge （webpack-merge）

> 拆分： 1 、 分为 common ,  dev 环境，  online环境等。根据自己所需 相应配置
>
> Merge ： 将 common  和 dev 或者 online 合并起来

* 启动本地服务： devServer

* 处理 ES6： loader 中的 rules ;

* 处理样式：  loader 中的 rules ； loader 执行顺序： 从后往前；比如：loader:['style-loader', "css-loader","postcss-loader"];从 postcss-loader开始执行到 style-loader;  

  ```javascript
  //postcss-loader 需要一个postcss.config.js :
  //  autoprefixer  和postcss  都是需要npm i  安装；
  module.exports = {
    plugins: [require('autoprefixer')]
  }
  ```

* 处理图片： 小于 5kb 的图片用 base64 去产出

```javascript
use: {
  loader:'url-loader',
    options: {
      //小于 5kb 的图片用 base64 去产出 ,否则 依然沿用 file-loader 的形式；去请求一次浪费 HTTP 资源；
      limit: 5*1024
      // 打包到 img 目录下
      outputPath: '/img/'
      
    }
}
```

output 中的配置

```javascript
output : {
	// 此处打包 代码的时候  加上 hash 值 8 ； 如果打包的内容变更了； 那么    	//hash 的值就会变；反之 就不变，不变的时候，就会命中缓存，那么网页就会更快；
 //  好处：可以观察到 打包的内容是否更新；
	filename:'bundle.[contentHash:8].js',
	path:disPatch
}
```

* 模块化

#### 



