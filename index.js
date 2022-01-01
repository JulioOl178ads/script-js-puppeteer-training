const puppeter = require('puppeteer');

async function main(){
    // * Iniciando Navegação com o Browser
    const browser = await launch_browser();
    let [page] = await browser.pages();

    // * Pequena Simulação
    await page.goto('https://www.google.com/');
    await write(page, '//input[@name="q"]', 'Teste Busca');
    await click(page, '//form/div[1]/div[1]/div[3]/center/input[1][@value="Pesquisa Google"]');
    // * await browser.close()
}

// * Arrow Functions Training
const launch_browser = async (isHeadless = false) => {
    const browser = await puppeter.launch({
        headless: isHeadless,
        defaultViewport:null,
        args:['--start-maximized']
    });

    return browser;
}

const click = async (page, xpath) => {
    await page.waitForXPath(xpath)
    let element = await page.$x(xpath);
    await element[0].click();
}

const write = async (page, xpath, text) => {
    await page.waitForXPath(xpath)
    let element = await page.$x(xpath);
    await element[0].type(text);
}


const find = async (page, xpath) => {
    await page.waitForXPath(xpath)
    let element = await page.$x(xpath);
    return element;
}

const await_new_pop_up = async (browser, page, xpath) => {
    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
    await click(page, xpath);
    return await newPagePromise;
}

const return_first_page = async browser => { return await browser.pages() }

const wait_url_ends_with = async (page, text) => { await page.waitForFunction("window.location.pathname == '" + text + "'"); }

const get_value = async (page, xpath) => { return await page.$eval('textarea[formcontrolname="descricao"]', ({ value }) => value); }

main()