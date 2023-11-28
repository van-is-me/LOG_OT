<template>
    <div class="bg-white">
        <div class="w-[90%] mx-auto">
            <button v-if="auth.listRoles?.[0] == 'Employee'" class="btn-primary" @click="showCreate">Tạo mới</button>
        </div>
        <div class="w-[90%] mx-auto mt-10">
            <EasyDataTable :headers="headers" :items="list" header-text-direction="center" :table-class-name="currentTheme"
                body-text-direction="center">
                <template #item-birthDate="item">
                    {{ convertDate(item.birthDate) }}
                </template>
            </EasyDataTable>
        </div>
        <div @click.self="cancelAll" v-show="isShow" class="fog-l">
            <div class="w-[90%] lg:w-[60%] bg-white max-h-[90vh] overflow-y-scroll">
                <div class="w-full flex items-center justify-center flex-wrap">
                    <div class="box-input w-[88%] lg:w-[40%]">
                        <label for="name">Tên</label>
                        <input type="text" id="name" v-model="name" class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                    <div class="box-input w-[86%] lg:w-[40%]">
                        <label for="birthday">Sinh nhật</label>
                        <input type="datetime-local" id="birthday" v-model="birthDate"
                            class="input-cus dark:bg-gray-900 dark:text-white  ">
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
                <div class="w-[86%] my-3 mx-auto flex justify-end">
                    <button class="cancel-btn" @click="cancelAll">Huỷ</button>
                    <!-- <button @click="actionUpdate" v-if="isUpdate" class="edit-btn">Chỉnh sửa</button> -->
                    <button v-if="isCreate" @click="actionCreate" class="btn-primary">Tạo mới</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import API from '../../API'
import { useAuthStore } from '../../stores/auth'
import functionCustom from '../../utilities/functionCustom'
import swal from '../../utilities/swal2'
export default {
    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },
    data() {
        return {
            auth: this.authStore.getAuth,
            isShow: false,
            isCreate: false,
            isUpdate: false,
            name: '',
            birthDate: '',
            desciption: '',
            relationship: '',
            id: '',
            list: [],
            headers: [
                { text: "Tên", value: "name", width: 200 },
                { text: "Sinh nhật", value: "birthDate", width: 200 },
                { text: "Mô tả", value: "desciption", width: 200 },
                { text: "Mối quan hệ", value: "relationship", width: 200 },
                { text: "Acceptance Type", value: "acceptanceType", width: 200 },
            ]
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            if (this.auth.listRoles?.[0] == 'Employee') {
                API.getDependanceForEmp()
                    .then(res => {
                        this.list = res.data.result.items
                    })
                    .catch(err => swal.error(err))
            } else {
                API.getDependentListByUser(this.$route.params.id)
                    .then(res => {
                        this.list = res.data.result.items
                    })
                    .catch(err => swal.error(err))
            }
        },
        showCreate() {
            this.isShow = true
            this.isCreate = true
        },
        actionCreate() {
            const data = {
                name: this.name,
                birthDate: this.birthDate,
                desciption: this.desciption,
                relationship: this.relationship
            }
            API.createDependentForEmp(data)
                .then(res => {
                    swal.success('Tạo mới thành công')
                    this.cancelAll()
                    this.getList()
                })
                .catch(err => swal.error(err))
        },
        convertDate(date) {
            return functionCustom.convertDate(date)
        },
        cancelAll() {
            this.isCreate = false
            this.isShow = false
            this.isUpdate = false
            this.name = ''
            this.birthDate = ''
            this.desciption = ''
            this.relationship = ''
            this.id = ''
        },
    }
}
</script>
