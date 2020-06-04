### React 

#### Hooks

https://blog.csdn.net/lunahaijiao/article/details/99434993?depth_1-utm_source=distribute.pc_relevant.none-task&utm_source=distribute.pc_relevant.none-task

hooks 底层代码顺序： 在执行useState的时候，react会在组件的Fiber节点上，按照useState的先后顺序，以链表的方式创建hook，并且将state和该state对应的更新函数返回。更新时，会顺着链表，依次计算最新的state值返回
https://user-gold-cdn.xitu.io/2020/3/26/171175235d4a5e2c?imageView2/0/w/1280/h/960/format/webp/ignore-error/1