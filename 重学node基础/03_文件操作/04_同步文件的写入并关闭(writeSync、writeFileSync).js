let fs = require('fs')

// 同步打开文件，返回值为文件操作符, 第二个参数 w+，打开文件用于读取和写入。 如果文件不存在则创建文件，如果文件存在则截断文件。
let fd = fs.openSync('./test2.txt', 'w+')
console.log(fd)

// 同步写入文件，返回的是写入的字节数
let ws1 = fs.writeSync(fd, '123我爱你ABCab测试', 0, 'utf-8')
console.log(ws1)

// 同步写入文件，将 buffer 大小的空字节写入文件，返回的是字节数
// let ws2 = fs.writeSync(fd, Buffer.alloc(64), 0, 64, 0)
// console.log(ws2)

// 同步写入文件，返回值 undefined
let ws3 = fs.writeFileSync('./test3.txt', '123我爱你ABCab测试', {flag: 'w', encoding: 'utf-8'})
console.log(ws3) // undefined

// 同步关闭文件，没有错误就返回 undefined。
let cs = fs.closeSync(fd)
console.log(cs) // undefined