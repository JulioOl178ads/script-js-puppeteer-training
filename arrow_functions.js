const puppeter = require('puppeteer');

// * Arrow Functions Training
module.exports = launch_browser = async (isHeadless = false) => {
    const browser = await puppeter.launch({
        headless: isHeadless,
        defaultViewport:null,
        args:['--start-maximized']
    });

    return browser;
}

module.exports = click = async (page, xpath) => {
    await page.waitForXPath(xpath)
    let element = await page.$x(xpath);
    await element[0].click();
}

module.exports = write = async (page, xpath, text) => {
    await page.waitForXPath(xpath)
    let element = await page.$x(xpath);
    await element[0].type(text);
}


module.exports = find = async (page, xpath) => {
    await page.waitForXPath(xpath)
    let element = await page.$x(xpath);
    return element;
}

module.exports = await_new_pop_up = async (browser, page, xpath) => {
    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
    await click(page, xpath);
    return await newPagePromise;
}

module.exports = navigate = async (page, url) => { return await page.page.goto(url); }

module.exports = return_first_page = async browser => { return await browser.pages() }

module.exports =  wait_url_ends_with = async (page, text) => { await page.waitForFunction("window.location.pathname == '" + text + "'"); }

module.exports = get_value = async (page, xpath) => { return await page.$eval('textarea[formcontrolname="descricao"]', ({ value }) => value); }