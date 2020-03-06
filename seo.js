const puppeteer = require('puppeteer');

const run = async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("http://localhost:8080/jspage.html");
  console.log(await page.content());
  await page.screenshot({
    path: 'jspage.png'
  })
  // await page.pdf({
  //   path: 'techdomain.pdf', 
  //   format: 'A4'
  // })
  await browser.close();
}

run();
