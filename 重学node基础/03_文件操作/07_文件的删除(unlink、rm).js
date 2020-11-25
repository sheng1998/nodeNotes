let fs = require('fs')

// 先创建文件，然后删除文件
fs.writeFile('./test7.txt', 'abc123ABC测试', {flag: 'w', encoding: 'utf-8'}, err => {
    if(err) {
        throw err
    }
    else {
        console.log('文件test.txt创建成功！')
        fs.unlink('./test7.txt', (err) => {
            if (err) throw err;
            console.log('文件已被删除');
        })
    }
})

// 先创建文件，然后删除文件
fs.writeFile('./test8.txt', 'abc123ABC测试', {flag: 'w', encoding: 'utf-8'}, err => {
    if(err) {
        throw err
    }
    else {
        console.log('文件test.txt创建成功！')
        fs.rm('./test8.txt', (err) => {
            if (err) throw err;
            console.log('文件已被删除');
        })
    }
})
