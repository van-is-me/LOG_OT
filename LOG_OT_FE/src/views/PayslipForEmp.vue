<template>
    <div class="bg-white">
        <h1 v-if="list.length == 0" class="text-gray-500 text-[30px] text-center">Không có dữ liệu</h1>
        <div class="w-[90%] grid grid-cols-12 gap-3 mx-auto">
            <div v-for="item in list" :key="item.id" @click="getDetail(item)"
                class="col-span-12 md:col-span-6 lg:col-span-4 mx-auto rounded-md bg-gray-100 my-3 p-5 flex items-center cursor-pointer hover:bg-[#fdeaea]"
                :class="selectedId == item.id ? 'bg-[#fdeaea]' : ''">
                <div>
                    <p class="font-bold">Ngày tính lương: {{ convertDate(item.paydayCal) }}</p>
                    <p class="text-gray-400">Từ ngày: {{ convertDate(item.fromTime) }}</p>
                    <p class="text-gray-400">Đến ngày: {{ convertDate(item.toTime) }}</p>
                    <p class="text-gray-400">Tổng lương: {{ convertVND(item.finalSalary) }}</p>
                </div>
                <font-awesome-icon icon="fa-solid fa-eye" :class="selectedId == item.id ? 'text-red-500' : ''" />
            </div>
        </div>

        <div id="detailElement" v-show="isShowDetail" class="w-[90%] grid grid-cols-12 gap-3 mx-auto my-6">
            <!-- I -->
            <div class="col-span-12 md:col-span-6 lg:col-span-4 w-full mx-auto rounded-md bg-white shadow-lg p-4">
                <div class="text-[#7b9fd8] text-[20px]">I. Bảng lương chi tiết</div>
                <div class="text-item">
                    <div>Ngày tính lương: </div>
                    <div class="child">{{ convertDate(selectedItem?.paydayCal) }}</div>
                </div>
                <div class="text-item">
                    <div>Từ ngày: </div>
                    <div class="child">{{ convertDate(selectedItem?.fromTime) }}</div>
                </div>
                <div class="text-item">
                    <div>Đến ngày: </div>
                    <div class="child">{{ convertDate(selectedItem?.toTime) }}</div>
                </div>
                <div class="text-item">
                    <div>Lương trên giờ: </div>
                    <div class="child">{{ convertVND(selectedItem?.salaryPerHour) }}</div>
                </div>
                <div class="text-item">
                    <div>Tổng giờ mặc định: </div>
                    <div class="child"> {{ selectedItem?.standard_Work_Hours }} giờ</div>
                </div>
                <div class="text-item">
                    <div>Tổng giờ làm: </div>
                    <div class="child"> {{ selectedItem?.actual_Work_Hours }} giờ</div>
                </div>
                <div class="text-item">
                    <div>Số giờ nghỉ: </div>
                    <div class="child">{{ selectedItem?.leave_Hours }} giờ</div>
                </div>
                <div class="text-item">
                    <div>Trừ lương nghỉ: </div>
                    <div class="child">{{ convertVND(selectedItem?.leaveWageDeduction) }}</div>
                </div>
                <div class="text-item">
                    <div>Số giờ tăng ca: </div>
                    <div class="child">{{ selectedItem?.ot_Hours }} giờ</div>
                </div>
                <div class="text-item">
                    <div>Lương tăng ca: </div>
                    <div class="child">{{ convertVND(selectedItem?.otWage) }}</div>
                </div>
                <div class="text-item">
                    <div>Ghi chú: </div>
                    <div class="child"> {{ selectedItem?.note }}</div>
                </div>
                <div class="text-item">
                    <div>Tên ngân hàng: </div>
                    <div class="child">{{ selectedItem?.bankName }}</div>
                </div>
                <div class="text-item">
                    <div>Tên tài khoản: </div>
                    <div class="child">{{ selectedItem?.bankAcountName }}</div>
                </div>
                <div class="text-item">
                    <div>Số tài khoản: </div>
                    <div class="child"> {{ selectedItem?.bankAcountNumber }}</div>
                </div>
                <div class="text-item text-red-500 font-bold">
                    <div>Tổng lương: </div>
                    <div class="child">{{ convertVND(selectedItem?.finalSalary) }}</div>
                </div>
            </div>
            <!-- II -->
            <div class="col-span-12 md:col-span-6 lg:col-span-4 w-full mx-auto rounded-md bg-white shadow-lg p-4">
                <div class="text-[#7b9fd8] text-[20px]">II. Cấu hình tính lương</div>
                <p class="text-[15px] font-bold">1. Bảo hiểm</p>
                <div class="text-item">
                    <div>Đóng bảo hiểm: </div>
                    <div class="child">{{ selectedItem?.insuranceType }}</div>
                </div>
                <div class="text-item">
                    <div>Mức đóng bảo hiểm: </div>
                    <div class="child">{{ convertVND(selectedItem?.insuranceAmount) }}</div>
                </div>
                <div class="text-item">
                    <div>Lương tối thiểu: </div>
                    <div class="child"></div>
                </div>
                <div class="text-item">
                    <div>Xã hội: </div>
                    <div class="child">{{ selectedItem?.bhxH_Comp_Percent }}%</div>
                </div>
                <div class="text-item">
                    <div>Y tế: </div>
                    <div class="child"> {{ selectedItem?.bhyT_Comp_Percent }}%</div>
                </div>
                <div class="text-item">
                    <div>Thất nghiệp: </div>
                    <div class="child"> {{ selectedItem?.bhtN_Emp_Percent }}%</div>
                </div>
                <div class="text-item">
                    <div>Vùng({{ selectedItem?.regionType }}): </div>
                    <div class="child">{{ convertVND(selectedItem?.regionMinimumWage) }}</div>
                </div>
                <p class="text-[15px] font-bold">2. Giảm trừ gia cảnh</p>
                <div class="text-item">
                    <div>Cá nhân: </div>
                    <div class="child">{{ convertVND(selectedItem?.personalTaxDeductionAmount) }}</div>
                </div>
                <div class="text-item">
                    <div>Phụ thuộc: </div>
                    <div class="child">{{ selectedItem?.numberOfDependent }}</div>
                </div>
                <div class="text-item">
                    <div>Số người phụ thuộc: </div>
                    <div class="child">{{ selectedItem?.totalDependentAmount }}</div>
                </div>
            </div>
            <!-- III -->
            <div class="col-span-12 md:col-span-6 lg:col-span-4 w-full mx-auto rounded-md bg-white shadow-lg p-4">
                <div class="text-[#7b9fd8] text-[20px]">III. Diễn giải chi tiết (VND)</div>
                <div class="text-item font-bold">
                    <div>Lương Gross: </div>
                    <div class="child">{{ convertVND(selectedItem?.defaultSalary) }}</div>
                </div>
                <div class="text-item">
                    <div>Bảo hiểm xã hội: </div>
                    <div class="child">-{{ convertVND(selectedItem?.bhxH_Emp_Amount) }}</div>
                </div>
                <div class="text-item">
                    <div>Bảo hiểm thất nghiệp: </div>
                    <div class="child">-{{ convertVND(selectedItem?.bhtN_Emp_Amount) }}</div>
                </div>
                <div class="text-item">
                    <div>Bảo hiểm y tế: </div>
                    <div class="child">-{{ convertVND(selectedItem?.bhyT_Emp_Amount) }}</div>
                </div>
                <div class="text-item font-bold">
                    <div>Thu nhập trước thuế: </div>
                    <div class="child">{{ convertVND(selectedItem?.tntt) }}</div>
                </div>
                <div class="text-item">
                    <div>Giảm trừ gia cảnh bản thân: </div>
                    <div class="child"> -{{ convertVND(selectedItem?.personalTaxDeductionAmount) }}</div>
                </div>
                <div class="text-item">
                    <div>Giảm trừ gia cảnh người phụ thuộc: </div>
                    <div class="child">-{{ convertVND(selectedItem?.dependentTaxDeductionAmount) }}</div>
                </div>
                <div class="text-item">
                    <div>Trừ lương nghỉ làm: </div>
                    <div class="child">-{{ convertVND(selectedItem?.leaveWageDeduction) }}</div>
                </div>
                <div class="text-item font-bold">
                    <div>Thu nhập chịu thuế: </div>
                    <div class="child">{{ convertVND(selectedItem?.taxableSalary) }}</div>
                </div>
                <div class="text-item">
                    <div>Thuế thu nhập cá nhân(*): </div>
                    <div class="child">-{{ convertVND(selectedItem?.totalTaxIncome) }}</div>
                </div>
                <div class="text-item font-bold">
                    <div>Thu nhập sau thuế: </div>
                    <div class="child">{{ convertVND(selectedItem?.afterTaxSalary) }}</div>
                </div>
                <div class="text-item">
                    <div>Lương tăng ca: </div>
                    <div class="child">{{ convertVND(selectedItem?.otWage) }}</div>
                </div>
                <div class="text-item">
                    <div>Trợ cấp hợp đồng: </div>
                    <div class="child">{{ convertVND(selectedItem?.totalContractAllowance) }}</div>
                </div>
                <div class="text-item">
                    <div>Trợ cấp phòng ban: </div>
                    <div class="child">{{ convertVND(selectedItem?.totalDepartmentAllowance) }}</div>
                </div>
                <div class="text-item text-red-500 font-bold">
                    <div>Lương NET: </div>
                    <div class="child">{{ convertVND(selectedItem?.finalSalary) }}</div>
                </div>
            </div>
            <!-- IV -->
            <div class="col-span-12 md:col-span-6 lg:col-span-4 w-full mx-auto rounded-md bg-white shadow-lg p-4">
                <div class="text-[#7b9fd8] text-[20px]">IV. Người sử dụng lao động trả (VND)</div>
                <div class="text-item font-bold">
                    <div>Lương Gross: </div>
                    <div class="child">{{ convertVND(selectedItem?.defaultSalary) }}</div>
                </div>
                <div class="text-item">
                    <div>Bảo hiểm xã hội({{ selectedItem?.bhxH_Comp_Percent }}%): </div>
                    <div class="child">-{{ convertVND(selectedItem?.bhxH_Emp_Amount) }}</div>
                </div>
                <div class="text-item">
                    <div>Bảo hiểm thất nghiệp({{ selectedItem?.bhtN_Comp_Percent }}%): </div>
                    <div class="child">-{{ convertVND(selectedItem?.bhtN_Emp_Amount) }}</div>
                </div>
                <div class="text-item">
                    <div>Bảo hiểm y tế({{ selectedItem?.bhyT_Comp_Percent }}%): </div>
                    <div class="child">-{{ convertVND(selectedItem?.bhyT_Emp_Amount) }}</div>
                </div>
                <div class="text-item font-bold">
                    <div>Tổng cộng: </div>
                    <div class="child">{{ convertVND(selectedItem?.totalInsuranceComp) }}</div>
                </div>
            </div>
            <!-- V -->
            <div class="col-span-12 lg:col-span-6 w-full mx-auto rounded-md bg-white shadow-lg p-4">
                <div class="text-[#7b9fd8] text-[20px]">V. Chi tiết thuế thu thập cá nhân (VND)</div>
                <table class="w-full">
                    <thead>
                        <tr>
                            <th>
                                <div>Mức chịu thuế</div>
                            </th>
                            <th>
                                <div>Thuế suất</div>
                            </th>
                            <th>
                                <div>Tiền nộp</div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="data in selectedItem?.detailTaxes" :key="data.id">
                            <td>
                                <div>Từ {{ convertVND(data.muc_chiu_thue_From) }} 
                                   {{ data.muc_chiu_thue_To != null ? 'đến ' + convertVND(data.muc_chiu_thue_To) : '' }}
                                </div>
                            </td>
                            <td>
                                <div>{{ data.thue_suat }} %</div>
                            </td>
                            <td>
                                <div>{{ convertVND(data.taxAmount) }}</div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <Loading v-show="isLoading" />
    </div>
