### React

* 基本使用
* 高级特性--不常用，但体现深度
* Redux  和 React-router

#### 事件为何 bind this?

事件：

* bind this 

* 关于 event 参数 --->   React 自身封装的，打印出来的是 合成事件； 原生的 Event是 MouseEvent
* 传递自定义参数

#### React 事件  和 DOM 事件的区别

React 事件 是合成事件(SyntneticEvent)模拟 DOM 事件能力，所有的事件都挂在到 document 上； 

DOM事件 是指向当前元素的

#### React 表单

* 受控组件;值是受 state 控制； 类似于 vue 中 v-model
* 非受控组件

* input textarea select 都是用 value 
* Checkbox  radio 是用 checked 

#### 组件的使用

* props 传递数据，函数，类型检查(propTypes)

#### setState 为何使用不可变值？

* 不可变值！！！ 重点; 函数式编程，纯函数
* 可能是异步更新

> Settimeout 是同步的； 
>
> 2、在 setState 的 callback 中是异步的
>
> 3、自定义的DOM 事件比如： addeventListener 是同步的；

* 可能会被合并

> 1、传入对象会被合并
>
> > ```javascript
> > // 传入对象----会被合并
> > this.setState({
> > 	count:this.state.count+1
> > })
> > this.setState({
> > 	count:this.state.count+1
> > })
> > this.setState({
> > 	count:this.state.count+1
> > })
> > // 打印结果 count: 1
> > 
> > 
> > 
> > ```
> >
> > 
>
> 2、传入函数，不会被合并
>
> > ```javascript
> > 
> > // 传入函数。不会被合并
> > this.setState( (preState,props)=> {
> >   return{
> >     count: prevState.count + 1
> >   }
> > })
> > this.setState( (preState,props)=> {
> >   return{
> >     count: prevState.count + 1
> >   }
> > })
> > this.setState( (preState,props)=> {
> >   return{
> >     count: prevState.count + 1
> >   }
> > })
> > // 打印结果是 3 ； 不会被合并
> > ```



