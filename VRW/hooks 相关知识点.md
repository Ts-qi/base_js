### hooks 相关知识点

 1、pureComponent 只有在传入的第一级变化 才起作用；避免组件重新渲染；相当于封装了 shouldComponentUpdate(){}

2 、 lazy() , 需要配合 suspense 使用

```react
const About = lazy(import(../about.tsx))

<Suspense fellback ={<div>loading</div>}
  <About></About>
 </Suspense>

```

3、memo 和 pureComponet 相似； 优化函数组件的重渲染；传入的属性不变 就不会渲染组件

4、class 组件 和 hooks 组件



* render props  
* HOC 
* Hooks

三个逐渐优化

5、useMemo 

useMemo 是优化函数是否会重渲染， memo 是优化组件是否冲渲染；

6、useCallback

如果 useMemo 的返回值 是函数； 就可以使用 useCallback;