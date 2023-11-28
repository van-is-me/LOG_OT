<template>
    <div class="sm:block hidden text-center bg-[#405189] dark:bg-[#212529] h-screen fixed top-0 left-0 transition-all z-50 overflow-y-scroll"
        :class="systemStore.getExpandSideBar ? 'sm:w-[30%] md:w-[20%] xl:w-[20%]' : 'w-[6%]'">
        <div v-show="systemStore.getExpandSideBar" class="w-full">
            <img src="../assets/images/logoIT.png" alt="" class="w-[70%] mx-auto">
        </div>

        <ul>
            <li v-if="auth?.listRoles?.[0] == 'Manager'" v-for="menu in menuList" :key="menu.id">
                <ul>
                    <div @click="gotoDashboard">
                        <li class="flex justify-between items-center text-white my-3 cursor-pointer hover:bg-[#6376b3] parent sm:text-[16px] md:text-[18px]"
                            :class="systemStore.getExpandSideBar ? 'px-5 py-2' : 'mx-1'">Dashboard</li>
                    </div>
                    <div v-for="item in menu.items" :key="item.itemName">
                        <li @click="item.isShow = !item.isShow"
                            class="flex justify-between items-center text-white my-3 cursor-pointer hover:bg-[#6376b3] parent sm:text-[16px] md:text-[18px]"
                            :class="systemStore.getExpandSideBar ? 'px-5 py-2' : 'mx-1'">
                            <img v-show="!systemStore.getExpandSideBar" class="w-[100px]" :src="getUrl(item.iconName)"
                                alt="">
                            <span v-show="systemStore.getExpandSideBar">{{ item.itemName }}</span>
                            <font-awesome-icon v-show="systemStore.getExpandSideBar" icon="fa-solid fa-chevron-right"
                                class="transition-all" :class="!item.isShow ? '' : 'rotate-90'" />
                            <div class="bg-[#405189] dark:bg-[#212529] pl-2 z-20"
                                :class="systemStore.getExpandSideBar ? 'hidden' : 'child'">
                                <div class="overflow-hidden w-[150px] transition-all flex flex-col items-start">
                                    <span v-for="child in item.children"
                                        @click="onChangeRoute(child.childName, child.routeName)"
                                        :class="currentRoute == child.routeName ? 'bg-[#6376b3] dark:bg-[#3c3e46]' : ''"
                                        class="hover:bg-[#6376b3] dark:hover:bg-[#3c3e46] w-full text-white cursor-pointer text-left sm:text-[14px] md:text-[16px] px-2 py-1">
                                        {{ child.childName }}
                                    </span>
                                </div>
                            </div>
                        </li>
                        <Transition name="children">
                            <div v-show="item.isShow && systemStore.getExpandSideBar"
                                class="overflow-hidden w-full transition-all flex flex-col items-start">
                                <span v-for="child in item.children"
                                    @click="onChangeRoute(child.childName, child.routeName)"
                                    :class="currentRoute == child.routeName ? 'bg-[#6376b3] dark:bg-[#3c3e46]' : ''"
                                    class="hover:bg-[#6376b3] dark:hover:bg-[#3c3e46] w-full text-white cursor-pointer pl-10 text-left sm:text-[14px] md:text-[18px] mb-1">
                                    {{ child.childName }}
                                </span>
                            </div>
                        </Transition>
                    </div>
                </ul>
            </li>
            <li v-if="auth?.listRoles?.[0] == 'Employee'" v-for="menu in menuListEmployee" :key="menu.id">
                <ul>
                    <div v-for="item in menu.items" :key="item.itemName">
                        <li @click="item.isShow = !item.isShow"
                            class="flex justify-between items-center text-white my-3 cursor-pointer hover:bg-[#6376b3] parent sm:text-[16px] md:text-[18px]"
                            :class="systemStore.getExpandSideBar ? 'px-5 py-2' : 'mx-1'">
                            <img v-show="!systemStore.getExpandSideBar" class="w-[100px]" :src="getUrl(item.iconName)"
                                alt="">
                            <span v-show="systemStore.getExpandSideBar">{{ item.itemName }}</span>
                            <font-awesome-icon v-show="systemStore.getExpandSideBar" icon="fa-solid fa-chevron-right"
                                class="transition-all" :class="!item.isShow ? '' : 'rotate-90'" />
                            <div class="bg-[#405189] dark:bg-[#212529] pl-2 z-20"
                                :class="systemStore.getExpandSideBar ? 'hidden' : 'child'">
                                <div class="overflow-hidden w-[150px] transition-all flex flex-col items-start">
                                    <span v-for="child in item.children"
                                        @click="onChangeRoute(child.childName, child.routeName)"
                                        :class="currentRoute == child.routeName ? 'bg-[#6376b3] dark:bg-[#3c3e46]' : ''"
                                        class="hover:bg-[#6376b3] dark:hover:bg-[#3c3e46] w-full text-white cursor-pointer text-left sm:text-[14px] md:text-[18px] px-2 py-1">
                                        {{ child.childName }}
                                    </span>
                                </div>
                            </div>
                        </li>
                        <Transition name="children">
                            <div v-show="item.isShow && systemStore.getExpandSideBar"
                                class="overflow-hidden w-full transition-all flex flex-col items-start">
                                <span v-for="child in item.children"
                                    @click="onChangeRoute(child.childName, child.routeName)"
                                    :class="currentRoute == child.routeName ? 'bg-[#6376b3] dark:bg-[#3c3e46]' : ''"
                                    class="hover:bg-[#6376b3] dark:hover:bg-[#3c3e46] w-full text-white cursor-pointer pl-10 text-left sm:text-[14px] md:text-[18px] my-2">
                                    {{ child.childName }}
                                </span>
                            </div>
                        </Transition>
                    </div>
                </ul>
            </li>
        </ul>

    </div>
