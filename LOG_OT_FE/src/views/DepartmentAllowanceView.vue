<template>
    <div>
        <div class="bg-white w-full p-3">
            <button @click="createDepartmentAllowanceForm" class="custom-btn mb-2 sm:mb-5 text-xs sm:text-base">Tạo phụ cấp phòng ban mới</button>
            <EasyDataTable :headers="headers" :items="items" :table-class-name="currentTheme" header-text-direction="center"
                body-text-direction="center">
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button class="view-btn"><font-awesome-icon icon="fa-solid fa-eye" /></button>
                        <button @click="updateDepartmentAllowanceForm(item.id)" class="edit-btn"><font-awesome-icon
                                icon="fa-solid fa-pen-to-square" /></button>
                        <button @click="deleteDepartmentAllowance(item.id)" class="delete-btn"><font-awesome-icon
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
                    Tạo phụ cấp phòng ban
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Phòng ban:</span></label>
                        <select v-model="departmentIdSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.id">{{ option.name }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Phụ cấp:</span></label>
                        <select v-model="subsidizeIdSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options1" :value="option.id">{{ option.name }}</option>
                        </select>
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="createDepartmentAllowance"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Tạo phụ cấp phòng ban
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
                    Chỉnh sửa phụ cấp phòng ban
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Phòng ban:</span></label>
                        <select v-model="departmentIdSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.id">{{ option.name }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Trợ cấp:</span></label>
                        <select v-model="subsidizeIdSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options1" :value="option.id">{{ option.name }}</option>
                        </select>
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="updateDepartmentAllowance"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Tạo trình độ
                        </button>
                        <button @click="exit2" type="exit" class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl">
                            Hủy tạo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import API from '../API';

export default {
    data() {
        return {
            headers: [
                //{ text: "Mã phòng ban", value: "id", width: 100, fixed: "left", },
                { text: "Phòng ban", value: "departments", width: 140, },
                { text: "Trợ cấp", value: "subsidize", width: 200, },
                { text: "Action", value: "operation", width: 300 },
            ],
            items: [],
            options: [],
            options1: [],
            isShow: false,
            isShow2: false,
            departmentIdSelected: '',
            subsidizeIdSelected: '',
            id: '',
        }
    },

    methods: {
        resetFormCreate() {
            this.departmentIdSelected = '',
            this.subsidizeIdSelected = ''
        },
        createDepartmentAllowanceForm() {
            this.resetFormCreate()
            this.isShow = true
        },
        updateDepartmentAllowanceForm(id) {
            this.isShow2 = true
            const currentDepartmentAllowance = this.items.find(item => item.id == id)
            this.subsidizeIdSelected = currentDepartmentAllowance.subsidizeId.toLowerCase(),
            this.departmentIdSelected = currentDepartmentAllowance.departmentId.toLowerCase(),
            this.id = currentDepartmentAllowance.id
        },
        updateDepartmentAllowance() {          
            const data = {       
                id: this.id,       
                departmentId: this.departmentIdSelected,
                subsidizeId: this.subsidizeIdSelected
            }           
            API.updateDepartmentAllowance(data)
                .then(response => {
                    swal.success(response.data)
                    this.exit2()
                    this.resetFormCreate()
                    this.getListDepartmentAllowance()
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        deleteDepartmentAllowance(id) {
            swal.confirm('Bạn có chắc chắn xóa phụ cấp phòng ban không?').then((result) => {
                if (result.value) {
                    API.deleteDepartmentAllowance(id)
                        .then(responsive => {
                            this.getListDepartmentAllowance()
                            swal.success("Xóa thành công")
                            this.resetFormCreate()
                        })
                        .catch(error => {
                            swal.error(error)
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
        getListDepartment() {
            API.getListDepartment()
                .then(response => {
                    this.options = response.data.items
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        getListDepartmentAllowance() {
            API.getListDepartmentAllowance()
                .then(response => {
                    this.items = response.data.items.map(item => {
                        return {
                            departments: item.departments.name,
                            subsidize: item.subsidize.name,
                            departmentId: item.departmentId,
                            subsidizeId: item.subsidizeId,
                            id: item.id
                        }
                    })
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        getListSubsidize() {
            API.getListSubsidize()
                .then(response => {
                    this.options1 = response.data.items.map(item => {
                        return {
                            id: item.id,
                            name: item.name
                        }
                    })
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        createDepartmentAllowance() {
            const data = {               
                departmentId: this.departmentIdSelected,
                subsidizeId: this.subsidizeIdSelected
            }
            API.createDepartmentSubsidize(data)
                .then(response => {
                    swal.success(response.data)
                    this.exit()
                    this.resetFormCreate()
                    this.getListDepartmentAllowance()
                })
                .catch(error => {
                    swal.error(error.data)
                });
        },
    },
    created() {
        this.getListDepartment();
        this.getListSubsidize();
        this.getListDepartmentAllowance();
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