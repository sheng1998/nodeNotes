let fs = require('fs');

// 该方法需要存在下面的文件和文件夹
// 异步重命名文件，该方法也可以移动文件
fs.rename('./test3.txt', './test2.txt', err => {
    if(err) {
        console.log('重命名失败！')
    } else {
        console.log('重命名成功！')
    }
})

// 该方法需要存在下面的文件和文件夹
// 异步移动文件
fs.rename('./dir/dir1/index.js', './dir/dir2/index.js', err => {
    if(err) {
        console.log('文件移动失败！')
    } else {
        console.log('文件移动成功！')
    }
})
