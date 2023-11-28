<template>
    <div>
        <div class="w-full text-xs flex">
            <div class="w-1/4 bg-white rounded-xl border-[1px] border-[#ccc] border-solid mr-4 h-fit">
                <div class="grid justify-items-center p-4">
                    <div
                        class="mb-3 rounded-[50%] border-[1px] border-[#000] border-solid w-[110px] h-[110px] flex justify-center items-center">
                        <img :src="currentEmp?.image" alt="image"
                            class="w-[100px] h-[100px] block mx-auto rounded-full object-cover justify-center content-center" />
                    </div>
                    <div class="flex mb-1">
                        <span>Tên:&nbsp</span>
                        <span>{{ currentEmp?.fullname }}</span>
                    </div>
                    <div class="flex mb-1">
                        <span>Vai trò:&nbsp</span>
                        <span>{{ auth.listRoles?.[0] }}</span>
                    </div>
                    <div class="flex mb-1">
                        <span>Phòng ban:&nbsp</span>
                        <span>{{ departmentName }}</span>
                    </div>
                    <div class="flex mb-1">
                        <span>ID:&nbsp</span>
                        <p class="truncate" :title="currentEmp?.id">{{ currentEmp?.id }}</p>
                    </div>
                </div>
            </div>
            <div class="w-3/4 bg-white rounded-none border-[1px] border-[#ccc] border-solid">
                <div class="w-full overflow-y-scroll hidden-scroll">
                    <div class="w-[1000px] flex justify-around items-center bg-slate-300 py-3 font-bold">
                        <div class="mx-3 px-2 py-1" :class="currentRoute == i.routeName ? 'bg-[#405189] text-white' : ''"
                            v-for="i in empList" :key="i.name">
                            <router-link :to="{ name: i.routeName }">
                                <span @click="onChangeRoute(i.routeName)" class="text-[20px]">
                                    {{ i.name }}
                                </span>
                            </router-link>
                        </div>
                    </div>
                </div>
                <div>
                    <router-view></router-view>
                </div>
            </div>
        </div>
        <Loading v-show="isLoading" />
    </div>
</template>
<script>
import Loading from '../components/Loading.vue'
import service from '../service/menu'
import API from '../API'
import swal from '../utilities/swal2'
import { useAuthStore } from '../stores/auth'
export default {
    components: {
        Loading
    },
    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },
    data() {
        return {
            isLoading: false,
            empList: service.profileEmpMenu(),
            currentRoute: 'emp-information',
            currentEmp: null,
            departmentName: '',
            auth: this.authStore.getAuth
        }
    },
    created() {
        this.fetchDetailEmp()
        this.getDepartment()
    },
    methods: {
        onChangeRoute(routeName) {
            this.currentRoute = routeName
        },
        getDepartment() {
            if (this.auth.listRoles?.[0] == 'Employee') {
                API.getDepartmentForEmp()
                    .then(res => {
                        this.departmentName = res.data.position.department.name
                    })
                    .catch(err => swal.error(err))
            } else {
                API.getDepartmentByUser(this.$route.params.username)
                    .then(res => {
                        this.departmentName = res.data.name
                    })
                    .catch(err => swal.error(err))
            }
        },
        fetchDetailEmp() {
            if (this.auth.listRoles?.[0] == 'Employee') {
                this.isLoading = true
                return API.getInfo()
                    .then(res => {
                        this.currentEmp = res.data
                        this.isLoading = false
                    })
                    .catch(err => {
                        swal.error(err)
                        this.isLoading = false
                    })
            } else {
                this.isLoading = true
                API.getDetailEmployee(this.$route.params.username)
                    .then(res => {
                        this.isLoading = false
                        this.currentEmp = res.data
                    })
                    .catch(err => {
                        swal.error(err)
                        this.isLoading = false
                    })
            }
        }
    }
}
</script>

<style scoped>
.hidden-scroll {
    -ms-overflow-style: none;
    /* Internet Explorer 10+ */
    scrollbar-width: none;
    /* Firefox */
}

.hidden-scroll::-webkit-scrollbar {
    display: none;
    /* Safari and Chrome */
}

.truncate {
    width: 50px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
}
</style>