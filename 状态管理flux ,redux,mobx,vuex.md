### 状态管理

概念： 把组件之间需要共享的状态抽取出来，遵循特定的约定，统一来管理，让状态的变化可以预测；

#### store 模式

store 模式是一种相对简单的状态管理模式，一般有以下约定：

* 状态存储在外部变量 store里（也可以是全局变量）；
* store 中的 state 用于存储数据，由 store 实例维护
* store 中的 actions 封装改变了 state 中的逻辑；

如果对 state 的变更均通过 actions,那么实现记录变更，保存快照，历史回滚就会很简单。但是 Store 模式并没有对此进行强制约束；



#### Flux 

Flux 是一种架构思想，类似于 MVC，MVVM 等；

##### 组成

Flux  由 4 部分组成：

* View : 视图层
* Action: 动作，即数据改变消息的对象（可通过事件触发，测试用例触发等）

> Store 的改变只能通过 Action
>
> 具体的 Action 的处理逻辑一般放在 store 中； 
>
> Action 对象包含 type 与 payload （传递参数）

* Dispatcher  : 派发器，接受 Actions，发给所有的 store;
* Store : 数据层，存放应用状态与更新状态的方法，一旦发生变动，就提醒 Views 更新页面

注意： 

**Action 本质上是一个纯声明式的数据结构，仅提供对事件的描述，不提供事件的具体逻辑**。通常会给 Action 的 `type` 属性赋值一个大写的字符串，表明是常量，增强可维护性，例如:

```javascript
{
  type: 'ADD_USER',
  payload: {
    name: 'user_name'                              
  }
}

```



##### Flux 的特点

* 单向数据流，试图事件或者外部测试用例发出 Action,经由 Dispatcher 派发给 Store,Store会触发相应的方法更新数据、更新试图
* Store 可以有多个
* Store 不仅存放数据，还封装了处理数据的方法



