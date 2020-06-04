### VUE 基础知识点

vue 基本使用： 

* 基本使用，组件使用------- 常用，必须会；
* 高级特性 --------- 不常用，但提现深度；
* vue 周边： Vuex  和 Vue-router;

##### 1 computed  和 watch 

............



##### 2 class 和 style

........

#####  3 v-if 和 v-show 的区别

>  v-if  在 html 中没有节点； v-show 是有节点的；只是节点的样式设置了 样式 display: none

#####4 v-if 和 v-show 的使用场景   

> 切换频繁的时候 用 v-show, 节约 DOM 性能； 一次性的显示 隐藏 就用 v-if;



##### 5 v-for 循环（列表）渲染

* 如何遍历数组、对象 ？ 用 v-for 
* Key 的重要性  唯一性
* V-for  和 v-if 尽量不要一起用 ---> 在 v-for 的计算级别高， 先用 v-for 渲染，再去 v-if 的判断；循环的时候，每一次循环都会加上 v-if, 消耗大；

##### 6 事件

* event 参数 ： （和 React 的区别？？ ） 

  > 1  原生的 Event 对象 -----> MouseEvent
  >
  > 2 事件被挂载到当前对象元素

* 事件修饰符

  > @click.ctrl = 'onClick'   ctrl 就是事件修饰符

* 观察  事件被绑定在哪里；

##### 7 表单

v-model 双向绑定

##### 8 父子组件传值

* props  和$emit

> props 父组件传值到子组件  ，$emit 子组件发射事件到父组件，进行数据的修改等

* 组件间通信----自定义事件  实现不相关的组件的通信

> ```javascript
> // 利用 event 
> // 子组件 
> event.$emit('事件名'，'参数')
> // 父组件
>  mounted () {
>    event.$on('子组件事件名'，'父组件的函数名')
>  }
> // 在组件销毁的时候 记得销毁自定义事件 否则造成内存泄漏
> event.$off('子组件事件名'，'父组件的函数名')
> // event.js
> export default new Vue(); // vue 本身自由自定义事件的能力
> ```
>
> 

##### 生命周期

* 挂载

  > beforeCreated---> created----beforeMount ---> mounted

* 更新

  > Beforeupdated --> updated

* 销毁

  > beforeDestory ----> destory

  

  ##### 生命周期 ----> 父子组件的情况

  在created 的时候 ： 实例化的时候， 是先创建父组件 在创建子组件 

  在渲染的时候，先渲染子组件，在渲染父组件；

  在 updated 的时候： 父组件先更新 ，在是子组件更新； 和 created 一样；

  

  在 beforedestory  ？？  

  

  

  

  

  

  

  

  

  

  





