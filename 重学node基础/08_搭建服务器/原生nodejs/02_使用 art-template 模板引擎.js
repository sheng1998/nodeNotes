// 引入模板引擎
let template = require('art-template')

let str = `
你好，今天是：星期{{ week }},
很高兴认识你，我叫{{ name }},
今年{{ age }}岁。
`

// 模板引擎只认得 {{}} , 它会将 {{}} 里面的内容替换。
str = template.render(str, {
    week: '六',
    name: '小庄',
    age: 22
})

console.log(str)
