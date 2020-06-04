###  Vue 原理（一）

* 面试为何考察原理？

* 如何考察？ 以什么方式？

* Vue 原理包括哪些？

  > * 组件化和 MVVM模型
  > * 响应式
  > * 模板编译
  > * Vdom 和 diff
  > * 渲染过程
  > * 前端路由

#### 1 组件化基础

* 传统组件化 ---->   asp ,jsp ,php ,nodejs 等； 静态渲染，更新依赖操作 DOM

* 组件化的基础上，产生数据驱动试图（MVVM，setState）；MVVM :  M ----> vue 中的 data: v ---> view : VM --->  Vue 中的 methods ,watch 等

  

  

#### 2 监听 data变化的核心 API

* 组件 data 的数据一旦变化，立刻触发试图的更新  
* 实现数据驱动第一步
* 考察 vue 原理

> 1 实现响应式 核心API：  <b> Object.defineProperty</b>
>
> 2 如何实现？
>
> 3 Object.defineProperty 有一些去缺点； Vue 3.0 利用了 Proxy 

Proxy 有兼容性问题：

> * 兼容性不好，且无法 polyfill



#### 3 Object.defineProperty（不具备监听数组的能力，需要自定义）--重点

* 监听对象
* 监听数组
* 复杂对象，深度监听 
* 几个缺点

> * 深度监听，需要递归到底，一次性计算量大；（可以多次递归吗？ 需要的时候 就去递归） 
> * 无法监听新增属性/ 删除属性（Vue.set  vue.delete）------>走不到Object.defineProperty中的逻辑中去 ; 在判断不是 数组 或者对象的时候，就直接返回了；
> * 无法原生监听数组，需要特殊处理

注意： 本地启动一个服务： index.html , observe.js ;  运行 npm i http-server -g ;下载 http 相关，在设置端口：  http-server -p 8000;

针对以上缺点做出相应的代码：

```javascript
// 触发更新试图
function updateView () {
  console.log('试图更新')
}
//  Object.defineProperty 不能监听到数组原型
// 重新定义数组的原型
const  oldArrayProperty = Array.prototype
// Object.create ： 创建新对象，原型指向oldArrayProperty。在扩展新方法，是不会影响到原型的
const  arrProto = Object.create(oldArrayProperty);
// d定义数组相关的方法
let methodArr = ['push','unshift','splice','slice','pop','shift'];

methodArr.forEach( methodName => {
  arrProto[methodName] = function() {
      // 触发更新试图
      updateView()
      // 然后在调用利用 call   调用数组的方法  相当于： Array.prototype.call(this,...arguments)
    oldArrayProperty[methodName] .call(this,...arguments)
  }
})

// 重新定义属性，监听起来
function defineReactive (target,key,value) {
  // 深度监听 ，，，对象； observer 里面会 判断 value 是否是对象；在去调用
  observer(value)
  // 核心 API 
  Object.defineProperty(target,key,{
    get() {
      return value
    },
    set(newValue) {
      if(newValue !== value) {
        observer(newValue) // 深度监听
        // 设置新的值
        value = newValue;
        // 触发更新试图
        updateView()
      }
    } 
  })
};

//监听对象属性
function observer(target) {
  // 边界处理
  if(typeof target !== 'object' || target === null) {
    // 监听对象和数组
    return target 
  }

  // 判断是否是对象； 如果是 就把定义好的arrProto 赋值给 target.___proto___ 
  if(Array.isArray(target)) {
    target.__proto__ = arrProto;
  }
  // 重新定义各个属性； 利用 For  in 进行遍历

  for(let key in target) {
    defineReactive(target,key,target[key])
  }
};

// 准备数据

const data = {
  name:'joke',
  age:26,
  info: {
    address:'上海',// 需要深度监听
  },
  nums:[1,2,3,4]
}

// 监听数据 
observer(data)

// 测试 
data.name = 'gegeg'
data.age= 99
data.info.address = '成都'
delete data.name // 试图根本不会跟新

data.nums.push(5); // 此时调用的就是 arrProto 上的 push 方法
```



