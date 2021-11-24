import { ipcRenderer } from 'electron'

export const state = () => ({
    stocks: []
})
  
export const mutations = {
    
    addAll(state, payload) {
        state.stocks = payload
    }
}

export const actions = {

    getStocks({ commit }) {

        ipcRenderer.send('stocks-request')

        ipcRenderer.on('stocks-reply', (event, arg) => {
            commit('addAll', arg)
        })

    }

}