<template>
    <div class="bg-white">
        <div class="w-[90%] mx-auto">
            <button class="btn-primary" @click="showForm">Nhập file Excel</button>
            <button class="btn-primary" @click="downTemplate">Tải về file Excel mẫu</button>
        </div>
        <div class="bg-white w-full p-3">
            <EasyDataTable :headers="headers" :items="items" :table-class-name="currentTheme" header-text-direction="center"
                body-text-direction="center">
                <template #item-muc_Quy_Doi_From="item">
                    <div>
                        {{ convertVND(item.muc_Quy_Doi_From) }}
                    </div>
                </template>
                <template #item-muc_Quy_Doi_To="item">
                    <div>
                        {{ convertVND(item.muc_Quy_Doi_To) }}
                    </div>
                </template>
                <template #item-he_so_tru="item">
                    <div>
                        {{ convertVND(item.he_so_tru) }}
                    </div>
                </template>
                <template #item-thue_Suat="item">
                    <div>
                        {{ item.thue_Suat }} %
                    </div>
                </template>
                <template #item-operation="item">
                    <div class="operation-wrapper">
                    </div>
                </template>
            </EasyDataTable>
        </div>
        <div v-show="isShowForm" @click.self="isShowForm = false" class="fog-l">
            <div class="bg-white rounded-sm p-5 flex items-center">
                <input type="file" ref="fileInput" />
                <button @click="uploadFile" class="btn-primary">Upload</button>
            </div>
        </div>
        <div v-show="isShow2" class="h-screen w-screen bg-custom fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
            @click.self="isShow2 = false">
            <div
                class="w-[95%] sm:w-1/2 xl:w-1/2 bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-2xl pb-4 xl:pb-6">
                <div
                    class="w-full h-10 sm:h-10 text-center bg-red-400 text-white font-bold rounded-t-2xl text-sm sm:text-3xl flex justify-center items-center sm">
                    Chỉnh sửa mức lương
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Nhập vùng:</span></label>
                        <select v-model="currentCoefficient.regionTypeSelected"
                            class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3">
                            <option v-for="option in options" :value="option.value">{{ option.display }}</option>
                        </select>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Nhập số tiền:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="name" type="number"
                            v-model="currentCoefficient.amount" placeholder="Nhập số tiền">
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit" @click="updateCoefficientButton"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Chỉnh sửa mức lương
                        </button>
                        <button @click="exit2" type="exit"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl">
                            Hủy chỉnh sửa
                        </button>
                    </div>
                </div>
            </div>
            <Loading v-show="isLoading" />
        </div>
    </div>
</template>
<script>
import API from '../API';
import functionCustom from '../utilities/functionCustom';
import swal from '../utilities/swal2';

export default {
    data() {
        return {
            isLoading: false,
            headers: [
                { text: "Mức quy đổi từ", value: "muc_Quy_Doi_From", width: 140, },
                { text: "Mức quy đổi đến", value: "muc_Quy_Doi_To", width: 140, },
                { text: "Thuế suất", value: "thue_Suat", width: 140, },
            ],
            items: [],
            options: [],
            isShow: false,
            isShow2: false,
            isShowForm: false,
            currentCoefficient: {
                id: '',
                regionTypeSelected: '',
                amount: ''
            }
        }
    },

    methods: {
        showForm() {
            this.isShowForm = true
        },
        uploadFile() {
            const file = this.$refs.fileInput.files[0]
            const formData = new FormData()
            formData.append('file', file)
            this.sendFormData(formData)
        },
        sendFormData(formData) {
            API.updateExchange(formData)
                .then(res => {
                    this.getConfigTaxIncome()
                    swal.success('Upload file excel thành công')
                })
                .catch(err => {
                    swal.error(err.response.data)
                })
        },
        exit() {
            this.isShow = false
        },
        exit2() {
            this.isShow2 = false
        },
        getConfigTaxIncome() {
            API.getListExchange()
                .then(response => {
                    this.items = response.data
                })
                .catch(error => {
                    swal.error(error)
                });
        },
        downTemplate() {
            this.isLoading = true
            const fileURL = "https://firebasestorage.googleapis.com/v0/b/logotv2-a1ca2.appspot.com/o/templates%2FTemplateExchange.xlsx?alt=media&token=f608b8fb-4962-4456-9fbb-b7130c95b479";
            const downloadLink = document.createElement("a");

            axios
                .get(fileURL, { responseType: "blob" })
                .then(response => {
                    this.isLoading = false
                    const blob = new Blob([response.data], { type: "application/octet-stream" });
                    const url = window.URL.createObjectURL(blob);

                    downloadLink.href = url;
                    downloadLink.download = "TemplateExchange.xlsx";
                    downloadLink.click();

                    window.URL.revokeObjectURL(url);

                    // Xóa phần tử "a" sau khi tải xuống hoàn tất
                    downloadLink.remove();
                })
                .catch(error => {
                    this.isLoading = false
                    swal.error("Lỗi tải xuống file");
                });
        },
        convertVND(price) {
            if (price == null || price == NaN || price == '') return '0 VND'
            return functionCustom.convertVND(price)
        }
    },
    created() {
        this.getConfigTaxIncome();
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