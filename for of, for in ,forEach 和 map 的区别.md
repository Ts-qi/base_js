### for of, for in ,forEach 和 map 的区别

 ####  for of



Iterator 的作用：  

1 为各种数据结构，提供一个统一 的，简便的访问接口；

2 数据结构的成员能够按照某种次序排列； 

3 ES6 创造了一种新的遍历命令 for..... Of  循环

#####1  对数组进行遍历；不能遍历对象；为什么？ 

数组 (或者类数组对象: `Strings` , `Maps` , `Sets` , `arguments` ) 的原型中都实现了一个方法 `Symbol.iterator`；只有含有Symbol.iterator 才可以利用 for of 进行遍历；

因为 for of 属于 es6 中的 iterator, 只有在数组中才有这个 itertor, 在对象中是没有这个 iterator 的； 

#####2 为什么在 Object 中没有内置的迭代器？ 

我们常常说遍历对象，但是简单来说，只会在两种层级上来对一个 `JavaScript` 对象进行遍历：

程序的层级 - 什么意思呢？在程序层级上，我们对一个对象进行迭代，是在迭代展示其结构的对象属性。 可能还不是很好理解，举个栗子：`Array.prototype.length` 这个属性与对象的结构相关，但却不是它的数据。

数据的层级 - 意味着迭代数据结构并提取它的数据。举个栗子：我们在迭代一个数组的时候，迭代器是对于它的  每一个数据进行迭代，如果 `array = [a, b, c, d]` 那么迭代器访问到的是 `1, 2, 3, 4`

##### Generators

写一个 `Generator` 你只需要在函数名和 `function` 关键字中间加一个 `*` 号就可以了；

还是熟悉的味道，那么到这里，我们已经知道，`Generator` 可以实例化出一个 `iterator` ，并且这个 `yield` 语句就是用来中断代码的执行的，也就是说，配合 `next()` 方法，每次只会执行一个 `yield` 语句；

 `return` 会终结整个 `Generator` ，换句话说：写在 `return` 后面的 `yield` 不会执行



Generator能够中断执行代码的特性，可以帮助我们来控制异步代码的执行顺序：

例如有两个异步的函数 `A` 和 `B`, 并且 `B` 的参数是 `A` 的返回值，也就是说，如果 `A` 没有执行结束，我们不能执行 `B`。

### for in 

for in: 遍历对象自身的和继承的可枚举的属性，(其中既包括存在于实例中的属性，也包括存在于原型中的属性。)不能直接获取属性值，可以中断循环；  如果只遍历自身属性；则利用 hasproperty();进行判断 过滤；



#### forEach

只能遍历数组，不能中断，没有返回值(或认为返回值是undefined);不能改变原数组

#### map

只能遍历数组，不能中断，返回值是修改后的数组;返回的是一个新的数组，不修改调用的数组。

####Object.keys()

Object.keys()：返回给定对象所有可枚举属性的字符串数组;



