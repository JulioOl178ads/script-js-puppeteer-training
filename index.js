const puppeter = require('puppeteer');

async function main(){
    // * Iniciando Navegação
    const robot_login = 'rpa_prp@cadmus.com.br'
    const robot_password = '###'
    const browser = await launch_browser();
    let [page] = await browser.pages();

    // * Login
    await page.goto('https://help.goobee.com.br/login');
    page = await await_new_pop_up(browser, page, '//span[contains(text(), "Login com Beefor")]');
    await write(page, '//input[@formcontrolname="email"]', robot_login);
    await write(page, '//input[@formcontrolname="senha"]', robot_password);
    await click(page, '//span[contains(text(), "LOGIN")]');
    [page] = await return_first_page(browser, page);
    await wait_url_ends_with(page, '/home');

    // ! Buscando Novos Tickets
    await page.goto('https://help.goobee.com.br/gestao-solicitacoes');
    await write(page, '//input[@formcontrolname="tipoSolicitacao"]', 'RPA>')
    await click(page, '//span[contains(text(), "RPA>Criação de Acessos (OnBoarding)")]')
    await click(page, '//span[contains(text(), "Interagir")]')
    await find(page, '//input[@formcontrolname="tipo"]')
    text = await get_value(page, '//textarea[@formcontrolname="descricao"]')
    console.log(text)
    //await browser.close()
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