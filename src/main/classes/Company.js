import { stocks, interval } from "../setup"
import { app } from 'electron'
import winHandler from "../mainWindow"
var fs = require('fs-extra')

class Company {

    constructor(name, type, stock, revenue, capitalization, shares) {
        
        this.name = name,
        this.type = type,
        this.stock = stock || null,
        this.revenue = revenue || Math.floor(40e+6 + Math.random() * (200e+6 + 1 - 40e+6)),
        this.capitalization = capitalization || this.revenue * 3
        this.shares = shares || {}
    }

    ipo() {

        let success = false
        let info = {}

        let total_shares = Math.floor(Math.random() * (Math.floor(500e+6) - Math.ceil(30e+6)) + Math.ceil(30e+6)) // Розрахунок загальної кількості акцій
        let share_price = (this.capitalization / total_shares) * Math.random() * (10 - 1) + 1
        let equity_shares = (total_shares * Math.floor((Math.random() * (Math.floor(50) - Math.ceil(20)) + Math.ceil(20)))) / 100
        let free_shares = total_shares - equity_shares
        let free_shares_price = free_shares * share_price

        info.name = this.name
        info.total_shares = total_shares
        info.share_price = share_price
        info.equity_shares = equity_shares
        info.free_shares = free_shares
        info.free_shares_price = free_shares_price
        info.capitalization = this.capitalization

        let stock = stocks[Math.floor(Math.random() * stocks.length)] // Обираємо рандомну біржу

        let res = stock.checkCompany(info)
        
        if (res) {
            stock.acceptCompany(info.name)
            this.stock = stock.getCode()
            this.shares = {
                total_shares: Number(info.total_shares),
                free_shares: Number(info.free_shares),
                equity_shares: Number(info.equity_shares),
                share_price: Number(info.share_price)
            }
            success = true
        } 

        if (!success) {
            this.stock = 'freeze'
            setTimeout(() => {
                this.stock = null
            }, interval * 30);
        }
        return success
    }

    is_free_shares(amount) {

        if ( this.shares.free_shares > amount ) {
            return true
        } else {
            return false
        }
    }

    sell() {

        let ask_count = Math.floor(Math.random() * (3 - 1 + 1) + 1) // rand int between 1 and 3
        let stock = this.getStock()

        if (stock && stock.bids.length > 0) {

            for (let i = 0; i < ask_count; i++) {

                let percent = Math.floor(Math.random() * (10 - 1 + 1) + 1)
    
                let amount = Math.floor((this.shares.free_shares / 100 * percent))
    
                if (this.is_free_shares(amount)) {
    
                    let share_price = (this.shares.share_price + stock.fee)
    
                    let new_share_price = (share_price + (share_price / 100) * percent).toFixed(2)
    
                    let price = (new_share_price * amount).toFixed(2)
                    
                    stock.newAsk(Number(amount), Number(price), Number(new_share_price), this.name)
    
                    this.shares.free_shares -= amount 
                }
            }

        }
    }

    getStock() {
        return stocks.find(item => item.code == this.stock)
    }
}

class CompaniesFactory {

    constructor() {
        
        this.boot = false
        this.companies = []
        this.saved_companies_path =  `${app.getPath('documents')}\\Market Stock\\companies.json`
        this.companies_names_path = process.resourcesPath + '/companies_names.json'
        this.companies_types_path = process.resourcesPath + '/companies_types.json'
        this.companies_names = fs.readJSONSync(this.companies_names_path)
        this.companies_types = fs.readJSONSync(this.companies_types_path)
        this.saved_companies = fs.readJSONSync(this.saved_companies_path)
    }

    load() {

        if (this.saved_companies.length > 0) {

            for (let i = 0; i < this.saved_companies.length; i++) {
                const item = this.saved_companies[i]
                let company = new Company(item.name, item.type, item.stock, item.revenue, item.capitalization, item.shares)
                this.companies.push(company)
            }
        } 
        
        else {
            this.create()
        }
    }

    create() {

        if (this.companies_names.length > 0) {

            let new_companies_size = Math.floor(Math.random() * (10 - 5 + 1) + 5) // рандомне число від 1 до 5

            for (let i = 0; i < new_companies_size; i++) {
                let name = this.companies_names[i]
                let type = this.companies_types[Math.floor(Math.random() * this.companies_types.length)] // рандомний тип компанії з файлу
                let company = new Company(name, type)
                this.companies.push(company)

                // Видаляємо використанні імена з масиву
                let name_index = this.companies_names.indexOf(name)
                this.companies_names.splice(name_index, 1)
                fs.writeJsonSync(this.companies_names_path, this.companies_names)
                this.companies_names = fs.readJSONSync(this.companies_names_path)
            }

            if (this.boot) {
                this.sendCompanies()
            }
        }
    }

    sendCompanies() {
        winHandler.browserWindow.webContents.send('companies-reply', this.getCompanies())
    }

    getCompanies() {
        return this.companies
    }

    getNoStocksCompanies() {
        return this.companies.filter(item => !item.stock)
    }

    sellShares() {
        for (let i = 0; i < this.companies.length; i++) {

            let company = this.companies[i]
            company.sell()
        }
    }

    save() {
        fs.writeJsonSync(this.saved_companies_path, this.companies)
    }
}

export { CompaniesFactory }