<template>
    <div>
        <div class="bg-white w-full p-3">
            <button @click="createDepartmentForm" class="custom-btn mb-2 sm:mb-5 text-xs sm:text-base">Tạo trợ cấp</button>
            <EasyDataTable :headers="headers" :items="items" :table-class-name="currentTheme" header-text-direction="center"
                body-text-direction="center">
                <template #item-amount="item">
                    {{ convertVND(item.amount) }}
                </template>
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button @click="updateDepartmentForm(item.id)"
                            class="mr-2 edit-btn">Edit</button>
                        <button @click="deleteDepartment(item.id)" class="delete-btn">Delete</button>
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
                    Tạo trợ cấp
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Tên trợ cấp:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="name" placeholder="Nhập tên trợ cấp">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Mô tả trợ cấp:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="description"
                            type="text" v-model="description" placeholder="Nhập mô tả trợ cấp">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Số tiền:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="description"
                            type="number" v-model="amount" placeholder="Nhập số tiền">
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="createDepartment"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Tạo trợ cấp
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
                    Chỉnh sửa trợ cấp
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Tên trợ cấp:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="name" placeholder="Nhập tên trợ cấp">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Mô tả trợ cấp:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="description"
                            type="text" v-model="description" placeholder="Nhập mô tả trợ cấp">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Số tiền:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="description"
                            type="number" v-model="amount" placeholder="Nhập số tiền">
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="updateDepartmentButton"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Chỉnh sửa trợ cấp
                        </button>
                        <button @click="exit2" type="exit" class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl">
                            Hủy chỉnh sửa
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import API from '../API';
import functionCustom from '../utilities/functionCustom'
export default {
    data() {
        return {
            headers: [
                { text: "Tên trợ cấp", value: "name", width: 100, fixed: "left", },
                { text: "Mô tả", value: "description", width: 140, },
                { text: "Số tiền", value: "amount", width: 200, },
                { text: "Action", value: "operation", width: 120 },
            ],
            items: [],
            isShow: false,
            isShow2: false,
            name: '',
            id: '',
            description: '',
            amount:''
        }
    },

    methods: {
        resetFormCreate(){
            this.name = '',   
            this.description = '',
            this.amount = '' 
        },
        createDepartmentForm() {
            this.isShow = true
        },
        updateDepartmentForm(id) {
            this.isShow2 = true
            const currentSubsidize = this.items.find(item => item.id == id)

            this.name = currentSubsidize.name
            this.id = currentSubsidize.id
            this.description = currentSubsidize.description
            this.amount = currentSubsidize.amount
        },
        updateDepartmentButton() {
            const data = {
                id: this.id,
                name: this.name,
                description: this.description,
                amount: this.amount
            }
            API.updateSubsidize(data)
                .then(response => {
                    swal.success(response.data)
                    this.exit2()
                    this.getListSubsidize()
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        deleteDepartment(id) {
            swal.confirm('Bạn có chắc chắn xóa trợ cấp không?').then((result) => {
                if (result.value) {
                    API.deleteSubsidize(id)
                        .then(response => {
                            this.getListSubsidize()
                            swal.success(response.data)
                        })
                        .catch(error => {
                            swal.error(error.response.data)
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
        handleImageChange(event) {
            this.imageFile = event.target.files[0]
        },
        convertVND(price) {
            return functionCustom.convertVND(price)
        },
        getListSubsidize() {
            API.getListSubsidize()
                .then(response => {
                    this.items = response.data.items
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        createDepartment() {
            const data = {
                name: this.name,
                description: this.description,
                amount: this.amount
            }
            API.createSubsidize(data)
                .then(response => {
                    swal.success(response.data)
                    this.exit()
                    this.resetFormCreate()
                    this.getListSubsidize()
                })
                .catch(error => {
                    swal.error(error)
                });
        },
    },
    created() {
        this.getListSubsidize();
    },
    computed: {
        imageUrl() {
            return this.imageFile ? URL.createObjectURL(this.imageFile) : null
        }
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