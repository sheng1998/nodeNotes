const puppeteer = require('puppeteer');

(async function pa() {
    let option = {
        defaultViewport: { width: 1400, height: 600 },
        headless: true
    }
    const browser = await puppeteer.launch(option);
    const page = await browser.newPage()
    await page.goto('https://juejin.cn/')

    let navTextList = await page.$$eval('.view nav .left li a', element => {
        let navTextList = []
        element.forEach(item=> {
            navTextList.push(item.innerText)
        })
        return navTextList
    })

    console.log(navTextList)

    // 关闭浏览器
    await browser.close();
})();