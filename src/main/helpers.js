import winHandler from './mainWindow'
import { app } from 'electron'
var fs = require('fs-extra')

function tryIPO(companies_no_stocks, companies_factory, stocks) {
  
    for (let i = 0; i < companies_no_stocks.length; i++) {

    const company = companies_no_stocks[i]

    let res = company.ipo()
    
        if (res) {
            
            companies_no_stocks.splice(i, 1)
            companies_factory.sendCompanies()
            
            winHandler.browserWindow.webContents.send('stocks-reply', stocks) // обновляем колво компаний биржам
        }
    }
}
  
function checkFiles() {
  
    const dir = `${app.getPath('documents')}\\Market Stock`
    const companies = `${app.getPath('documents')}\\Market Stock\\companies.json`
    const stocks = `${app.getPath('documents')}\\Market Stock\\stocks.json`
    const traders = `${app.getPath('documents')}\\Market Stock\\traders.json`
    const user = `${app.getPath('documents')}\\Market Stock\\user.json`

    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir)
    }

    if (!fs.existsSync(stocks)) {
        fs.writeJSONSync(stocks, [])
    } 

    if (!fs.existsSync(companies)) {
        fs.writeJSONSync(companies, [])
    } 

    if (!fs.existsSync(traders)) {
        fs.writeJSONSync(traders, [])
    }

    if (!fs.existsSync(user)) {
        fs.writeJSONSync(user, [])
    } 
  
}

export { tryIPO, checkFiles }