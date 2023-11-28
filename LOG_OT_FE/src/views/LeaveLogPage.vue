<template>
    <div class="bg-white">
        <!-- <button class="btn-primary my-3" @click="showCreate">Tạo mới</button> -->
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
                        <button class="edit-btn" @click="showEdit(item)"><font-awesome-icon
                                icon="fa-solid fa-pen-to-square" /></button>
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
                <input disabled type="datetime-local" v-model="leaveDate" class="input-cus w-full">
                <select v-model="selectedStatus" name="" class="select-cus w-full" id="">
                    <option value="1">Request</option>
                    <option value="2">Approved</option>
                    <option value="3">Cancel</option>
                </select>
                <textarea v-if="selectedStatus == 3" rows="4" type="text" v-model="reason" class="input-cus w-full"
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
            selectedStatus: 1,
            isShowInput: false,
            isShow: false,
            id: '',
            page: 1,
            leaveDate: '',
            leaveShift: 1,
            userId: '',
            reason: '',
            headers: [
                { text: "Ngày nghỉ", value: "leaveDate", width: 200, fixed: "left" },
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
            API.getListLeaveLog(this.page)
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
                id: this.id,
                userId: this.userId,
                status: Number.parseInt(this.selectedStatus),
                cancelReason: this.reason
            }
            API.updateStatusLeaveLog(data.id, data.userId, data.status, data.cancelReason)
                .then(res => {
                    this.isLoading = false
                    swal.success(res.data.message)
                    this.getList()
                    this.cancelAction()
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err.response.data.message)
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
        showEdit(item) {
            this.isShow = true
            this.reason = item.cancelReason
            this.selectedType = item.leaveShift
            this.userId = item.applicationUserId
            this.leaveDate = item.leaveDate
            this.id = item.id
        },
        cancelAction() {
            this.selectedType = 1
            this.isShow = false
            this.id = ''
            this.leaveDate = ''
            this.reason = ''
            this.userId = ''
        },
        showCreate() {
            this.isShow = true
        }
    }
}
</script>