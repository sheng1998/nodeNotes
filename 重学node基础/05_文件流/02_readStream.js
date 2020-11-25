let fs = require('fs');

// 创建可读流
let rs = fs.createReadStream('F:/video/vue/尚硅谷/尚硅谷Vue项目【硅谷外卖】教程/视频-1/18_尚硅谷_Vue项目_使用git对项目进行版本控制.avi', {flags: 'r'});

// 监听写入流的打开事件
rs.on('open', () => {
    console.log('读取文件打开成功！')
})

// 监听准备
rs.on('ready', () => {
    console.log('写入流进入准备状态成功！')
})

// 监听读取流关闭事件
rs.on('close', () => {
    console.log('读取流已关闭！')
})

// 监听读取流每次数据流入事件
rs.on('data', chunk => {
    console.log('单次读取成功！')
    console.log(chunk)
})
