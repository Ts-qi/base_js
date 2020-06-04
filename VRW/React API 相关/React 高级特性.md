### React 高级特性

* 函数组件
* 非受控组件
* Portals
* context
* 异步组件(懒加载)
* 性能优化
* 高阶组件 HOC 
* Render Props
* 纯组件
* 不可变值 Immutable.js

#### 函数组件

和 class 组件的区别

* 纯函数，输入 props  ，输出 jsx 
* 没有实例，莫有生命周期，没有 state，不能扩展其他方法

选择：

* 有其他的逻辑，生命周期处理等，就有 class,反之就用函数是组件

#### 非受控组件

* ref 
* 有 defaultValue, defalutChecked 
* 手动操作 DOM 元素

使用场景：

* 必须手动操作 DOM 元素，setState 实现不了
* 文件上传< input type="file" >
* 某些富文本编辑器，插入 DOM 元素

#### 受控组件

* 有 value ,checked 
* value 受 state 控制

#### 受控组件 VS 非受控组件 ：使用选择

* 优先使用受控组件，符合 React 设计原则，数据驱动试图
* 必须操作 DOM 的时候，再使用非受控组件

#### React Portals(传送门)

* 组件默认会按照既定的层次嵌套渲染
* 如何让组件渲染到父组件意外？
* 参数：2个： DOM 节点，document.body

##### 使用场景

* Overflow: hidden
* 父组件 z-index 值太小
* fixed 需要放在 body 第一层级

#### React.context

* 公共信息（语言，主题）如何传递给每个组件？
* 用 props 太繁琐
* 用 redux 小题大做

#### React 异步组件

* React.lazy()-----> 内部 还是import() 
* React.Suspense

> <React.Suspense  fellback={component}></React.Suspense> 

#### React 性能优化

* shouldComponentUpdate ----> SCU 
* PureComponent 和 React.memo
* 不可变值 immutable.js

#####  SCU 默认返回什么

* 在 React 中  默认：父组件更新，子组件也会更新，不管子组件数据是否变化
* 由上面 可见：SCU 会默认返回 true
* SCU  一定每次都用吗？

> 不一定， 性能优化，是需要的时候 才优化

#### React 性能优化----SCU 一定要配合不可变值

不可变值： 不能用 push(),pop() 等 ，涉及到 React 的设计理念



#### 总结

* SCU 默认返回 true,即React默认重新渲染所有子组件
* 必须配合 不可变值 一起使用
* 可先不用 SCU，有性能问题时在考虑使用

#### PureComponent  和 memo

* PureComponent ,SCU  中实现了浅比较
* memo，函数组件中的 pureComponent

#### immutable.js

* 彻底拥抱不可变值
* 基于共享数据（深拷贝---会不断的递归，性能消耗大）
* 学习成本大

#### 高阶组件，公共逻辑抽离

* mixin ,已被 React 废弃
* 高阶组件，HOC 
* Render Props

1 HOC 是一种模式 



#### render Props

概念：通过一个函数 将 class 组件 的 state 作为 props 传递给函数组件



* HOC 模式简单，但会增加层级，可能会掉值， HOC 传值的过程，值丢了 后面的组件就拿不到了；

* Render Props : 直接将 state 作为 props 传递给组件，代码简洁，学习成本高；



#### 高级特性总结

* 函数组件 ---> 和 class 的区别
* 非受控组件
* Portals 
* Comtext
* 异步组件
* 性能优化--->   scu 
* HOC 
* Render    props







