const puppeteer = require('puppeteer');

require('dotenv').config();


const url = 'https://canxaubet.poliwincloud.com/es';

async function launchAndGoToPage() {
    try {

        await navigateToPage()
        await navigateToLastPage()
        //await bookHours()

        var browser = null;
        var page = null;
        async function navigateToPage() {
            browser = await puppeteer.launch({ headless: false }); // args needed to run properly on heroku { args: ['--no-sandbox'] }
            page = await browser.newPage();
            const mozzilla_windows_userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0';
            await page.setUserAgent(mozzilla_windows_userAgent);
            await page.goto(url);
        }
        async function navigateToLastPage() {
            try {
                await login()
                
                await firstStep()               
                await secondStep()               
                await thirdStep()
                await page.waitFor(1000)
                await fourthStep()
                

                async function login() {
                    const maxTries = 5;
                    for (let tries = 0; tries < maxTries; tries++)
                        try {
                            await page.type('[name = myusername]', process.env.USER);
                            await page.type('[name = mypassword]', process.env.PASSWORD);
                            await page.click('[type = submit]', { waitUntil: 'domcontentloaded' });
                            break;
                        } catch (err) {
                            console.log(`loginERROR..Try_n: ${tries}..retrying_function=>`, err)
                            if (tries === maxTries - 1)
                                console.log(`loginERROR..MAX_TRIES_REACHED..skyping_function=>`, err)
                        }
                }
                async function firstStep() {
                    const maxTries = 5;
                    for (let tries = 0; tries < maxTries; tries++)
                        try {
                            const goToReserveButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[3]/div[1]/div[4]/a';
                            await page.waitForXPath(goToReserveButtonXpath)
                            const reserveEl = await page.$x(goToReserveButtonXpath)
                            await reserveEl[0].click()
                            break;
                        } catch (err) {
                            console.log(`firstStepERROR..Try_n: ${tries}..retrying_function=>`, err)
                            if (tries === maxTries - 1)
                                console.log(`firstStepERROR..MAX_TRIES_REACHED..skyping_function=>`, err)
                        }
                }
                async function secondStep() {
                    const maxTries = 5;
                    for (let tries = 0; tries < maxTries; tries++)
                        try {
                            const openFitnessCollapsableButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[1]/div[3]/div/a'
                            await page.waitForXPath(openFitnessCollapsableButtonXpath)
                            const fitnessCollapsableEl = await page.$x(openFitnessCollapsableButtonXpath)
                            await fitnessCollapsableEl[0].click()
                            break;
                        } catch (err) {
                            console.log(`secondStepERROR..Try_n: ${tries}..retrying_function=>`, err)
                            if (tries === maxTries - 1)
                                console.log(`secondStepERROR..MAX_TRIES_REACHED..skyping_function=>`, err)
                        }
                }
                async function thirdStep() {
                    const maxTries = 5;
                    for (let tries = 0; tries < maxTries; tries++)
                        try {
                            const goToFitnessHallHyperLinkXpath = '/html/body/div[3]/div/div/div/div[2]/div[1]/div[4]/div/a'
                            await page.waitFor(1000)
                            const fitnessEl = await page.$x(goToFitnessHallHyperLinkXpath)
                            await fitnessEl[0].click()
                            break;
                        } catch (err) {
                            console.log(`thirdStepERROR..Try_n: ${tries}..retrying_function=>`, err)
                            if (tries === maxTries - 1)
                                console.log(`thirdStepERROR..MAX_TRIES_REACHED..skyping_function=>`, err)
                        }
                }
                async function fourthStep() {
                    const maxTries = 10;
                    for (let tries = 0; tries < maxTries; tries++)
                        try {
                            const goToNextDayButtonXpath = '/html/body/div[3]/div/div/div/div[3]/div[2]/div[3]/div[3]/a'
                            await page.waitForXPath(goToNextDayButtonXpath)
                            const nextDayEl = await page.$x(goToNextDayButtonXpath)
                            await nextDayEl[0].click()
                            break;
                        } catch (err) {
                            console.log(`fourthStepStepERROR..Try_n: ${tries}..retrying_function=>`, err)
                            if (tries === maxTries - 1)
                                console.log(`fourthStepStepERROR..MAX_TRIES_REACHED..skyping_function=>`, err)
                        }
                }

            } catch (err) {
                console.log(`navigateToLasPageERROR..Try_n: ${tries}..retrying_function=>`, err)
            }

        }

        async function bookHours() {
            const tableHeaderSelector = 'th[colspan="7"]';
            const allAvailableHours = {
                7: '07:15h a 08:00h',
                8: '08:15h a 09:00h',
                9: '09:15h a 10:00h',
                10: '10:15h a 11:00h',
                11: '11:15h a 12:00h',
                12: '12:15h a 13:00h',
                13: '13:15h a 14:00h',
                14: '14:15h a 15:00h',
                15: '15:15h a 16:00h',
                16: '16:15h a 17:00h',
                17: '17:15h a 18:00h',
                18: '18:15h a 19:00h',
                19: '19:15h a 20:00h',
                20: '20:15h a 21:00h'
            };

            const selectedHours = [allAvailableHours[10], allAvailableHours[11]]



            await page.evaluate(async (selector, selectedHours) => {
                const arrayOfAllTableHeaders = Object.values(document.querySelectorAll(selector))
                var closeButtonModal = null;
                if (selectedHours.length > 1) {
                    // Table Header has to be found by his content. Ex => '20:15h a 21:00h'
                    const [tableHeader, tableHeader2] = await getSelectedTableHeaders(arrayOfAllTableHeaders, selectedHours);
                    // We Navigate throw DOM tree getting parent element of th=> tr ,then all his siblings and then we filter all the sibling children that are table cells to find the ones that has 'reservable' className on it
                    const firstReservableHour = await getFirstReservableHourOfATable(tableHeader);
                    if(firstReservableHour){
                        reserveHour(firstReservableHour)
                    }else{
                        console.log('There is not available hour to book at ', selectedHours[0])
                    }
                    
                    setTimeout(async () => {
                        const secondReservableHour = await getFirstReservableHourOfATable(tableHeader2);
                        if(secondReservableHour){
                            reserveHour(secondReservableHour)
                        }else{
                            console.log('There is not available hour to book at ', selectedHours[1])
                        }
                        reserveHour(secondReservableHour)
                    }, 10000);

                } else {
                    const [tableHeader] = await getSelectedTableHeaders(arrayOfAllTableHeaders, selectedHours);
                    const firstReservableHour = await getFirstReservableHourOfATable(tableHeader);
                    if(firstReservableHour){
                        reserveHour(firstReservableHour)
                    }else{
                        console.log('There is not available hour to book at ', selectedHours[0])
                    }
                }


                async function getSelectedTableHeaders(arrayOfAllTableHeaders, selectedHourInterval) {
                    return arrayOfAllTableHeaders.filter(tableHeader => tableHeader.textContent.includes(selectedHourInterval[0]) || tableHeader.textContent.includes(selectedHourInterval[1]))
                }

                async function getFirstReservableHourOfATable(selectedTableHeader) {
                    const selectedTableHeaderFirstRow = selectedTableHeader.parentElement
                    let node = selectedTableHeaderFirstRow;
                    const allTrSiblings = []
                    const allTd = []
                    while (node) {
                        if (node !== this && node.nodeType === Node.ELEMENT_NODE)
                            allTrSiblings.push(node);
                        node = node.nextElementSibling || node.nextSibling;
                    }
                    for (let tr of allTrSiblings) {
                        allTd.push(...tr.children)
                    }
                    return allTd.filter(tableCell => tableCell.className === 'reservable')[0]
                }

                function reserveHour(reservableHour) {
                    const span = reservableHour.children[0]
                    const a = span.children[0]
                    a.click();
                    setTimeout(() => {
                        const bookButton = document.querySelector('a.boto.enviamentBtn')
                        bookButton.click()
                        closeButtonModal = document.querySelector('#Tancar')
                        //closePopUP()
                    }, 1000);

                }

                function closePopUP() {
                    let dataTable = document.querySelector('#dades-reserva') //Showed in the first part of the booking pop up process, when it disappears its time to close the pop-up
                    console.log('WHAT HAPPENS',dataTable)
                    if (dataTable) {
                        setTimeout(closePopUP, 3000);
                    } else {
                        // There is a delay doing the booking while we cannot click close, thats why multiple click are recreated
                        let clicked = false;

                        function endClickListener(event) {
                            clicked = true
                            closeButtonModal.removeEventListener('click', endClickListener);
                        }
                        closeButtonModal.addEventListener("click", endClickListener)
                        while (clicked === false) {
                            closeButtonModal.click()
                        }
                    }
                }





            }, tableHeaderSelector, selectedHours)
        }
    } catch (err) {
        console.log(err)
    }

}

launchAndGoToPage()