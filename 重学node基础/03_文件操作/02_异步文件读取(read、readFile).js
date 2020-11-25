let fs = require('fs')

// fs.open(path[, flags[, mode]], callback
// 异步打开文件，读取成功或者失败就会调用回调函数，成功的返回值 fd 是文件操作符
fs.open('./test.txt', (err, fd) => {
    if(err) {
        console.log(err)
    } else {
        console.log(fd)

        // fs.read(fd, buffer, offset, length, position, callback)
        // 异步读取文件，返回值为一个 bytesRead （读取的字节数）
        fs.read(fd, Buffer.alloc(30), 0, 30, 0, (err, bytesRead, buffer) => {
            if(err) {
                console.log(err)
            } else {
                console.log(bytesRead)
                console.log(buffer)
            }
        })

        // 异步关闭文件
        fs.close(fd, err => {
            if(err) {
                throw err
            } else {
                console.log('文件已关闭！')
            }
        })
    }
})

// 异步读取文件，返回值为读取到的文件的内容，如果没有添加第二个参数，默认为 buffer 类型。
fs.readFile('./test.txt', {flag: 'r', encoding: 'utf-8'}, (err, data) => {
    if(err) {
        console.log(err)
    } else {
        console.log(data)
    }
})

// 读取当前文件夹下所有的文件及目录
fs.readdir('./', (err, files) => {
    if(err) {
        throw err
    } else {
        console.log(files)
    }
})
