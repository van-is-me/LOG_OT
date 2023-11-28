<template>
    <div class="bg-white">
        <div class="w-[90%] mx-auto">
            <button class="btn-primary my-3 mx-auto text-[30px]" @click="chamCong">Chấm công</button>
        </div>
        <div class="w-[90%] mx-auto mt-10">
            <h1>{{ regu?.title }}</h1>
            <h1> _ {{ regu?.morning }}</h1>
            <h1> _ {{ regu?.afternoon }}</h1>
        </div>
        <div class="w-[90%] mx-auto mt-10">
            <EasyDataTable :headers="headers" :items="list" header-text-direction="center" :table-class-name="currentTheme"
                body-text-direction="center">
                <template #item-fullname="item">
                    <div>
                        {{ item.applicationUser?.fullname }}
                    </div>
                </template>
                <template #item-email="item">
                    <div>
                        {{ item.applicationUser?.email }}
                    </div>
                </template>
                <template #item-date="item">
                    <div>
                        {{ convertDate(item.day) }}
                    </div>
                </template>
                <template #item-startTime="item">
                    <div>
                        {{ convertDate(item.startTime) }}
                    </div>
                </template>
                <template #item-endTime="item">
                    <div>
                        {{ convertDate(item.endTime) }}
                    </div>
                </template>
                <template #item-timeWork="item">
                    <div>
                        {{ convertTime(item.timeWork) }} tiếng
                    </div>
                </template>

            </EasyDataTable>
        </div>
        <Loading v-show="isLoading" />
    </div>
</template>
<script>
import Loading from '../components/Loading.vue'
import API from '../API'
import swal from '../utilities/swal2'
import functionCustom from '../utilities/functionCustom'
import { useThemeStore } from '../stores/theme'
export default {
    components: {
        Loading
    },
    setup() {
        const themeStore = useThemeStore()
        return { themeStore }
    },
    data() {
        return {
            list: [],
            isLoading: false,
            regu: null,
            notiPage: 1,
            page: 1,
            noti: [],
            currentTheme: "",
            empList: [],
            acceptanceTypeList: [],
            curIP: '',
            isShowSelected: false,
            id: '',
            headers: [
                { text: "Tên nhân viên", value: "fullname", width: 200 },
                { text: "Email", value: "email", width: 200 },
                { text: "Ngày", value: "date", width: 200 },
                { text: "Thời gian bắt đầu", value: "startTime", width: 200 },
                { text: "Thời gian kết thúc", value: "endTime", width: 200 },
                { text: "Ca làm", value: "shiftEnum", width: 200 },
                { text: "Thời gian làm việc", value: "timeWork", width: 200 },
            ]
        }
    },
    created() {
        this.getList()
        this.getQuyDinh()
        // this.getNoti()
        this.setTheme()
        this.getCurrentWifi()
    },
    watch: {
        'themeStore.getTheme': function (val) {
            this.currentTheme == 'light-theme' ? this.currentTheme = 'dark-theme' : this.currentTheme = 'light-theme'
        }
    },
    methods: {
        getQuyDinh() {
            API.getRegulations()
                .then(res => {
                    this.regu = res.data
                })
                .catch(err => {
                    swal.error(err)
                })
        },
        getCurrentWifi() {
            this.isLoading = true
            API.getOnlyIP()
                .then(res => {
                    // this.curName = res.data.result.nameWifi
                    this.curIP = res.data.ipString
                    this.isLoading = false
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err)
                })
        },
        async getNoti() {
            await API.getNotification(this.notiPage)
                .then(res => {
                    this.noti = res.data.items
                    let finalNoti = []
                    this.noti.map(item => {
                        finalNoti.push(item.description)
                    })
                    const notification = finalNoti.join('\n')
                    swal.info(notification, 8000)
                })
                .catch(err => swal.error(err))
        },
        getList() {
            API.getListCurrentDay()
                .then(res => {
                    this.list = res.data
                    if (Array.isArray(this.list)) return
                    else this.list = []
                })
                .catch(err => {
                    if (err.response?.data) return swal.info(err.response?.data)
                    else swal.info('Bạn chưa thực hiện chấm công ngày hôm nay')
                })
        },
        convertDate(date) {
            return functionCustom.convertDate(date)
        },
        convertTime(time) {
            if (time == null || time == NaN || time == undefined) return 0
            else return time.toFixed(3)
        },
        chamCong() {
            this.isLoading = true
            API.chamCongV2(this.curIP)
                .then(res => {
                    swal.success('Chấm công thành công')
                    this.getList()
                    this.isLoading = false
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err.response.data)
                })
        },
        setTheme() {
            let curr = this.themeStore.getTheme
            this.currentTheme = curr == 'auto' ? 'dark-theme' : 'light-theme'
        }
    }
}
</script>