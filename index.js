const { chromium } = require('playwright');
// const randomNames = ['Shadan sid', 'Faheem Ansari', 'Saher Saleem', 'Sharukh Saif']
const randomNames = ['Shadan sid',]
// const randomNames = ['Shadan sid', 'Faheem Ansari']

randomNames.forEach(element => {
    (async () => {

        const browser = await chromium.launch({ headless: false }); // Set headless: true if you don't want to see the browser
        const page = await browser.newPage();
    
        // Open the browser and navigate to the link
        await page.goto('https://app.zoom.us/wc');
    
        // Click on a particular div
        await page.click('button.btn-index-join'); // Update the selector as needed
    
        // Select a particular input tag and write a value
        await page.fill('input.join-meetingId', '802 300 1166'); // Update the selector as needed
    
        // Click on a button
        await page.click('button.btn-join'); 
        const frameElement = await page.locator('iframe#webclient').elementHandle();
    
    
    
    
             
        if (frameElement) {
            // Switch to the iframe context
            const frame = await frameElement.contentFrame();
    
            // Ensure that the frame is correctly loaded
            if (frame) {
             
                await frame.waitForSelector('input#input-for-pwd', { state: 'visible', timeout: 60000 });
                await frame.waitForSelector('input#input-for-name', { state: 'visible', timeout: 60000 });
                await frame.waitForSelector('button.zm-btn', { state: 'visible', timeout: 60000 });
                
    
                // Fill the input field inside the iframe
                await frame.fill('input#input-for-pwd', 'VEGhE9');
                 
        await frame.fill('input#input-for-name', element); 
    
        await frame.click('button.zm-btn');

        await frame.waitForSelector('button.join-audio-by-voip__join-btn', { state: 'visible', timeout: 60000 });
         
        await frame.click('button.join-audio-by-voip__join-btn');
    
    
            } else {
                console.error('Frame context could not be found.');
            }
        } else {
            console.error('Frame element with id "webclient" not found.');
        }
    
    
    
    
        // Close the browser
        // await browser.close();
    
    
    })();
    
});