</template>
<script>
import menu from '../service/menu'
import { useAuthStore } from '../stores/auth'
import { useSystemStore } from '../stores/system'
import logo from '../assets/images/logoIT.png'
export default {
    setup() {
        const authStore = useAuthStore()
        const systemStore = useSystemStore()
        function getUrl(imgName) {
            const imageUrl = new URL(`/src/assets/images/${imgName}.png`, import.meta.url)
            return imageUrl
        }

        return { systemStore, getUrl, authStore }
    },
    data() {
        return {
            menuList: menu.menuList(),
            menuListEmployee: menu.menuListEmp(),
            menuListEmp: menu.profileEmpMenu(),
            currentRoute: 'Dashboard',
            isExpand: this.systemStore.getExpandSideBar,
            auth: this.authStore.getAuth,
        }
    },
    created() {
        // this.currentRoute = this.$route.name
    },
    watch: {
        '$route.name': function (newRouteName, oldRouteName) {
            this.currentRoute =  this.$route.name
        }
    },
    methods: {
        onChangeRoute(routeName, roueLink) {
            this.$router.replace({ name: roueLink, params: {} })
            this.currentRoute = roueLink
        },
        isActiveExpand(item) {
            if (item.isShowExpand == true) return item.isShowExpand = false
            this.menuList[0].items.map(i => {
                if (i.itemName == item.itemName) {
                    i.isShowExpand = true
                } else i.isShowExpand = false
            })
        },
        gotoDashboard() {
            this.$router.push({ name: 'home' })
        }
        // isHiddenAllExpand() {
        //     this.menuList[0].items.map(i => { i.isShowExpand = false })
        // }
    }
}
</script>
<style scoped>
.children-enter-active,
.children-leave-active {
    transition: 0.2s ease;
}

.children-enter-from {
    transform: translateY(-20px);
    opacity: 0;
}

.children-leave-to {
    transform: translateY(-20px);
    opacity: 0;
}

.parent {
    position: relative;
}

.child {
    position: absolute;
    left: 100%;
    top: 50%;
    display: none;
}

.parent:hover .child {
    display: block;
}
</style>