# <span id='top'>node 路径模块</span>
| 变量/方法 | 说明 |
| ---- | ---- |
| [__dirname](#__dirname) | 返回当前执行文件所在目录的绝对路径。 |
| [__filename](#filename) | 返回当前执行文件的绝对路径。 |
| [path.basename(path[, ext])](#basename) | 返回 path 的最后一部分。 |
| [path.dirname(path)](#dirname) | 返回 path 的目录名。 |
| [path.extname(path)](#extname) | 返回当前路径的后缀名，没有后缀名就返回空字符串。 |
| [path.format(pathObject)](#format) | 根据对象参数返回路径字符串。 与 [path.parse()](#parse) 相反。 |
| [path.isAbsolute(path)](#isAbsolute) | 检测 path 是否为绝对路径。 |
| [path.join([...paths])](#join) | 将所有给定的 path 片段连接到一起，然后规范化生成的路径。|
| [path.parse(path)](#parse) | 返回一个对象，其属性表示 path 的有效元素 |

<br>

##### <span id='__dirname'>__dirname</span>**[⇧](#top)**
返回当前执行文件所在目录的绝对路径
```javascript
// __dirname 获取当前目录的路径
console.log(__dirname) // F:\code\web\study\JavaScript\node\重学node基础\06_路径模块
```

<br>

##### <span id='__filename'>__filename</span>**[⇧](#top)**
返回当前执行文件的绝对路径
```javascript
// __filename 获取当前执行文件的路径
console.log(__filename) // F:\code\web\study\JavaScript\node\重学node基础\06_路径模块\index.js
```

<br>

##### <span id='basename'>path.basename(path[, ext])</span>**[⇧](#top)**
返回 path 的最后一部分
```javascript
let path = require('path')

// path.basename(path[, ext]) 返回 path 的最后一部分
console.log(path.basename('F:/node/index.js')) // index.js
console.log(path.basename('F:/node')) // node
```

<br>

##### <span id='dirname'>path.dirname(path)</span>**[⇧](#top)**
返回 path 的目录名
```javascript
let path = require('path')

// path.dirname(path) 返回 path 的目录名 
console.log(path.dirname('F:/study/javascript/node/index.js')) // F:/study/javascript/node
console.log(path.dirname('F:/node')) // F:/
```

<br>

##### <span id='extname'>path.extname(path)</span>**[⇧](#top)**
返回当前路径的后缀名，没有后缀名就返回空字符串(判断最后一部分是否有 `.`, 出现了就返回 `.` 后面的内容，包括 `.`)
```javascript
let path = require('path')

// path.extname() 返回当前路径的后缀名，没有后缀名就返回空字符串
console.log(path.extname('F:/node/index.js')) // .js
console.log(path.extname('F:/node/index.')) // .
console.log(path.extname('F:/node/index')) // ''
```

<br>

##### <span id='format'>path.format(pathObject)</span>**[⇧](#top)**
根据对象参数返回路径字符串。 与 [path.parse()](#parse) 相反。
pathObject 可选参数：
* root: 根目录
* dir: 目录
* base: 路径的最后一部分
* ext: 后缀名
* name: 文件名

当为 `pathObject` 提供属性时，注意以下组合，其中一些属性优先于另一些属性：
* 如果提供了 `pathObject.dir`，则忽略 `pathObject.root`。
* 如果 `pathObject.base` 存在，则忽略 `pathObject.ext` 和 `pathObject.name`。
* 如果没有提供 `pathObject.base`, 则使用 `pathObject.name` + `pathObject.ext`(直接将 `name` 与 `ext` 拼接起来，如果没有 `.` 该方法也不会自动补上)。

> 同时要注意 root 要最后最好要携带 **/**

```javascript
let path = require('path')

// path.format(pathObject) 根据对象参数返回路径字符串。 与 [path.parse()](#parse) 相反。
// 如果提供了 dir, 则忽略 root
console.log(path.format({
    root: 'F:/node/',
    dir: 'F:/study/node',
    base: 'index.js'
})) // F:/study/node\index.js

// 如果提供了 base, 则忽略 name 和 ext
console.log(path.format({
    dir: 'F:/study/node',
    base: 'index.js',
    name: 'readme',
    ext: '.md'
})) // F:/study/node\index.js

// 如果没有提供 base, 则使用 name + ext(直接将 name 与 ext 拼接起来，如果没有 . 该方法也不会自动补上)
console.log(path.format({
    dir: 'F:/study/node',
    name: 'readme',
    ext: 'md'
})) // F:/study/node\readmemd

// 一般情况下 root 需要在最后加上 /, 不然就会出现直接拼接的现象
console.log(path.format({
    root: 'F:/node',
    base: 'index.js'
})) // F:/nodeindex.js
```

<br>

##### <span id='isAbsolute'>path.isAbsolute(path)</span>**[⇧](#top)**
`path.isAbsolute()` 方法检测 `path` 是否为绝对路径。如果给定的 `path` 是零长度字符串，则返回 `false。`
```javascript
let path = require('path')

// path.isAbsolute() 方法检测 path 是否为绝对路径。如果给定的 path 是零长度字符串，则返回 false。
console.log(path.isAbsolute(__dirname)) // true
console.log(path.isAbsolute(__filename)) // true

console.log(path.isAbsolute('/node/index.js')) // true
console.log(path.isAbsolute('./node/index.js')) // false
console.log(path.isAbsolute('../node/index.js')) // false
console.log(path.isAbsolute('node/index.js')) // false
```

<br>

##### <span id='join'>path.join([...paths]</span>**[⇧](#top)**
path.join() 方法会将所有给定的 path 片段连接到一起（使用平台特定的分隔符作为定界符），然后规范化生成的路径。
长度为零的 path 片段会被忽略。 如果连接后的路径字符串为长度为零的字符串，则返回 '.'，表示当前工作目录。
该方法拼接后的路径会自动忽略多余的 '/'
如果任何的路径片段不是字符串，则抛出 TypeError。
```javascript
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
```

<br>

##### <span id='parse'>path.parse(path)</span>**[⇧](#top)**
```javascript
let path = require('path')

console.log(path.parse('F:/study/javascript/nodejs/index.js'))
// {
//     root: 'F:/',
//     dir: 'F:/study/javascript/nodejs',
//     base: 'index.js',
//     ext: '.js',
//     name: 'index'
// }

console.log(path.parse('F:/study/javascript/nodejs/index.js/'))
// {
//     root: 'F:/',
//     dir: 'F:/study/javascript/nodejs',
//     base: 'index.js',
//     ext: '.js',
//     name: 'index'
// }

console.log(path.parse('/javascript/nodejs/index.js/'))
// {
//     root: '/',
//     dir: '/javascript/nodejs',
//     base: 'index.js',
//     ext: '.js',
//     name: 'index'
// }

console.log(path.parse('javascript/nodejs/index.js/'))
// {
//     root: '',
//     dir: 'javascript/nodejs',
//     base: 'index.js',
//     ext: '.js',
//     name: 'index'
// }

```

<br>
