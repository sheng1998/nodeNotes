### exports 和 module.exports 的区别
* exports 和 module.exports 都是 nodejs 中常用的导出模块的方式
* exports 其实是 module.exports 的一个引用，两者指向的地址是一致的
* require 引入的对象本质上是 module.exports。这就产生了一个问题，当 module.exports 和 exports 指向的不是同一块内存时，exports 的内容就会失效。
* 可以直接给 module.exports 赋值，但是不可以直接给 exports 赋值
```javascript
// 错误用法
exports = a;

// 正确用法，下面三个语句都是正确的用法，都是将变量 a 导出
exports.a = a;
module.exports.a = a;
module.exports = a;
```