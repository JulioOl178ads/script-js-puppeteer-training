const arrow_functions = require('./arrow_functions.js');
const Browser = require('./browser.js')
const puppeter = require('puppeteer');

async function main(){
    // * Iniciando Navegação com o Browser
    const browser = await launch_browser();
    const [page] = await browser.pages();
    let webpage = new Browser(browser, page)
    webpage.navigate('https://www.google.com')
    webpage.write('//input[@name="q"]', 'Teste Busca');
    webpage.click('//form/div[1]/div[1]/div[3]/center/input[1][@value="Pesquisa Google"]');
    webpage.close();

}


main()