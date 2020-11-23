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
        await page.click('[type = submit]', { waitUntil: 'domcontentloaded' });
        await page.waitFor(1000)
        const goToReserveButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[3]/div[1]/div[4]/a';
        const openFitnessCollapsableButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[1]/div[3]/div/a'
        const goToFitnessHallButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[1]/div[4]/div/a'
        const goToNextDaryButtonXpath = '/html/body/div[3]/div/div/div/div[3]/div[2]/div[3]/div[3]/a'

        const reserveEl = await page.$x(goToReserveButtonXpath)
        await reserveEl[0].click()
        await page.waitFor(1000)
        const fitnessCollapsableEl = await page.$x(openFitnessCollapsableButtonXpath)
        await fitnessCollapsableEl[0].click()
        await page.waitFor(1000)
        const fitnessEl = await page.$x(goToFitnessHallButtonXpath)
        await fitnessEl[0].click()
        await page.waitFor(1000)
        // const nextDayEl = await page.$x(goToNextDaryButtonXpath)
        // await nextDayEl[0].click()
        await page.waitFor(1000)


        // $x query using an xpath expression it returns an array of 'EventHandlers'
        const linkHandlers = (await page.$x("//th[contains(text(), '11:15h a 12:00h')]"))[0];
        const example_parent = (await linkHandlers.$x('..'))[0];
        const allHourRows = await example_parent.$x('following-sibling::*');


        const hehe = await page.evaluate((sel) => {
            const arrayOfAllTableHeaders = Object.values(document.querySelectorAll(sel))
            const selectedTableHeader = arrayOfAllTableHeaders.filter(tableHeader => tableHeader.textContent.includes('20:15h'))[0]
            const selectedTableHeaderFirstRow = selectedTableHeader.parentElement
            let node = selectedTableHeaderFirstRow;
            const allTrSiblings = []
            const allTrCells = []
            while (node) {
                console.log('HOLAAAAA')
                if (node !== this && node.nodeType === Node.ELEMENT_NODE)
                allTrSiblings.push(node);
                node = node.nextElementSibling || node.nextSibling;
            }
            for(let ch of allTrSiblings){
                allTrCells.push(...ch.children)
            }
            const reservableHour = allTrCells.filter(tableCell=> tableCell.className === 'reservable')[0]

            if(reservableHour){
                const span = reservableHour.children[0]
                const a = span.children[0]
                a.click();
            }
            return allTrCells.filter(tableCell=> tableCell.className === 'reservable');
            // var xpath = "th[contains(text(), '11:15h a 12:00h')]";
            // var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
            // const node = matchingElement.parentElement
            // const resultSiblings = []
            // while ( node ) {
            //     if ( node !== this && node.nodeType === Node.ELEMENT_NODE ) 
            //     resultSiblings.push( node );
            //     node = node.nextElementSibling || node.nextSibling;
            // }
            // return resultSiblings;
        }, 'th[colspan="7"]')

        console.log('HEHE', hehe)

        // for (let hourRow of allHourRows) {
        //     const freeCellHoursInASingleRow = await hourRow.$$eval('td', allTableCell => allTableCell.map(async (tableCell) => {
        //         if (tableCell.className === 'reservable') {
        //             const span = tableCell.children[0]
        //             const a = span.children[0];
        //             a.click()
        //             setTimeout(async () => {
        //                 await page.$eval('a.boto.enviamentBtn', botoEnviament => botoEnviament.children[0].click())
        //                 //alert()
        //             }, 5000);
        //         }

        //     }));

        // }


        // await page.screenshot({
        //     path: "./screenshot.jpg",
        //     type: "jpeg",
        //     fullPage: true
        //   });


    } catch (err) {
        console.log(err);
    }
}


launchAndGoToPage()