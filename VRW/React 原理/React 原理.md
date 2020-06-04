### React 原理

* 函数式编程

* 不可变值------react 的设计理念

* virtual dom 和 diff 

* Jsx 本质

* 合成事件

* setState 

* 组件渲染过程

  

#### 函数式编程

* 不可变值
* 纯函数

#### JSX 的本质

* JSX 等同于 Vue 的模板
* Vue 编译是用的  with 语法， with 语法里面是函数体，里面调用的是 createElement 函数， 返回的是一个 vnode
* JSX  不是 js 
* JSX 编译：createElement(div,属性，内容)

#### 合成事件

* 所有的事件都是挂载在 document 上。
* event 不是原生的。是SyntheticEvent 合成事件对象
* 和 Vue 事件不同，和 DOM 事件 也不同