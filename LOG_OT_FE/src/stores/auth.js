import { defineStore } from 'pinia'
export const useAuthStore = defineStore('auth', {
    state: () => ({
        auth: JSON.parse(sessionStorage.getItem('auth')) || {}
    }),
    getters: {
        getAuth: state => {
            return state.auth
        }
    },
    actions: {
        setAuth(data) {
            this.auth = data
        }
    },
})