### vuex ,Router 





### vuex 

* 基本概念。使用，API 

> * State 
> * action : 1 做异步操作，2  整合一个或多个 mutations 中的 commit 操作
> * getters
> * mutation： 同步
>
> 用于组件获取数据，方法等
>
> * dispatch
> * commit
> * mapState
> * mapGetters
> * mapActions
> * mapMutations

* 考察 state 的数据结构设计（后续跟进）



### Vue-Router

* 路由模式 ： 1 hash 模式（默认。不需要后端）  ； 2. history模式；需要后端支持；并且后端不会返回 404 页面；需要前端自己配置

* 路由配置: {path: xxx,component:xxxx}

  >  动态路由（通过 router 中的 path 进行传值）、
  >
  > 懒加载: 语法： component: () => import('xxxxx')



