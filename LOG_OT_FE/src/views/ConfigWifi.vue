<template>
    <div class="bg-white">
        <div class="w-[90%] mx-auto">
            <button class="btn-primary my-3 mx-auto text-[15px]" @click="showCreate">Tạo mới</button>
            <button @click="getCurrentWifi" class="btn-primary my-3 mx-auto text-[15px]">Xem wifi hiện tại</button>
        </div>
        <div v-if="curIP" class="w-[90%] mx-auto my-4">
            <!-- <p><span class="font-bold">Tên wifi: </span>{{ curName }}</p> -->
            <p><span class="font-bold">Địa chỉ IP: </span>{{ curIP }}</p>
        </div>
        <div class="w-[90%] mx-auto mt-10">
            <EasyDataTable :headers="headers" :items="list" header-text-direction="center" :table-class-name="currentTheme"
                body-text-direction="center">
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button @click="showUpdate(item)" class="edit-btn"><font-awesome-icon
                                icon="fa-solid fa-pen-to-square" /></button>
                        <button @click="deleteItem(item.wifiIPv4)" class="delete-btn"><font-awesome-icon
                                :icon="['fas', 'trash']" /></button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
        <div v-show="isShow" @click.self="cancelAll" class="fog-l">
            <div class="w-[90%] md:w-[60%] bg-white dark:bg-[#292e32] p-7 rounded-md">
                <div class="flex flex-wrap justify-around w-full">
                    <div class="box-input w-[86%] lg:w-[40%]">
                        <label for="name">Tên wifi</label>
                        <input type="text" id="name" v-model="wifi.name"
                            class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                    <div class="box-input w-[86%] lg:w-[40%]">
                        <label for="ip">Địa chỉ IP</label>
                        <input type="text" id="ip" v-model="wifi.ip" class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                </div>
                <div class="w-[86%] mx-auto flex justify-end">
                    <button class="cancel-btn" @click="cancelAll">Huỷ</button>
                    <button v-if="isUpdate" @click="actionUpdate" class="edit-btn">Chỉnh sửa</button>
                    <button v-if="isCreate" @click="actionCreate" class="btn-primary">Lưu</button>
                </div>
            </div>
        </div>
        <Loading v-show="isLoading" />
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
            list: [],
            isShow: false,
            isCreate: false,
            isUpdate: false,
            isLoading: false,
            page: 1,
            wifi: {
                name: '',
                ip: ''
            },
            curName: '',
            curIP: '',
            id: '',
            headers: [
                { text: "Tên", value: "nameWifi", width: 200 },
                { text: "Địa chỉ IP", value: "wifiIPv4", width: 200 },
                { text: "Hành động", value: "operation", width: 500 }
            ]
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            API.getListWifi(this.page)
                .then(res => {
                    this.list = res.data.result.items
                })
                .catch(err => swal.error(err))
        },
        getCurrentWifi() {
            this.isLoading = true
            API.getOnlyIP()
                .then(res => {
                    // this.curName = res.data.result.nameWifi
                    this.curIP = res.data.ipString
                    this.isLoading = false
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err)
                })
        },
        cancelAll() {
            this.isCreate = false
            this.isUpdate = false
            this.isShow = false
            this.wifi = {
                name: '',
                ip: ''
            }
            this.id = ''
        },
        showCreate() {
            this.wifi.name = this.curName
            this.wifi.ip = this.curIP
            this.isCreate = true
            this.isShow = true
        },
        showUpdate(item) {
            this.isShow = true
            this.isUpdate = true
            this.id = item.id
            this.wifi.name = item.nameWifi
            this.wifi.ip = item.wifiIPv4
        },
        actionCreate() {
            this.wifi.name = this.wifi.name.replace(/&/g, '_')
            this.isLoading = true
            API.createWifi(this.wifi.name, this.wifi.ip)
                .then(res => {
                    this.isLoading = false
                    this.getList()
                    this.cancelAll()
                    swal.success('Tạo mới wifi thành công')
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err.response?.data?.message)
                })

        },
        actionUpdate() {
            this.isLoading = true
            API.updateWifi(this.id, this.wifi.name, this.wifi.ip)
                .then(res => {
                    this.isLoading = false
                    this.getList()
                    this.cancelAll()
                    swal.success('Chỉnh sửa wifi thành công')
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err)
                })
        },
        deleteItem(ip) {
            swal.confirm('Bạn có chắc chắn muốn xoá?').then(result => {
                if (result.value) {
                    API.deleteWifi(ip)
                        .then(res => {
                            this.getList()
                            swal.success('Xoá thành công')
                        })
                        .catch(err => swal.error('Xoá thất bại, vui lòng thử lại'))
                }
            })
        }
    }
}
</script>
<style scoped></style>