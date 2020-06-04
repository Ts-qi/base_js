### webpack 高级应用

* 多入口

  ```javascript 
  
  // 多页面打包 例子
  // entry  要写多个; 比如下面，index.html  和 other.html
  const HtmlWebpackPlugin = require('html-webpack-plugin')
  module.exports= {
    entry: {
      index: path.join(srcPath,'index.js'),
      other: path.join(srcPath,'other.js'),
      ....
    },
    output: {
      filename: '[name].[hash:8].js'
    },
    module: {
      rules: [
        {
          ...
        }
      ]
    }
    plugin: {
      new HtmlWebpackPlugin({
      	template:path.join(srcPath,'index.html'),
    		filename: 'index.html',
    		chunks:['index']；// chunks 表示该页面需要引用哪些 chunk；此处只引用了 index.js
    	})
      new HtmlWebpackPlugin({
      	template:path.join(srcPath,'other.html'),
    		filename: 'other.html',
    		chunks:['other'，'common','vendor']；// chunks 表示该页面需要引用哪些 chunk；此处只引用了 other.js;
        // 涉及到代码分割splitChunks； 比如上面的 index.html  没有引用到 common 和vendor 的 chunk, 而在 other.html  就引用到了
    	})
    }
  }
  ```

  

* webpack 如何抽离压缩 css 文件

```javascript
// 利用插件 mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('teser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports= {
  module: {
    rules: [
      {
        test:/\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,// 这里不再用 style-loader了,单独拿出来了
          'css-loader',
          'style-loader'
        ]
      },
      {
        test:/\.less$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
           'less-loader',
          'style-loader'
        ]
      },
    ]
  }，
  plugins:[
  	// 抽离 css文件 
    new MiniCssExtractPlugin({
			filename:'css/main.[hash:8].css'
    })
  ]，
  optimization: {
    // 压缩 css
    minimizer: [ new TerserJSPlugin({},new OptimizeCSSAssetsPlugin({}))]
  }
}
```



* 如何抽离公共代码 和第三方代码

```javascript
// 利用插件 mini-css-extract-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('teser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
module.exports= {
  module: {
    rules: [
      {
        test:/\.css$/,
        loader: [
          MiniCssExtractPlugin.loader,// 这里不再用 style-loader了,单独拿出来了
          'css-loader',
          'style-loader'
        ]
      },
      {
        test:/\.less$/,
        loader: [
          MiniCssExtractPlugin.loader,
          'css-loader',
           'less-loader',
          'style-loader'
        ]
      },
    ]
  }，
  plugins:[
  	// 抽离 css文件 
    new MiniCssExtractPlugin({
			filename:'css/main.[hash:8].css'
    })
  ]，
  optimization: {
    // 压缩 css
    minimizer: [ new TerserJSPlugin({},new OptimizeCSSAssetsPlugin({}))]
  }，
  
  // ----------------分割线 -------------------->
  
  
  // _________- 抽离公共代码和第三方 代码
  
  // 分割代码块
  splitChunks: {
    chunks: 'all',
       /**
       initial  入口 chunk,对于异步导入的文件不处理；
       async 异步 chunk，只对异步导入的文件处理
       all 是全部 chunk 
      
      **/
      
      // 缓存分组
      cacheGroups: {
        // 第三方模块
        vendor: {
          name:'vendor', // chunk 名称
            priority: 1,// 权重更高，优先抽离，重要！！！！
            test:/node_modules/,
             minSize:0,// 大小限制
             minChunks: 1 // 最少在你项目中复用过2次
        }，
        // 公共模块
        common: {
            name:'common', // chunk 名称
            priority: 0,// 权重更高，优先抽离，重要！！！！
             minSize:0,// 公共模块大小限制
             minChunks: 2 // 公共模块最少复用过2次
        }
      }
      
      
  }
}

```

* webpack 如何实现异步加载 js

  ```javascript
  // data.js
  export default {
    message:'this is a webpack config'
  }
  // index.js
  // 引入动态数据 ---懒加载
  setTimeout(()=>{
    import('./data.js').then( res=> {
      console.log(res.default.message)
    })
  },1000)
  ```

  

* 处理 jsx