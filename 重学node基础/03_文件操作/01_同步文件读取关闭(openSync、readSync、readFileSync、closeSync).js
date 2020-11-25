let fs = require('fs')

// 同步打开文件，返回值 fd 是文件操作符
let fd = fs.openSync('./test.txt', 'r')
console.log(fd) // 3

// 在内存中开辟一个 30 字节的空间
let buffer = Buffer.alloc(32)
// 同步读取文件，返回值为一个 bytesRead （读取的字节数）
let rs = fs.readSync(fd, buffer, 0, 32)
console.log(rs) // 29

// 同步读取文件，返回值为读取到的文件的内容，如果没有添加第二个参数，默认为 buffer 类型。
let rfs = fs.readFileSync('./test.txt', {flag: 'r', encoding: 'utf-8'})
console.log(rfs) // 我是文本文件，text,123

// 同步关闭文件，没有错误就返回 undefined。
let cs = fs.closeSync(fd)
console.log(cs) // undefined
