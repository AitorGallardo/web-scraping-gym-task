const puppeteer = require('puppeteer');

require('dotenv').config();


const url = 'https://canxaubet.poliwincloud.com/es';

// async function launchAndGoToPage() {
//     // some times we get 'ERR_NETWORK_CHANGED' on heroku, thats why more attempts has to be done in order to dont wait till the script runs again
//     try {
//         var browser = await puppeteer.launch({headless: false}); // args needed to run properly on heroku { args: ['--no-sandbox'] }
//         const page = await browser.newPage();
//         const mozzilla_windows_userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0';
//         await page.setUserAgent(mozzilla_windows_userAgent);
//         await page.goto(url);

//         async function navigateToPage(){
//             var browser = await puppeteer.launch({headless: false}); // args needed to run properly on heroku { args: ['--no-sandbox'] }
//             const page = await browser.newPage();
//             const mozzilla_windows_userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0';
//             await page.setUserAgent(mozzilla_windows_userAgent);
//             await page.goto(url);
//         }
//         async function navigateToLastPage(){

//             const goToReserveButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[3]/div[1]/div[4]/a';
//             const openFitnessCollapsableButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[1]/div[3]/div/a'
//             const goToFitnessHallButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[1]/div[4]/div/a'
//             const goToNextDayButtonXpath = '/html/body/div[3]/div/div/div/div[3]/div[2]/div[3]/div[3]/a'

//             await page.type('[name = myusername]', process.env.USER);
//             await page.type('[name = mypassword]', process.env.PASSWORD);
//             await page.click('[type = submit]', { waitUntil: 'domcontentloaded' });
//             await page.waitFor(1000)

//             const reserveEl = await page.$x(goToReserveButtonXpath)
//             await reserveEl[0].click()
//             await page.waitFor(1000)
//             const fitnessCollapsableEl = await page.$x(openFitnessCollapsableButtonXpath)
//             await fitnessCollapsableEl[0].click()
//             await page.waitFor(1000)
//             const fitnessEl = await page.$x(goToFitnessHallButtonXpath)
//             await fitnessEl[0].click()
//             await page.waitFor(1000)
//             // const nextDayEl = await page.$x(goToNextDayButtonXpath)
//             // await nextDayEl[0].click()
//             //await page.waitFor(1000)
//         }

//         await page.type('[name = myusername]', process.env.USER);
//         await page.type('[name = mypassword]', process.env.PASSWORD);
//         await page.click('[type = submit]', { waitUntil: 'domcontentloaded' });
//         await page.waitFor(1000)
//         const goToReserveButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[3]/div[1]/div[4]/a';
//         const openFitnessCollapsableButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[1]/div[3]/div/a'
//         const goToFitnessHallButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[1]/div[4]/div/a'
//         const goToNextDayButtonXpath = '/html/body/div[3]/div/div/div/div[3]/div[2]/div[3]/div[3]/a'

//         const reserveEl = await page.$x(goToReserveButtonXpath)
//         await reserveEl[0].click()
//         await page.waitFor(1000)
//         const fitnessCollapsableEl = await page.$x(openFitnessCollapsableButtonXpath)
//         await fitnessCollapsableEl[0].click()
//         await page.waitFor(1000)
//         const fitnessEl = await page.$x(goToFitnessHallButtonXpath)
//         await fitnessEl[0].click()
//         await page.waitFor(1000)
//         // const nextDayEl = await page.$x(goToNextDayButtonXpath)
//         // await nextDayEl[0].click()
//         //await page.waitFor(1000)

//         async function bookHours() {
//             const tableHeaderSelector = 'th[colspan="7"]';
//             const allAvailableHours = { 7:'07:15h a 08:00h', 
//                                         8:'08:15h a 09:00h',
//                                         9:'09:15h a 10:00h',
//                                         10:'10:15h a 11:00h',
//                                         11:'11:15h a 12:00h',
//                                         12:'12:15h a 13:00h',
//                                         13:'13:15h a 14:00h',
//                                         14:'14:15h a 15:00h',
//                                         15:'15:15h a 16:00h',
//                                         16:'16:15h a 17:00h',
//                                         17:'17:15h a 18:00h',
//                                         18:'18:15h a 19:00h',
//                                         19:'19:15h a 20:00h',
//                                         20:'20:15h a 21:00h'};
    
//             const selectedHours = [allAvailableHours[10], allAvailableHours[11]]
    
