let request = require('request')
let fs = require('fs')
let imgURL = []
let imgName = []

let httpURL = 'https://www.mi.com/category/list'

request.get(httpURL, (err, response, data) => {
    downImg1(data)
})

function downImg1(data) {
    let reg = /<img class="thumb"  data-src="(.*?)" src="\/\/i1.mifile.cn\/f\/i\/2014\/cn\/placeholder-40.png" width="40" height="40" alt=""><span class="text">(.*?)<\/span><\/a>/igs
    let result = data.match(reg)
    downImg2(result)
}

function downImg2(dataArray) {
    let reg1 = /data-src="(.*?)".*?<span class="text">(.*?)<\/span>/igs
    for (let i = 0; i < dataArray.length; i++) {
        dataArray[i].match(reg1)
        imgURL.push(RegExp.$1)
    }
    checkUp(imgURL)
}

function checkUp(pathArr) {
    for (let i = 0; i < pathArr.length; i++) {
        let arr = pathArr[i].split('/')
        let dir = arr[arr.length-2]
        let name = arr[arr.length-1]
        request(pathArr[i]).pipe(fs.createWriteStream(`./img/${dir}/${name}`))
    }
}

