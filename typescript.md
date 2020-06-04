### typescript

#### 基本类型

 同 js 

注意：undefined 和 null 的区别；

**1、如果变量是明确的基类型（number,boolean,string），一律用undefined做未定义值初始化。**

**2、其余类型一律视作“引用类型”，因此一律null初始化**

简单理解：MDN上对undefined和null的解释，undefined的含义是“未赋值”，null的含义是“空对象”，平时我们设var x; 相当于var x = undefined;

undefined 可以赋值给所有类型的子变量

```typescript
let u : undefined = undefined;
let n : null = null;

//undefined 可以赋值给所有类型的子变量
let num : number = undefined;

```

#### any 类型

```typescript
let notSure : any = 4;
notSure = 'ts';
notSure = true;
```

兼容任何类型；也可以任意调用方法和属性；不是必要不要用；

#### 联合类型  |  

```typescript
let numberQrString : number | string = 234;
numberQrString = 'aaaa';
// 只能是 number 和 string ； 其他类型会报错；
```

#### Array  和 Tuble（元祖--限制数据类型和数组长度的数组）：起源于函数式编程

```typescript
//  声明元素是数字的数组（only）
let arrOfNUmbers : number[] = [1,2,3,4]


// Tuble 元祖
let user : [string,number] = ['ts',23];

// 意思就是声明的 user 里面的元素 只能是 string 和 number ；并且长度只能是 2；
```

#### interface

作用： 

* 对对象的形状(shape) 进行描述
* 对类(class)进行抽象
* Duck Typing(鸭子类型)：关注对象被使用；而不是对象本身是什么

```typescript
// 一般 定义的第一个字母大写
interface Person {
  name: string;
  age:number;
}
let thomas: Person = {
  name:'ts',
  age:20
}
// 注意： interface 定义的几个类型 所使用的时候就要与之相匹配； 如果属性可有可无； 则在 interface 中加问号：表示可有可无；如下：
inteeface Person {
  name?:string;
  age:20
}
// 只读属性； 对象中的字段在创建时进行复制；
inteeface Person {
  readonly id: number;
  name?:string;
  age:20
}
let thomas: Person = {
  id: 123
  age:20
}
Person.id = 222;// 报错，id 是只读属性

// 此时的 readonly 和 const 有点相似；
// 区别点：  readonly 是写在 interface 对象的属性上； const 是 定义变量的；
```



#### 函数和类型推断

上例子

```typescript
// 上述函数表示参数 x  和 y 都是 number 类型，他们返回的值也是 number 类型；如果参数不是必须入上述的 z 则加个？,并且只能放在最后面 还有一种 将 Z 传入一个默认值 ；不传的时候 就取默认值 ；
// 声明式
function add (x:number,y:number,z?:number):number {
  if(typeof z === 'number') {
    return x+y+z
  }else{
    return x+ y
  }
  
};
// 表达式
const add = function(x:number,y:number,z?:number):number {
  if(typeof z === 'number') {
    return x+y+z
  }else{
    return x+ y
  }
  
};
// 注意此时的函数也是有类型的,箭头 表示函数的类型如下的 add2 中箭头的后面 ；表示函数返回的是 number 类型；
const add2 :(x:number,y:number,z?:number)=>number = add;


```



#### 类 class

##### class 第一部分

* 类（class）: 定义了一切事物的抽象特点（建筑设计图）
* 对象： 类型的实例；（建好的房子）；
* 面向对象三大特性： 封装，继承，多肽（因继承而产生的方法属性等）



```typescript
class Animal 
{
  name: string;
  constructor(name:string) {
    this.name = name
  }
  run() {
    return 	`${this.name} is running`
  }
}

const snake = new Animal('ts')
console.log(snake.run())// ts is running

// 继承
class Dog extends Animal {
  bark() {
    return `${this.name} is barking`
  }
}
const xiaoming = new DOg('xiaoming');
console.log(xiaomiong.bark());// xioaming is barking

// 方法的重写
class Cat extends Animal{
  // 子类必须调用 super();es6 语法；
  constructor(name) {
    super(name)
  }
  run() {
    return 'miaommiao ' + super.run()
  }
}
const maomao = new Cat('maomao')
console.log(maomao.run())// miaommiao maomao isrunning

```

##### class  第二部分

public 和 private ； 公有 和私有； 

public： 是可以访问的方法 和属性；

private： 是只有 class 自身访问的，对外不公布；

protected：子类可以访问属性；其他外部人员不能访问；

readonly： 属性只能读；

static: 静态属性；

```typescript
class Animal 
{
  public  name: string;// 外部可以访问的属性或者方法
  private  name: string;// 私有的 只能在 class里面访问，子类也不能访问
  protected  name: string;// 子类可以访问属性；其他外部人员不能访问
  readonly  name: string;// 属性只能读，不能修改
  static caterGoies: string[] = ['bird','fish']; //可以直接访问
  static isAnimal (a) {
    return a instanceof Animal // a 是否属于 Animal
  }
  constructor(name:string) {
    this.name = name
  }
  run() {
    return 	`${this.name} is running`
  }
}

const snake = new Animal('ts')
console.log(snake.caterGoies)// ['bird','fish']  static
console.log(Animal.isAnimal(snake))//true   static
```



#### 类和接口 ？

interface :定义和约束

interface，implements抽象和验证类的属性和方法

