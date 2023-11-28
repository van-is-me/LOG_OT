<template>
    <div>
        <div class=" w-full h-full p-3 flex justify-center">
            <div
                class="w-[95%] sm:w-1/2 xl:w-1/2 bg-white  absolute rounded-2xl pb-4 xl:pb-6">
                <div
                class="w-full h-10 sm:h-10 text-center bg-red-400 text-white font-bold rounded-t-2xl text-sm sm:text-3xl flex justify-center items-center sm">
                    Thay đổi mật khẩu
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px] xl:w-[200px]"><span>Mật khẩu cũ:</span></label>
                        <input class="bg-slate-200 dark:bg-gray-900 dark:text-white w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="oldPassword" placeholder="Nhập mật khẩu cũ">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px] xl:w-[200px]"><span>Mật khẩu mới:</span></label>
                        <input class="bg-slate-200 dark:bg-gray-900 dark:text-white w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="description"
                            type="text" v-model="newPassword" placeholder="Nhập mật khẩu mới">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px] xl:w-[200px]"><span>Xác nhận mật khẩu mới:</span></label>
                        <input class="bg-slate-200 dark:bg-gray-900 dark:text-white w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="description"
                            type="text" v-model="confirmPassword" placeholder="Nhập xác nhận mật khẩu mới">
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="createDepartment"
                            class="btn-primary mr-4 sm:mr-8">
                            Thay đổi mật khẩu
                        </button>
                        <!-- <button @click="exit" type="exit" class="cancel-btn">
                            Hủy tạo
                        </button> -->
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
            isShow: false,
            isShow2: false,
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
        }
    },

    methods: {
        resetFormCreate(){
            this.name = '',   
            this.description = ''    
        },
        createDepartmentForm() {
            this.resetFormCreate()
            this.isShow = true
        },
        updateDepartmentForm(id) {
            this.isShow2 = true
            const currentDepartment = this.items.find(item => item.id == id)

            this.name = currentDepartment.name
            this.id = currentDepartment.id
            this.description = currentDepartment.description

        },
        updateDepartmentButton() {
            const data = {
                id: this.id,
                name: this.name,
                description: this.description
            }
            API.updateDepartment(data)
                .then(response => {
                    swal.success(response.data)
                    this.exit2()
                    this.getListDepartment()
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        deleteDepartment(id) {
            swal.confirm('Bạn có chắc chắn xóa phòng ban không?').then((result) => {
                if (result.value) {
                    API.deleteDepartment(id)
                        .then(responsive => {
                            this.getListDepartment()
                            swal.success(responsive.data)
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
                    this.items = response.data.items
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        createDepartment() {
            const data = {
                oldPassword: this.oldPassword,
                newPassword: this.newPassword,
                confirmPassword: this.confirmPassword,
            }
            API.ChangePassword(data)
                .then(response => {
                    swal.success(error.response.data.result)
                })
                .catch(error => {
                    swal.error(error.response.data.result)
                });
        },
    },
    created() {
        
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