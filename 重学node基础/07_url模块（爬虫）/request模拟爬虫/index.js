let request = require('request')

let httpURL = 'https://www.mi.com/p/1915.html'

request.get(httpURL, (err, response, data) => {
    console.log(data)
})
