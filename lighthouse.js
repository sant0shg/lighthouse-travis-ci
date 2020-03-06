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

// Usage:
launchChromeAndRunLighthouse('https://techdoma.in', opts).then(results => {
  // Use results!
  fs.writeFileSync('result', JSON.stringify(results))
});