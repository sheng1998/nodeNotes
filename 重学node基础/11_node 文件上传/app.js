let multer = require('multer') // 上传文件专用包之一
let express = require('express')

let app = express()

app.engine('html', require('express-art-template'))

// 配置文件保存信息
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // 指定文件保存的路径
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // 指定文件保存的文件名
    }
});
let upload = multer({
    // dest: 'uploads/' // 配置上传文件保存目录
    storage: storage
}) 

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
    console.log(req.body) // 打印输出表单其他信息
})

app.listen(8080, () => {
    console.log('8080')
})