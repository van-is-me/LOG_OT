<template>
    <div>
        <div class="bg-white w-full p-3">
            <!-- <button @click="createLevelForm" class="custom-btn mb-2 sm:mb-5 text-xs sm:text-base">Tạo trình độ mới</button> -->
            <EasyDataTable :headers="headers" :items="items" :table-class-name="currentTheme" header-text-direction="center"
                body-text-direction="center">
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button class="view-btn"><font-awesome-icon icon="fa-solid fa-eye" /></button>
                        <button @click="updateConfigDayForm(item.id)" class="edit-btn"><font-awesome-icon
                                icon="fa-solid fa-pen-to-square" /></button>
                        <!-- <button @click="deleteLevel(item.id)" class="delete-btn"><font-awesome-icon
                                :icon="['fas', 'trash']" /></button>                    -->
                    </div>
                </template>
            </EasyDataTable>
        </div>
        <!-- <div v-show="isShow" class="h-screen w-screen bg-custom fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
            @click.self="isShow = false">
            <div
                class="w-[95%] sm:w-1/2 xl:w-1/2 bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-2xl pb-4 xl:pb-6">
                <div
                    class="w-full h-10 sm:h-10 text-center bg-red-400 text-white font-bold rounded-t-2xl text-sm sm:text-3xl flex justify-center items-center sm">
                    Tạo trình độ
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Tên trình độ:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="name" placeholder="Nhập tên trình độ">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Mô tả trình độ:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="description"
                            type="text" v-model="description" placeholder="Nhập mô tả trình độ">
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="createLevel"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Tạo trình độ
                        </button>
                        <button @click="exit" type="exit" class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl">
                            Hủy tạo
                        </button>
                    </div>
                </div>
            </div>
        </div> -->
        <div v-show="isShow2" class="h-screen w-screen bg-custom fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
            @click.self="isShow2 = false">
            <div
                class="w-[95%] sm:w-1/2 xl:w-1/2 bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-2xl pb-4 xl:pb-6">
                <div
                    class="w-full h-10 sm:h-10 text-center bg-red-400 text-white font-bold rounded-t-2xl text-sm sm:text-3xl flex justify-center items-center sm">
                    Chỉnh sửa thời gian của các ngày làm việc
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Ngày thường:</span></label>
                        <select v-model="normalSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Thứ bảy:</span></label>
                        <select v-model="saturdaySelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Chủ nhật:</span></label>
                        <select v-model="sundaySelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Ngày lễ:</span></label>
                        <select v-model="holidaySelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="updateConfigDayButton"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Chỉnh sửa 
                        </button>
                        <button @click="exit2" type="exit"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl">
                            Hủy chỉnh sửa
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <Loading v-show="isLoading"/>
    </div>
</template>
<script>
import API from '../API';
import swal from '../utilities/swal2';
import Loading from '../components/Loading.vue'
export default {
    components: {
        Loading
    },
    data() {
        return {
            isLoading: false,
            headers: [
                { text: "Ngày thường", value: "normal", width: 140, },
                { text: "Thứ 7", value: "saturday", width: 140, },
                { text: "Chủ nhật", value: "sunday", width: 140, },
                { text: "Ngày lễ", value: "holiday", width: 140, },
                { text: "Action", value: "operation", width: 300 },
            ],
            items: [],
            options: [],
            isShow: false,
            isShow2: false,
            normalSelected: '',
            id: '',
            saturdaySelected: '',
            sundaySelected:'',
            holidaySelected:'',
            normal:'',
            saturday:'',
            sunday:'',
            holiday:''
        }
    },

    methods: {
        // resetFormCreate() {
        //     this.name = '',
        //     this.description = ''
        // },
        // createLevelForm() {
        //     this.resetFormCreate()
        //     this.isShow = true
        // },
        updateConfigDayForm(id) {
            this.isShow2 = true
            const currentConfigDay = this.items.find(item => item.id == id)
            this.normalSelected = this.options.find(option => option.display == currentConfigDay.normal).value,
            this.saturdaySelected = this.options.find(option => option.display == currentConfigDay.saturday).value,
            this.sundaySelected = this.options.find(option => option.display == currentConfigDay.sunday).value,
            this.holidaySelected = this.options.find(option => option.display == currentConfigDay.holiday).value          
        },
        updateConfigDayButton() {     
            this.isLoading = true     
            const data = {          
                normal: this.normalSelected,
                saturday: this.saturdaySelected,
                sunday: this.sundaySelected,
                holiday: this.holidaySelected
            }           
            API.updateConfigDay(data)
                .then(response => {      
                    this.isLoading = false          
                    // swal.success(response.data)
                    swal.success('Cập nhật thành công')
                    this.exit2()
                    this.getListConfigDay()
                })
                .catch(error => {
                    this.isLoading = false
                    swal.error(error)
                });
        },
        // deleteLevel(id) {
        //     swal.confirm('Bạn có chắc chắn xóa trình độ không?').then((result) => {
        //         if (result.value) {
        //             API.deleteLevel(id)
        //                 .then(responsive => {
        //                     this.getListLevel()
        //                     swal.success(responsive.data.message)
        //                     this.resetFormCreate()
        //                 })
        //                 .catch(error => {
        //                     swal.error(error)
        //                 })
        //         }
        //     })
        // },
        exit() {
            this.isShow = false
        },
        exit2() {
            this.isShow2 = false
        },
        getListConfigDay() {
            API.getListConfigDay()
                .then(response => {
                    this.items = []
                    this.items.push(response.data)
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        getListShiftType() {
            API.getListShiftType()
                .then(response => {
                    this.options = response.data
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        // createLevel() {
        //     const data = {
        //         name: this.name,
        //         description: this.description,
        //     }
        //     API.createLevel(data)
        //         .then(response => {
        //             swal.success(response.data.message)
        //             this.exit()
        //             this.resetFormCreate()
        //             this.getListLevel()
        //         })
        //         .catch(error => {
        //             swal.error(error)
        //         });
        // },
    },
    created() {
        this.getListConfigDay();
        this.getListShiftType();
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