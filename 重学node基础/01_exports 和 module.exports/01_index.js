// exports 和 module.exports 的区别

let a = 'aaa'
let b = 'bbb'

exports.a = a

// 下面两个语句导出同一个变量，实际上只会导出一次
module.exports.b = b
module.exports.b = b

// 其实 exports 就是module.exports 的一个引用。
console.log(exports === module.exports) // true

// 错误用法，不能给 exports 直接赋值，因为它只是，module.exports 的一个引用
// 如果直接赋值了，就会改变了 exports 的原来的作用，没有了导出变量的功能。
// 因为 require 引入的对象本质上是 module.exports。这就产生了一个问题，当 module.exports 和 exports 指向的不是同一块内存时，exports 的内容就会失效。
// exports = a

// 但是可以像下面这样使用，因为即使是使用 exports.a 这种格式导出，也相当于使用 module.exports.a 来导出
// module.exports = a