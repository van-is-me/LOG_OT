<template>
    <div>
        <div class="bg-white w-full p-3">
            <button @click="createPositionForm" class="custom-btn mb-2 sm:mb-5 text-xs sm:text-base mt-5">Tạo vị trí mới</button>
            <EasyDataTable :headers="headers" :items="items" :table-class-name="currentTheme" header-text-direction="center"
                body-text-direction="center">
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button class="view-btn"><font-awesome-icon icon="fa-solid fa-eye" /></button>
                        <button @click="updatePositionForm(item.id)" class="edit-btn"><font-awesome-icon icon="fa-solid fa-pen-to-square" /></button>
                        <button @click="deletePosition(item.id)" class="delete-btn"><font-awesome-icon :icon="['fas', 'trash']" /></button>
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
                    Tạo Vị trí mới
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Tên vị trí:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="name" placeholder="Nhập tên phòng ban">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Tên phòng ban:</span></label>
                        <select v-model="departmentIdSelected" class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.id" >{{ option.name }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Tên trình độ:</span></label>
                        <select v-model="levelIdSelected" class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options2" :value="option.id">{{ option.name }}</option>
                        </select>
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="createPosition"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            {{ $t('create position')}}
                        </button>
                        <button @click="exit" type="exit" class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl">
                            {{ $t('cancel')}}
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
                    Chỉnh sửa phòng ban
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Tên phòng ban:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="text"
                            v-model="name" placeholder="Nhập mã nhân viên">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Tên phòng ban:</span></label>
                        <select @change="test" v-model="departmentIdSelected" class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.id" >{{ option.name }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Tên trình độ:</span></label>
                        <select v-model="levelIdSelected" class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options2" :value="option.id">{{ option.name }}</option>
                        </select>
                    </div>

                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="updatePositionButton"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            chỉnh sửa phòng ban
                        </button>
                        <button @click="exit2" type="exit"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl">
                            Hủy
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
                //{ text: "Department ID", value: "id", width: 100, fixed: "left", },
                { text: "Name", value: "name", width: 140, },
                { text: "Department Name", value: "departmentName", width: 140, },
                { text: "Level Name", value: "levelName", width: 140, },
                { text: "Action", value: "operation", width: 120 },
            ],
            items: [],
            isShow: false,
            isShow2: false,
            name: '',
            id: '',
            departmentName: '',
            departmentId: '',
            levelId: '',
            levelName: '',   
            departmentIdSelected: '',
            levelIdSelected: '',         
            options: [],
            options2: [],
        }
    },

    methods: {      
        resetFormCreate() {
            this.name = '',
            this.departmentId = '',
            this.levelId = ''
        },
        createPositionForm() {
            this.resetFormCreate()
            this.isShow = true
        },
        updatePositionForm(id) {
            this.isShow2 = true
            const currentLevel = this.items.find(item => item.id == id)

            this.name = currentLevel.name
            this.id = currentLevel.id
            this.departmentIdSelected = currentLevel.departmentId
            this.levelIdSelected = currentLevel.levelId     
        },
        updatePositionButton() {
            const data = {
                id: this.id,
                name: this.name,
                departmentId: this.departmentIdSelected,
                levelId: this.levelIdSelected 
            }
            API.updatePosition(data)
                .then(response => {                   
                    swal.success(response.data)
                    this.exit2()
                    this.getListPosition()
                })
                .catch(error => {
                    swal.error(error.response.data)
                });
        },
        deletePosition(id) {
            swal.confirm('Bạn có chắc chắn xóa vị trí không?').then((result) => {
                if (result.value) {
                    API.deletePosition(id)
                        .then(responsive => {
                            this.getListPosition()
                            swal.success(responsive.data)
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
        getListPosition() {
            API.getListPosition()
                .then(response => {
                    this.items = response.data.items.map(item => {
                        return {
                            id: item.id,
                            departmentName: item.department.name,
                            levelName: item.level.name,
                            name: item.name,
                            departmentId: item.departmentId,
                            levelId: item.levelId
                        }
                    })
                })
                .catch(error => {
                    swal.error(error)
                });
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
        getListLevel() {
            API.getListLevel()
                .then(response => {
                    this.options2 = response.data.items
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        createPosition() {
            const data = {
                name: this.name,
                levelId: this.levelIdSelected,
                departmentId: this.departmentIdSelected,
            }
            API.createPosition(data)
                .then(response => {
                    swal.success(response.data)
                    this.exit()
                    this.resetFormCreate()
                    this.getListPosition()
                })
                .catch(error => {
                    swal.error(error)
                });
        },
    },
    created() {
        this.getListPosition();
        this.getListDepartment();
        this.getListLevel();
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