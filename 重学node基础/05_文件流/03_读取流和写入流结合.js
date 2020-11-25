let fs = require('fs');

// 创建可读流
let rs = fs.createReadStream('F:/video/vue/尚硅谷/尚硅谷Vue项目【硅谷外卖】教程/视频-1/18_尚硅谷_Vue项目_使用git对项目进行版本控制.avi', {flags: 'r'});
let ws = fs.createWriteStream('./a.avi', {flags: 'w'});

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
    ws.end(() => {
        console.log('写入流关闭成功！')
    })
})

// 监听读取流每次数据流入事件
// rs.on('data', chunk => {
//     ws.write(chunk, err => {
//         if(err) {
//             console.log('写入失败！')
//         } else {
//             console.log('单批写入成功！')
//         }
//     })
//     console.log(chunk)
// })

// 相当于上面的代码段，这是封装好的方法
rs.pipe(ws)
