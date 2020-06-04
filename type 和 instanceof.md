### typeof 和 instanceof

##### typeof 实现原理

1 typeof 判断基本数据类型； 



底层实现： js 的底层 是如何存数据的类型信息的？

其实在 js 存储底层的变量的时候，会在变量的机器码的低位 1-3 位存储其类型信息；

* 000: 对象；

* 010： 浮点数；
* 100 ： 字符串；
* 110： 布尔值；
* 1 ： 正数；

但是 ，对于  undefined  和 null 来说，这两个值的信息存储是有点特殊的； 

* null: 所有的机器码均为 0 ；
* undefined: 用 −2^30 整数来表示;

所以  ，在利用 typeof 判断 null 的时候 就出现问题了，由于 null 的所有机器码都是 0 ，因此直接被当成了对象来看待； 

##### instanceof 实现原理

主要作用 :判断一个实例是否是属于某种类型；

```javascript
let person = function () {
}
let nicole = new person()
nicole instanceof person // true

```



也可以判断是否是一个实例是否是其父类型或者祖先类型的实例；

```javascript
let person = function () {
}
let programmer = function () {
}
programmer.prototype = new person()
let nicole = new programmer()
nicole instanceof person // true
nicole instanceof programmer // true

```

实现原理：

instanceof是通过与原型链去判断的；A instanceof B   ,在 A 的原型链中层层查找，是否有原型等于 B.prototype,如果 A 的原型链顶端（null;即 Object.prototype.____proto____）,仍然不等于 B.prototype,那么返回 false，斗则返回 true；即 右边的 原型prototype 在左边的原型链上就好，`instanceof` 在查找的过程中会遍历左边变量的原型链，直到找到右边变量的 `prototype`，如果查找失败，则会返回 false，告诉我们左边变量并非是右边变量的实例

实现代码：

```javascript
// L instanceof R
function instance_of(L, R) {//L 表示左表达式，R 表示右表达式
    var O = R.prototype;// 取 R 的显式原型
    L = L.__proto__;    // 取 L 的隐式原型
    while (true) { 
        if (L === null) //已经找到顶层
            return false;  
        if (O === L)   //当 O 严格等于 L 时，返回 true
            return true; 
        L = L.__proto__;  //继续向上一层原型链查找
    } 
}

```

