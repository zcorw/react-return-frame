# 可跳转返回组件群
> 在我们项目开发中经常能遇到需要在一个弹出窗或划出窗中进行多组件间跳转、返回，本组件使用组合模式，方便灵活的提供一种方案，可以轻松的进行多层级的组合。

* <a href="#demo">查看demo</a>
* <a href="#use">快速上手</a>

### <a name="demo">查看demo</a>
先拷贝到本地  

```
git clone https://github.com/zcorw/react-return-frame.git
```  
安装依赖  

```
cd react-return-frame
npm i
```
执行demo

```
npm run start
```

### <a name="use">快速上手</a>

从npm安装

```
npm install react-return-frame
```

本组件由三个部分组成，SingleDetail、MacroDetail、connect，下面分别说明下这三部分的作用和使用方法。

> SingleDetail用来封装你的组件。  
> 语法：new SingleDetail(pageKey, component)。  
> 参数：pageKey是一个字符串，作为被封装组件的标识，后面指定初始显示和打开组件所传的标识就是这个参数。  
> component就是你想要封装的react组件。

```
import React from "react";
import {SingleDetail, MacroDetail, connect} from "react-return-frame";
const UserDetail = (props) => {/* 你的组件代码 */};
const detail = new SingleDetail("user", UserDetail);
```

> MacroDetail用来绑定要互相跳转的组件，该组件必须先通过SingleDetail封装的实例，也可以是一个MacroDetail的实例。

```
const macro1 = new MacroDetail().set(detail1).set(detail2);
const macro2 = new MacroDetail().set(macro1);
```

> connect是最终封装，使用这个方法需要执行两次，第一次传入MacroDetail的实例，第二次初始默认显示组件的标识和要传递给组件的props.detail，最后返回一个react对象。通过该对象传入的props将向下传给所有绑定的组件，并且还将传入四个值showDetail, detail, returnDetail, btnReturnVisible  
> [function]showDetail(pageKey, detail) 用来打开下个组件的方法，pageKey是组件的标识，detail是要传给组件的值。  
> [object]detail 就是上一个方法中传入的detail。  
> [function]returnDetail(detail) 返回上一个组件的方法，detail就是上面那个值，可不传，不传值的情况下默认返回之前传入的值，如果有传值则与之前的值合并后返回。  
> [boolean] btnReturnVisible 是否能够还能返回，一般用来判断是否显示返回按钮。

```
const ReturnFrame = connect(macro2)("user", {uid: 1});
<ReturnFrame />
```