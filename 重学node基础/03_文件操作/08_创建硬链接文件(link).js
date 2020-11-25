let fs = require('fs')

fs.writeFile('./test9.txt', 'ab12AB测试', {flag: 'w', encoding: 'utf-8'}, err=> {
    if(err) {
        throw err
    } else {
        console.log('创建成功！')
        fs.link('./test9.txt', './test10.txt', err => {
            if(err) {
                throw err
            } else {
                console.log('success!')
                setTimeout(() => {
                    let sc = fs.promises.rm('./test9.txt')
                    sc.then(data => {
                        console.log('删除成功！')
                        return fs.promises.rm('./test10.txt')
                    }).then(data => {
                        console.log('删除成功！')
                    })
                }, 5000);
            }
        })
    }
})
