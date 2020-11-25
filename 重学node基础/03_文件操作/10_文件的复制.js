let fs = require('fs');

fs.copyFile('./test.txt', './test2.txt', 0, err => {
    if(err) {
        throw err
    } else {
        console.log('文件复制成功！')
    }
})

