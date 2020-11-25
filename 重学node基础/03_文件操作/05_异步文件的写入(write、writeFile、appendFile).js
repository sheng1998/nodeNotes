let fs = require('fs')
const { threadId } = require('worker_threads')

// 同步打开文件，w+ 表示文件不存在就创建
fs.open('./test4.txt', 'w+', (err, fd) => {
    if(err) {
        throw err
    } else {
        // 在内存中打开的文件号
        console.log(fd)
        fs.write(fd, '123我爱你ABCab测试', 0, 'utf-8', (err, written, string) => {
            if(err) {
                throw err
            } else {
                // 写入的字节数
                console.log('written:', written)

                // 写入的字符串
                console.log('string:', string)
            }
        })

        // 关闭打开的文件
        fs.close(fd, err => {
            if(err) {
                throw err
            } else {
                console.log('文件已关闭！')
            }
        })
    }
})

// 异步文件写入
fs.writeFile('./test5.txt', '123我爱你ABCab测试', {flag: 'w', encoding: 'utf-8'}, (err) => {
    if(err) {
        throw err
    } else {
        console.log('文件写入成功！')

        // 以异步的方式将 '\n测试222' 插入到文件里，如果文件不存在会自动创建。
        fs.appendFile('./test5.txt', '\n测试222', {flag: 'a', encoding: 'utf-8'}, (err) => {
            if(err) {
                throw err
            } else {
                console.log('文件插入成功！')
            }
        })
    }
})