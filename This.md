### This

##### 绑定规则

1 默认绑定；

2 隐式绑定；

3 硬绑定；

4 new 绑定；

#### 默认绑定

一般是函数调用；比如定义在全局环境中的函数；调用的时候直接 fn(); 

在非严格环境下 ，this 是指向的全局对象（浏览器）； 严格模式下，this 是指向 undefined（node 环境）；

#### 隐式绑定



函数的调用是在某个对象上触发的，即调用位置上存在上下文对象；典型的形式为 XXX.fun()



```javascript
function sayHi(){
    console.log('Hello,', this.name);
}
var person = {
    name: 'YvetteLau',
    sayHi: sayHi
}
var name = 'Wiliam';
person.sayHi();
```

打印的结果是 Hello,YvetteLau

因为只有最后一层会确定this指向的是什么，不管有多少层，在判断this的时候，我们只关注最后一层；

#### 显式绑定

显式绑定比较好理解，就是通过call,apply,bind的方式，显式的指定this所指向的对象；

### new 绑定

任何一个函数都可以使用new来调用，因此其实并不存在构造函数，而只有对于函数的“构造调用”；

> 使用new来调用函数，会自动执行下面的操作：

1. 创建一个新对象
2. 将构造函数的作用域赋值给新对象，即this指向这个新对象
3. 执行构造函数中的代码
4. 返回新对象

因此，我们使用new来调用函数的时候，就会新对象绑定到这个函数的this上

```javascript
function sayHi(name){
    this.name = name;
	
}
var Hi = new sayHi('Yevtte');
console.log('Hello,', Hi.name);
```

输出结果为 Hello, Yevtte, 原因是因为在var Hi = new sayHi('Yevtte');这一步，会将sayHi中的this绑定到Hi对象上。

### 绑定优先级

new绑定 > 显式绑定 > 隐式绑定 > 默认绑定



### 例外

如果我们将null或者是undefined作为this的绑定对象传入call、apply或者是bind,这些值在调用时会被忽略，实际应用的是默认绑定规则；

```javascript
var foo = {
    name: 'Selina'
}
var name = 'Chirs';
function bar() {
    console.log(this.name);
}
bar.call(null); //Chirs
```

### 箭头函数

箭头函数 首先 是没有自己的 this 的；它的 this 是集成于外层代码库的中 this;  需要注意一下几点：

* 函数体内的this 对象 是继承的外层代码块的 this;
* 不可以做为构造函数， 即不可以使用 new 命令；？ 因为没有 prototype, 
* 不可以代替 arguments 对象； 该对象在函数体内不存在， 如果要用可以用 rest 参数代替；
* 不可以使用 yield，因此不能用作 Generator;
* 没有自己的 this,所以不能用 call(),apply(),bind() 这些方法 去改变 this 的指向；

### 总结



1. 函数是否在new中调用(new绑定)，如果是，那么this绑定的是新创建的对象。
2. 函数是否通过call,apply调用，或者使用了bind(即硬绑定)，如果是，那么this绑定的就是指定的对象。
3. 函数是否在某个上下文对象中调用(隐式绑定)，如果是的话，this绑定的是那个上下文对象。一般是obj.foo()
4. 如果以上都不是，那么使用默认绑定。如果在严格模式下，则绑定到undefined，否则绑定到全局对象。
5. 如果把Null或者undefined作为this的绑定对象传入call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则。
6. 如果是箭头函数，箭头函数的this继承的是外层代码块的this。



参考：https://github.com/YvetteLau/Blog/issues/6