//             async function getSelectedTableHeaders(arrayOfAllTableHeaders, selectedHourInterval){
//                 return arrayOfAllTableHeaders.filter(tableHeader => tableHeader.textContent.includes(selectedHourInterval))
//             }
    
//             async function getFirstReservableHourOfATable(selectedTableHeader){
//                 const selectedTableHeaderFirstRow = selectedTableHeader.parentElement
//                 let node = selectedTableHeaderFirstRow;
//                 const allTrSiblings = []
//                 const allTd = []
//                 while (node) {
//                     if (node !== this && node.nodeType === Node.ELEMENT_NODE)
//                     allTrSiblings.push(node);
//                     node = node.nextElementSibling || node.nextSibling;
//                 }
//                 for(let tr of allTrSiblings){
//                     allTd.push(...tr.children)
//                 }
//                 return allTd.filter(tableCell=> tableCell.className === 'reservable')[0]
//             }
    
//             function reserveHour(reservableHour){
//                 const span = reservableHour.children[0]
//                 const a = span.children[0]
//                 a.click();
//                 setTimeout(() => {
//                     document.querySelector('a.boto.enviamentBtn').click()           
//                 }, 1000);
//             }
    
//             await page.evaluate(async(selector,selectedHours) => {
//                 const arrayOfAllTableHeaders = Object.values(document.querySelectorAll(selector))
//                     if(selectedHours.length > 1){
//                         // Table Header has to be found by his content. Ex => '20:15h a 21:00h'
//                         const [tableHeader, tableHeader2] = await getSelectedTableHeaders(arrayOfAllTableHeaders,selectedHours);
//                         // We Navigate throw DOM tree getting parent element of th=> tr ,then all his siblings and then we filter all the sibling children that are table cells to find the ones that has 'reservable' className on it
//                         const firstReservableHour = await getFirstReservableHourOfATable(tableHeader);
//                         reserveHour(firstReservableHour)
//                         const secondReservableHour = await getFirstReservableHourOfATable(tableHeader2);
//                         reserveHour(secondReservableHour)
//                     }else{
//                         const [tableHeader] = await getSelectedTableHeaders(arrayOfAllTableHeaders,selectedHours);
//                         const firstReservableHour = await getFirstReservableHourOfATable(tableHeader);
//                         reserveHour(firstReservableHour)
//                     }
//                 // const selectedTableHeader = arrayOfAllTableHeaders.filter(tableHeader => tableHeader.textContent.includes(selectedHour))[0]
//                 // const selectedTableHeaderFirstRow = selectedTableHeader.parentElement
//                 // let node = selectedTableHeaderFirstRow;
//                 // const allTrSiblings = []
//                 // const allTd = []
//                 // while (node) {
//                 //     if (node !== this && node.nodeType === Node.ELEMENT_NODE)
//                 //     allTrSiblings.push(node);
//                 //     node = node.nextElementSibling || node.nextSibling;
//                 // }
//                 // for(let tr of allTrSiblings){
//                 //     allTd.push(...tr.children)
//                 // }
//                 // const reservableHour = allTd.filter(tableCell=> tableCell.className === 'reservable')[0]
    
//                 // if(reservableHour){
//                 //     const span = reservableHour.children[0]
//                 //     const a = span.children[0]
//                 //     a.click();
//                 //     setTimeout(() => {
//                 //         document.querySelector('a.boto.enviamentBtn').click()           
//                 //     }, 1000);
    
//                 // }
//             }, tableHeaderSelector,selectedHours)
//         }

//         const tableHeaderSelector = 'th[colspan="7"]';
//         const allAvailableHours = { 7:'07:15h a 08:00h', 
//                                     8:'08:15h a 09:00h',
//                                     9:'09:15h a 10:00h',
//                                     10:'10:15h a 11:00h',
//                                     11:'11:15h a 12:00h',
//                                     12:'12:15h a 13:00h',
//                                     13:'13:15h a 14:00h',
//                                     14:'14:15h a 15:00h',
//                                     15:'15:15h a 16:00h',
//                                     16:'16:15h a 17:00h',
//                                     17:'17:15h a 18:00h',
//                                     18:'18:15h a 19:00h',
//                                     19:'19:15h a 20:00h',
//                                     20:'20:15h a 21:00h'};

//         const selectedHours = [allAvailableHours[10], allAvailableHours[11]]

//         async function getSelectedTableHeaders(arrayOfAllTableHeaders, selectedHourInterval){
//             return arrayOfAllTableHeaders.filter(tableHeader => tableHeader.textContent.includes(selectedHourInterval))
//         }

