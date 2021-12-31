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

async function launch_browser(isHeadless=false){
    const browser = await puppeter.launch({
        headless: isHeadless,
        defaultViewport:null,
        args:['--start-maximized']
    });

    return browser;
};

async function click(page, xpath)
{
    await page.waitForXPath(xpath)
    let element = await page.$x(xpath);
    await element[0].click();
};

async function write(page, xpath, text)
{
    await page.waitForXPath(xpath)
    let element = await page.$x(xpath);
    await element[0].type(text);
};

async function find(page, xpath){
    await page.waitForXPath(xpath)
    let element = await page.$x(xpath);
    return element;
};

async function await_new_pop_up(browser, page, xpath){
    const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
    await click(page, xpath);
    return await newPagePromise;
};

async function return_first_page(browser){
    return await browser.pages();

};

async function wait_url_ends_with(page, text){
    await page.waitForFunction("window.location.pathname == '" + text + "'");
};

async function get_value(page, xpath){
    return await page.$eval('textarea[formcontrolname="descricao"]', ({ value }) => value);
};

main()