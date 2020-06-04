### apply, call  和 bind区别以及实现

概念： 劫持另外一个对象的方法，继承另外一个对象的属性.

相互的区别： apply call 的作用都是为了改变 this 的指向；作用都是相同的，只是传参的方式不一样；

* Apply 只接受一个参数数组；call 接受一个参数列表；

```javascript
let a ={
	value: 1
};
function getValue (age,name) {
	console.log(name)
	console.log(age)
	console.log(this.value)

}
getValue.call(a,'tangqoi',24)
getValue.apply(a,['tangqoi',24])
```

* Bind 和其他另个方法的作用一致，只是该方法会放回一个函数，并且我们可以通过 bind 实现函数柯里化；

#### 实现一个 call

* 不传入第一个参数，那么默认 window;
* 改变了 this 指向，让新的对象可以执行该函数； 那么思路是否可以变成给一个新的对象添加一个函数，然后在执行完以后在删除？

```javascript
Function.prototype.myCall = function(context) {
  // let context = window || context
  // context.fn = this,
  // context.shift()
  // result = context.fn(...context)
  // delete context.fn
  // return result
  // 第一步：  赋值变量
  let context = context || window;
  // 第二步：将 this --> myCall ；给 context 添加一个fn 的函数；并将 this 指向给 fn ;
  context.fn = this; 
  // 第三步： 将context 后面的参数取出来; 参数是一个列表；
  let args = [...arguments].slice(1);
  // 第四步： 将取出来的参数传给添加的 fn 函数
  let result = context.fn(...args);
  // 第五步： 在删除新增的函数属性 fn；
  delete context.fn;
  
  // 最后，返回 result；
  return result;
}
```



#### 实现一个 apply 函数

Apply  可以将一个数组转为一个参数列表；如：() [params1,params2,params3,....] ---> params1,params2,params3)；只是 apply 的的特性；

```javascript
var min=Math.min.apply(null,array) // 获取最小值

```



* 不传入第一个参数，那么默认 window;
* 改变了 this 指向，让新的对象可以执行该函数； 那么思路是否可以变成给一个新的对象添加一个函数，然后在执行完以后在删除？

```javascript
Function.prototype.myApply = function(context) {
  // 第一步  ： 赋值变量 不传参数  默认是 window
  let context = context || window;
  
 // 第二步： 给 context 新增一个函数属性，并将 this-> myAppply ，指向新增的属性；
  context.fn = this;
  // 第三步： 因为apply 两个参数；第一个是需要劫持的对象。第二个是参数 ； 所以在此先判断哈第二个参数 是否传递
  if(arguments[1]){
    let result = context.fn(...arguments[1])
  }else {
    let result = context.fn()
  }
  // 第四步： 删除新增的属性；
  delete context.fn;
  
  return result;
}

```



#### 实现一个 bind 函数

######函数柯里化

特点： 1 返回一个函数； 

​			 2  可以传入参数；



```javascript
Function.prototype.myBind = function(context) {
  if(typeof this !== 'function') {// 当调用不到bind 的时候 进行抛错处理
     throw new('Function.prototype.bind -- what is trying to be bound is not callable')
   }
  let _this = this; 
  //删除了第一个参数，获取到余下的参数 args；
  //同时 args 也是在调用 bind 的时候传入的初始化参数（剔除了第一个参数）
  let args = Array.prototype.slice.call(arguments,1) || [...arguments].slice(1)
  
  //将 args与绑定函数执行时的实参 arguments 通过 concat连接起来作为参数传入，就实现了函数初始化参数的效果；这里的arguments 是执行绑定函数的实参；
  let restArgs = args.concat(Array.prototype.slice.call(arguments))
  // 返回一个函数
  return function() {
    
    return _this.apply(context,restArgs)
  }
  
}
```



Bind 遇到 new 操作符的时候？

一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数

```JAVASCRIPT
function animal(name) {
    this.name = name
}
let obj = {}

let cat = animal.bind(obj)
cat('lily')
console.log(obj.name)  //lily

let tom = new cat('tom')
console.log(obj.name)  //lily
console.log(tom.name)  //tom
```

从上面 可以看出 obj.name 的名字依然是 lily ,并没有被改变为 tom; 如果绑定函数`cat`是通过`new`操作符来创建实例对象的话，`this`会指向创建的新对象`tom`，而不再固定绑定指定的对象`obj`;

##### 区分绑定函数是否使用new，分类处理

检测一个对象是否是通过构造函数使用 new 实例化出来的最快的方式就是通过 instanceof;

A instanceof B;  验证 A 是否为 B 的实例；

实现 bind:

```javascript
if (!Function.prototype.bind) {
  Function.prototype.bind = function (oThis) {
      if (typeof this !== 'function') {
      return
    }
    
    let self = this
    let args = Array.prototype.slice.call(arguments, 1)
    let fBound = function() {
        let _this = this instanceof self ? this : oThis //检测是否使用new创建
        return self.apply(_this, args.concat(Array.prototype.slice.call(arguments)))
    }
    
    if (this.prototype) {
      fBound.prototype = this.prototype
    } 
    
    return fBound
  }
}
```

