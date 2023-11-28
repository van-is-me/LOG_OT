import { defineStore } from 'pinia'
export const useSystemStore = defineStore('system', {
    state: () => ({
        expandSideBar: true
    }),
    getters: {
        getExpandSideBar: state => {
            return state.expandSideBar
        }
    },
    actions: {
        setExpandSideBar() {
            this.expandSideBar = !this.expandSideBar
        }
    },
})