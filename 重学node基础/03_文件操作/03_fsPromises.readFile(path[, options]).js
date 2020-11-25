let fs = require('fs')

let rf = fs.promises.readFile('./test.txt', {flag: 'r', encoding: 'utf-8'})
rf.then(data => {
    console.log(data)
}).catch(err => {
    console.log(err)
})
