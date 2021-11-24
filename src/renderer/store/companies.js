import { ipcRenderer } from 'electron'

export const state = () => ({
    companies: []
})

export const mutations = {
    addAll(state, payload) {
        state.companies = payload.filter(item => item.stock && item.stock !== 'freeze')
    }
}

export const actions = {

    getCompanies({ commit }) {

        ipcRenderer.send('companies-request')

        ipcRenderer.on('companies-reply', (event, arg) => {
            commit('addAll', arg)
        })

    }

}