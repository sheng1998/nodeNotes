let multer = require('multer') // 上传文件专用包之一
let express = require('express')
let upload = multer({ dest: 'uploads/' }) // 配置上传文件保存的目录

let app = express()

app.engine('html', require('express-art-template')) 

app.get('/', (request, response) => {
    response.json({
        data: 'data',
        code: 200
    })
})

app.get('/index.html', (request, response) => {
    response.render('index.html')
})

app.post('/file', upload.single('file'), function (req, res, next) { // 在这里已经自动保存
    console.log(req.file) // 打印输出文件信息
    console.log(req.body)
  })

app.listen(8080, () => {
    console.log('8080')
})