</template>
<script>
import functionCustom from '../utilities/functionCustom'
import Loading from '../components/Loading.vue'
import API from '../API'
import swal from '../utilities/swal2'
export default {
    components: {
        Loading
    },
    data() {
        return {
            page: 1,
            isLoading: false,
            isShowDetail: false,
            selectedItem: null,
            selectedId: '',
            items: [],
            list: [],
        }
    },
    created() {
        this.getList()
        // this.getConfigTaxIncome()
    },
    methods: {
        getList() {
            this.isLoading = true
            API.getPayslipForEmp(this.page)
                .then(res => {
                    this.isLoading = false
                    this.list = res.data.items
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error('Không thể lấy danh sách, vui lòng thử lại!')
                })
        },
        // getConfigTaxIncome() {
        //     API.getConfigTaxIncome()
        //         .then(response => {
        //             this.items = response.data
        //         })
        //         .catch(error => {
        //             swal.error(error)
        //         });
        // },
        getDetail(item) {
            this.isLoading = true
            API.getPayslipDetailForEmp(item.id)
                .then(res => {
                    this.isShowDetail = true
                    this.isLoading = false
                    this.selectedItem = res.data
                    this.selectedId = res.data.id
                    const detailElement = document.getElementById('detailElement');
                    detailElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err)
                })
        },
        convertVND(price) {
            if (price == null || price == NaN) return '0 VND'
            return functionCustom.convertVND(price)
        },
        convertDate(date) {
            return functionCustom.convertDate(date)
        }
    }
}
</script>
<style scoped>
.text-item {
    word-wrap: break-word;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.text-item:first-child {
    width: 50%;
}

.child {
    width: 50%;
    /* text-align: right; */
}

table {
    text-align: right;
}

thead {
    background-color: rgb(239, 239, 239);
}

th>div {
    padding: 10px 2px;
}

td,
tr,
th {
    border: 1px solid rgb(204, 200, 200);
}
</style>