### Vue面试题



#### 1、v-if 和 v-show的区别







#### 2、为何 在 v-for 中使用 key

* 必须使用 key, 且 不能是 index  和 random
* Diff 算法中通过 tag 和 key 来判断，师傅是 sameNode
* 减少渲染次数，提升渲染性能

#### 3、描述 Vue 组件的生命周期----> 父子组件

* Lifecyle  图
* 父子组件关系

#### 4、 Vue 组件如何通讯（常见）

* props   $emit
* 自定义  event. $emit,  event  .$on   ,event.$off
* Vuex



 #### 5、 描述组件渲染和更新过程

三大核心： 1、模板编译  2、 响应式，3、virtual dom



#### 6、 v-model实现原理

*  Input 元素的 value = this.name
* 关键点在 绑定 input 事件 This.name = $event.targrt.value
* Data 在 响应式更新触发 re-render

#### 7、对 MVVM 的理解



#### 8、computed 有何特点

* 缓存，data 不变 不会重新计算
* 提高性能

#### 9、Vue 中的 data 必须是一个函数？

​	vue 组件多；每个组件都实例化一个 data； 如果不是函数，就容易造成数据共享； 是函数，就是个闭包， 变量不会相互影响

#### 10、Ajax 请求应该放在哪个生命周期？

* mounted 
* Js 是单线程的。ajax 异步获取数据

#### 11、什么时候 使用 keep-alive?

* 缓存组件，不需要 重复渲染
* 多个静态的 tab页
* 优化性能

#### 12、多个组件相同的逻辑，如何抽离？

	* Mixin
	* Mixin 缺点

#### 13、何时使用异步组件

* 加载大组件
* 路由异步加载组件

#### 14、什么时候使用 beforeDestory? ----> 不接触会造成内存泄漏

* 接触自定义事件  event.$off
* 清楚定时器
* 接触自定义 DOM 事件

#### 15、vuex 中的 action 和 mutation 区别

* action 处理异步，mutation 不可以
* Mutation  做一个逻辑处理
* action  可以使用多个逻辑处理

#### 16、Vue-Router 常用 的路由模式

* hash 默认的模式
* H5 history ---->>  需要服务端支持
* 两个的比较

#### 17、如何配置 Vue-Router 异步加载

* routes 里面配置 component: () => import(xxxxx)

#### 18、 用 vnode 描述一个 DOM 结构

.....

#### 19、监听 data 变化的核心 API 是什么？

* Object.defineProperty
* 深度监听，监听数组
* 有何缺点

#### 20、Vue  如何监听数组变化

* Object.defineProperty 不能监听数组的变化
* 重新定义原型，重写 push pop 等数组的方法，实现监听
* Proxy 可以原生支持监听数组变化

#### 21、请描述响应式原理

* 监听 data 变化的过程

* 组件渲染和更新流程 

  

#### 22、diff 算法的时间复杂度

* O(n)
* 有 O(n3) -----> O(n)

#### 23、diff 算法过程

* patch (ele,vnode) 和 patch(vnode,newVnode)
* patchVnode  和 addVnodes  和 removeVnodes
* updateChildren (key 的重要性)

#### 24、 vue 常见的性能优化

* 合理使用 v-if 和 v-show 
* 合理使用computed
* v-for 加 key, 以及避免和 v-if 一起使用
* 自定义事件，及时销毁在 beforDestory 中
* 合理使用异步组件
* 合理使用 keep-alive
* data 的层级 不要太深；响应式监听的时候，计算，递归多，性能不好
* webpack 层面的优化
* 使用 SSR

#### 25、 vue 为何是异步渲染，$nextTick 有何用？

* 异步渲染， 以提高渲染性能
* $nextTick 在 DOM 更新完成后，触发回调









