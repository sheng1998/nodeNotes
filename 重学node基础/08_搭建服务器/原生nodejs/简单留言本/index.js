let http = require('http')
let fs = require('fs');
let url = require('url')
let template = require('art-template')
let obj = {
    comments: [
        '床前明月光，疑是地上霜。举头望明月，低头思故乡。',
        '一闪一闪亮晶晶，满天都是小星星。',
        '远看山有色，近听水无声。春去花还在，人来鸟不惊。'
    ]
}

http
    .createServer((request, response) => {
        let urlParse = new URL(`http://127.0.0.1:3000${request.url}`)
        let pathname = urlParse.pathname
        if(pathname === '/' || pathname === '/index.html') {
            fs.readFile('./views/index.html', (err, data) => {
                if(err) {
                    fs.readFile('./views/404.html', (err, data) => {
                        if(err) {
                            response.end('404')
                        } else {
                            response.end(data)
                        }
                    })
                } else {
                    data = template.render(data.toString(), obj)
                    response.end(data)
                }
            })
        } else if(pathname === '/comment.html') {
            fs.readFile('./views/comment.html', (err, data) => {
                if(err) {
                    fs.readFile('./views/404.html', (err, data) => {
                        if(err) {
                            response.end('404')
                        } else {
                            response.end(data)
                        }
                    })
                } else {
                    response.end(data)
                }
            })
        } else if(pathname === '/content') {
            // 获取评论
            let comment = urlParse.searchParams.get('comment')
            // 将评论内容插入评论数组
            obj.comments.push(comment)
            // 返回状态码 302, 告诉客户端重定向
            response.statusCode = 302
            // 设置返回头，客户端重定向到 '/'
            response.setHeader('Location', '/')
            response.end()
        } else if(pathname.split('/')[1] === 'public') {
            // 公开 public 目录
            fs.readFile(`.${pathname}`, (err, data) => {
                if(err) {
                    fs.readFile('./views/404.html', (err, data) => {
                        if(err) {
                            response.end('404')
                        } else {
                            response.end(data)
                        }
                    })
                } else {
                    response.end(data)
                }
            })
        } else {
            fs.readFile('./views/404.html', (err, data) => {
                if(err) {
                    response.end('404')
                } else {
                    response.end(data)
                }
            })
        }
    })
    .listen(3000, () => {
        console.log('Listen 3000.')
    })


