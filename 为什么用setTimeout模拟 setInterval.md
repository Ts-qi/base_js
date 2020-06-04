###为什么用setTimeout模拟 setInterval?

* setTimeout : 制定多少时间后调用函数；
* setInterval： 制定周期调用函数；

可以这么理解：`每个setTimeout产生的任务会直接push到任务队列中；而setInterval在每次把任务push到任务队列前，都要进行一下判断(看上次的任务是否仍在队列中)`。

缺点：1 根据定时的时间，会一直向队列中插入先的定时器；可能多个定时器会连续执行

​			2 使用setInterval时，某些间隔会被跳过，来不及响应；



解决方法： 

```javascript
setTimeout (()=> {
  setTimeout(arguments.callee,interval)
},imterval)
```

上述函数每次执行的时候都会创建一个新的定时器，第二个 setTimeout 使用了 arguments.callee()获取当前函数的引用，并且为其设置另一个定时器；好处：（arguments.callee 在哪一个函数中运行，它就代表哪个函数）

* 在前一个定时器执行前，不会向队列中插入新的定时器
* 保证定时器间隔；

