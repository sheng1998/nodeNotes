const puppeteer = require('puppeteer');

(async () => {
    let option = {
        defaultViewport: { width: 1400, height: 600 },
        headless: false
    }
    const browser = await puppeteer.launch(option);
    const page = await browser.newPage()
    await page.goto('https://juejin.cn/')

    // 获取导航栏节点
    let qianduans = await page.$$('.view-nav .nav-list .nav-item')
    // 模仿点击单航栏的第三个按钮（前端选项）
    await qianduans[2].click()

    // 等待标题加载出来，点击第二个标题进去读取内容
    await page.waitForSelector('.title[data-v-fb352c32]')
    let title = await page.$$('.title[data-v-fb352c32]')
    await title[1].click()

    // 关闭浏览器
    // await browser.close();
})();