let axios = require('axios')
const iconv = require('iconv-lite'); // 解决乱码插件

let httpURL = 'https://www.ygdy8.com/index.html'
// let httpURL = 'https://www.1905.com'

axios.get(httpURL, {
    responseType:'arraybuffer'
}).then(response => {
    let str = iconv.decode(Buffer.from(response.data), 'gb2312');
    // let str = iconv.decode(Buffer.from(response.data), 'utf8');
    let html = iconv.encode(str, 'utf8').toString();
    console.log(html)
    // fs.writeFile('test.html', data.toString(), {flag: 'w', encoding: 'utf-8'}, err => {})
})

