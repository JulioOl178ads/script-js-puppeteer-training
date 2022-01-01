const puppeter = require('puppeteer');

class Browser{
    constructor(isHeadless){
        this.browser = await this.launch_browser(isHeadless)
        this.page = await browser.pages();
    }

    async launch_browser(isHeadless=false){
        const browser = await puppeter.launch({
            headless: isHeadless,
            defaultViewport:null,
            args:['--start-maximized']
        });

        return browser;
    };



}

const launch_browser = async (isHeadless) => {
    const browser = await puppeter.launch({
        headless: isHeadless,
        defaultViewport:null,
        args:['--start-maximized']
    });

    return browser;
}