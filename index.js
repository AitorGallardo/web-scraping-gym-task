const puppeteer = require('puppeteer');

require('dotenv').config();


const url = 'https://canxaubet.poliwincloud.com/es';

async function launchAndGoToPage() {
    // some times we get 'ERR_NETWORK_CHANGED' on heroku, thats why more attempts has to be done in order to dont wait till the script runs again
        try {
            var browser = await puppeteer.launch({headless: false}); // args needed to run properly on heroku { args: ['--no-sandbox'] }
            const page = await browser.newPage();
            const mozzilla_windows_userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0';
            await page.setUserAgent(mozzilla_windows_userAgent);
            await page.goto(url);

            await page.type('[name = myusername]', process.env.USER);
            await page.type('[name = mypassword]', process.env.PASSWORD);
            await page.click('[type = submit]', {waitUntil: 'domcontentloaded'});
            await page.waitFor(1000)
            const goToReserveButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[3]/div[1]/div[4]/a';
            const openFitnessCollapsableButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[1]/div[3]/div/a'
            const goToFitnessHallButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[1]/div[4]/div/a'
            
            const reserveEl = await page.$x(goToReserveButtonXpath)
            await reserveEl[0].click()
            await page.waitFor(1000)
            const fitnessCollapsableEl = await page.$x(openFitnessCollapsableButtonXpath)
            await fitnessCollapsableEl[0].click()
            await page.waitFor(1000)
            const fitnessEl = await page.$x(goToFitnessHallButtonXpath)
            await fitnessEl[0].click()


            // await page.screenshot({
            //     path: "./screenshot.jpg",
            //     type: "jpeg",
            //     fullPage: true
            //   });
              
            console.log(propertyValue);

        } catch (err) {
            console.log(err);
        }
}


launchAndGoToPage()