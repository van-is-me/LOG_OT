<template>
    <div
        class="bg-[#f5f2f2] md:w-full w-full flex justify-between p-4 dark:bg-[#292e32] dark:text-[#ced4da] sticky top-0 right-0 z-[50]">
        <div class="sm:flex hidden w-2/5 items-center ml-[20px]"
            :class="systemStore.getExpandSideBar ? 'justify-center' : 'justify-start'">
            <font-awesome-icon @click="expandSideBar" class="ml-16 cursor-pointer hover-custom"
                :icon="systemStore.getExpandSideBar ? 'fa-solid fa-bars-staggered' : 'fa-solid fa-arrow-right'" />
        </div>
        <div class="w-full sm:w-3/5 md:w-2/5 lg:w-1/5 flex flex-wrap items-center justify-around">
            <font-awesome-icon class="block sm:hidden w-3" @click="isShowMobileMenu = !isShowMobileMenu"
                :icon="isShowMobileMenu ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'" />
            <div class="relative">
                <font-awesome-icon :icon="['fas', 'bell']" @click="isShowNoti = !isShowNoti" class="hover-custom" />
                <!-- v-click-outside-element="closeNoti" -->
                <div
                    class="absolute w-[20px] h-[20px] rounded-full bg-red-500 text-white text-[10px] leading-[20px] text-center top-[-10px] right-[-10px]">
                    {{ totalUnread }}</div>
                <div v-show="isShowNoti"
                    class="absolute dark:bg-[#292e32] text-white w-[90vw] md:w-[30vw] lg:w-[40vw] max-h-[80vh] overflow-y-scroll bg-white shadow-xl left-[-22vw] lg:left-[-30vw] top-[150%] z-20 px-2 pb-2 pt-9">
                    <button @click="isShowNoti = false" class="absolute right-[8px] top-[11px]">
                        <font-awesome-icon icon="fa-solid fa-circle-xmark" class="text-black dark:text-white text-[20px]" />
                    </button>
                    <h1 v-if="notiList.length == 0" class="text-gray-500 text-[20px] text-center">Không có thông báo</h1>
                    <div @click="readingNoti(noti.id)" v-for="noti in notiList"
                        class="my-2 p-2 cursor-pointer text-black dark:text-white"
                        :class="noti.isRead == false ? 'bg-[#dcdcdc] dark:bg-[#515151] ' : ''">
                        <p class="font-bold text-[14px]"><font-awesome-icon v-show="!noti.isRead" icon="fa-solid fa-circle"
                                class="text-red-500 text-[6px] translate-y-[-3px]" /> {{ noti.title }}</p>
                        <p class="text-[12px]">{{ noti.description }}</p>
                    </div>
                    <p @click="loadMore"
                        class="font-bold text-center text-[16px] text-red-400 cursor-pointer hover:text-red-300"
                        v-if="hasMorePages">Load More</p>
                </div>
            </div>
            <!-- <div class="w-[50px] relative">
                <country-flag class="cursor-pointer" v-click-outside-element="close" @click="showLang"
                    :country="currentLang == 'vnm' ? 'vn' : 'us'" size='normal' />
                <Transition name="lang">
                    <div v-show="isShowLang" class="absolute top-[100%] left-0 w-[300%] shadow-md bg-white z-10">
                        <div @click="changeLang(c.code)"
                            class="hover:bg-[#dbd9d9] cursor-pointer flex justify-around px-2 py-3 my-1"
                            v-for="c in listLang">
                            <country-flag style="margin-top: -7px !important;" :country='c.code' size='normal' />
                            <span class="dark:text-black">{{ c.name }}</span>
                        </div>
                    </div>
                </Transition>
            </div> -->
            <font-awesome-icon icon="fa-solid fa-expand" class="hover-custom sm:block hidden" @click="expandAction" />
            <font-awesome-icon v-show="!isDark" @click="changeTheme" icon="fa-solid fa-moon"
                class="hover-custom sm:block hidden" />
            <font-awesome-icon v-show="isDark" @click="changeTheme" icon="fa-solid fa-sun"
                class="hover-custom sm:block hidden" />
            <!-- <font-awesome-icon icon="fa-solid fa-bell" class="hover-custom sm:block hidden" /> -->
            <div class="flex items-center space-x-4 relative min-w-[120px]">
                <img class="w-10 h-10 object-cover rounded-full cursor-pointer" v-click-outside-element="closeProfile"
                    @click="showProfile" :src="auth?.image" alt="">
                <div class="font-medium text-gray-500">
                    <div>{{ auth?.fullName }}</div>
                    <div class="text-sm">{{ auth?.listRoles ? auth?.listRoles[0] : '' }}</div>
                </div>
                <Transition name="profile">
                    <div v-show="isShowProfile"
                        class="absolute top-[100%] left-[-20%] w-[120%] flex flex-col bg-white shadow-lg z-10 text-[14px]">
                        <span @click="gotoProfile"
                            class="hover:bg-[#dbd9d9] cursor-pointer px-2 py-4 my-1 dark:text-black">
                            Thông tin cá nhân
                        </span>
                        <span v-for="item in profileMenu" @click="goTo(item.routeName)"
                            class="hover:bg-[#dbd9d9] cursor-pointer px-2 py-4 my-1 dark:text-black">
                            {{ $t(item.name) }}
                        </span>
                        <span @click="logout" class="hover:bg-[#dbd9d9] cursor-pointer px-2 py-4 my-1 dark:text-black">
                            {{ $t('logout') }}
                        </span>
                    </div>
                </Transition>
            </div>
            <Transition name="mobile-menu">
                <SideBarMobile v-show="isShowMobileMenu" :isShow="isShowMobileMenu" @close-menu="closeMenuMobile"
                    class="z-10" />
            </Transition>
        </div>
    </div>
    <div @click.self="cancelReading" v-show="isReadingNoti" class="fog-l">
        <div class="bg-white p-5 rounded-md">
            <p>Người nhận: {{ selectedNoti?.applicationUser?.fullname }}</p>
            <p class="font-bold text-[20px]">{{ selectedNoti?.title }}</p>
            <p class="text-[14px]">{{ selectedNoti?.description }}</p>
        </div>
    </div>
    <Loading v-if="isLoading" />
