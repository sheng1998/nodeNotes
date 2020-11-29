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
    ext: '.md'
})) // F:/study/node\readme.md
console.log(path.format({
    dir: 'F:/study/node',
    name: 'readme',
    ext: 'md'
})) // F:/study/node\readmemd

// 一般情况下 root 需要在最后加上 /, 不然就会出现直接拼接的现象
console.log(path.format({
    root: 'F:/node/',
    base: 'index.js'
})) // F:/node/index.js
console.log(path.format({
    root: 'F:/node',
    base: 'index.js'
})) // F:/nodeindex.js
