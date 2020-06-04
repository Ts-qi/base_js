### Vue 原理（二）- Virtual DOM 和 diff

* virtual dom 是实现 vue 和 React 的重要基石
* diff 算法是 virtual dom 最核心 、最关键的部分

Virtual Dom  ------>  用 js 模拟 DOM 结构，计算出最小的变更，操作 DOM；

####  用 js 模拟 DOM 结构

```javascript
// 常规 html
<div id='div1' class="container">
  <p>virtual dom</p>
  <ul style="font-size:'20px'">
    <li>a</li>
  </ul>
</div>
// js 模拟 DOM 结构写法 

const vDom = {
  tag:'div',
  props: {
    className:'container',
    id:'div1'
  }
  children: [
    {
			tag:'p',
  		children:'virtual dom'
    },
  	{
  		tag:'ul',
      props:{ style: 'font-size:20px'},
      children: [
        {
          tag:'li',
          children: 'a'
        }
      ]
		}
	]
}
```

利用 snabbdom学习 virtaul dom

https://github.com/snabbdom/snabbdom

Virtual dom 总结： 

* 用 js 模拟 DOM 结构
* 新旧 virtual dom 对比，得出更小的更新范围，最后更新 DOM；
* 数据驱动试图的模式下，有效控制 DOM 操作



#### virtual dom  diff 算法

* Diff 算法是 virtual 中最核心、最关键的部分
* Diff 算法在日常使用 vue react  中提现处理啊（如 key）
* Diff 即对比， 是一个广泛的概念。 如： lnux diff 命令 ， git diff 等
* 两个 js 对象也可以做diff；
* 两棵树做 diff ， 比如： virtual dom ; 时间复杂度是 O(n3)

> 第一：遍历 tree1, 第二： 遍历 tree2.  第三，排序，  复杂度 O(n3)
>
> 优化 O(n):    1 , 只比较同一层级，不跨级比较； 
> 						2， tag 不同，则直接删除重建， 不在深度比较；
>
> ​						3 ，tag和 key 都相同，则不在比较；



#### 深入diff源码解读

##### virtual node 



##### patch 函数------> 进行 新老的vnode 对比

1 newChildren 和 oldChildren 同时存在；

​	调用 updateChildren(); 进行函数对比；

2 newChildren 存在，oldChildren 不存在；

​	直接用 newNode 添加到节点上（使用addVnodes()）

3 newChildren不存在，oldChildren 存在；

​    移除 oldChildren（使用removeVnodes()）

##### updateChildren()函数

```javascript
let oldStartVnode = oldCh[0] 
let oldEndVnode = oldCh[oldCh.length -1]
let newStartVnode = newCh[0]
let newEndVnode = newCh[newCh.length -1]
//利用几个对比 
if(oldStartVnode === newStartVnode) {}// 老开始 和新开始对比
else if (oldEndVnode === newEndVnode) {}// 老结束 和新结束对比
else if(oldStartVnode === newEndVnode) {}// 老开始和新结束对比
else if (oldEndVnode === newStartVnode) {} // 老结束节点 和新开始节点对比

// 以上对比都没有命中；则就出现 key ;  那 oldCh 的 key 和 newCh 的 key 做对比； 
// 1， key 没有对应上， 则直接插入到节点；
// 2 , key 对应上，看哈 元素 是否对应上，没有对应上，就直接插入
//  元素对应上， key 对应上，就直接命中


```



总结： 

> H 函数， vnode 结构--js 对象， patch , diff， key 
>
> vdom 价值： 数据驱动试图，控制 DOM，增加性能

说到 diff 算法，首先要知道 virtual dom ；虚拟 dom ,是利用 js 来模拟DOM 的数据结构； 在页面进行更新的时候，会利用模拟的 DOM 结构进行对比，这个里面涉及到 diff 算法，以此来缩小对比的范围，提高页面的渲染性能，一次达到跟新的目的；

而此时的 diff 算法的对比机制，先是利用 patch() 函数进行新老节点的对比，而这里的对比涉及到三种情况：

>  1， newChildren 和 oldChildren 同时存在；
>
>  2 ， newChildren 存在，oldChildren 不存在；
>
> 3，newChildren不存在，oldChildren 存在；

第一种情况， 则会调用 updateChildren() 函数进行操作；

第二种情况，则直接将新节点插入即可，

第三种情况，直接移除旧节点；

而针对第一种情况中的updateChildren() ；内部实现的机制是这样的： 

1 开始会使用节点进行对比；会出现 4中情况的对比： 

> 1，  老开始节点和新开始节点对比；
>
> 2，老结束 和新结束对比
>
> 3，老开始和新结束对比；
>
> 4，老结束节点 和新开始节点对比；

以上 4 中情况，如果命中就直接调用添加 或者移除方法；

以上方法，性能不是很好，算法复杂度比较的高，能达到 O(n3);

那么就要使用 key ,做一个同级别的比较，将算法复杂度降低到 O (n):

如果 没有命中，则会 oldCh 的 key 和 newCh 的 key 做对比； 

> 1 ,key 不同，就直接开始替换了； 
>
> 2 ，key 相同  ，就直接跳过

以上即是；