//         async function getFirstReservableHourOfATable(selectedTableHeader){
//             const selectedTableHeaderFirstRow = selectedTableHeader.parentElement
//             let node = selectedTableHeaderFirstRow;
//             const allTrSiblings = []
//             const allTd = []
//             while (node) {
//                 if (node !== this && node.nodeType === Node.ELEMENT_NODE)
//                 allTrSiblings.push(node);
//                 node = node.nextElementSibling || node.nextSibling;
//             }
//             for(let tr of allTrSiblings){
//                 allTd.push(...tr.children)
//             }
//             return allTd.filter(tableCell=> tableCell.className === 'reservable')[0]
//         }

//         function reserveHour(reservableHour){
//             const span = reservableHour.children[0]
//             const a = span.children[0]
//             a.click();
//             setTimeout(() => {
//                 document.querySelector('a.boto.enviamentBtn').click()           
//             }, 1000);
//         }

//         await page.evaluate(async(selector,selectedHours) => {
//             const arrayOfAllTableHeaders = Object.values(document.querySelectorAll(selector))
//                 if(selectedHours.length > 1){
//                     // Table Header has to be found by his content. Ex => '20:15h a 21:00h'
//                     const [tableHeader, tableHeader2] = await getSelectedTableHeaders(arrayOfAllTableHeaders,selectedHours);
//                     // We Navigate throw DOM tree getting parent element of th=> tr ,then all his siblings and then we filter all the sibling children that are table cells to find the ones that has 'reservable' className on it
//                     const firstReservableHour = await getFirstReservableHourOfATable(tableHeader);
//                     reserveHour(firstReservableHour)
//                     const secondReservableHour = await getFirstReservableHourOfATable(tableHeader2);
//                     reserveHour(secondReservableHour)
//                 }else{
//                     const [tableHeader] = await getSelectedTableHeaders(arrayOfAllTableHeaders,selectedHours);
//                     const firstReservableHour = await getFirstReservableHourOfATable(tableHeader);
//                     reserveHour(firstReservableHour)
//                 }
//             // const selectedTableHeader = arrayOfAllTableHeaders.filter(tableHeader => tableHeader.textContent.includes(selectedHour))[0]
//             // const selectedTableHeaderFirstRow = selectedTableHeader.parentElement
//             // let node = selectedTableHeaderFirstRow;
//             // const allTrSiblings = []
//             // const allTd = []
//             // while (node) {
//             //     if (node !== this && node.nodeType === Node.ELEMENT_NODE)
//             //     allTrSiblings.push(node);
//             //     node = node.nextElementSibling || node.nextSibling;
//             // }
//             // for(let tr of allTrSiblings){
//             //     allTd.push(...tr.children)
//             // }
//             // const reservableHour = allTd.filter(tableCell=> tableCell.className === 'reservable')[0]

//             // if(reservableHour){
//             //     const span = reservableHour.children[0]
//             //     const a = span.children[0]
//             //     a.click();
//             //     setTimeout(() => {
//             //         document.querySelector('a.boto.enviamentBtn').click()           
//             //     }, 1000);

//             // }
//         }, tableHeaderSelector,selectedHours)

//         // await page.screenshot({
//         //     path: "./screenshot.jpg",
//         //     type: "jpeg",
//         //     fullPage: true
//         //   });


//     } catch (err) {
//         console.log(err);
//     }
//}


////////


