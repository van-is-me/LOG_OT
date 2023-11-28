<template>
    <div class="bg-white">
        <button class="btn-primary my-3" @click="showCreate">Tạo mới</button>
        <div class="w-[90%] mx-auto mt-10">
            <EasyDataTable :headers="headers" :items="list" header-text-direction="center" :table-class-name="currentTheme"
                body-text-direction="center">
                <template #item-birthDay="item">
                    <div>
                        {{ convertDate(item.birthDate) }}
                    </div>
                </template>
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button class="edit-btn" @click="showUpdate(item)"><font-awesome-icon
                                icon="fa-solid fa-pen-to-square" /></button>
                        <button @click="deleteM(item.id)" class="delete-btn"><font-awesome-icon
                                :icon="['fas', 'trash']" /></button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
        <div @click.self="cancelAll" v-show="isShow" class="fog-l">
            <div class="w-[90%] lg:w-[60%] bg-white max-h-[90vh] overflow-y-scroll">
                <div class="w-full flex items-center justify-center flex-wrap">
                    <div class="box-input w-[86%] lg:w-[40%]">
                        <label for="birthday">Sinh nhật</label>
                        <input type="datetime-local" id="birthday" v-model="birthDate"
                            class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                    <div class="box-input w-[88%] lg:w-[40%]">
                        <label for="name">Tên</label>
                        <input type="text" id="name" v-model="name" class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                    <div class="box-input w-[88%] lg:w-[40%]">
                        <label for="desc">Mô tả</label>
                        <input type="text" id="desc" v-model="desciption"
                            class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                    <div class="box-input w-[88%] lg:w-[40%]">
                        <label for="name">Mối quan hệ</label>
                        <input type="text" id="name" v-model="relationship"
                            class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                </div>
                <div class="w-full flex justify-center">
                    <div v-show="isUpdate" class="box-input w-[88%] my-2 mx-auto">
                        <label for="emp" class="dark:text-white">Nhân viên</label>
                        <input type="text" id="emp" v-model="selectedEmp" disabled
                            class="input-cus dark:bg-gray-900 dark:text-white cursor-not-allowed">
                    </div>
                </div>
                <div v-show="isCreate" class="w-[88%] mb-4 dark:text-black mx-auto">
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
                <div class="w-[86%] my-3 mx-auto flex justify-end">
                    <button class="cancel-btn" @click="cancelAll">Huỷ</button>
                    <button @click="actionUpdate" v-if="isUpdate" class="edit-btn">Chỉnh sửa</button>
                    <button v-if="isCreate" @click="actionCreate" class="btn-primary">Tạo mới</button>
                </div>
            </div>
        </div>
        <Loading v-show="isLoading" />
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
            empList: [],
            isLoading: false,
            empPage: 1,
            page: 1,
            isShow: false,
            isCreate: false,
            isUpdate: false,
            isShowSelected: false,
            selectedEmp: 'Chọn nhân viên',
            selectedEmpId: '',
            name: '',
            birthDate: '',
            desciption: '',
            relationship: '',
            id: '',
            acceptanceType: 1,
            headers: [
                //{ text: "Tên nhân viên", value: "applicationUserId", width: 200 },
                { text: "Tên", value: "name", width: 200, fixed: "left" },
                { text: "Sinh nhật", value: "birthDay", width: 200 },
                { text: "Mô tả", value: "desciption", width: 200 },
                { text: "Mối quan hệ", value: "relationship", width: 200 },
                { text: "Acceptance Type", value: "acceptanceType", width: 200 },
                { text: "Hành động", value: "operation", width: 400 },
            ]
        }
    },
    created() {
        this.getList()
        this.getEmpList()
    },
    methods: {
        getList() {
            this.isLoading = true
            API.getDependentList(this.page)
                .then(res => {
                    this.isLoading = false
                    this.list = res.data.result.items
                })
                .catch(err => {
                    swal.error(err)
                    this.isLoading = false
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
        actionCreate() {
            this.isLoading = true
            const data = {
                applicationUserId: this.selectedEmpId,
                name: this.name,
                birthDate: this.birthDate,
                desciption: this.desciption,
                relationship: this.relationship
            }
            API.createDependent(data)
                .then(res => {
                    this.isLoading = false
                    swal.success('Tạo mới thành công')
                    this.cancelAll()
                    this.getList()
                })
                .catch(err => {
                    swal.error(err)
                    this.isLoading = false
                })
        },
        convertDate(date) {
            return functionCustom.convertDate(date)
        },
        showUpdate(item) {
            this.isShow = true
            this.isUpdate = true
            this.selectedEmpId = item.applicationUserId
            this.name = item.name
            this.birthDate = item.birthDate
            this.id = item.id
            this.desciption = item.desciption
            this.relationship = item.relationship
            this.acceptanceType = item.acceptanceType == 'Accept' ? 1 : item.acceptanceType == 'Deny' ? 2 : 3


            const currEmp = this.empList.find(em => em.id == this.selectedEmpId)
            this.selectedEmp = currEmp.userName
        },
        deleteM(id) {
            swal.confirm('Bạn có chắc chắn muốn xoá?').then(result => {
                if (result.value) {
                    API.deleteDependent(id)
                        .then(res => {
                            swal.success('Xoá thành công')
                            this.getList()
                        })
                        .catch(err => swal.error(err))
                }
            })
        },
        actionUpdate() {
            this.isLoading = true
            const data = {
                id: this.id,
                name: this.name,
                birthDate: this.birthDate,
                acceptanceType: this.acceptanceType,
                desciption: this.desciption,
                relationship: this.relationship
            }

            API.updateDependent(data)
                .then(res => {
                    this.isLoading = false
                    swal.success('Cập nhật thông tin thành công')
                    this.getList()
                    this.cancelAll()
                })
                .catch(er => {
                    swal.error(er)
                    this.isLoading = false
                })
        },
        closeSelect() {
            this.isShowSelected = false
        },
        cancelAll() {
            this.isCreate = false
            this.isShow = false
            this.isUpdate = false
            this.selectedEmp = 'Chọn nhân viên'
            this.selectedEmpId = ''
            this.name = ''
            this.birthDate = ''
            this.desciption = ''
            this.relationship = ''
            this.id = ''
        },
        actionSelectEmp(id, username) {
            this.selectedEmp = username
            this.selectedEmpId = id
        },
    }
}
</script>