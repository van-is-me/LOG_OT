<template>
    <div class="bg-white">
        <div class="w-[90%] mx-auto mt-10">
            <EasyDataTable :headers="headers" :items="list" header-text-direction="center" :table-class-name="currentTheme"
                body-text-direction="center">
                <template #item-basicSalary="item">
                    <div>
                        {{ convertVND(item.basicSalary) }}
                    </div>
                </template>
                <template #item-insuranceAmount="item">
                    <div>
                        {{ convertVND(item.insuranceAmount) }}
                    </div>
                </template>
                <template #item-startDate="item">
                    <div>
                        {{ convertDate(item.startDate) }}
                    </div>
                </template>
                <template #item-endDate="item">
                    <div>
                        {{ convertDate(item.endDate) }}
                    </div>
                </template>
            </EasyDataTable>
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
            list: [],
            headers: [
                { text: "Mã hợp đồng", value: "contractCode", width: 140, },
                { text: "File", value: "file", width: 140, },
                { text: "Ngày bắt đầu", value: "startDate", width: 140, },
                { text: "Ngày kết thúc", value: "endDate", width: 140, },
                { text: "Công việc", value: "job", width: 140, },
                { text: "Lương cơ bản", value: "basicSalary", width: 140, },
                { text: "Trạng thái", value: "status", width: 140, },
                { text: "Khấu trừ phần trăm", value: "percentDeduction", width: 140, },
                { text: "Loại lương", value: "salaryType", width: 140, },
                { text: "Loại hợp đồng", value: "contractType", width: 140, },
                { text: "Thuế cá nhân", value: "isPersonalTaxDeduction", width: 140, },
                { text: "Loại bảo hiểm", value: "insuranceType", width: 140, },
                { text: "Tiền bảo hiểm", value: "insuranceAmount", width: 140, },
            ]
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            if (this.auth.listRoles?.[0] == 'Employee') {
                API.getListContractForEmp()
                    .then(res => {
                        this.list = res.data.listItem.items
                    })
                    .catch(err => swal.error(err))
            } else {
                API.getListEmployeeContractByUsername(this.$route.params.username)
                    .then(res => {
                        this.list = res.data.listItem.items
                    })
                    .catch(err => swal.error(err))
            }
        },
        convertVND(price) {
            return functionCustom.convertVND(price)
        },
        convertDate(date) {
            return functionCustom.convertDate(date)
        }
    }
}
</script>