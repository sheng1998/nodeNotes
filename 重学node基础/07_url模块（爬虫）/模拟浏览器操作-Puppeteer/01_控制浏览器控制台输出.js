const puppeteer = require('puppeteer');

(async () => {
    let option = {
        // 设置视窗宽高
        defaultViewport: {
            width: 1400,
            height: 1200
        },
        // 设置为有界面（默认为 true，没有界面）
        headless: false
        // headless: true
    }
    const browser = await puppeteer.launch(option);
    const page = await browser.newPage()
    await page.goto('https://juejin.cn/')

    // let test = await page.$('.view-nav .nav-list li a')
    // console.log(test) // 打印结点信息

    // 该函数的回调函数会在浏览器中执行
    await page.$eval('.view-nav .nav-list li a', element => {
        console.log(element)
    })

    // page.$$eval(selector, pageFunction[, ...args]) 该函数的回调函数 pageFunction 会在浏览器中执行
    page.$$eval('.view-nav .nav-list li a', element => {
        element.forEach((item, i) => {
            console.log(item.innerText)
        })
    })

    // 该方法监听浏览器输出
    page.on('console', (...arg) => {
        arg.forEach(item => {
            console.log(item._text)
        })
    })

    // 关闭浏览器
    // await browser.close();
})();
