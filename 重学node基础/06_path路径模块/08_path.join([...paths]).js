let path = require('path')

// path.join() 方法会将所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径。
// 长度为零的 path 片段会被忽略。 如果连接后的路径字符串为长度为零的字符串，则返回 '.'，表示当前工作目录。
// 该方法拼接后的路径会自动忽略多余的 '/'
// 如果任何的路径片段不是字符串，则抛出 TypeError。
console.log(path.join('javascript', 'node', 'index.js')) // javascript\node\index.js
console.log(path.join('/javascript/', '/node////\\', 'index.js')) // \javascript\node\index.js
console.log(path.join('./javascript/', '/node////', 'index.js')) // javascript\node\index.js
console.log(path.join('study/javascript', 'node', 'index.js')) // study\javascript\node\index.js
console.log(path.join('study/javascript', '', 'index.js')) // study\javascript\index.js
console.log(path.join('')) // .
console.log(path.join(__dirname, 'index.js')) // F:\code\web\study\JavaScript\node\重学node基础\06_路径模块\index.js
// console.log(path.join('node', {}, 'index.js')) // 报错
// console.log(path.join('node', 1, 'index.js')) // 报错
