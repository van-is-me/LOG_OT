<template>
    <div class="bg-white">

        <div class="w-[90%] mx-auto">
            <button class="btn-primary my-3 mx-auto text-[15px]" @click="actionExe"> Quản lý các tác vụ định kỳ </button>
        </div>
        <div class="w-[90%] mx-auto mt-10">
            <EasyDataTable :headers="headers" :items="list" header-text-direction="center" :table-class-name="currentTheme"
                body-text-direction="center">
                <template #item-actionDate="item">
                    <div>
                        {{ convertDate(item.actionDate) }}
                    </div>
                </template>
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button class="view-btn" @click="getDetail(item)"><font-awesome-icon
                                icon="fa-solid fa-eye" /></button>
                        <!-- <button class="edit-btn" @click="showUpdate(item)"><font-awesome-icon
                                icon="fa-solid fa-pen-to-square" /></button> -->
                        <!-- <button class="delete-btn"><font-awesome-icon :icon="['fas', 'trash']" /></button> -->
                    </div>
                </template>
            </EasyDataTable>
        </div>
        <div class="fog-l" v-show="isShow" @click.self="isShow = false">
            <div class="rounded-lg bg-white w-[90%] md:w-[50%] p-5 max-h-[90vh] overflow-y-scroll">
                <h1 v-if="currentJob.length > 0" class="text-center font-bold text-[20px] md:text-[30px]">Danh sách hợp đồng
                </h1>
                <div v-if="currentJob.length > 0" class="flex flex-col items-center w-full">
                    <div v-for="(i, index) in currentJob" class="w-[90%] mx-auto my-6">
                        <h1 class="text-[18px] md:text-[20px]">Hợp đồng số {{ index + 1 }}</h1>
                        <div class="w-full flex justify-around flex-col md:flex-row items-start flex-wrap">
                            <div class="w-full md:w-[45%]">
                                <p class="py-1"><span class="font-bold">Họ và tên: </span>{{ i?.employeeName }}</p>
                                <p class="py-1"><span class="font-bold">Mã hợp đồng: </span>{{ i?.contractCode }}</p>
                                <p class="py-1"><span class="font-bold">Trạng thái hợp đồng: </span>{{ i?.contractStatus }}
                                </p>
                                <p class="py-1"><span class="font-bold">Hành động: </span>{{ i?.action }}</p>
                            </div>
                            <div class="w-full md:w-[45%]">
                                <p class="py-1"><span class="font-bold">Công việc: </span>{{ i?.job }}</p>
                                <p class="py-1"><span class="font-bold">Ngày thực hiện: </span>{{ convertDate(i?.actionDate)
                                }}</p>
                                <p class="py-1"><span class="font-bold">Ngày bắt đầu: </span>{{ convertDate(i?.startDate) }}
                                </p>
                                <p class="py-1"><span class="font-bold">Ngày kết thúc: </span>{{ convertDate(i?.endDate) }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>


                <h1 v-if="currentJobQuit.length > 0" class="text-center font-bold text-[20px] md:text-[30px]">Danh sách hợp
                    đồng rời công ty</h1>
                <div v-if="currentJobQuit.length > 0" class="flex flex-col items-center w-full">
                    <div v-for="(i2, index2) in currentJobQuit" class="w-[90%] mx-auto my-6">
                        <h1 class="text-[18px] md:text-[20px]">Hợp đồng số {{ index2 + 1 }}</h1>
                        <div class="w-full flex justify-around flex-col md:flex-row items-start flex-wrap">
                            <div class="w-full md:w-[45%]">
                                <p class="py-1"><span class="font-bold">Họ và tên: </span>{{ i2?.fullName }}</p>
                                <p class="py-1"><span class="font-bold">Tên tài khoản: </span>{{ i2?.username }}</p>
                                <p class="py-1"><span class="font-bold">Email: </span>{{ i2?.email }}
                                </p>
                            </div>
                            <div class="w-full md:w-[45%]">
                                <p class="py-1"><span class="font-bold">Trạng thái công việc: </span>{{ i2?.workStatus }}
                                </p>
                                <p class="py-1"><span class="font-bold">Kiểu hành động: </span>{{ i2?.actionType }}</p>
                                <p class="py-1"><span class="font-bold">Ngày thực hiện: </span>{{
                                    convertDate(i2?.actionDate)
                                }} </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="w-full flex justify-end">
                    <export-excel :data="dataExcel" :fields="excelFields" :title="excelTitle" :name="excelFileName">
                        <button class="btn-primary">Tải xuống file Excel</button>
                    </export-excel>
                </div>
            </div>
        </div>
        <Loading v-show="isLoading" />
    </div>
</template>
<script>
import API from '../API'
import Loading from '../components/Loading.vue'
import functionCustom from '../utilities/functionCustom'
import swal from '../utilities/swal2';
export default {
    components: {
        Loading
    },
    data() {
        return {
            dataExcel: [],
            excelFields: {},
            list: [],
            excelFileName: '',
            excelTitle: '',
            page: 1,
            id: '',
            isLoading: false,
            currentJob: [],
            currentJobQuit: [],
            isShow: false,
            headers: [
                { text: "Tiêu đề", value: "title", width: 200 },
                { text: "Công việc", value: "job", width: 200 },
                { text: "Ngày", value: "actionDate", width: 200 },
                { text: "Loại", value: "actionType", width: 200 },
                { text: "Hành động", value: "operation", width: 100 },
            ],
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            API.getListJobReport(this.page)
                .then(res => {
                    this.list = res.data.result.items
                })
                .catch(err => {
                    swal.error(err.response.data)
                })
        },
        convertDate(date) {
            return functionCustom.convertDate(date)
        },
        actionExe() {
            const url = 'https://hrmanagerfpt.azurewebsites.net/hangfire';
            window.open(url, '_blank');
        },
        getDetail(item) {
            this.id = item.id
            this.isLoading = true
            this.isShow = true
            API.getDetailJobReport(item.id)
                .then(res => {
                    this.isLoading = false
                    this.currentJob = res.data.result.excelContracts
                    this.currentJobQuit = res.data.result.excelEmployeeQuits
                    this.excelFileName = item.title
                    if (this.currentJob.length != 0) {
                        this.excelTitle = 'Danh sách công việc'
                        this.dataExcel = this.currentJob
                        this.excelFields = {
                            'Họ và tên': 'employeeName',
                            'Mã hợp đồng': 'contractCode',
                            'Trạng thái hợp đồng': 'contractStatus',
                            'Ngày thực hiện': 'actionDate',
                            'Ngày bắt đầu': 'startDate',
                            'Ngày kết thúc': 'endDate',
                            'Hành động': 'action'
                        }
                    }
                    if (this.currentJobQuit.length != 0) {
                        this.excelTitle = 'Danh sách nhân viên nghỉ'
                        this.dataExcel = this.currentJobQuit
                        this.excelFields = {
                            'Họ và tên': 'fullName',
                            'Tên tài khoản': 'username',
                            'Email': 'email',
                            'Trạng thái làm việc': 'workStatus',
                            'Loại hành động': 'actionType',
                            'Ngày thực hiện': 'actionDate',
                        }
                    }

                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err)
                })
        },
        downloadExcel() {
            this.isLoading = true
            API.exportFileJobReport(this.id)
                .then(res => {
                    this.isLoading = false
                    const url = window.URL.createObjectURL(new Blob([res.data]))
                    const link = document.createElement('a')
                    link.href = url
                    link.setAttribute('download', `${this.title}.xlsx`)
                    document.body.appendChild(link)
                    link.click()
                })
                .catch(err => {
                    this.isLoading = false
                    console.log(err);
                })
        }
    }
}
</script>