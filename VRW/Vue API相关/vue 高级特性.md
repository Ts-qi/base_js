### vue 高级特性

#### 1 自定义组件v-model

```vue
// child component

<template>
  <input 
		text="text"  
    :value="text" 
		@input="$emit('change',e.target.value)">
  //  1 input 使用的是 value 而不是 v-model
  // 2 change 和 model.event 对应
      // text 和 text 对应
</template>
<script>
export default {
  model: {
    prop:'text',
    event:'change'
  },
   props: {
     text:string,
       default() {
         return ''
       }
   }
}
  
</script>  

// parent component
<template>
  <div>
   {{name}}
   <InputVlue v-model="name">
  </div>
  
</template>
<script>
export default {
  conponent: {
   InputVlue
  },
   data() {
     return {
       name:'tangqi'
     }
   }
}
  
</script> 

```



#### 2 $nextTick

* vue 是异步渲染，data 改变后，DOM 不会立刻渲染
* 会将页面渲染做一个整合，压入一个队列。多次修改 data 只会渲染一次
* $nextTick 会在 DOM 渲染之后被触发。以获取最新的 DOM 节点







#### 3 Slot  (插槽)

> * 基本使用
>
> * 作用域插槽----> 拿去子组件中的值
>
>   > 在子组件中定义一个变量 ； 在父组件中去获取； 
>   >
>   > ```vue
>   > // chlid.vue
>   > <template>
>   >   <a :href="url">
>   >     <slot :slotData（(自取)）="website">
>   >       {{website.title}}
>   >   	</slot>
>   >   </a>
>   >   
>   > </template>
>   > <script>
>   > export default {
>   >   props: ['url'],
>   >    data() {
>   >      return {
>   >        website: 'baidu.com',
>   >        title:'百度',
>   >        subtitle:'百度的日子'
>   >      }
>   >    }
>   > }
>   >   
>   > </script>
>   > // 父组件
>   > <template>
>   >   <ScopedDemo :url="website.url">
>   >   	<template v-slot="slotProps(自取)">
>   > 			{{slotProps.slotData.title}}
>   > 		</template>
>   >   </ScopedDemo>
>   >   
>   > </template>
>   > <script>
>   >   import ScopedDemo from './ScopedDemo'
>   > export default {
>   >  components:{
>   >    ScopedDemo
>   >  },
>   >    data() {
>   >      return {
>   >        website: 'baidu.com',
>   >        title:'百度',
>   >        subtitle:'百度的日子'
>   >      }
>   >    }
>   > }
>   >   
>   > </script>
>   > ```
>   >
>   > 
>
> * 具名插槽
>
>   > 和作用域插槽一样；使用 v-slot



#### 4 动态、异步组件

* 动态组件： 用法：  :is=“组件名”

* 异步组件--很常用 ， 出现地方：<b> Vue 常见性能优化点；</b>

  * import() 函数
  * 按需加载，异步加载大组件

  ```vue
  export default  {
  	components: {
  		nameComDemo:()=> import('./nameComDemo')
  	}
  }
  ```

  

#### 5 keep-alive -- 缓存组件

* 频繁切换，不需要重复渲染

<b>    出现地方： Vue 常见性能优化点；</b>



#### 6 mixin

* 场景： 多个组件有相同的逻辑，抽离出来；
* mixin 并不是完美的解决方案，会有一些问题；

> * 变量来源不明确，不利于阅读
> * 多个 mixin 可能会造成命名冲突： 变量属性会重复，覆盖（mounted 会被糅合在一起）
> * mixin 和组件可能出现多对多的关系，复杂度较高： 一个组件可以引进多个 mixin，一个 mixin 可以被多个组件引用；

* Vue3 提出的 Composition APi 值在解决这些问题



####  高级特性总结



* 自定义 v-moel ---  类似于颜色选择器

* $nextTick

* slot

* 动态、异步组件

* keep-alive

* mixin

  

