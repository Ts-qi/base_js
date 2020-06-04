### 前端 BFC

https://www.cnblogs.com/lhb25/p/inside-block-formatting-ontext.html

概念：块级格式化上下文。是一个独立的渲染区域，只有块元素参与其中，它规定了内部的 Bolck 元素如何布局，并且与这个区域外部毫不相关；

#### 原理

* 内部的 Box 会在垂直方向，一个接一个的放置
* Box 垂直方向的距离由 margin 决定，属于同一个`BFC`的两个相邻`Box`的margin会发生重叠
* BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此
* 计算BFC的高度时，浮动元素也参与计算

#### 如何创建 BFC

* 根元素
* float 属性不为 none
* Position 不为 static 和 relative
* overflow 不为 visiable
* Display 为 inline-block,table-cell,table-caption,flex,inline-flex

#### BFC 的作用

* 防止外边距重叠

> bfc导致的属于同一个bfc中的子元素的margin重叠(Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠)
> 我们可以在div外面包裹一层容器，并触发该容器生成一个BFC。那么两个div便不属于同一个BFC，就不会发生margin重叠了
>

* 清除浮动的影响

> 块级子元素浮动，如果块级父元素没有设置高度，其会有高度塌陷的情况发生。
> 原因：子元素浮动后，均开启了BFC，父元素不会被子元素撑开。
> 解决方法：由第六条原理得，计算BFC的高度时，浮动元素也参与计算。所以只要将父容器设置为bfc
> 就可以把子元素包含进去：这个容器将包含浮动的子元素，它的高度将扩展到可以包含它的
> 子元素，在这个BFC，这些元素将会回到页面的常规文档流
>

* 防止文字环绕