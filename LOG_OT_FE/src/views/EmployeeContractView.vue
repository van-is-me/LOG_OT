<template>
    <div>
        <div class="bg-white w-full p-3">
            <button @click="createEmployeeContractForm" class="custom-btn mb-2 sm:mb-5 text-xs sm:text-base">Tạo hợp đồng
                mới</button>
            <div class="mx-auto w-[90%]">
                <EasyDataTable :headers="headers" :items="items" :table-class-name="currentTheme" header-text-direction="center"
                body-text-direction="center">
                <template #item-basicSalary="item">
                    {{ convertVnd(item.basicSalary) }}
                </template>
                <template #item-insuranceAmount="item">
                    {{ convertVnd(item.insuranceAmount) }}
                </template>
                <template #item-startDate="item">
                    {{ convertDate(item.startDate) }}
                </template>
                <template #item-endDate="item">
                    {{ convertDate(item.endDate) }}
                </template>
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button @click="showDetail(item)" class="view-btn"><font-awesome-icon
                                icon="fa-solid fa-eye" /></button>
                        <button @click="updateEmployeeContractForm(item.id)" class="edit-btn"><font-awesome-icon
                                icon="fa-solid fa-pen-to-square" /></button>
                        <button @click="deleteEmployeeContract(item.id)" class="delete-btn"><font-awesome-icon
                                :icon="['fas', 'trash']" /></button>
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
        </div>
        <div v-show="isShow" class="h-screen w-screen bg-custom fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
            @click.self="isShow = false">
            <div
                class="w-[95%] sm:w-1/2 xl:w-1/2 bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-2xl pb-4 xl:pb-6">
                <div
                    class="w-full h-10 sm:h-10 text-center bg-red-400 text-white font-bold rounded-t-2xl text-sm sm:text-3xl flex justify-center items-center sm">
                    Tạo hợp đồng
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Tên tài khoản:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="username" placeholder="Nhập tài khoản">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Mã hợp đồng:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="contractCode" placeholder="Nhập mã hợp đồng">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>File:</span></label>
                        <!-- <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="file" placeholder="Nhập file"> -->
                        <div class="w-full flex items-center justify-around">
                            <input type="file" ref="pdfFile" accept="application/pdf">
                            <button @click="uploadPDF" class="btn-primary w-[50px]">Lưu</button>
                        </div>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Start Date:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3 " id="name"
                            type="datetime-local" v-model="startDate">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>End Date:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3 " id="name"
                            type="datetime-local" v-model="endDate">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Job:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="job" placeholder="Nhập job">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Lương cơ bản:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="number"
                            v-model="basicSalary" placeholder="Nhập lương cơ bản">
                    </div>
                    <!-- <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Khấu trừ (%):</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="number"
                            v-model="percentDeduction" placeholder="Nhập phần trăm khấu trừ">
                    </div> -->
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Loại lương:</span></label>
                        <select v-model="salaryTypeSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Loại hợp đồng:</span></label>
                        <select v-model="contractTypeSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options2" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Khấu trừ thuế:</span></label>
                        <select v-model="isPersonalTaxDeductionSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options3" :value="option.value">{{ option.label }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Loại bảo hiểm:</span></label>
                        <select v-model="insuranceTypeSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options4" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Tiền bảo hiểm:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="number"
                            v-model="insuranceAmount" placeholder="Nhập tiền bảo hiểm">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Loại phụ cấp:</span></label>
                        <select v-model="allowanceSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options5" :value="option.id">{{ option.name }}</option>
                        </select>
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="createEmployeeContract"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Tạo hợp đồng
                        </button>
                        <button @click="exit" type="exit" class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl">
                            Hủy tạo
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="isShow2" class="h-screen w-screen bg-custom fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
            @click.self="isShow2 = false">
            <div
                class="w-[95%] sm:w-1/2 xl:w-1/2 bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-2xl pb-4 xl:pb-6">
                <div
                    class="w-full h-10 sm:h-10 text-center bg-red-400 text-white font-bold rounded-t-2xl text-sm sm:text-3xl flex justify-center items-center sm">
                    Chỉnh sửa hợp đồng
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <!-- <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Tên tài khoản:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="username" placeholder="Nhập tài khoản">
                    </div> -->
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Mã hợp đồng:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="contractCode" placeholder="Nhập mã hợp đồng">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>File:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="file" placeholder="Nhập file">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Start Date:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3 " id="name"
                            type="datetime-local" v-model="startDate">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>End Date:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3 " id="name"
                            type="datetime-local" v-model="endDate">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Job:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="job" placeholder="Nhập job">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Lương cơ bản:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="number"
                            v-model="basicSalary" placeholder="Nhập lương cơ bản">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Trạng thái:</span></label>
                        <select v-model="statusSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options6" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <!-- <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Khấu trừ (%):</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="number"
                            v-model="percentDeduction" placeholder="Nhập phần trăm khấu trừ">
                    </div> -->
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Loại lương:</span></label>
                        <select v-model="salaryTypeSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Loại hợp đồng:</span></label>
                        <select v-model="contractTypeSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options2" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Khấu trừ thuế:</span></label>
                        <select v-model="isPersonalTaxDeductionSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options3" :value="option.value">{{ option.label }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Loại bảo hiểm:</span></label>
                        <select v-model="insuranceTypeSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options4" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Tiền bảo hiểm:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="number"
                            v-model="insuranceAmount" placeholder="Nhập tiền bảo hiểm">
                    </div>
                    <!-- <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Loại phụ cấp:</span></label>
                        <select v-model="allowanceSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options5" :value="option.id">{{ option.name }}</option>
                        </select>
                    </div> -->
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="updateEmployeeContractButton"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Chỉnh sửa hợp đồng
                        </button>
                        <button @click="exit2" type="exit"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl">
                            Hủy chỉnh sửa
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div @click.self="isShowDetail = false" v-show="isShowDetail" class="fog-l">
            <div class="w-[50%] rounded-md bg-white">
                <h1 class="text-center text-[29px] mt-5 font-bold">Chi tiết hợp đồng</h1>
                <div class="w-full flex justify-between px-5 my-6 items-start">
                    <div class="w-[45%]">
                        <p class="my-2"> <span class="font-bold">Nhân viên: </span>{{ itemDetail?.applicationUser?.fullname
                        }}</p>
                        <p class="my-2"> <span class="font-bold">Email: </span>{{ itemDetail?.applicationUser?.email }}</p>
                        <p class="my-2"> <span class="font-bold">Lương cơ bản: </span>{{
                            convertVnd(itemDetail?.basicSalary) }}</p>
                        <p class="my-2"> <span class="font-bold">Mã hợp đồng: </span>{{ itemDetail?.contractCode }}</p>
                        <p class="my-2"> <span class="font-bold">Loại hợp đồng: </span>{{ itemDetail?.contractType }}
                        </p>
                        <p class="my-2"> <span class="font-bold">File: </span>{{ itemDetail?.file }}</p>
                        <p class="my-2"> <span class="font-bold">Tiền bảo hiểm: </span>{{
                            convertVnd(itemDetail?.insuranceAmount) }}</p>
                        <p class="my-2"> <span class="font-bold">Loại bảo hiểm: </span>{{ itemDetail?.insuranceType }}</p>
                    </div>
                    <div class="w-[45%]">
                        <p class="my-2"> <span class="font-bold">Công việc: </span>{{ itemDetail?.job }}</p>
                        <p class="my-2"> <span class="font-bold">Trạng thái: </span>{{ itemDetail?.status }}</p>
                        <p class="my-2"> <span class="font-bold">Loại lương: </span>{{ itemDetail?.salaryType }}</p>
                        <p class="my-2"> <span class="font-bold">Ngày bắt đầu: </span>{{ itemDetail?.startDate }}</p>
                        <p class="my-2"> <span class="font-bold">Ngày kết thúc: </span>{{ itemDetail?.endDate }}</p>
                        <!-- <p class="my-2"> <span class="font-bold">Khấu trừ %: </span>{{ itemDetail?.percentDeduction }}</p> -->
                        <p class="my-2"> <span class="font-bold">Thuế cá nhân: </span>{{
                            itemDetail?.isPersonalTaxDeduction == true ? 'Có' : 'Không' }}</p>
                    </div>
                </div>
            </div>
        </div>
        <Loading v-show="isLoading" />
    </div>
</template>
<script>
import Loading from '../components/Loading.vue'
import API from '../API';
import functionCustom from '../utilities/functionCustom'
import swal from '../utilities/swal2';
import { storage } from '../firebase'

import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
export default {
    components: {
        Loading
    },
    data() {
        return {
            page: 1,
            lastPage: 1,
            isLoading: false,
            headers: [
                { text: "Mã hợp đồng", value: "contractCode", width: 140, fixed: "left"},
                { text: "Ngày bắt đầu", value: "startDate", width: 140, },
                { text: "Ngày kết thúc", value: "endDate", width: 140, },
                { text: "Công việc", value: "job", width: 140, },
                { text: "Lương cơ bản", value: "basicSalary", width: 140, },
                { text: "Trạng thái", value: "status", width: 140, },
                { text: "Loại lương", value: "salaryType", width: 140, },
                { text: "Loại hợp đồng", value: "contractType", width: 140, },
                { text: "Hành động", value: "operation", width: 300 },
            ],
            items: [],
            options: [],
            options2: [],
            options3: [
                { value: true, label: 'yes' },
                { value: false, label: 'no' },
            ],
            options4: [],
            options5: [],
            options6: [],
            id: '',
            isShowDetail: false,
            isShow: false,
            isShow2: false,
            username: '',
            contractCode: '',
            file: '',
            startDate: '',
            endDate: '',
            job: '',
            basicSalary: '',
            // percentDeduction: '',
            salaryTypeSelected: '',
            contractTypeSelected: '',
            isPersonalTaxDeductionSelected: '',
            insuranceTypeSelected: '',
            insuranceAmount: '',
            allowanceSelected: '',
            statusSelected: '',
            itemDetail: null
        }
    },
    watch: {
        'page': function (val) {
            this.getListEmployeeContract()
        },
    },
    methods: {
        resetFormCreate() {
            this.username = '',
                this.contractCode = '',
                this.file = '',
                this.startDate = '',
                this.endDate = '',
                this.job = '',
                this.basicSalary = '',
                // this.percentDeduction = '',
                this.salaryTypeSelected = '',
                this.contractTypeSelected = '',
                this.isPersonalTaxDeductionSelected = '',
                this.insuranceTypeSelected = '',
                this.insuranceAmount = '',
                this.allowanceSelected = '',
                this.statusSelected = ''
        },
        createEmployeeContractForm() {
            this.resetFormCreate()
            this.isShow = true
        },
        showDetail(item) {
            this.itemDetail = item
            this.isShowDetail = true
        },
        updateEmployeeContractForm(id) {
            this.isShow2 = true
            const currentEmployeeContract = this.items.find(item => item.id == id)
            this.id = currentEmployeeContract.id,
                this.contractCode = currentEmployeeContract.contractCode,
                this.file = currentEmployeeContract.file,
                this.startDate = currentEmployeeContract.startDate,
                this.endDate = currentEmployeeContract.endDate,
                this.job = currentEmployeeContract.job,
                this.basicSalary = currentEmployeeContract.basicSalary,
                this.statusSelected = this.options6.find(option => option.display == currentEmployeeContract.status).value,
                // this.percentDeduction = currentEmployeeContract.percentDeduction,
                this.salaryTypeSelected = this.options.find(option => option.display == currentEmployeeContract.salaryType).value,
                this.contractTypeSelected = this.options2.find(option => option.display == currentEmployeeContract.contractType).value,
                this.isPersonalTaxDeductionSelected = this.options3.find(option => option.value == currentEmployeeContract.isPersonalTaxDeduction).value,
                this.insuranceTypeSelected = this.options4.find(option => option.display == currentEmployeeContract.insuranceType).value,
                this.insuranceAmount = currentEmployeeContract.insuranceAmount
        },
        updateEmployeeContractButton() {
            const data = {
                id: this.id,
                contractCode: this.contractCode,
                file: this.file,
                startDate: this.startDate,
                endDate: this.endDate,
                job: this.job,
                status: this.statusSelected,
                // percentDeduction: this.percentDeduction,
                salaryType: this.salaryTypeSelected,
                contractType: this.contractTypeSelected,
                isPersonalTaxDeduction: this.isPersonalTaxDeductionSelected,
                insuranceType: this.insuranceTypeSelected,
                insuranceAmount: this.insuranceAmount,
                basicSalary: this.basicSalary,
            }
            API.updateEmployeeContract(data)
                .then(response => {
                    swal.success(response.data)
                    this.exit2()
                    this.getListEmployeeContract()
                })
                .catch(error => {
                    swal.error(error.data)
                });
        },
        uploadPDF() {
            this.isLoading = true
            const currentTime = new Date();
            const uniqueFileName = 'pdf_' + currentTime.getTime() + '.pdf';
            const storageRef = ref(storage, 'pdfs/' + uniqueFileName);

            uploadBytes(storageRef, this.$refs.pdfFile.files[0])
                .then(snapshot => {
                    return getDownloadURL(snapshot.ref);
                })
                .then(downloadURL => {
                    this.isLoading = false
                    this.file = downloadURL
                    swal.success('Tải file PDF lên thành công');
                })
                .catch(error => {
                    this.isLoading = false
                    swal.error('Lỗi khi tải file PDF lên:', error)
                })
        },
        deleteEmployeeContract(id) {
            swal.confirm('Bạn có chắc chắn xóa hợp đồng không?').then((result) => {
                if (result.value) {
                    API.deleteEmployeeContract(id)
                        .then(responsive => {
                            this.getListEmployeeContract()
                            swal.success(responsive.data.result)
                        })
                        .catch(error => {
                            swal.error('Không thể xóa hợp đồng đã hết hạn hoặc đang còn hạn!')
                        })
                }
            })
        },
        exit() {
            this.isShow = false
        },
        exit2() {
            this.isShow2 = false
        },
        getListEmployeeContract() {
            this.isLoading = true
            API.getListEmployeeContract(this.page)
                .then(response => {
                    this.isLoading = false
                    this.lastPage = response.data.totalPages
                    this.items = response.data.items.map(item => {
                        return {
                            id: item.id,
                            username: item.username,
                            applicationUser: item.applicationUser,
                            contractCode: item.contractCode,
                            file: item.file,
                            startDate: item.startDate,
                            endDate: item.endDate,
                            job: item.job,
                            basicSalary: item.basicSalary,
                            status: item.status,
                            // percentDeduction: item.percentDeduction,
                            salaryType: item.salaryType,
                            contractType: item.contractType,
                            isPersonalTaxDeduction: item.isPersonalTaxDeduction,
                            insuranceType: item.insuranceType,
                            insuranceAmount: item.insuranceAmount
                        }
                    })
                })
                .catch(error => {
                    this.isLoading = false
                    swal.error(error)
                });
        },
        convertVnd(price) {
            if (price == null || price == '' || price == NaN) return 0
            return functionCustom.convertVND(price)
        },
        convertDate(date) {
            return functionCustom.convertDate(date)
        },
        createEmployeeContract() {
            const data = {
                username: this.username,
                contractCode: this.contractCode,
                file: this.file,
                startDate: this.startDate,
                endDate: this.endDate,
                job: this.job,
                basicSalary: this.basicSalary,
                // percentDeduction: this.percentDeduction,
                salaryType: this.salaryTypeSelected,
                contractType: this.contractTypeSelected,
                isPersonalTaxDeduction: this.isPersonalTaxDeductionSelected,
                insuranceType: this.insuranceTypeSelected,
                insuranceAmount: this.insuranceAmount,
                allowance: this.allowanceSelected,
            }
            API.createEmployeeContract(data)
                .then(response => {
                    swal.success(response.data)
                    this.exit()
                    this.resetFormCreate()
                    this.getListEmployeeContract()
                })
                .catch(error => {
                    if (Array.isArray(error.data)) return swal.error(error.data[0])
                    else swal.error('Đã xảy ra lỗi, vui lòng thử lại hoặc liên hệ với quản lý')
                });
        },
        getListSalaryType() {
            API.getListSalaryType()
                .then(response => {
                    this.options = response.data
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        getListContractType() {
            API.getListContractType()
                .then(response => {
                    this.options2 = response.data
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        getListInsuranceType() {
            API.getListInsuranceType()
                .then(response => {
                    this.options4 = response.data
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        getListEmployeeContractStatus() {
            API.getListEmployeeContractStatus()
                .then(response => {
                    this.options6 = response.data
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        getListAllowance() {
            API.getAllListAllowance()
                .then(response => {
                    this.options5 = response.data.result.items
                })
                .catch(error => {
                    swal.error(error)
                });
        },
    },
    created() {
        this.getListEmployeeContract();
        this.getListContractType();
        this.getListSalaryType();
        this.getListInsuranceType();
        this.getListAllowance();
        this.getListEmployeeContractStatus();
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