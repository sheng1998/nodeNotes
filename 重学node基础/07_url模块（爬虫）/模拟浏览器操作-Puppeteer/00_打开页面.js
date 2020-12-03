const puppeteer = require('puppeteer');

(async () => {
  // puppeteer.launch() 参数是一个对象，其中有一对象名为：headless(默认为 true（无头模式）, 设置为 false 会显示打开的页面)
  // 该方法返回值是一个 promise 对象，用于启动  Chromium 实例
  const browser = await puppeteer.launch({headless: false});

  // 返回一个新的 Page 对象。Page 在一个默认的浏览器上下文中被创建。
  // 该方法返回值是一个 promise 对象，用于打开指定网页
  const page = await browser.newPage();

  // 跳转到指定页面
  await page.goto('https://www.baidu.com/');

  // 截屏
  await page.screenshot({path: 'example.png'});

  // 关闭浏览器
  await browser.close();
})();