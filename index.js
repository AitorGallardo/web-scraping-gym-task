const puppeteer = require('puppeteer');

require('dotenv').config();


const url = 'https://canxaubet.poliwincloud.com/es';

async function launchAndGoToPage() {
    // some times we get 'ERR_NETWORK_CHANGED' on heroku, thats why more attempts has to be done in order to dont wait till the script runs again
        try {
            var browser = await puppeteer.launch({ args: ['--no-sandbox'] }); // args needed to run properly on heroku
            const page = await browser.newPage();
            const mozzilla_windows_userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0';
            await page.setUserAgent(mozzilla_windows_userAgent);
            await page.goto(url);

            await page.type('[name = myusername]', process.env.USER);
            await page.type('[name = mypassword]', process.env.PASSWORD);
            await page.click('[type = submit]');
            await page.waitForNavigation();
            await page.screenshot({
                path: "./screenshot.jpg",
                type: "jpeg",
                fullPage: true
              });
              console.log('okey');
        } catch (err) {

        }
}


launchAndGoToPage()