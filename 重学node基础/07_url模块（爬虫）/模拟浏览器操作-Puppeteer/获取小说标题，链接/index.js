const puppeteer = require('puppeteer');
let fs = require('fs');

;(async () => {
    const browser = await puppeteer.launch({headless:false})
    let page = await browser.newPage()
    await page.goto('https://sobooks.cc/xiaoshuowenxue')
    let totalPage = await page.$eval('.content-wrap .pagination ul li:last-child span', element => {
        let totalPage = element.innerText.split(' ')[1]
        return totalPage
    })
    for (let index = 1; index <= totalPage; index++) {
        let timeout = 5000*index - 5000
        setTimeout(() => {
            newPage(index)
        }, timeout);
    }
    // newPage(20)
    async function newPage(num) {
        let page = await browser.newPage()
        await page.goto('https://sobooks.cc/xiaoshuowenxue/page/' + num)
        console.log(`页面https://sobooks.cc/xiaoshuowenxue/page/${num}打开成功！`)

        let storyList = await page.$$eval('#cardslist .card .card-item', element => {
            let storyList = []
            element.forEach((item, i) => {
                let obj = {
                    title: item.querySelector('h3 a').getAttribute('title'),
                    href: item.querySelector('h3 a').getAttribute('href'),
                    author: item.querySelector('p a').innerText
                }
                storyList.push(obj)
            })
            return storyList
        })

        await fs.promises.writeFile(`./test/page${num}.json`, JSON.stringify(storyList))
        console.log(`第${num}页的内容写入成功！`)
        await page.close()
        console.log(`页面https://sobooks.cc/xiaoshuowenxue/page/${num}成功关闭！`)
    }
})();
