import './assets/main.css'
// import 'sweetalert2/dist/sweetalert2.min.css'
import '../node_modules/sweetalert2/dist/sweetalert2.min.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueSweetalert2 from 'vue-sweetalert2'
import functionCustom from './utilities/functionCustom'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import swal from './utilities/swal2'
import axios from 'axios';
import App from './App.vue'
import API from './API'
import router from './router'
import Loading from './components/Loading.vue'
import ExportExcel from '../node_modules/vue-3-export-excel/index'
import i18n from './utilities/i18n'
import vueClickOutsideElement from 'vue-click-outside-element'
import CountryFlag from 'vue-country-flag-next'
import { library } from '@fortawesome/fontawesome-svg-core'
import Vue3EasyDataTable from 'vue3-easy-data-table'
// import 'vue3-easy-data-table/dist/style.css'
import '../node_modules/vue3-easy-data-table/dist/style.css'
import { faUserSecret, faMagnifyingGlass, faChevronRight, faExpand, faMoon, faBell, faEye, faEyeSlash, faSortUp, faSun, faBars, faXmark, faBarsStaggered, faArrowRight, faPenToSquare, faTrash, faPlus, faImage, faCheck, faCircle, faCircleXmark, faMoneyCheckDollar, faBridge, faUser, faAddressCard, faLock, faLockOpen, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

library.add(faUserSecret, faMagnifyingGlass, faChevronRight, faExpand, faMoon, faBell, faEye, faEyeSlash, faSortUp, faSun, faBars, faXmark, faBarsStaggered, faArrowRight, faPenToSquare, faTrash, faPlus, faImage, faCheck, faCircle, faCircleXmark, faMoneyCheckDollar, faBridge, faUser, faAddressCard, faLock, faLockOpen, faChevronLeft)


const axiosInstance = axios.create({
    baseURL: API.BASE_URL_V1,
    headers: {
        'Content-Type': 'application/json',
    },
})


// nơi khai báo các package ở phạm vi global
window.functionCustom = functionCustom
window.swal = swal
window.axios = axios
window.axios.defaults.headers.common = { 'Authorization': `Bearer ${sessionStorage.getItem("token")}` }
// nơi khai báo các component ở phạm vi global
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('country-flag', CountryFlag)
app.component('EasyDataTable', Vue3EasyDataTable)
app.component('Loading', Loading)

app.use(VueSweetalert2)
app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(vueClickOutsideElement)
app.use(ExportExcel)

app.mount('#app')
