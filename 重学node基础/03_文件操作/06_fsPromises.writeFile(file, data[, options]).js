let fs = require('fs')

let wf = fs.promises.writeFile('./test6.txt', '你好，I am A.\n', {flag: 'a', encoding: 'utf-8'})

wf
.then(data => {
        console.log('文件写入成功!')
        return fs.promises.writeFile('./test6.txt', '你好，I am B.\n', {flag: 'a', encoding: 'utf-8'})
    }, err => {
        console.log(err)
    })
.then(data => {
        console.log('文件写入成功!')
        return fs.promises.writeFile('./test6.txt', '你好，I am C.\n', {flag: 'a', encoding: 'utf-8'})
    }, err => {
        console.log(err)
    })
.then(data => {
        console.log('文件写入成功!')
    }, err => {
        console.log(err)
    })
