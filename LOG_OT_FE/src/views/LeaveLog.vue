<template>
    <div class="bg-white">
        <button class="btn-primary my-3" @click="showCreate">Tạo mới</button>
        <div class="w-[90%] mx-auto mt-10">
            <EasyDataTable :headers="headers" :items="list" header-text-direction="center" :table-class-name="currentTheme"
                body-text-direction="center">
                <template #item-leaveShift="item">
                    {{ item.leaveShift == 1 ? 'Morning' : item.leaveShift == 2 ? 'Afternoon' : 'Full' }}
                </template>
                <template #item-leaveDate="item">
                    <div>
                        {{ convertDate(item.leaveDate) }}
                    </div>
                </template>
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button class="delete-btn" @click="deleteLeaveLog(item.id)"><font-awesome-icon
                                :icon="['fas', 'trash']" /></button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
        <div v-show="isShow" @click.self="cancelAction" class="fog-l">
            <div class="p-5 w-[30vw] bg-white rounded-md flex items-center justify-center flex-col">
                <select v-model="selectedType" name="" class="select-cus w-full" id="">
                    <option v-for="op in accTypeList" :value="op.value">
                        {{ op.display }}
                    </option>
                </select>
                <input type="date" v-model="leaveDate" class="input-cus w-full">
                <textarea rows="4" type="text" v-model="reason" class="input-cus w-full"
                    placeholder="Lý do . . ."></textarea>
                <button @click="updateStatus" class="btn-primary">Lưu</button>
            </div>
        </div>
        <Loading v-show="isLoading" />
    </div>
</template>
<script>
import API from '../API';
import { useAuthStore } from '../stores/auth';
import functionCustom from '../utilities/functionCustom';
import swal from '../utilities/swal2';

export default {
    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },
    data() {
        return {
            list: [],
            isLoading: false,
            accTypeList: [],
            selectedType: 1,
            isShowInput: false,
            isShow: false,
            id: '',
            page: 1,
            leaveDate: '',
            leaveShift: 1,
            reason: '',
            headers: [
                { text: "Ngày nghỉ", value: "leaveDate", width: 200 },
                { text: "Ca nghỉ", value: "leaveShift", width: 200 },
                { text: "Lý do", value: "reason", width: 200 },
                { text: "Trạng thái", value: "status", width: 200 },
                { text: "Lý do huỷ", value: "cancelReason", width: 300 },
                { text: "Hành động", value: "operation", width: 100 },
            ],
            auth: this.authStore.getAuth
        }
    },
    created() {
        this.getList()
        this.getLeaveShift()
    },
    methods: {
        getList() {
            this.isLoading = true
            API.getLeaveLogList(this.page)
                .then(res => {
                    this.isLoading = false
                    this.list = res.data.items
                })
                .catch(err => {
                    swal.error(err.response.data.message)
                    this.isLoading = false
                })
        },
        updateStatus() {
            this.isLoading = true
            const data = {
                leaveDate: this.leaveDate,
                leaveShift: Number.parseInt(this.selectedType),
                reason: this.reason
            }
            API.createLeaveLog(data)
                .then(res => {
                    this.isLoading = false
                    swal.success(res.data.message)
                    this.getList()
                    this.cancelAction()
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err.response.data)
                })
        },
        convertDate(date) {
            return functionCustom.convertDate(date)
        },
        getLeaveShift() {
            API.getLeaveShift()
                .then(res => {
                    this.accTypeList = res.data
                })
        },
        deleteLeaveLog(id) {
            swal.confirm('Bạn có chắc chắn muốn xoá?').then(re => {
                if (re.value) {
                    this.isLoading = true
                    API.deleteLeaveLog(id)
                        .then(res => {
                            this.isLoading = false
                            swal.success('Xoá thành công')
                            this.getList()
                        })
                        .catch(err => {
                            swal.error(err)
                            this.isLoading = false
                        })
                }
            })
        },
        cancelAction() {
            this.selectedType = 1
            this.isShow = false
            this.id = ''
            this.leaveDate = ''
            this.reason = ''
        },
        showCreate() {
            this.isShow = true
        }
    }
}
</script>