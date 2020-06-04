### let  const   var

* let 和 const 定义的变量不会出现变量提升，而 var 定义的变量会提升。

* let 和 const 是JS中的块级作用域

* let 和 const 不允许重复声明(会抛出错误)

* let 和 const 定义的变量在定义语句之前，如果使用会抛出错误(形成了暂时性死区)，而 var 不会。

* const 声明一个只读的常量。一旦声明，常量的值就不能改变(如果声明是一个对象，那么不能改变的是对象的引用地址)



##### 在JS中什么是变量提升？什么是暂时性死区？

变量提升就是变量在声明之前就可以使用，值为 undefined;

暂时性死区的本质就是，只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量;



在进行作用域访问的时候一开始就在这个阶段尝试访问 `variable`，JavaScript 将会抛出 `ReferenceError: variable is not defined`。因为这个变量的状态依然是*未初始化*的。

此时 `variable` 处于*临时死区*中。

当解释器到达语句 `let variable` 时，此时变量通过了初始化阶段（步骤二）。现在变量状态是*初始化的*并且访问它的值是 `undefined`。

同时变量在此时也离开了*临时死区*。

之后当到达赋值语句 `variable = 'value'` 时，变量通过了赋值阶段（步骤三）。

如果 JavaScript 遇到这样的语句 `let variable = 'value'` ，那么变量会在这一条语句中同时经过初始化和赋值阶段。


```javascript
let condition = true;
if (condition) {
  // console.log(number); // => Throws ReferenceError
  let number;
  console.log(number); // => undefined
  number = 5;
  console.log(number); // => 5
}
```

当 JavaScript 进入 `if (condition) {...}` 块级作用域中，`number` 立即通过了声明阶段。

因为 `number` 尚未初始化并且处于临时死区，此时试图访问该变量会抛出 `ReferenceError: number is not defined`.

之后语句 `let number` 使其得以初始化。现在变量可以被访问，但它的值是 `undefined`。

之后赋值语句 `number = 5` 当然也使变量经过了赋值阶段。

`const` 和 `class` 类型与 `let` 有着相同的生命周期，除了它们的赋值语句只会发生一次



#### 为什么变量提升在 `let` 的生命周期中无效

如上所述，*变量提升*是变量的*耦合*声明并且在作用域的顶部完成初始化。

然而 `let` 生命周期中将声明和初始化阶段*解耦*。这一解耦使 `let` 的*变量提升*现象消失。

由于两个阶段之间的间隙创建了临时死区，在此时变量无法被访问。

这就像科幻的风格一样，在 `let` 生命周期中由于*变量提升*失效所以产生了临时死区