async function launchPageFragmented(){
    try{
        let browser = null;
        let page = null;
        async function navigateToPage(){
            browser = await puppeteer.launch({headless: false}); // args needed to run properly on heroku { args: ['--no-sandbox'] }
            page = await browser.newPage();
            const mozzilla_windows_userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:82.0) Gecko/20100101 Firefox/82.0';
            await page.setUserAgent(mozzilla_windows_userAgent);
            await page.goto(url);
        }
        async function navigateToLastPage(){

            const goToReserveButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[3]/div[1]/div[4]/a';
            const openFitnessCollapsableButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[1]/div[3]/div/a'
            const goToFitnessHallButtonXpath = '/html/body/div[3]/div/div/div/div[2]/div[1]/div[4]/div/a'
            const goToNextDayButtonXpath = '/html/body/div[3]/div/div/div/div[3]/div[2]/div[3]/div[3]/a'

            await page.type('[name = myusername]', process.env.USER);
            await page.type('[name = mypassword]', process.env.PASSWORD);
            await page.click('[type = submit]', { waitUntil: 'domcontentloaded' });
            await page.waitFor(1000)

            const reserveEl = await page.$x(goToReserveButtonXpath)
            await reserveEl[0].click()
            await page.waitFor(1000)
            const fitnessCollapsableEl = await page.$x(openFitnessCollapsableButtonXpath)
            await fitnessCollapsableEl[0].click()
            await page.waitFor(1000)
            const fitnessEl = await page.$x(goToFitnessHallButtonXpath)
            await fitnessEl[0].click()
            await page.waitFor(1000)
            const nextDayEl = await page.$x(goToNextDayButtonXpath)
            await nextDayEl[0].click()
            await page.waitFor(1000)
        }

        async function bookHours() {
            const tableHeaderSelector = 'th[colspan="7"]';
            const allAvailableHours = { 7:'07:15h a 08:00h', 
                                        8:'08:15h a 09:00h',
                                        9:'09:15h a 10:00h',
                                        10:'10:15h a 11:00h',
                                        11:'11:15h a 12:00h',
                                        12:'12:15h a 13:00h',
                                        13:'13:15h a 14:00h',
                                        14:'14:15h a 15:00h',
                                        15:'15:15h a 16:00h',
                                        16:'16:15h a 17:00h',
                                        17:'17:15h a 18:00h',
                                        18:'18:15h a 19:00h',
                                        19:'19:15h a 20:00h',
                                        20:'20:15h a 21:00h'};
    
            const selectedHours = [allAvailableHours[10]] //allAvailableHours[11]
    

    
            await page.evaluate(async(selector,selectedHours) => {
                const arrayOfAllTableHeaders = Object.values(document.querySelectorAll(selector))
                var closeButtonModal = null;
                    if(selectedHours.length > 1){
                        // Table Header has to be found by his content. Ex => '20:15h a 21:00h'
                        const [tableHeader, tableHeader2] = await getSelectedTableHeaders(arrayOfAllTableHeaders,selectedHours);
                        // We Navigate throw DOM tree getting parent element of th=> tr ,then all his siblings and then we filter all the sibling children that are table cells to find the ones that has 'reservable' className on it
                        const firstReservableHour = await getFirstReservableHourOfATable(tableHeader);
                        reserveHour(firstReservableHour)
                        const secondReservableHour = await getFirstReservableHourOfATable(tableHeader2);
                        reserveHour(secondReservableHour)
                    }else{
                        const [tableHeader] = await getSelectedTableHeaders(arrayOfAllTableHeaders,selectedHours);
                        const firstReservableHour = await getFirstReservableHourOfATable(tableHeader);
                        reserveHour(firstReservableHour)
                    }


                    async function getSelectedTableHeaders(arrayOfAllTableHeaders, selectedHourInterval){
                        return arrayOfAllTableHeaders.filter(tableHeader => tableHeader.textContent.includes(selectedHourInterval))
                    }
            
                    async function getFirstReservableHourOfATable(selectedTableHeader){
                        const selectedTableHeaderFirstRow = selectedTableHeader.parentElement
                        let node = selectedTableHeaderFirstRow;
                        const allTrSiblings = []
                        const allTd = []
                        while (node) {
                            if (node !== this && node.nodeType === Node.ELEMENT_NODE)
                            allTrSiblings.push(node);
                            node = node.nextElementSibling || node.nextSibling;
                        }
                        for(let tr of allTrSiblings){
                            allTd.push(...tr.children)
                        }
                        return allTd.filter(tableCell=> tableCell.className === 'reservable')[0]
                    }
            
                    function reserveHour(reservableHour){
                        const span = reservableHour.children[0]
                        const a = span.children[0]
                        a.click();
                        setTimeout(() => {
                            document.querySelector('a.boto.enviamentBtn').click()      
                            closeButtonModal = document.querySelector('#Tancar')
                            closePopUP()   
                        }, 1000);

                    }
                    
                    function closePopUP() {
                        let dataTable = document.querySelector('#dades-reserva') //Showed in the first part of the booking pop up process, when it disappears its time to close the pop-up
                        if (dataTable) {
                            setTimeout(closePopUP, 3000);
                        }else{
                            // There is a delay doing the booking while we cannot click close, thats why multiple click are recreated
                            let clicked = false;
                            closeButtonModal.addEventListener("click", ()=>clicked = true)
                            while(clicked===false){
                                closeButtonModal.click()
                            }
                        }
                    }
                    
                    



            }, tableHeaderSelector,selectedHours)
        }

        await navigateToPage()
        await navigateToLastPage()
        await bookHours()

    }catch(err){
        console.log(err)
    }

}


//launchAndGoToPage()
launchPageFragmented()