import { app } from 'electron'
import { companies_factory, stocks_factory } from '../setup'
var fs = require('fs-extra')

class Trader {

    constructor(name, capital, stock, revenue, shares) {

        this.name = name
        this.capital = capital
        this.revenue = revenue || 0
        this.shares = shares || []
        this.stock = stock
    }

    enoughCapital(val) {
         if (this.capital > val) {
            return true
        } else {
            return false
        }
    }

    buy() {

        if (Math.random() < 0.5) {

            let stock = stocks_factory.stocks.find(item => item.code == this.stock)
            let companies = companies_factory.getCompanies().filter(item => item.stock == this.stock)

            if (companies.length > 0) {
                
                let percent = Math.floor(Math.random() * (5 - 1 + 1) + 1)

                let amount = Math.floor(Math.random() * (10000000 - 100000 + 1) + 100000)
                let company = companies[Math.floor(Math.random() * companies.length)]

                let share_price = (company.shares.share_price + stock.fee)
                let new_share_price = (share_price - (percent / 100) * share_price).toFixed(2)

                let price = (new_share_price * amount).toFixed(2)

                if (this.capital > price) {
                    stock.newBid(amount, price, new_share_price, company.name, this.name, false)
                }
            }
        }
    }

    sell() {

        if (Math.random() < 0.5 && this.shares.length > 0) {

            let stock = stocks_factory.stocks.find(item => item.code == this.stock)

            let share = this.shares[Math.floor(Math.random() * this.shares.length)]

            let percent = Math.floor(Math.random() * (10 - 1 + 1) + 1)

            let amount = Math.floor((share.quantity / 100 * percent))

            let share_price = (share.purchase_price + stock.fee).toFixed(2)

            let diff = Number(share_price / 100 * percent)

            let new_share_price = (Number(share_price) + diff).toFixed(2)

            let price = (new_share_price * amount)
            
            stock.newAsk(amount, price, new_share_price, share.company, this.name, false)

            share.quantity -= amount 
        }
    }
}


class TradersFactory {

    constructor() {

        this.boot = false
        this.saved_traders_path = `${app.getPath('documents')}\\Market Stock\\traders.json`
        this.saved_traders = fs.readJSONSync(this.saved_traders_path)
        this.traders_names_path = process.resourcesPath + '/traders_names.json'
        this.traders_names = fs.readJSONSync(this.traders_names_path)
        this.traders = []
        this.stocks = []
        
    }

    updateStocks(stocks) {
        this.stocks = stocks
    }

    load() {

        if (this.saved_traders.length > 0) {

            for (let i = 0; i < this.saved_traders.length; i++) {
                const item = this.saved_traders[i]
                let trader = new Trader(item.name, item.capital, item.stock, item.shares)
                this.traders.push(trader)
            }
        } 
        
        else {
            this.create()
        }
    }

    create() {

        if (this.traders.length < 50) {

            let new_traders_size = Math.floor(Math.random() * (20 - 10 + 1) + 10) 

            for (let i = 0; i < new_traders_size; i++) {
                
                let name = this.traders_names[Math.floor(Math.random() * this.traders_names.length)] // рандомне ім'я з файлу
                let capital = Math.floor(Math.random() * (10e+6 - 5e+6 + 1) + 5e+6)

                let stock = this.stocks[Math.floor(Math.random() * this.stocks.length)] // обираємо рандомну біржу
                
                let trader = new Trader(name, capital, stock.code)
                this.traders.push(trader)

                stock.acceptTrader(name)

                // Видаляємо використанні імена з масиву

                let name_index = this.traders_names.indexOf(name)
                this.traders_names.splice(name_index, 1)

                fs.writeJsonSync(this.traders_names_path, this.traders_names)
                this.traders_names = fs.readJSONSync(this.traders_names_path)
            }
        }

        return this.traders

    }

    tryBID() {

        for (let i = 0; i < this.traders.length; i++) {
            let trader = this.traders[i]
            trader.buy()
        }
    }

    tryASK() {

        for (let i = 0; i < this.traders.length; i++) {
            let trader = this.traders[i]
            trader.sell()
        }
    }

    save() {
        fs.writeJsonSync(this.saved_traders_path, this.traders)
    }
}

export { TradersFactory, Trader }