
<template>
    <div class="bg-[#f3f3f9] dark:bg-[#1a1d21]">
        <HeaderCommon v-if="currentRoute != 'login' && currentRoute != 'confirm-email'" />
        <SideBar v-if="currentRoute != 'login' && currentRoute != 'confirm-email'" />
        <RouterView class="min-h-screen p-5 dark:bg-[#212529] dark:text-white"
            :class="currentRoute == 'login' ? '' : 'mt-5 sm:mr-[30px]' && currentRoute == 'confirm-email' ? '' : 'mt-5 sm:mr-[30px]'
                && systemStore.getExpandSideBar ? 'sm:ml-[32%] md:ml-[20%]' : 'ml-[6%]'" />
        <ScrollToTop v-if="currentRoute != 'login'" class="hidden sm:block" />
    </div>
</template>
<script>
import SideBar from './components/SideBar.vue'
import HeaderCommon from './components/Header.vue'
import ScrollToTop from './components/ScrollToTop.vue'
import { useLanguageStore } from './stores/lang'
import { useSystemStore } from './stores/system'
import { RouterLink, RouterView } from 'vue-router'
export default {
    setup() {
        const langStore = useLanguageStore()
        const systemStore = useSystemStore()
        return { langStore, systemStore }
    },
    data() {
        return {
            currentRoute: ''
        }
    },
    computed: {
        currentRoute() {
            return this.currentRoute = this.$route.name
        }
    },
    created() {
        this.getCurrentLang()
    },
    methods: {
        getCurrentLang() {
            this.$i18n.locale = this.langStore.getLocate
        }
    },
    components: { SideBar, HeaderCommon: HeaderCommon, ScrollToTop }
}
</script>
<style scoped></style>
