import { CompaniesFactory } from './classes/Company'
import { StocksFactory } from './classes/Stock'
import { Time } from './classes/Time'
import { TradersFactory } from './classes/Trader'
import { User } from './classes/User'
import { updateTime } from './events'
import { checkFiles, tryIPO } from './helpers'

checkFiles()

let time = new Time()
let interval = time.getSpeed()


///////////////////////////  Stocks & Companies & Traders & User  //////////////////////////
let stocks_factory = new StocksFactory()
let companies_factory = new CompaniesFactory()
let traders_factory = new TradersFactory()

let user = new User()

user.load()

stocks_factory.create()
companies_factory.load()

traders_factory.updateStocks(stocks_factory.getStocks())

traders_factory.load()
//////////////////////////////////////////////////////////////////////////

companies_factory.boot = true // флажок чтобы отдавать компании после первого запуска проги

time.start()

let stocks = stocks_factory.getStocks()
let companies = companies_factory.getCompanies()

setInterval(() => {

  tryIPO(companies_factory.getNoStocksCompanies(), companies_factory, stocks); 
  updateTime();
  
  traders_factory.tryBID()
  traders_factory.tryASK()

  stocks_factory.processStocks()

}, interval);

export { time, stocks_factory, companies_factory, traders_factory, companies, stocks, user, interval }