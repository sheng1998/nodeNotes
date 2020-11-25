// 三次一样的 require, 其实只有一次生效，后面的两次不会再执行 require 请求，但是，下面的 res = res2 = res3
let res = require('./01_index.js')
let res2 = require('./01_index.js')
let res3 = require('./01_index.js')

console.log(res === res3) // true
console.log(res)