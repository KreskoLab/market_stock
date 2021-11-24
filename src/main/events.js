import { ipcMain } from 'electron'
import { stocks, companies, time, user  } from './setup'
import winHandler from './mainWindow'

ipcMain.on('stocks-request', (event, arg) => {
    event.reply('stocks-reply', stocks)
})

ipcMain.on('user-stock-request', (event, arg) => {
    user.updateStock(arg)
    event.reply('user-reply', user.getAll())
})

ipcMain.on('companies-request', (event, arg) => {
    event.reply('companies-reply', companies)
})

ipcMain.on('time-request', (event, arg) => {
    event.reply('time-reply', time.getDate())
})

ipcMain.on('user-request', (event, arg) => {
    event.reply('user-reply', user.getAll())
})

ipcMain.on('user-buy-request', (event, arg) => {
    
    let { stock_code, company_name, quantity, price, share_price, user_name } = arg

    let stock = stocks.find(item => item.code == stock_code)
    
    stock.newBid(quantity, price, share_price, company_name, user_name, true)

    winHandler.browserWindow.webContents.send('user-reply', user.getAll())
})

ipcMain.on('user-sell-request', (event, arg) => {
    console.log(arg);
})

function updateTime() {
    winHandler.browserWindow.webContents.send('time-reply', time.getDate())
}

export { updateTime }