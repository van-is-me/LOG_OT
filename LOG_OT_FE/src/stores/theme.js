import { defineStore } from 'pinia'
export const useThemeStore = defineStore('theme', {
    state: () => ({
        theme: localStorage.getItem('vueuse-color-scheme') || 'auto'
    }),
    getters: {
        getTheme: state => {
            return state.theme
        }
    },
    actions: {
        setTheme(value) {
            let currTheme = !value ? 'light' : 'auto'
            this.theme = currTheme
        }
    },
})