```typescript
class Car {
  switchRadio() {
    
  }
}
class CellPhone {
  switchRadio() {
    
  }
}

// 以上两个类  都有一个相同的switchRadio 方法； 不可取； 
// 利用 interface 来修改
interface Radio{
  switchRadio(): void(表示什么都不返回);
}
interface Battery {
  checkBatteryStatus():
}
// 合并 interface
interface RadioWIthBattery extends Radio {
   checkBatteryStatus();
}
// 修改类 
class Car implements Radio {
  switchRadio() {
    
  }
}

class CellPhone implements RadioWIthBattery {
  switchRadio() {
    
  }
  checkBatteryStatus(){
    
  }
}
```



#### 枚举（Enum）

常量： 在代码中不会被改变的值；js 中一般用 const 定义；

在一定范围内取值；比如：周一到周五； 三原色： 红黄蓝； 这些都可以利用 enum 来定义取值；会从 0 开始进行递增（下标）

```typescript
enum Direction {
  UP,
  Down,
  Left,
  Right
}
console.log(Direction.UP)// 0 ‘ 下标
console.log(Direction[0])//UP  值 ，相当于数组
// 如果初始值 被赋值了一个数；就会作为初始值，后面的值就会按照此来递增
enum Direction {
  UP=10，
  Down,
  Left,
  Right
}
//  则 Down  就是 11 ； 以此类推

//字符串 
enum Direction {
  UP = 'UP',
  Down= 'Down',
  Left= 'Left',
  Right= 'Right'
}

// 应用于业务逻辑判断
const value = 'UP';
if(value === Direction.UP) {
  // do something
}

// 常量枚举；
if(value === Direction.UP) {
  // do something
}
const enum Direction {
  UP = 'UP',
  Down= 'Down',
  Left= 'Left',
  Right= 'Right'
}
// 提升性能; 加一个 const  就可以； 在ts 编译的时候  不会解析其他；就只有 解析 const value = 'UP';

```

#### 泛型（Generics）难点；

##### 第一部分-概念

定义函数的时候 ，不先指明类，而是在使用的时候在去指明；动态传入什么类型，就是什么类型

解决问题：

```typescript
//  T  可以看做占位符或者变量,在你使用的时候，利用类型推论：传入什么 T 就是什么类型
function echo<T>(arg:T):T{
  return arg
}

const result = echo('str') // T 是 string
const result = echo(123')// T 是 number
const result = echo(false)// T 是 boolean
const result = echo([])// T 是 array

// 泛型可以传入多个值； 

 function swap<T,U>(tuple:[T,u]):[U,T] {
   retunr [tuple[1],tuple[0]]
 }
// 上述代码；传入[T,U];返回 [U,T]
```



##### 第二部分-约束泛型

```typescript
// 传入数组
function echoWithArr<T> (arg:T[]):T[] {
  return arg
}
const arrs = echoWithArr([1,2,3]) // 只能传入数组
// 约束类型 ---针对数组，传入数组的长度来约束

interface IWithLength {
  length: number;
}
function echoWithLength<T extends IWithLength> (arg:T):T {
  console.log(arg.length)
  return arg
}
const str = echoWithArr('str');// 返回字符串  
const obj = echoWithArr('str');// 返回字对象 
const arrs = echoWithArr([1,2,3]);// 返回字数组 
//  只要满足 interface IWithLength  you length 属性 就对



```

##### 第三部分-类 和接口

```typescript
// 类调用
class Queue<T> {
  private data = [];
  push(item:T) {
    return this.data.push(item)
  }
   pop():T {
    return this.data.shift()
  }
}
// T 的类型根据你传入的参数类型而定
const queue = new Queue<number>();// 定义的 number
queue.push(1);
console.log(queue.pop().toFixed())// 可以调用number  的方法
const queue2 = new Queue<string>();// 定义的 string
queue2.push('strs');
console.log(queue.pop().length)// 输出 4 ；可 以调用string  的方法

            
  // interface  调用
interface KeyPair<T,U> {
   key: T;
   value: U;
}

let  kp1 : keyPair<number,string> = { key: 123,value:'strss'}
let  kp2 : keyPair<string,number> = { key: '123',value:123}
let arr :number[] = [1,2,3]
let arrTwo:Array<number> = [1,2,3] // 效果和 arr 的一样；

// 函数

interface Iplus<T> { // 函数类型 传入 T，增加灵活性;可以用以复用
  (a:T,b:T): T
}
function plus(a:number,b:number):number {
  return a+b
};// number
function connect(a:string,b:string):string {
  return a+b
}
const a:Iplus<number> = plus; // 成功匹配
const b:Iplus<string> = connect; // 成功匹配
```

#### 类型别名和类型断言

1 类型别名： type alias ; 给类型起一个别名；

```typescript
function sun (x:number,y:number):number {
  return x+y
}
const sum 2 :(x:number,y:number)=> number = sum

// 如何抽象 sum2 ;
type PlusType = (x:number,y:number)=> number// type 类型别名;
const sum2:PlusType = sum;

//联合类型

type nameAge = ()=> string
type nameOrAge =  string | nameAge；
function getName (n:nameOrAge):string {
  if( typeof n === 'string') {
    return n 
  }else {
    return ();
  }
}
// 类型断言 : 
function getLength (input: string | number):number {
  //input.length ;会报错,因为 length 不是 string 和 number 共同的属性； 因为此处是个联合类型；怎么办了？ as 登场
  
  // 麻烦方法
  const str = input as string;
  if(string.length) {
    return string.length
  }else {
    const number = input as Number 
    return number.toString().length
  }
  // 简单方法
  if( (<string>input).length) {
    eturn (<string>input).length
  }else {
    return number.toString().length
  }
  
}
```

#### 声明文件

在引入第三方库的时候： 



``` typescript
// jquery.d.ts

declare var jquery : (selector:string)=> any
```

