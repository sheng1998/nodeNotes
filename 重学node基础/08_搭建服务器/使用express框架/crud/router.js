// 引入 express 包
let express = require('express')
// 引入读取文件的包
let fs = require('fs');

// 引入文件操作模块
let Students = require('./students')

// 创建路由容器
let router = express.Router()

// 重定向至首页
router.get('/', (request, response) => {
    response.redirect('/students')
})

// 渲染首页
router.get('/students', (request, response) => {
    Students.find((err, data) => {
        if(err) {
            response.redirect('/404')
        } else  {
            response.render('index.html', {
                fruits: [
                    { fruit: '苹果',describe: '这是苹果' },
                    { fruit: '梨子',describe: '这是梨子' },
                    { fruit: '橘子',describe: '这是橘子' },
                    { fruit: '香蕉',describe: '这是香蕉' }
                ],
                students: data
            })
        }
    })
})

// 渲染添加学生页面
router.get('/students/new', (request, response) => {
    response.render('new.html')
})

// 处理添加学生请求 
router.post('/students', (request, response) => {
    Students.save(request.body, err => {
        if(err) {
            response.redirect('/404')
        } else  {
            response.redirect('/students')
        }
    })
})

// 渲染编辑页面 
router.get('/students/edit', (request, response) => {
    Students.findById(request.query.id, (err, data) => {
        if(err) {
            response.redirect('/404')
        } else {
            response.render('edit.html', {
                id: data.id,
                name: data.name,
                gender: data.gender,
                age: data.age,
                hobbies: data.hobbies
            })
        }
    })
})

// 处理编辑请求
router.post('/students/edit', (request, response) => {
    Students.undateById(request.body, err => {
        if(err) {
            response.redirect('/404')
        } else {
            response.redirect('/students')
        }
    })
})

// 处理删除请求 
router.get('/students/delete', (request, response) => {
    Students.deleteById(request.query.id, err => {
        if(err) {
            response.redirect('/404')
        } else {
            response.redirect('/students')
        }
    })
})

// 渲染 404 页面
router.get('/404', (request, response) => {
    response.render('404.html')
})

// 导出路由模块
module.exports = router
