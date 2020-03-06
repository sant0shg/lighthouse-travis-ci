const puppeteer = require('puppeteer');

const run = async () => {
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
  });
  const page = await browser.newPage();
  await page.goto("https://techdoma.in");
  await page.screenshot({
    path: 'techdomain.png'
  })
  // await page.pdf({
  //   path: 'techdomain.pdf', 
  //   format: 'A4'
  // })
  await browser.close();
}

run();
