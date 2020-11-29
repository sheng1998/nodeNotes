let path = require('path')

// path.extname(path) 返回当前路径的后缀名，没有后缀名就返回空字符串
console.log(path.extname('F:/node/index.js')) // .js
console.log(path.extname('F:/node/index.')) // .
console.log(path.extname('F:/node/index')) // ''