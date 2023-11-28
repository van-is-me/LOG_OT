import { defineStore } from 'pinia'
export const useLanguageStore = defineStore('language', {
    state: () => ({
        locate: localStorage.getItem('current_lang') || 'vi'
    }),
    getters: {
        getLocate: state => {
            return state.locate;
        }
    },
    actions: {
        setLocate(value) {
            const language = value == true ? 'en' : 'vi'
            this.locate = language
            localStorage.setItem('current_Lang', language)
            console.log(this.locate)
        }
    },
})