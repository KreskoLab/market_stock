import { ipcRenderer } from 'electron'

export const state = () => ({
    time: ''
})
  
export const mutations = {
    addTime(state, payload) {
        state.time = payload
    }
}

export const actions = {

    getTime({ commit }) {

        ipcRenderer.send('time-request')

        ipcRenderer.on('time-reply', (event, arg) => {
            commit('addTime', arg)
        })

    }

}