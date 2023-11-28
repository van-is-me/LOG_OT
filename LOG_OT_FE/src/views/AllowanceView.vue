<template>
    <div>
        <div class="bg-white w-full p-3">
            <button @click="createAllowanceForm" class="custom-btn mb-2 sm:mb-5 text-xs sm:text-base">Tạo phụ cấp
                mới</button>
            <EasyDataTable :headers="headers" :items="items" :table-class-name="currentTheme" header-text-direction="center"
                body-text-direction="center">
                <template #item-amount="item">
                    <div>
                        {{ convertVND(item.amount) }}
                    </div>
                </template>
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button class="view-btn"><font-awesome-icon icon="fa-solid fa-eye" /></button>
                        <button @click="updateAllowanceForm(item.id)" class="edit-btn"><font-awesome-icon
                                icon="fa-solid fa-pen-to-square" /></button>
                        <button @click="deleteAllowance(item.id)" class="delete-btn"><font-awesome-icon
                                :icon="['fas', 'trash']" /></button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
        <div v-show="isShow" class="h-screen w-screen bg-custom fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
            @click.self="isShow = false">
            <div
                class="w-[95%] sm:w-1/2 xl:w-1/2 bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-2xl pb-4 xl:pb-6">
                <div
                    class="w-full h-10 sm:h-10 text-center bg-red-400 text-white font-bold rounded-t-2xl text-sm sm:text-3xl flex justify-center items-center sm">
                    Tạo phụ cấp
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Tên phụ cấp:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="name" placeholder="Nhập phụ cấp">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Tên thể loại:</span></label>
                        <select v-model="allowanceTypeSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Số tiền phụ cấp:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="number"
                            v-model="amount" placeholder="Nhập số tiền phụ cấp">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Tiêu chí:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="eligibility_Criteria" placeholder="Nhập tiêu chí">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Yêu cầu:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="requirements" placeholder="Nhập yêu cầu">
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="createAllowance"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Tạo phụ cấp
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
                    Chỉnh sửa phụ cấp
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Tên phụ cấp:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="name" placeholder="Nhập phụ cấp">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Tên thể loại:</span></label>
                        <select v-model="allowanceTypeSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Số tiền phụ cấp:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="number"
                            v-model="amount" placeholder="Nhập số tiền phụ cấp">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Tiêu chí:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="eligibility_Criteria" placeholder="Nhập tiêu chí">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Yêu cầu:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="requirements" placeholder="Nhập yêu cầu">
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="updateAllowanceButton"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Chỉnh sửa phụ cấp
                        </button>
                        <button @click="exit2" type="exit"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl">
                            Hủy chỉnh sửa
                        </button>
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
import functionCustom from '../utilities/functionCustom';
import swal from '../utilities/swal2';

export default {
    components: {
        Loading
    },
    data() {
        return {
            isLoading: false,
            headers: [
                //{ text: "Mã phòng ban", value: "id", width: 100, fixed: "left", },
                { text: "Tên phụ cấp", value: "name", width: 140, },
                { text: "Loại phụ cấp", value: "allowanceType", width: 140, },
                { text: "Số tiền", value: "amount", width: 140, },
                { text: "Tiêu chuẩn", value: "eligibility_Criteria", width: 140, },
                { text: "Yêu cầu", value: "requirements", width: 200, },
                { text: "Action", value: "operation", width: 300 },
            ],
            items: [],
            isShow: false,
            isShow2: false,
            name: '',
            id: '',
            allowanceType: '',
            amount: '',
            eligibility_Criteria: '',
            requirements: '',
            options: [],
            allowanceTypeSelected: ''
        }
    },

    methods: {
        resetFormCreate() {
            this.name = '',
                this.allowanceTypeSelected = '',
                this.amount = '',
                this.eligibility_Criteria = '',
                this.requirements = ''
        },
        createAllowanceForm() {
            this.resetFormCreate()
            this.isShow = true
        },
        updateAllowanceForm(id) {
            this.isShow2 = true
            const currentAllowance = this.items.find(item => item.id == id)
            this.name = currentAllowance.name,
                this.id = currentAllowance.id,
                this.allowanceTypeSelected = this.options.find(option => option.display == currentAllowance.allowanceType).value,
                this.amount = currentAllowance.amount,
                this.eligibility_Criteria = currentAllowance.eligibility_Criteria,
                this.requirements = currentAllowance.requirements
        },
        updateAllowanceButton() {
            this.isLoading = true
            const data = {
                id: this.id,
                name: this.name,
                allowanceType: this.allowanceTypeSelected,
                amount: this.amount,
                eligibility_Criteria: this.eligibility_Criteria,
                requirements: this.requirements
            }
            API.updateAllowance(data)
                .then(response => {
                    this.isLoading = false
                    swal.success(response.data.message)
                    this.exit2()
                    this.getListAllowance()
                })
                .catch(error => {
                    this.isLoading = false
                    if (Array.isArray(error.response.data)) {
                        const listErr = error.response.data.join('\n')
                        swal.error(listErr)
                    } else swal.error('Đã xảy ra lỗi, vui lòng thử lại', 3500)
                });
        },
        convertVND(price) {
            return functionCustom.convertVND(price)
        },
        deleteAllowance(id) {
            swal.confirm('Bạn có chắc chắn xóa phụ cấp không?').then((result) => {
                if (result.value) {
                    API.deleteAllowance(id)
                        .then(responsive => {
                            this.getListAllowance()
                            swal.success(responsive.data.message)
                        })
                        .catch(error => {
                            swal.error(error.data.message)
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
        getListAllowance() {
            this.isLoading = true
            API.getListAllowance(1)
                .then(response => {
                    this.isLoading = false
                    this.items = response.data.result.items.map(item => {
                        return {
                            id: item.id,
                            name: item.name,
                            allowanceType: item.allowanceType,
                            amount: item.amount,
                            eligibility_Criteria: item.eligibility_Criteria,
                            requirements: item.requirements
                        }
                    })
                })
                .catch(error => {
                    this.isLoading = false
                    swal.error(error)
                });
        },
        createAllowance() {
            this.isLoading = true
            const data = {
                name: this.name,
                allowanceType: this.allowanceTypeSelected,
                amount: this.amount,
                eligibility_Criteria: this.eligibility_Criteria,
                requirements: this.requirements
            }
            API.createAllowance(data)
                .then(response => {
                    this.isLoading = false
                    swal.success(response.data.message)
                    this.exit()
                    this.resetFormCreate()
                    this.getListAllowance()
                })
                .catch(error => {
                    this.isLoading = false
                    if (Array.isArray(error.response.data)) {
                        const listErr = error.response.data.join('\n')
                        swal.error(listErr)
                    } else swal.error('Đã xảy ra lỗi, vui lòng thử lại', 3500)
                });
        },
        getListAllowanceType() {
            API.getListAllowanceType()
                .then(response => {
                    this.options = response.data
                })
                .catch(error => {
                    swal.error(error)
                });
        },
    },
    created() {
        this.getListAllowance();
        this.getListAllowanceType();
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