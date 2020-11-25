let fs = require('fs');

// 测试用户对 path 指定的文件或目录的权限。
// 第二个参数为可选值，默认为 fs.constants.F_OK, 表示检查在指定文件或目录是否存在
// 检查文件是否存在于当前目录中。
fs.access('test.txt', fs.constants.F_OK, err => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log('文件test.txt不存在！')
        } else {
            throw err
        }
    } else {
        console.log('文件test.txt存在！')
    }
})

// 检查目录是否存在于当前目录中。
fs.access('dir', fs.constants.F_OK, err => {
    if (err) {
        if (err.code === 'ENOENT') {
            console.log('文件夹dir不存在！')
        } else {
            throw err
        }
    } else {
        console.log('文件夹dir存在！')
    }
})

const file = './test.txt'

// 检查文件是否可读。
fs.access(file, fs.constants.R_OK, (err) => {
    console.log(`${file} ${err ? '不可读' : '可读'}`);
});

// 检查文件是否可写。
fs.access(file, fs.constants.W_OK, (err) => {
    console.log(`${file} ${err ? '不可写' : '可写'}`);
});

// 检查文件是否存在于当前目录中、以及是否可写。
fs.access(file, fs.constants.F_OK | fs.constants.W_OK, (err) => {
    if (err) {
        console.error(
            `${file} ${err.code === 'ENOENT' ? '不存在' : '只可读'}`);
    } else {
        console.log(`${file} 存在，且可写`);
    }
});