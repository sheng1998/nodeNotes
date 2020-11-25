let fs = require('fs');

fs.mkdir('./dir/dir', {recursive: true}, err => {
    if(err) {
        throw err
    } else {
        console.log('文件夹创建成功！')
    }
})
