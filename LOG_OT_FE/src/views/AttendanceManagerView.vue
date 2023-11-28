<template>
    <div>
        <div class="bg-white w-full p-3">
            <!-- <button @click="createDepartmentForm" class="custom-btn mb-2 sm:mb-5 text-xs sm:text-base">Tạo phòng ban mới</button> -->
            <div class="w-full flex flex-wrap items-center justify-around my-5">
                <div class="my-5">
                    <label class="border-b-2 border-black dark:border-white" for="date">{{ $t('choose start ot date')
                    }}</label>
                    <input v-model="fromDate" type="datetime-local" id="date"
                        class="mx-4 dark:bg-[#292e32] bg-gray-100 px -2 py-1">
                </div>
                <div class="my-5">
                    <label class="border-b-2 border-black dark:border-white" for="date">{{ $t('choose end ot date')
                    }}</label>
                    <input v-model="toDate" type="datetime-local" id="date"
                        class="mx-4 dark:bg-[#292e32] bg-gray-100 px-2 py-1">
                </div>
                <button @click="searByDate" class="custom-btn">{{ $t('save') }}</button>
            </div>
            <div class="w-full flex flex-wrap items-center justify-around my-5">
                <div class="my-5">
                    <label class="border-b-2 border-black dark:border-white" for="date">Search bằng Username</label>
                    <input v-model="userName" type="text" id="date" class="mx-4 dark:bg-[#292e32] bg-gray-100 px-2 py-1">
                </div>
                <button @click="getByUserName" class="custom-btn">{{ $t('save') }}</button>
                <button @click="reset" class="custom-btn">Reset danh sách</button>
            </div>
            <div class="w-[90%] mx-auto">
                <EasyDataTable :headers="headers" :items="items" :table-class-name="currentTheme"
                    header-text-direction="center" body-text-direction="center">
                    <template #item-day="item">
                        {{ convertDate(item.day) }}
                    </template>
                    <template #item-startTime="item">
                        {{ convertDate(item.startTime) }}
                    </template>
                    <template #item-endTime="item">
                        {{ convertDate(item.endTime) }}
                    </template>
                    <template #item-timeWork="item">
                        {{ convertTime(item.timeWork) }} Tiếng
                    </template>
                    <template #item-overTime="item">
                        {{ convertTime(item.oveTime) }} Tiếng
                    </template>
                    <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
                        <button class="cursor-pointer mx-3" @click="page > 1 ? page -= 1 : page = 1"><font-awesome-icon
                                icon="fa-solid fa-chevron-left" /></button>
                        <button class="cursor-pointer mx-3"
                            @click="page < lastPage ? page += 1 : page = 1"><font-awesome-icon
                                icon="fa-solid fa-chevron-right" /></button>
                    </template>
                </EasyDataTable>
            </div>
        </div>
        <Loading v-show="isLoading" />
    </div>
</template>
<script>
import Loading from '../components/Loading.vue'
import API from '../API';
import functionCustom from '../utilities/functionCustom';
import swal from '../utilities/swal2';

export default {
    components: {
        Loading
    },
    data() {
        return {
            headers: [
                //{ text: "Mã phòng ban", value: "id", width: 100, fixed: "left", },             
                { text: "Username", value: "applicationUser.userName", width: 200, fixed: "left" },
                { text: "Ngày", value: "day", width: 200, },
                { text: "Thời gian bắt đầu", value: "startTime", width: 200, },
                { text: "Thời gian kết thúc", value: "endTime", width: 200, },
                { text: "Ca làm", value: "shiftEnum", width: 200, },
                { text: "Thời gian làm", value: "timeWork", width: 200, },
                { text: "Thời gian tăng ca", value: "overTime", width: 200, }
            ],
            items: [],
            isShow: false,
            isLoading: false,
            isShow2: false,
            userName: '',
            page: 1,
            lastPage: 0,
            fromDate: '',
            toDate: ''
        }
    },
    methods: {
        convertTime(time) {
            if (time == null || time == undefined || time == NaN) return 0
            else return Number.parseFloat(time).toFixed(3)
        },
        getAttendanceManager() {
            this.isLoading = true
            API.getAttendanceManager(this.page)
                .then(response => {
                    this.isLoading = false
                    this.items = response.data.items
                    this.lastPage = response.data.totalPages
                })
                .catch(error => {
                    this.isLoading = false
                    swal.error(error)
                });
        },
        getByUserName() {
            this.isLoading = true
            API.getAttendanceByUsername(this.userName)
                .then(response => {
                    this.isLoading = false
                    this.page = 1
                    this.items = response.data.items
                })
                .catch(error => {
                    this.isLoading = false
                    swal.error(error.response.data)
                });
        },
        searByDate() {
            if (this.fromDate == '' || this.toDate == '') return swal.error('Bạn phải nhập đủ ngày bắt đầu và ngày kết thúc để tìm kiếm')
            if (this.fromDate > this.toDate) return swal.error('Ngày bắt đầu không thể lớn hơn ngày kết thúc')
            this.isLoading = true
            API.getAttendanceByFilter(this.fromDate, this.toDate)
                .then(response => {
                    this.isLoading = false
                    this.page = 1
                    this.items = response.data.list.items
                })
                .catch(error => {
                    this.isLoading = false
                    swal.error(error.response.data)
                });
        },
        reset() {
            this.getAttendanceManager();
            this.userName = ""
        },
        convertDate(date) {
            return functionCustom.convertDate(date)
        },
    },
    watch: {
        'page': function (val) {
            this.getAttendanceManager()
        },
    },
    created() {
        this.getAttendanceManager();
    },
    computed: {
    },
}


</script>
<style scoped>
.custom-btn {
    padding: 0.5em 2em;
    border: transparent;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    background: rgb(248 113 113 / var(--tw-bg-opacity));
    ;
    color: white;
    border-radius: 4px;
}

.custom-btn:hover {
    background: rgb(2, 0, 36);
    background: linear-gradient(90deg, rgb(17, 129, 241) 0%, rgb(64, 85, 247) 100%);
}

.custom-btn:active {
    transform: translate(0em, 0.2em);
}
</style>