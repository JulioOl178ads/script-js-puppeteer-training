const puppeter = require('puppeteer');

module.exports = class Browser{
    constructor(browser, page){
        this.browser = browser;
        this.page = page;
    }

    // * Browser manipulation
    navigate = async(url) => {
        this.page.goto(url);
    }

    wait_url_ends_with = async (text) => { await this.page.waitForFunction("window.location.pathname == '" + text + "'"); }

    await_new_pop_up = async (xpath) => {
        const newPagePromise = new Promise(x => this.browser.once('targetcreated', target => x(target.page())));
        await click(this.page, xpath);
        return await newPagePromise;
    }

    // * Page Commands
    write = async (xpath, text) => {
        await this.page.waitForXPath(xpath)
        let element = await this.page.$x(xpath);
        Promise.resolve(await element[0].type(text));
    }

    click = async (xpath) => {
        await this.page.waitForXPath(xpath)
        let element = await this.page.$x(xpath);
        Promise.resolve(await element[0].click());
    }


}