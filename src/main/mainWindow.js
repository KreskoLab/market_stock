import { app } from 'electron'
import BrowserWinHandler from './BrowserWinHandler'
import { time, stocks_factory, companies_factory, traders_factory, user  } from './setup'

const winHandler = new BrowserWinHandler({
  height: 600,
  width: 1000,
  minWidth: 1368,
  minHeight: 768,
  autoHideMenuBar: true,
  webPreferences: {
    enableRemoteModule: true,
    nodeIntegration: true
  }
})

winHandler.onCreated(_browserWindow => {

  winHandler.loadPage('/')

})

winHandler.onClossed(() => {

  time.save()
  stocks_factory.save()
  companies_factory.save()
  traders_factory.save()
  user.save()

})

export default winHandler
