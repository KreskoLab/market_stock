import { ipcRenderer } from 'electron'

export const state = () => ({
    info: {}
})
  
export const mutations = {

    update(state, payload) {
        state.info = payload
    }
}

export const actions = {

    getUser({ commit }) {

        ipcRenderer.send('user-request')

        ipcRenderer.on('user-reply', (event, arg) => {
            commit('update', arg)
        })

    },

    buy({}, payload) {
        
        ipcRenderer.send('user-buy-request', payload)
    },

    sell({}, payload) {

        ipcRenderer.send('user-sell-request', payload)
    }

}