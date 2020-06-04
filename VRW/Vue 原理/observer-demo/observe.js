// 触发更新试图
function updateView () {
  console.log('试图更新')
}
//  Object.defineProperty 不能监听到数组原型
// 重新定义数组的原型
const  oldArrayProperty = Array.prototype
// Object.create ： 创建新对象，原型指向oldArrayProperty。在扩展新方法，是不会影响到原型的
const  arrProto = Object.create(oldArrayProperty);
// d定义数组相关的方法
let methodArr = ['push','unshift','splice','slice','pop','shift'];

methodArr.forEach( methodName => {
  arrProto[methodName] = function() {
      // 触发更新试图
      updateView()
      // 然后在调用利用 call   调用数组的方法  相当于： Array.prototype.call(this,...arguments)
    oldArrayProperty[methodName] .call(this,...arguments)
  }
})

// 重新定义属性，监听起来
function defineReactive (target,key,value) {
  // 深度监听 ，，，对象； observer 里面会 判断 value 是否是对象；在去调用
  observer(value)
  // 核心 API 
  Object.defineProperty(target,key,{
    get() {
      return value
    },
    set(newValue) {
      if(newValue !== value) {
        observer(newValue) // 深度监听
        // 设置新的值
        value = newValue;
        // 触发更新试图
        updateView()
      }
    } 
  })
};

//监听对象属性
function observer(target) {
  // 边界处理
  if(typeof target !== 'object' || target === null) {
    // 监听对象和数组
    return target 
  }

  // 判断是否是对象； 如果是 就把定义好的arrProto 赋值给 target.___proto___ 
  if(Array.isArray(target)) {
    target.__proto__ = arrProto;
  }
  // 重新定义各个属性； 利用 For  in 进行遍历

  for(let key in target) {
    defineReactive(target,key,target[key])
  }
};

// 准备数据

const data = {
  name:'joke',
  age:26,
  info: {
    address:'上海',// 需要深度监听
  },
  nums:[1,2,3,4]
}

// 监听数据 
observer(data)

// 测试 
data.name = 'gegeg'
data.age= 99
data.info.address = '成都'
delete data.name // 试图根本不会跟新

data.nums.push(5); // 此时调用的就是 arrProto 上的 push 方法