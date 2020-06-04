### babel

* 环境搭建 & 基本配置 
* Babel-polyfill
* Babel-runtime

#### 环境搭建

```javascript
// index.js
 const sum = (a,b)=> a+b
// package.json
{
  "devDependencies":{
    "@babel/cli":'7.7.5',
    "@babel/core":'7.7.5',
    "@babel/plugin-transform-runtime":'7.7.5',
     "@babel/preset-env":'7.7.5',
  },
  "dependencies":{
    "@babel/polyfill":"7.7.0",
     "@babel/runtime":"7.7.0",  
  }
}
 // .bablrc 
    
{
  "presets":[
    [
      "@babel/preset-env"
    ]
  ],
    "plugins":[
      
      
    ]
}
    // 运行
    npx babel index.js
```









### .babelrc



#### presets 和 plugin 

