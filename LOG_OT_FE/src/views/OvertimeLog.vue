<template>
    <div class="bg-white">
        <button class="btn-primary my-3" @click="showCreate">Tạo mới</button>
        <div class="w-[90%] mx-auto mt-10">
            <EasyDataTable :headers="headers" :items="list" header-text-direction="center" :table-class-name="currentTheme"
                body-text-direction="center">
                <template #item-userName="item">
                    <div>
                        {{ item.applicationUser.userName }}
                    </div>
                </template>
                <template #item-fullname="item">
                    <div>
                        {{ item.applicationUser.fullname }}
                    </div>
                </template>
                <template #item-email="item">
                    <div>
                        {{ item.applicationUser.email }}
                    </div>
                </template>
                <template #item-date="item">
                    <div>
                        {{ convertDate(item.date) }}
                    </div>
                </template>
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button class="delete-btn" @click="showUpdate(item)"><font-awesome-icon
                                :icon="['fas', 'trash']" /></button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
        <div @click.self="cancelAll" v-show="isShow" class="fog-l">
            <div class="w-[90%] lg:w-[60%] bg-white overflow-y-scroll max-h-[90vh]">
                <div class="w-full flex flex-wrap items-center justify-center">
                    <div class="box-input w-[90%] lg:w-[30%]">
                        <label for="hours">Số giờ</label>
                        <input v-model="overtimeLog.hours" id="hours" type="number" class="input-cus w-full" placeholder="0"
                            max="12" min="1" maxlength="2" minlength="1">
                    </div>
                    <div class="box-input w-[90%] lg:w-[50%]">
                        <label for="emp">Nhân viên</label>
                        <select v-model="overtimeLog.employeeId" class="select-cus" name="" id="emp">
                            <option :value="emp.id" v-for="emp in employeeList" :key="emp.id">
                                Họ và tên: {{ emp.fullname }} | Email: {{ emp.email }}
                            </option>
                        </select>
                    </div>
                </div>
                <div v-show="isUpdate" class="w-full flex justify-center">
                    <div class="box-input w-[88%]">
                        <label for="acceptanceType">Acceptance Type</label>
                        <select class="select-cus" v-model="selectedStatus" @change="checkType" name="" id="">
                            <option v-for="acc in logStatus" :value="acc.value">{{ acc.display }}</option>
                        </select>
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <div class="box-input w-[88%]">
                        <label for="denyReason">Lý do từ chối</label>
                        <input type="text" id="denyReason" v-model="cancelReason" :disabled="isAllowInput"
                            class="input-cus dark:bg-gray-900 dark:text-white" :class="isAllowInput ? 'cursor-not-allowed' : ''">
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <div class="box-input w-[90%] lg:w-[87%]">
                        <label for="date">Ngày</label>
                        <input :value="formattedDatetime" @input="updateDatetime" type="datetime-local" id="date"
                            class="input-cus w-full">
                    </div>
                </div>
                <div class="w-[86%] mx-auto flex justify-end">
                    <button class="cancel-btn" @click="cancelAll">Huỷ</button>
                    <button v-if="isUpdate" @click="actionUpdate" class="edit-btn">Chỉnh sửa</button>
                    <button v-if="isCreate" @click="actionCreate" class="btn-primary">Tạo mới</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../API'
import functionCustom from '../utilities/functionCustom'
import swal from '../utilities/swal2'
export default {
    data() {
        return {
            list: [],
            employeeList: [],
            employeePage: 1,
            selectedStatus: '',
            isShow: false,
            isCreate: false,
            isUpdate: false,
            logStatus: [],
            isAllowInput: true,
            cancelReason: '',
            id: '',
            page: 1,
            overtimeLog: {
                date: '2023-01-01T00:00:00.070Z',
                hours: 1,
                employeeId: ''
            },
            headers: [
                // { text: "Tên tài khoản", value: "userName", width: 200 },
                // { text: "Họ và Tên", value: "fullname", width: 200 },
                // { text: "Email", value: "email", width: 200 },
                { text: "Ngày đăng ký OT", value: "date", width: 200, fixed: "left" },
                { text: "Số giờ OT", value: "hours", width: 200 },
                { text: "Trạng thái", value: "status", width: 200 },
                { text: "Lý do huỷ", value: "cancelReason", width: 200 },
                { text: "Hành động", value: "operation", width: 400 },
            ]
        }
    },
    created() {
        this.getList()
        this.getEmployeeList()
        this.getEnum()
    },
    computed: {
        formattedDatetime() {
            const date = new Date(this.overtimeLog.date)
            const formatted = date.toISOString().slice(0, 16)
            return formatted
        }
    },
    methods: {
        getList() {
            API.getOverTimeLogList(this.page)
                .then(res => {
                    this.list = res.data.items
                })
                .catch(err => swal.error(err))
        },
        getEmployeeList() {
            API.getListEmployee(this.employeePage)
                .then(res => {
                    this.employeeList = res.data.items
                })
                .catch(err => swal.error(err))
        },
        getEnum() {
            API.logStatus()
                .then(res => {
                    this.logStatus = res.data
                })
                .catch(err => swal.error(err))
        },
        checkType() {
            if(this.selectedStatus == '3') this.isAllowInput = false
            else this.isAllowInput = true
        },
        updateDatetime(event) {
            const selectedDatetime = event.target.value
            const date = new Date(selectedDatetime)
            this.overtimeLog.date = date.toISOString()
        },
        convertDate(date) {
            return functionCustom.convertDate(date)
        },
        showCreate() {
            this.isShow = true
            this.isCreate = true
        },
        actionUpdate() {
            API.updateOTLog(this.id, this.selectedStatus, this.cancelReason)
            .then(res => {
                swal.success('Chỉnh sửa thành công')
            })
            .catch(err => swal.error(err))
        },
        actionCreate() {
            API.createOTLog(this.overtimeLog)
                .then(res => {
                    this.getList()
                    this.cancelAll()
                    swal.success('Đã tạo mới thời gian làm thêm cho nhân viên thành công', 3000)
                })
                .catch(err => {
                    swal.error(err.response.data)
                })
        },
        cancelAll() {
            this.isCreate = false
            this.isShow = false
            this.isUpdate = false
            this.id = ''
            this.overtimeLog = {
                date: '2023-01-01T00:00:00.070Z',
                hours: 1,
                employeeId: ''
            }
        },
        showUpdate(item) {
            // this.isShow = true
            // this.isUpdate = true
            // this.overtimeLog.date = item.date
            // this.overtimeLog.employeeId = item.applicationUser.id
            // this.overtimeLog.hours = item.hours
            // this.id = item.id
            // this.selectedStatus = item.status
            swal.confirm('Bạn có chắc chắn muốn xoá?').then(result => {
                if(result.value) {
                    API.deleteLogOT(item.id)
                    .then(res => {
                        swal.success('Xoá thành công')
                        this.getList()
                    })
                    .catch(err => swal.error(err))
                }
            })
        },
    }
}
</script>