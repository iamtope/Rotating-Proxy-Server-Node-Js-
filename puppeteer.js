// The script here launches the website in chrome browser
// run node puppeteer.js
const puppeteer = require('puppeteer');

(async () => {
    // set some options (set headless to false so we can see 
    // this automated browsing experience)
    let launchOptions = { headless: false, 
                          args: ['--start-maximized',
                                 '-proxy-server=http://1.186.242.12:39098'] // this is where we set the proxy
                        };

    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();

    // set viewport and user agent (just in case for nice viewing)
    await page.setViewport({width: 1366, height: 768});
    await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');

   
    // go to the required website
    await page.goto('https://www.google.com/');
})();