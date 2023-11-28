<template>
    <div class="h-screen w-screen bg-custom sm:hidden" @click.self="closeMenu">
        <div class="w-[80%] bg-[#f87171] h-full dark:bg-[#1a1d21] overflow-y-scroll relative">
            <font-awesome-icon icon="fa-solid fa-xmark" class="absolute right-5 top-5" @click="closeMenu" />
            <ul class="mt-10">
                <li v-for="menu in listMenu" :key="menu.id">
                    <ul>
                        <div v-for="item in menu.items" :key="item.itemName">
                            <li @click="item.isShow = !item.isShow"
                                class="flex justify-between px-5 py-2 items-center text-white my-3 cursor-pointer relative sm:text-[16px] md:text-[18px]">
                                {{ item.itemName }}
                                <font-awesome-icon icon="fa-solid fa-chevron-right" class="transition-all"
                                    :class="!item.isShow ? '' : 'rotate-90'" />
                            </li>
                            <Transition name="children">
                                <div v-show="item.isShow"
                                    class="overflow-hidden w-full transition-all flex flex-col items-start">
                                    <span v-for="child in item.children" @click="onChangeRoute(child.childName)"
                                        :class="currentRoute == child.childName ? 'bg-[#6376b3] dark:bg-[#3c3e46]' : ''"
                                        class="w-full text-white cursor-pointer pl-10 text-left sm:text-[14px] md:text-[18px]">
                                        - {{ child.childName }}
                                    </span>
                                </div>
                            </Transition>
                        </div>
                    </ul>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import menu from '../service/menu'
export default {
    props: {
        isShow: Boolean
    },
    data() {
        return {
            listMenu: menu.menuList(),
            currentRoute: 'Dashboard'
        }
    },
    methods: {
        onChangeRoute(routeName) {
            this.currentRoute = routeName
            this.$emit('close-menu', false)
        },
        closeMenu() {
            this.$emit('close-menu', false)
        }
    }
}
</script>
<style scoped>
.bg-custom {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}

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
</style>