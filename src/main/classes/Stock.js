import { app } from 'electron'
import { traders_factory, user } from '../setup'
var fs = require('fs-extra')

class Stock {

    constructor(name, code, img, companies, traders, requirements, fee, asks, bids) {
        
        this.name = name
        this.code = code
        this.img = img
        this.companies = companies || []
        this.traders = traders || []
        this.requirements = requirements
        this.fee = fee
        this.asks = asks || []
        this.bids = bids || []
    }

    getName() {
        return this.name
    }

    getCode() {
        return this.code
    }

    getRequirements() {
        return this.requirements
    }

    getAsks() {
        return this.asks
    }

    getBids() {
        return this.bids
    }

    checkCompany(info) {

        let pass = false
        
        for (const key in this.requirements) {

            if (info[key] >= this.requirements[key]) {
                pass = true
            } 
            
            else {
                pass = false
                break
            }
        }

        return pass
    }

    acceptCompany(company) {
        this.companies.push(company)
    }

    acceptTrader(trader) {
        this.traders.push(trader)
    }

    newAsk(amount, price, share_price, company_name, user_name, is_player) {

        let ask = {
            quantity: Number(amount),
            price: Number(price),
            share_price: Number(share_price),
            company: company_name,
            user: user_name,
            is_player: is_player || false
        }
        this.asks.push(ask)
    }

    newBid(amount, price, share_price, company_name, user_name, is_player) {

        let bid = {
            quantity: Number(amount),
            price: Number(price),
            share_price: Number(share_price),
            company: company_name,
            user: user_name,
            is_player: is_player || false
        }
        this.bids.push(bid)
    }

    processing() {

        if (this.asks.length > 0 && this.bids.length > 0) {

            for (let i = 0; i < this.bids.length; i++) {

                let bid = this.bids[i]

                let ask = this.asks.find(item => bid.share_price >= item.share_price)

                if (ask) {

                    if ( ask.quantity > bid.quantity ) {

                        let player = {}

                        if (bid.is_player) {
                            player = user
                        } 

                        else {
                            player = traders_factory.traders.find(item => item.name == bid.user)
                        }

                        if (player.enoughCapital(bid.price)) {

                            ask.quantity -= bid.quantity
                            ask.price = ask.quantity * ask.share_price

                            player.capital -= bid.price

                            player.shares.push({ company: bid.company, quantity: bid.quantity, purchase_price: Number(bid.share_price) })

                            this.bids.splice(i, 1)
                        }

                    } 

                    else {

                        let player = {}

                        if (bid.is_player) {
                            player = user
                        } 

                        else {
                            player = traders_factory.traders.find(item => item.name == bid.user)
                        }

                        if (player.enoughCapital(ask.price)) {

                            bid.quantity -= ask.quantity
                            bid.price = bid.quantity * bid.share_price

                            player.capital -= ask.price

                            player.shares.push({ company: bid.company, quantity: bid.quantity, purchase_price: Number(bid.share_price) })
                            let index = this.asks.findIndex(item => item.company == ask.company && item.amount == ask.amount)
                            this.asks.splice(index, 1)
                        }
                    }

                }

            }

        }

    }
}

class StocksFactory {

    constructor() {

        this.saved_stocks_path = `${app.getPath('documents')}\\Market Stock\\stocks.json`
        this.saved_stocks = fs.readJSONSync(this.saved_stocks_path)
        this.stocks_file_path = process.resourcesPath + '/stocks.json'
        this.stocks_file = fs.readJSONSync(this.stocks_file_path)
        this.stocks = []
    }

    create() {

        let stocks = this.saved_stocks.length > 0 ? this.saved_stocks : this.stocks_file

        for (let i = 0; i < stocks.length; i++) {
            const stock = stocks[i]
            let newStock = new Stock(stock.name, stock.code, stock.img, stock.companies, stock.traders, stock.requirements, stock.fee, stock.asks, stock.bids)
            this.stocks.push(newStock)   
        }

        return this.stocks
    }

    getStocks() {
        return this.stocks
    }

    getStocksCodes() {
        return this.stocks.map(item => item.code)
    }

    processStocks() {

        for (let i = 0; i < this.stocks.length; i++) {
            const stock = this.stocks[i]
            stock.processing() 
        }

    }

    save() {
        fs.writeJsonSync(this.saved_stocks_path, this.stocks)
    }
}

export { StocksFactory }