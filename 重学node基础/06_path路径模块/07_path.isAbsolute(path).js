let path = require('path')

// path.isAbsolute() 方法检测 path 是否为绝对路径。如果给定的 path 是零长度字符串，则返回 false。
console.log(path.isAbsolute(__dirname)) // true
console.log(path.isAbsolute(__filename)) // true

console.log(path.isAbsolute('/node/index.js')) // true
console.log(path.isAbsolute('./node/index.js')) // false
console.log(path.isAbsolute('../node/index.js')) // false
console.log(path.isAbsolute('node/index.js')) // false
