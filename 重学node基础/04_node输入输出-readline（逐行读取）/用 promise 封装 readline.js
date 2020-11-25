// 引入 require 模块
const readline = require('readline')
let fs = require('fs');

// 创建 readline 接口实例
let r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// 封装
function myQuestion(problem) {
    return new Promise((resolve, reject) => {
        // 设置提问事件
        r1.question(problem, answer => {
            resolve(answer)
        })
    })
}

// 调用
// let test = myQuestion('你的名字是？')
// test.then(data => {
//     console.log(data)
//     r1.close()
// })

// 调用2
async function createNewFile(fileName) {
    let name = await myQuestion('What is you name?')
    let age = await myQuestion('How old are you?')
    let sex = await myQuestion('What is you gender?')
    let phone = await myQuestion('What is your phone number?')

    let obj = {
        name, age, sex, phone
    }

    try {
        let wf = await fs.promises.writeFile(fileName, JSON.stringify(obj), {flag: 'w', encoding: 'utf-8'})
        if(wf === undefined) {
            console.log('文件写入成功！')
        }
    } catch (error) {
        console.log('文件写入失败！')
        r1.close()
    }
    r1.close()
}

createNewFile('./test.json')

// 关闭事件监听
r1.on('close', () => {
    process.exit(0)
})
