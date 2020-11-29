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
