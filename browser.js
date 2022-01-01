const puppeter = require('puppeteer');

module.exports = class Browser{
    constructor(){
        this.browser = this.launch_browser()
        //this.page = browser.pages();
    }

    launch_browser = async (isHeadless=false) => {
        const browser = puppeter.launch({
            headless: isHeadless,
            defaultViewport:null,
            args:['--start-maximized']
        });

        return browser;
    };
}