</template>
<script>
import API from '../API'
import { useLanguageStore } from '../stores/lang'
import { useThemeStore } from '../stores/theme'
import { useSystemStore } from '../stores/system'
import { useAuthStore } from '../stores/auth'
import swal2 from '../utilities/swal2'
import { useDark, useToggle } from '@vueuse/core'
import menu from '../service/menu'
import Loading from './Loading.vue'
import SideBarMobile from './SideBarMobile.vue'
import swal from '../utilities/swal2'
const isDark = useDark()
const toggleDark = useToggle(isDark)
export default {
    setup() {
        const langStore = useLanguageStore()
        const themeStore = useThemeStore()
        const systemStore = useSystemStore()
        const authStore = useAuthStore()
        return { langStore, themeStore, systemStore, authStore }
    },
    components: {
        SideBarMobile, Loading
    },
    data() {
        return {
            currentLang: '',
            notiList: [],
            notiPage: 1,
            selectedNoti: null,
            hasMorePages: false,
            totalUnread: 0,
            isShowNoti: false,
            isReadingNoti: false,
            listLang: [
                { id: 1, name: 'Tiếng Việt', code: 'vnm', value: 'vi' },
                { id: 2, name: 'Tiếng Anh', code: 'us', value: 'us' }
            ],
            profileMenu: menu.profileMenu(),
            isShowLang: false,
            isShowProfile: false,
            isDark: localStorage.getItem('vueuse-color-scheme') ? localStorage.getItem('vueuse-color-scheme') == 'auto' ? true : false : true,
            isShowMobileMenu: false,
            isLoading: false,
            auth: this.authStore.getAuth,
        }
    },
    created() {
        this.getCurrentLanguage()
        this.getNoti()

        API.checkIfHaveNoti()
            .then(res => {
                this.totalUnread = res.data.number
                if (res.data.isHaveNoti == true) return swal.info(`Bạn có ${res.data.number} thông báo mới! Hãy đọc ngay `, 5000)
            })
            .catch(err => console.log(err))
    },
    methods: {
        getCurrentLanguage() {
            this.listLang.map(l => {
                if (l.value == this.langStore.getLocate) {
                    if (this.langStore.getLocate == 'vi') this.currentLang = 'vnm'
                    else this.currentLang = 'us'
                }
            })
        },
        getNoti() {
            this.isLoading = true
            API.getNotification(this.notiPage)
                .then(res => {
                    this.isLoading = false
                    this.notiList.push(...res.data.items)
                    this.hasMorePages = res.data.hasNextPage
                })
                .catch(err => {
                    this.isLoading = false
                    console.log(err)
                })
        },
        gotoProfile() {
            this.$router.push({ name: 'emp-information', params: { username: this.auth?.username, id: this.auth?.userId } })
        },
        getNotiRefresh() {
            API.getNotification(this.notiPage)
                .then(res => {
                    this.notiList = res.data.items
                    this.hasMorePages = res.data.hasNextPage
                })
                .catch(err => swal.error(err))
        },
        expandSideBar() {
            this.systemStore.setExpandSideBar()
        },
        showLang() {
            this.isShowLang = !this.isShowLang
        },
        showProfile() {
            this.isShowProfile = !this.isShowProfile
        },
        close() {
            this.isShowLang = false
        },
        cancelReading() {
            this.isLoading = true
            this.isReadingNoti = false
            this.selectedNoti = null
            this.notiPage = 1
            this.getNotiRefresh()
            API.checkIfHaveNoti()
                .then(res => {
                    this.isLoading = false
                    this.totalUnread = res.data.number
                })
                .catch(err => {
                    swal.error(err)
                    this.isLoading = false
                })
        },
        closeProfile() {
            this.isShowProfile = false
        },
        changeTheme() {
            toggleDark()
            this.isDark = isDark.value
            this.themeStore.setTheme(isDark.value)
        },
        expandAction() {
            const ele = document.body
            ele.requestFullscreen()
        },
        closeMenuMobile(e) {
            this.isShowMobileMenu = e
        },
        changeLang(lang) {
            this.currentLang = lang
            this.isLoading = true
            setTimeout(() => {
                this.isLoading = false
            }, 1500)
            const value = lang == 'vnm' ? false : true
            this.langStore.setLocate(value)
            this.$i18n.locale = value == true ? 'en' : 'vi'
        },
        logout() {
            sessionStorage.removeItem('auth')
            sessionStorage.removeItem('token')
            swal2.success(`${this.$t('logout success')}`)
            this.$router.push({ name: "login" })
        },
        goTo(route) {
            this.$router.push({ name: route })
        },
        closeNoti() {
            this.isShowNoti = false
        },
        loadMore() {
            this.notiPage++
            this.getNoti()
        },
        readingNoti(id) {
            this.isLoading = true
            API.getNotiById(id)
                .then(res => {
                    this.selectedNoti = res.data
                    this.isReadingNoti = true
                    this.isLoading = false
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err)
                })
        }
    }
}
</script>
<style scoped>
.hover-custom {
    transition: ease 0.4s;
    font-size: 24px;
}

.hover-custom:hover {
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    color: rgb(33, 33, 211);
}

.lang-enter-active,
.lang-leave-active {
    transition: opacity 0.5s ease;
}

.lang-enter-from,
.lang-leave-to {
    opacity: 0;
}


.profile-enter-active,
.profile-leave-active {
    transition: 0.2s ease;
}

.profile-enter-from {
    transform: translateY(-20px);
    opacity: 0;
}

.profile-leave-to {
    transform: translateY(20px);
    opacity: 0;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
    transition: 0.5s ease;
}

.mobile-menu-enter-from {
    transform: translateX(-100%);
}

.mobile-menu-leave-to {
    transform: translateX(-100%);
}
</style>