const arrow_functions = require('./arrow_functions.js');
const Browser = require('./browser.js')
const puppeter = require('puppeteer');

async function main(){
    // * Iniciando Navegação com o Browser
    // * const browser = await launch_browser();
    // * let [page] = await browser.pages();

    // * Pequena Simulação
    // * await page.goto('https://www.google.com/');
    // * await write(page, '//input[@name="q"]', 'Teste Busca');
    // * await click(page, '//form/div[1]/div[1]/div[3]/center/input[1][@value="Pesquisa Google"]');
    // * await browser.close()

    const webpage = new Browser()
    // webpage.launch_browser();
}


main()