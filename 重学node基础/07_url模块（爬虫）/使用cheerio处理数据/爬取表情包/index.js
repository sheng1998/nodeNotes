let axios = require('axios')
let cheerio = require('cheerio')
let fs = require('fs');

let httpURL = 'https://fabiaoqing.com/bqb/lists/type/liaomei.html'

axios.get(httpURL).then(res => {
    let $ = cheerio.load(res.data)
    $('#container .ui .right .bqba').each((i, element) => {
        let url = $(element).attr('href')
        let dir = $(element).find('.header').text()
        downImg(dir, `https://fabiaoqing.com${url}`)
    })
}).catch(err => {
    console.log('出现异常！')
})

// axios.get('https://fabiaoqing.com/search/bqb/keyword/%E5%8D%B0%E5%B0%BC%E5%B0%8F%E8%83%96tantan/type/bq/page/1.html').then(res => {
//     let $ = cheerio.load(res.data)
//     let dir = '印尼小胖tantan'
//     $('#container .right .searchbqppdiv .bqppsearch').each((i, element) => {
//         let imgURL = $(element).attr('data-original')
//         let arr = imgURL.split('/')
//         let name = arr[arr.length -1]
//         let ws = fs.createWriteStream(`./img/${dir}/${name}`)
//         axios.get(imgURL, {responseType: 'stream'}).then(res => {
//             res.data.pipe(ws)
//             console.log(`图片./img/${dir}/${name}下载成功！`)
//             res.data.on('close', () => {
//                 ws.close()
//             })
//         }).catch(err => {
//             console.log('err')
//         }) 
//     })
// }).catch(err => {
//     console.log('err')
// })

async function downImg(dir, url) {
    console.log(dir, url)
    try {
        await fs.promises.mkdir(`./img/${dir}`)
    } catch (error) {
        console.log('err')
    }
    axios.get(url).then(res => {
        let $ = cheerio.load(res.data)
        $('#container .right .image .swiper-wrapper .bqbppdetail').each((i, element) => {
            let imgURL = $(element).attr('data-original')
            let arr = imgURL.split('/')
            let name = arr[arr.length -1]
            let ws = fs.createWriteStream(`./img/${dir}/${name}`)
            axios.get(imgURL, {responseType: 'stream'}).then(res => {
                res.data.pipe(ws)
                console.log(`图片./img/${dir}/${name}下载成功！`)
                res.data.on('close', () => {
                    ws.close()
                })
            }).catch(err => {
                console.log('err')
            }) 
        })
    }).catch(err => {
        console.log('err')
    })
}
