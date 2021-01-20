# node 文件上传功能
此文档参照：https://www.cnblogs.com/wjlbk/p/12633320.html

## 文件上传用到的包 Multer
Multer 是一个 node.js 中间件，用于处理 multipart/form-data 类型的表单数据，它主要用于上传文件。它是写在 busboy 之上非常高效
**注意:** Multer 不会处理任何非 multipart/form-data 类型的表单数据。
**安装：**
```shell
npm i multer --save
```

<br>

### Multer 的基本使用
Multer 会添加一个 body 对象 以及 file 或 files 对象 到 express 的 request 对象中。 body 对象包含表单的文本域信息，file 或 files 对象包含对象表单上传的文件信息。

**基本使用方法:**
```javascript
var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

var app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file 是 `avatar` 文件的信息
  // req.body 将具有文本域数据，如果存在的话
})

app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
  // req.files 是 `photos` 文件数组的信息
  // req.body 将具有文本域数据，如果存在的话
})

var cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files 是一个对象 (String -> Array) 键是文件名，值是文件数组
  //
  // 例如：
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body 将具有文本域数据，如果存在的话
})
如果你需要处理一个只有文本域的表单，你应当使用 .none():

var express = require('express')
var app = express()
var multer  = require('multer')
var upload = multer()

app.post('/profile', upload.none(), function (req, res, next) {
  // req.body 包含文本域
})
```

<br>

### Multer 的 API
**文件信息**
每个文件具有下面的信息:
| Key          | Description                   | Note          |
| ------------ | ----------------------------- | ------------- |
| fieldname    | Field name 由表单指定         |               |
| originalname | 用户计算机上的文件的名称      |               |
| encoding     | 文件编码                      |               |
| mimetype     | 文件的 MIME 类型              |               |
| size         | 文件大小（字节单位）          |               |
| destination  | 保存路径                      | DiskStorage   |
| filename     | 保存在 destination 中的文件名 | DiskStorage   |
| path         | 已上传文件的完整路径          | DiskStorage   |
| buffer       | 一个存放了整个文件的 Buffer   | MemoryStorage |
		
**multer(opts)**
Multer 接受一个 options 对象，其中最基本的是 dest 属性，这将告诉 Multer 将上传文件保存在哪。如果你省略 options 对象，这些文件将保存在内存中，永远不会写入磁盘。
为了避免命名冲突，Multer 会修改上传的文件名。这个重命名功能可以根据您的需要定制。
以下是可以传递给 Multer 的选项:
| Key             | Description                        |
| --------------- | ---------------------------------- |
| dest or storage | 在哪里存储文件                     |
| fileFilter      | 文件过滤器，控制哪些文件可以被接受 |
| limits          | 限制上传的数据                     |
| preservePath    | 保存包含文件名的完整文件路径       |

> 通常，一般的网页应用，只需要设置 dest 属性，像这样：
```javascript
var upload = multer({ dest: 'uploads/' })
```
如果你想在上传时进行更多的控制，你可以使用 storage 选项替代 dest。Multer 具有 DiskStorage 和 MemoryStorage 两个存储引擎；另外还可以从第三方获得更多可用的引擎。

**.single(fieldname)**
接受一个以 fieldname 命名的文件。这个文件的信息保存在 req.file。

**.array(fieldname[, maxCount])**
接受一个以 fieldname 命名的文件数组。可以配置 maxCount 来限制上传的最大数量。这些文件的信息保存在 req.files。

**.fields(fields)**
接受指定 fields 的混合文件。这些文件的信息保存在 req.files。
fields 应该是一个对象数组，应该具有 name 和可选的 maxCount 属性。

Example:
```javascript
[
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 8 }
]
.none()
```

**limits**
一个对象，指定一些数据大小的限制。Multer 通过这个对象使用 busboy，详细的特性可以在 busboy's page 找到。

可以使用下面这些:
| Key           | Description                                              | Default   |
| ------------- | -------------------------------------------------------- | --------- |
| fieldNameSize | field 名字最大长度                                       | 100 bytes |
| fieldSize     | field 值的最大长度                                       | 1MB       |
| fields        | 非文件 field 的最大数量                                  | 无限      |
| fileSize      | 在 multipart 表单中，文件最大长度 (字节单位)             | 无限      |
| files         | 在 multipart 表单中，文件最大数量                        | 无限      |
| parts         | 在 multipart 表单中，part 传输的最大数量(fields + files) | 无限      |
| headerPairs   | 在 multipart 表单中，键值对最大组数                      | 2000      |
设置 limits 可以帮助保护你的站点抵御拒绝服务 (DoS) 攻击。
