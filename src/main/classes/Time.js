import { app } from 'electron'
import { companies_factory, traders_factory, stocks_factory, user } from '../setup'
import winHandler from "../mainWindow"
var fs = require('fs-extra')

class Time {

    constructor() {

        this.speed = 1000
        this.day = 1
        this.month = 1
        this.year = 2021
        this.quarter = 1
        this.old_quarter = 1
        this.config = `${app.getPath('documents')}\\Market Stock\\time.json` 
    }

    start() {

        if (fs.existsSync(this.config)) {
            var obj = fs.readJSONSync(this.config)
            for (const key in obj) {
                this[key] = obj[key]
            }       
        }

        setInterval(() => {
            
            this.day++

            if (this.month == 12 && this.day == 31) {
                this.month = 0
                this.year++
            }

            if (this.day == 31) {
                this.month++
                this.day = 1
            }

            switch (this.month) {
                case 1:
                case 2:
                case 3:
                    this.quarter = 1
                    break;
                case 4:
                case 5:
                case 6:
                    this.quarter = 2
                    break;
                case 7:
                case 8:
                case 9:
                    this.quarter = 3
                    break;
                case 10:
                case 11:
                case 12:
                    this.quarter = 4
                    break;
            }

            if (this.quarter !== this.old_quarter) {
                this.old_quarter = this.quarter
                this.newQuarter()
            }

            this.newDay()


        }, this.speed)
    }

    getDate() {
        let monthes = ['Січень', 'Лютий', 'Березня', 'Квітня', 'Травня', 'Червня', 'Липня', 'Серпня', 'Вересня', 'Жовтня', 'Листопад', 'Грудня']
        return `${this.day} ${monthes[this.month-1]} ${this.year}`
    }

    getSpeed() {
        return this.speed
    }

    getQuarter() {
        return this.quarter
    }

    newQuarter() {

        companies_factory.create()
        traders_factory.create()

        companies_factory.sellShares()

        winHandler.browserWindow.webContents.send('stocks-reply', stocks_factory.getStocks()) // Оновлюємо данні бірж
    }

    newDay() {
        winHandler.browserWindow.webContents.send('stocks-reply', stocks_factory.getStocks())
        winHandler.browserWindow.webContents.send('user-reply', user.getAll())
    }

    save() {
        fs.writeJsonSync(this.config, {
            day: this.day,
            month: this.month,
            year: this.year,
            quarter: this.quarter
        })
    }
}

export { Time }