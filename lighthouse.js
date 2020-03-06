const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      return chrome.kill().then(() => results.lhr)
    });
  });
}

const opts = {
  chromeFlags: ['--show-paint-rects', '--headless'],
  onlyCategories: ['performance']
};

const validMetrics = {
  'first-contentful-paint': 0.65
}
// Usage:
launchChromeAndRunLighthouse('https://techdoma.in', opts).then(results => {
  // Use results!
  const keys = Object.keys(validMetrics);
  keys.forEach(key => {
    const audit = results.audits[key];
    if(validMetrics[key] <= audit.score){
      return -1;
    }
  });
  return 0;
  // fs.writeFileSync('result', JSON.stringify(results))
});