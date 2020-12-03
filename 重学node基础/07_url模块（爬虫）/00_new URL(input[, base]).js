let url = require('url')

let myURL = new URL('https://abc:xyz@sheng.com:8888#zhuang?age=22&sex=1/');
console.log(myURL)
// URL {
//     href: 'https://abc:xyz@sheng.com:8888/#zhuang?age=22&sex=1/',
//     origin: 'https://sheng.com:8888',
//     protocol: 'https:',
//     username: 'abc',
//     password: 'xyz',
//     host: 'sheng.com:8888',
//     hostname: 'sheng.com',
//     port: '8888',
//     pathname: '/',
//     search: '',
//     searchParams: URLSearchParams {},
//     hash: '#zhuang?age=22&sex=1/'
// }