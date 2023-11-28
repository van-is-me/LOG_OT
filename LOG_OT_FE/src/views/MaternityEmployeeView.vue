<template>
    <div class="bg-white">
        <button class="btn-primary my-3" @click="showCreate">Tạo mới</button>
        <div class="w-[90%] mx-auto mt-10">
            <EasyDataTable :headers="headers" :items="list" header-text-direction="center" :table-class-name="currentTheme"
                body-text-direction="center">
                <template #item-applicationUserId="item">
                    {{ item.applicationUser.fullname }}
                </template>
                <template #item-birthDay="item">
                    <div>
                        {{ convertDate(item.birthDay) }}
                    </div>
                </template>
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <!-- <button class="edit-btn" @click="showUpdate(item)"><font-awesome-icon
                                icon="fa-solid fa-pen-to-square" /></button> -->
                        <button @click="deleteM(item.id)" class="delete-btn"><font-awesome-icon
                                :icon="['fas', 'trash']" /></button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
        <div @click.self="cancelAll" v-show="isShow" class="fog-l">
            <div class="w-[90%] md:w-[50%] lg:w-[30%]  dark:bg-[#292e32] flex flex-col items-center bg-white max-h-[90vh]">
                <div class="box-input w-[88%]">
                    <label for="birthday">Sinh nhật</label>
                    <input type="datetime-local" id="birthday" v-model="birthDay"
                        class="input-cus dark:bg-gray-900 dark:text-white  ">
                </div>
                <div v-show="isUpdate" class="box-input w-[88%] my-2 mx-auto">
                    <label for="emp" class="dark:text-white">Nhân viên</label>
                    <input type="text" id="emp" v-model="selectedEmp" disabled
                        class="input-cus dark:bg-gray-900 dark:text-white cursor-not-allowed">
                </div>
                <div v-show="isCreate" class="w-[88%] mb-4 dark:text-black">
                    <label class="dark:text-white" for="denyReason">Nhân viên</label>
                    <div class="bg-[#dbdbdb]  rounded-xl w-full relative cursor-pointer">
                        <p @click="isShowSelected = !isShowSelected" v-click-outside-element="closeSelect"
                            class="w-full text-center top-0 left-0 px-[14px] py-[12px]">{{ selectedEmp }}</p>
                        <div v-show="isShowSelected"
                            class="absolute top-[105%] left-0 w-full bg-[#dbdbdb] px-[14px] py-[12px] rounded-xl flex flex-col items-center h-[20vh] lg:h-[30vh] overflow-y-scroll">
                            <div @click="actionSelectEmp(emp.id, emp.userName)" class="w-full hover:bg-gray-300 my-2"
                                v-for="emp in empList" :key="emp.id">
                                Tên tài khoản: {{ emp.userName }} <br>
                                Email: {{ emp.fullname }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex items-center">
                    <button class="cancel-btn" @click="cancelAll">Huỷ</button>
                    <button v-if="isUpdate" class="edit-btn" @click="actionUpdate">Chỉnh sửa</button>
                    <button v-if="isCreate" @click="actionCreate" class="btn-primary">Tạo mới</button>
                </div>
            </div>
        </div>
        <Loading v-show="isLoading" />
    </div>
</template>
<script>
import API from '../API'
import swal from '../utilities/swal2'
import functionCustom from '../utilities/functionCustom'
export default {
    data() {
        return {
            list: [],
            page: 1,
            empList: [],
            isLoading: false,
            acceptanceTypeList: [],
            isAllowInput: true,
            isShowSelected: false,
            selectedEmp: 'Chọn nhân viên',
            selectedEmpId: '',
            imageUrl: 'https://placehold.co/600x400',
            empPage: 1,
            id: '',
            isShow: false,
            isCreate: false,
            isUpdate: false,
            birthDay: '',
            acceptanceType: 1,
            denyReason: '',
            headers: [
                { text: "Tên nhân viên", value: "applicationUserId", width: 200 },
                { text: "Ngày dự sinh", value: "birthDay", width: 200 },
                // { text: "Lý do từ chối", value: "denyReason", width: 200 },
                // { text: "Acceptance Type", value: "acceptanceType", width: 200 },
                { text: "Hành động", value: "operation", width: 200 },
            ]
        }
    },
    created() {
        this.getList()
        this.getEmpList()
        this.getEnums()
    },
    methods: {
        getList() {
            this.isLoading = true
            API.getMaternityEmployeeList(this.page)
                .then(res => {
                    this.isLoading = false
                    this.list = res.data.result.items
                })
                .catch(err => {
                    swal.error(err)
                    this.isLoading = false
                })
        },
        getEnums() {
            API.getListAcceptanceType()
                .then(res => {
                    this.acceptanceTypeList = res.data
                })
        },
        getEmpList() {
            API.getListEmployee(this.empPage)
                .then(res => {
                    this.empList = res.data.items
                })
                .catch(err => swal.error(err))
        },
        showCreate() {
            this.isShow = true
            this.isCreate = true
        },
        closeSelect() {
            this.isShowSelected = false
        },
        convertDate(date) {
            return functionCustom.convertDate(date)
        },
        showUpdate(item) {

            const inputDateTime = item.birthDay
            const formattedDateTime = inputDateTime.replace(' ', 'T').substring(0, 16)

            this.isShow = true
            this.isUpdate = true
            this.selectedEmpId = item.applicationUserId
            this.imageUrl = item.image
            this.acceptanceType = item.acceptanceType == 'Accept' ? 1 : item.acceptanceType == 'Deny' ? 2 : 3
            this.denyReason = item.denyReason
            this.birthDay = formattedDateTime
            this.id = item.id

            const currEmp = this.empList.find(em => em.id == this.selectedEmpId)
            this.selectedEmp = currEmp.userName
        },
        checkType() {
            if (this.acceptanceType == '2') this.isAllowInput = false
            else this.isAllowInput = true
        },
        deleteM(id) {
            swal.confirm('Bạn có chắc chắn muốn xoá?').then(result => {
                if (result.value) {
                    API.deleteMaternityEmployee(id)
                        .then(res => {
                            swal.success('Xoá thành công')
                            this.getList()
                        })
                        .catch(err => swal.error(err))
                }
            })
        },
        actionCreate() {
            this.isLoading = false
            const data = {
                applicationUserId: this.selectedEmpId,
                image: this.imageUrl,
                birthDay: this.birthDay != '' ? this.birthDay : null,
                acceptanceType: this.acceptanceType,
                denyReason: this.denyReason != '' ? this.denyReason : null
            }
            API.createMaternityEmployee(data)
                .then(res => {
                    this.isLoading = false
                    swal.success('Tạo mới thành công')
                    this.getList()
                    this.cancelAll()
                })
                .catch(err => {
                    this.isLoading = false
                    if (err.response.data.errors) {
                        const listErr = err.response.data?.errors?.createMaternityEmployeeView.join('\n')
                        swal.error(listErr, 3000)
                    } else {
                        const listErr = err.response.data.join('\n')
                        swal.error(listErr, 3000)
                    }
                })
        },
        cancelAll() {
            this.isCreate = false
            this.isShow = false
            this.isUpdate = false
            this.selectedEmpId = ''
            this.selectedEmp = 'Chọn nhân viên'
            this.acceptanceType = 1
            this.birthDay = ''
            this.denyReason = ''
            this.imageUrl = 'https://placehold.co/600x400',
                this.id = ''
        },
        actionSelectEmp(id, username) {
            this.selectedEmp = username
            this.selectedEmpId = id
        },
        actionUpdate() {
            this.isLoading = true
            const data = {
                id: this.id,
                image: this.imageUrl,
                birthDay: this.birthDay,
                acceptanceType: this.acceptanceType,
                denyReason: this.denyReason
            }

            API.updateMaternityEmployee(data)
                .then(res => {
                    this.isLoading = false
                    swal.success('Cập nhật thông tin thành công')
                    this.getList()
                    this.cancelAll()
                })
                .catch(er => {
                    this.isLoading = false
                    swal.error(er)
                })
        }
    }
}
</script>