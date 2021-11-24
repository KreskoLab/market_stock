import { Trader } from "./Trader"
import { app } from 'electron'
var fs = require('fs-extra')
var os = require('os')

class User extends Trader {

    constructor(name, capital, stock, revenue, shares) {

        super(name, capital, stock, revenue, shares)

        this.saved_user_path = `${app.getPath('documents')}\\Market Stock\\user.json`
        this.saved_user = fs.readJSONSync(this.saved_user_path)

    }

    load() {

        if (this.saved_user.name !== undefined) {
            
            for (const key in this.saved_user) {
                this[key] = this.saved_user[key]
            } 
        }

        else {
            this.name = os.userInfo().username
            this.capital = 5000000
        }

    }

    save() {

        fs.writeJsonSync(this.saved_user_path, {
            name: this.name,
            capital: this.capital,
            stock: this.stock,
            revenue: this.revenue,
            shares: this.shares
        })
    }

    getAll() {
        return {
            name: this.name,
            capital: this.capital,
            stock: this.stock,
            revenue: this.revenue,
            shares: this.shares
        }
    }

    getCapital() {
        return this.capital
    }

    getStock() {
        return this.stock
    }

    updateStock(stock) {
        this.stock = stock
    }
}

export { User }