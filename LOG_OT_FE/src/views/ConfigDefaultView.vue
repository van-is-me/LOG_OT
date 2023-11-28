<template>
    <div>
        <div class="bg-white w-full p-3">
            <!-- <button @click="createAllowanceForm" class="custom-btn mb-2 sm:mb-5 text-xs sm:text-base">Tạo phụ cấp
                mới</button> -->
            <EasyDataTable :headers="headers" :items="items" :table-class-name="currentTheme" header-text-direction="center"
                body-text-direction="center">
                <template #item-companyRegionType="item">
                    <div>
                        {{ item.companyRegionType == '1' ? 'Region 1' : item.companyRegionType == '2' ? 'Region 2' :
                            item.companyRegionType == '3' ? 'Region 3' : 'Region 4' }}
                    </div>
                </template>
                <template #item-baseSalary="item">
                    <div>
                        {{ convertVND(item.baseSalary) }}
                    </div>
                </template>
                <template #item-personalTaxDeduction="item">
                    <div>
                        {{ convertVND(item.personalTaxDeduction) }}
                    </div>
                </template>
                <template #item-dependentTaxDeduction="item">
                    <div>
                        {{ convertVND(item.dependentTaxDeduction) }}
                    </div>
                </template>

                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button class="view-btn"><font-awesome-icon icon="fa-solid fa-eye" /></button>
                        <button @click="updateCoefficientForm(item)" class="edit-btn"><font-awesome-icon
                                icon="fa-solid fa-pen-to-square" /></button>
                        <!-- <button @click="deleteAllowance(item.id)" class="delete-btn"><font-awesome-icon
                                :icon="['fas', 'trash']" /></button> -->
                    </div>
                </template>
            </EasyDataTable>
        </div>
        <div v-show="isShow2" class="h-screen w-screen bg-custom fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
            @click.self="isShow2 = false">
            <div
                class="w-[95%] sm:w-1/2 xl:w-1/2 bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-2xl pb-4 xl:pb-6">
                <div
                    class="w-full h-10 sm:h-10 text-center bg-red-400 text-white font-bold rounded-t-2xl text-sm sm:text-3xl flex justify-center items-center sm">
                    Chỉnh sửa cấu hình mặc định
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px] xl:w-[300px]"><span>Nhập vùng:</span></label>
                        <select v-model="currentCoefficient.companyRegionType"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px] xl:w-[300px]"><span>Nhập lương cơ
                                bản:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="number"
                            v-model="currentCoefficient.baseSalary" placeholder="Nhập lương cơ bản">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px] xl:w-[300px]"><span>Nhập thuế cá nhân khấu
                                trừ:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="number"
                            v-model="currentCoefficient.personalTaxDeduction" placeholder="Nhập thuế cá nhân khấu trừ">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px] xl:w-[300px]"><span>Nhập thuế người phụ thuộc khấu
                                trừ:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="number"
                            v-model="currentCoefficient.dependentTaxDeduction"
                            placeholder="Nhập thuế người phụ thuộc khấu trừ">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px] xl:w-[300px]"><span>Nhập bảo hiểm giới
                                hạn:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="number"
                            v-model="currentCoefficient.insuranceLimit" placeholder="Nhập bảo hiểm giới hạn">
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="updateCoefficientButton"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Chỉnh sửa cấu hình
                        </button>
                        <button @click="exit2" type="exit"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl">
                            Hủy chỉnh sửa
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
                { text: "Loại vùng", value: "companyRegionType", width: 140, },
                { text: "Lương cơ bản", value: "baseSalary", width: 140, },
                { text: "Thuế cá nhân khấu trừ", value: "personalTaxDeduction", width: 140, },
                { text: "Thuế người phụ thuộc khấu trừ", value: "dependentTaxDeduction", width: 140, },
                { text: "Bảo hiểm giới hạn", value: "insuranceLimit", width: 140, },
                { text: "Action", value: "operation", width: 300 },
            ],
            items: [],
            options: [],
            isShow: false,
            isShow2: false,
            currentCoefficient: {
                companyRegionType: '',
                baseSalary: '',
                personalTaxDeduction: '',
                dependentTaxDeduction: '',
                insuranceLimit: ''
            }
        }
    },

    methods: {
        updateCoefficientForm(item) {
            this.isShow2 = true
            this.currentCoefficient.companyRegionType = item.companyRegionType
            this.currentCoefficient.baseSalary = item.baseSalary
            this.currentCoefficient.personalTaxDeduction = item.personalTaxDeduction
            this.currentCoefficient.dependentTaxDeduction = item.dependentTaxDeduction
            this.currentCoefficient.insuranceLimit = item.insuranceLimit
        },
        updateCoefficientButton() {
            const data = {
                companyRegionType: this.currentCoefficient.companyRegionType,
                baseSalary: this.currentCoefficient.baseSalary,
                personalTaxDeduction: this.currentCoefficient.personalTaxDeduction,
                dependentTaxDeduction: this.currentCoefficient.dependentTaxDeduction,
                insuranceLimit: this.currentCoefficient.insuranceLimit,
            }
            API.updateConfigDefault(data)
                .then(response => {
                    swal.success(response.data)
                    this.exit2()
                    this.getConfigDefault()
                })
                .catch(error => {
                    swal.error("Cập nhật thất bại!")
                });
        },
        exit() {
            this.isShow = false
        },
        exit2() {
            this.isShow2 = false
        },
        getConfigDefault() {
            API.getConfigDefault()
                .then(response => {
                    this.items = []
                    this.items.push(response.data)
                    console.log(response);
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        convertVND(price) {
            if (price == null || price == NaN || price == '') return '0 VND'
            return functionCustom.convertVND(price)
        },
        getListRegionType() {
            API.getListRegionType()
                .then(response => {
                    this.options = response.data
                })
                .catch(error => {
                    swal.error(error)
                });
        },
    },
    created() {
        this.getConfigDefault();
        this.getListRegionType();
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
}</style>