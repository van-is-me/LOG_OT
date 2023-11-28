<template>
    <div class="bg-white">
        <div class="w-[90%] mx-auto flex flex-wrap">
            <div class="box-input w-[86%] lg:w-[40%]">
                <label for="fd">Từ ngày</label>
                <input type="date" id="fd" v-model="fromDate" class="input-cus dark:bg-gray-900 dark:text-white">
            </div>
            <div class="box-input w-[86%] lg:w-[40%]">
                <label for="td">Đến ngày</label>
                <input type="date" id="td" v-model="toDate" class="input-cus dark:bg-gray-900 dark:text-white">
            </div>
        </div>
        <div class="mx-auto w-[90%]">
            <button class="btn-primary" @click="filter">Tìm kiếm</button>
            <button class="btn-primary" @click="resetList">Đặt lại</button>
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
                <template #pagination="{ prevPage, nextPage, isFirstPage, isLastPage }">
                    <button class="cursor-pointer mx-3" @click="page > 1 ? page -= 1 : page = 1"><font-awesome-icon
                            icon="fa-solid fa-chevron-left" /></button>
                    <button class="cursor-pointer mx-3" @click="page < lastPage ? page += 1 : page = 1"><font-awesome-icon
                            icon="fa-solid fa-chevron-right" /></button>
                </template>
            </EasyDataTable>
        </div>
        <Loading v-show="isLoading" />
    </div>
</template>
<script>
import API from '../API'
export default {
    data() {
        return {
            page: 1,
            lastPage: 1,
            isLoading: false,
            list: [],
            fromDate: '',
            toDate: '',
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
    },
    watch: {
        'page': function (val) {
            this.getList()
        },
    },
    methods: {
        getList() {
            this.isLoading = true
            API.getAttendanceEmployeeList(this.page)
                .then(res => {
                    this.isLoading = false
                    this.list = res.data.items
                    this.lastPage = res.data.totalPages
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err)
                })
        },
        filter() {
            if (this.fromDate > this.toDate) return swal.error('Bạn không thể lọc với ngày bắt đầu lớn hơn ngày kết thúc')
            this.isLoading = true
            this.page = 1
            API.getAttendanceEmployeeListFilter(this.page, this.fromDate, this.toDate)
                .then(res => {
                    this.isLoading = false
                    this.list = res.data.list.items
                    this.lastPage = res.data.list.totalPages
                    this.fromDate = ''
                    this.toDate = ''
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error('Có lỗi xảy ra, vui lòng thử lại')
                })
        },
        convertDate(date) {
            return functionCustom.convertDate(date)
        },
        convertTime(time) {
            if (time == null || time == NaN || time == undefined) return 0
            else return time.toFixed(3)
        },
        resetList() {
            this.page = 1
            this.getList()
        }
    }
}
</script>