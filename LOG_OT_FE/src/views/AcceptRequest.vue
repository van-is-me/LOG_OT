<template>
    <div class="bg-white">
        <div class="w-[90%] mx-auto mt-10">
            <EasyDataTable :headers="headers" :items="list" header-text-direction="center" :table-class-name="currentTheme"
                body-text-direction="center">
                <template #item-date="item">
                    <div>
                        {{ convertDate(item.date) }}
                    </div>
                </template>
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button class="edit-btn" @click="approveRequest(item)"><font-awesome-icon
                                :icon="['fas', 'check']" /></button>
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
import functionCustom from '../utilities/functionCustom';
import swal from '../utilities/swal2';

export default {
    data() {
        return {
            list: [],
            accTypeList: [],
            isLoading: false,
            selectedType: 3,
            isShowInput: false,
            isShow: false,
            id: '',
            page: 1,
            cancelReason: '',
            headers: [
                { text: "Số giờ OT", value: "hours", width: 200 },
                { text: "Trạng thái", value: "status", width: 200 },
                { text: "Ngày", value: "date", width: 200 },
                { text: "Lý do huỷ", value: "cancelReason", width: 200 },
                { text: "Hành động", value: "operation", width: 100 },
            ]
        }
    },
    created() {
        this.getList()
        this.getAcceptanceType()
    },
    methods: {
        getList() {
            this.isLoading = true
            API.getOTLogByEmp(this.page)
                .then(res => {
                    this.isLoading = false
                    this.list = res.data.items
                })
                .catch(err => {
                    swal.error(err)
                    this.isLoading = false
                })
        },
        updateStatus() {
            this.isLoading = true
            const data = {
                id: this.id,
                status: Number.parseInt(this.selectedType),
                cancelReason: this.cancelReason == '' ? null : this.cancelReason
            }
            API.updateStatusOTLogByEmp(data)
                .then(res => {
                    this.isLoading = false
                    swal.success(res.data)
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
        getAcceptanceType() {
            API.logStatus()
                .then(res => {
                    this.accTypeList = res.data
                })
        },
        approveRequest(item) {
            this.selectedType = item.status == 'Request' ? 1 : item.status == 'Cancel' ? 3 : 2
            this.id = item.id
            this.isShow = true
            if (item.cancelReason != '' && item.cancelReason != null) this.isShowInput = true
        },
        checkType() {
            if (this.selectedType == 3) this.isShowInput = true
            else this.isShowInput = false
        },
        cancelAction() {
            this.selectedType = 3
            this.isShow = false
            this.isShowInput = false
            this.id = ''
        }
    }
}
</script>