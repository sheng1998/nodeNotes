let fs = require('fs');
let dir = 'F:/code/web/study/小demo/相册/img'

fs.readdir(dir, (err, fileArray) => {
    if(err) {
        console.log(err)
    } else {
        fileArray.forEach((file, index) => {
            fs.rename(`${dir}/${file}`, `${dir}/${index + 1}.jpg`, err => {
                if(err) {
                    console.log(err)
                } else {
                    console.log(`${dir}/${file}重命名成功！`)
                }
            })
        })
    }
})

