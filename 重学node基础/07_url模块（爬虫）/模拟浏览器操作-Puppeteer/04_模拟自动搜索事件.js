const puppeteer = require('puppeteer');

(async () => {
    let browser = await puppeteer.launch({headless:false})
    let page = await browser.newPage()
    await page.goto('https://juejin.cn/', {timeout: 0})
    
    // 获取搜索框节点
    let searchInput = await page.$('.search form[role="search"] input')
    // 搜索框获取焦点
    await searchInput.focus()
    // 输入搜索内容
    await searchInput.type('node')
    // 在输入框处点击回车键进行搜索或者点击搜索按钮进行搜索
    // await searchInput.press('Enter')
    // 获取搜索按钮
    let searchButton =  await page.$('.search form[role="search"] img')
    // 点击搜索按钮
    await searchButton.click()
})();