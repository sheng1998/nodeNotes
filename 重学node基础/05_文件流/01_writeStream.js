let fs = require('fs');

// 创建写入流
let ws = fs.createWriteStream('./test.txt', {flags: 'w', encoding: 'utf-8'});

// 监听写入流的打开事件
ws.on('open', () => {
    console.log('写入流打开成功！')
})

// 监听准备
ws.on('ready', () => {
    console.log('写入流进入准备状态成功！')
})

// 监听写入流关闭事件
ws.on('close', () => {
    console.log('写入流关闭成功！')
})

// 写入流写入数据
ws.write('你好，我是测试文件ABCabc123;', err => {
    if(err) {
        console.log('数据写入失败！')
    } else {
        console.log('数据写入成功！')
    }
})
ws.end(() => {
    console.log('写入流结束成功！')
})
