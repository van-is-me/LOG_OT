<template>
    <div class="bg-white">
        <!-- <form @submit.prevent="search" class="w-[100%] sm:w-[70%] lg:w-[30%] relative">
            <input type="text" class="w-full search-cus dark:bg-gray-800 dark:text-white" placeholder="search . . .">
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" class="absolute top-[50%] right-4 translate-y-[-50%]" />
        </form> -->
        <button class="btn-primary my-3" @click="showCreate">Tạo mới</button>
        <div class="w-[90%] mx-auto mt-10">
            <EasyDataTable :headers="headers" :items="list" header-text-direction="center" :table-class-name="currentTheme"
                body-text-direction="center">
                <template #item-workStatus="item">
                    <div :class="item.workStatus == '1' ? 'bg-green-500 text-white' : 'bg-red-800 text-white'">
                        {{ item.workStatus == '1' ? 'StillWork' : 'Quit' }}
                    </div>
                </template>
                <template #item-birthDay="item">
                    <div>
                        {{ convertDate(item.birthDay) }}
                    </div>
                </template>
                <template #item-genderType="item">
                    <div>
                        {{ item.genderType == 1 ? "Nữ" : item.genderType == 2 ? "Nam" : "Khác" }}
                    </div>
                </template>
                <template #item-operation="item">
                    <div class="operation-wrapper flex justify-center">
                        <!-- <button class="view-btn" @click="goTo(item.userName, item.id)"><font-awesome-icon
                                icon="fa-solid fa-eye" /></button> -->
                        <button class="edit-btn" @click="showUpdate(item)"><font-awesome-icon
                                icon="fa-solid fa-pen-to-square" /></button>
                        <div>
                            <button @click="unlockAcc(item.id)"
                                v-if="item.lockoutEnd && new Date(item.lockoutEnd) > new Date()" class="btn-primary">
                                <font-awesome-icon :icon="['fas', 'lock-open']" />
                            </button>
                            <button v-else @click="logAcc(item.id)" class="danger-btn">
                                <font-awesome-icon icon="fa-solid fa-lock" />
                            </button>
                        </div>
                        <!-- <button class="delete-btn"><font-awesome-icon :icon="['fas', 'trash']" /></button> -->
                    </div>
                </template>
            </EasyDataTable>
        </div>
        <div v-show="isShow" @click.self="cancelAll" class="fog-l">
            <div class="w-[90%] md:w-[60%] bg-white dark:bg-[#292e32] p-7 rounded-md h-[90vh] overflow-y-scroll">
                <div class="w-full" v-if="isCreate">
                    <p class="text-[30px] my-2">Thông tin nhân viên</p>
                </div>
                <div class="flex flex-wrap justify-center w-full">
                    <div class="box-input w-[86%] lg:w-[40%]">
                        <label for="username">Tên đăng nhập</label>
                        <input type="text" id="username" v-model="currentEmp.userName"
                            class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                    <div class="box-input w-[86%] lg:w-[40%]">
                        <label for="fullName">Họ và Tên</label>
                        <input type="text" id="fullName" v-model="currentEmp.fullName"
                            class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                    <div class="box-input w-[86%] lg:w-[40%]">
                        <label for="gender">Giới tính</label>
                        <div class="w-full mt-[10px]">
                            <input type="radio" id="male" value="2" v-model="currentEmp.genderType">
                            <label class="mr-10" for="male">Nam</label>
                            <input type="radio" id="female" value="1" v-model="currentEmp.genderType">
                            <label class="mr-10" for="female">Nữ</label>
                            <input type="radio" id="other" value="3" v-model="currentEmp.genderType">
                            <label for="other">Khác</label>
                        </div>
                    </div>

                    <div class="box-input w-[86%] lg:w-[40%]">
                        <label for="email">Email</label>
                        <input :class="[{ 'empty-input': isInputEmpty(currentEmp.email) }]" type="text" id="email"
                            v-model="currentEmp.email" class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                    <div class="box-input w-[86%] lg:w-[40%]">
                        <label for="phone">Số điện thoại</label>
                        <input type="text" id="phone" v-model="currentEmp.phoneNumber"
                            class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                    <div class="box-input w-[86%] lg:w-[40%]">
                        <label for="birthday">Sinh nhật</label>
                        <input type="datetime-local" id="birthday" v-model="currentEmp.birthDay"
                            class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                    <div class="box-input w-[86%] lg:w-[40%]">
                        <label for="address">Địa chỉ</label>
                        <input type="text" id="address" v-model="currentEmp.address"
                            class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                    <div class="box-input w-[86%] lg:w-[40%]">
                        <label for="cccd">Căn cước công dân</label>
                        <input type="text" id="cccd" v-model="currentEmp.identityNumber"
                            class="input-cus dark:bg-gray-900 dark:text-white  ">
                    </div>
                    <div class="box-input w-[86%] lg:w-[40%]">
                        <label for="position">Vị trí</label>
                        <select type="text" id="position" v-model="selectedPosition"
                            class="select-cus dark:bg-gray-900 dark:text-white  ">
                            <option v-for="p in positionList" :value="p?.id" :key="p?.id">
                                {{ p?.name }}
                            </option>
                        </select>
                    </div>
                    <div class="box-input w-[86%] lg:w-[40%] items-center">
                        <img v-if="imgTmp" :src="imgTmp" class="w-[200px] h-[200px] block mx-auto rounded-full object-cover"
                            alt="Selected Image">
                        <img v-if="imgTmp == null || imgTmp == undefined || imgTmp == ''" :src="currentEmp.image" alt="logo"
                            class="w-[200px] h-[200px] block mx-auto rounded-full object-cover">
                        <input @change="handleFileChange" ref="imageFile" type="file" id="image" class="hidden">
                        <label class="edit-btn w-[50px] text-center cursor-pointer" for="image"><font-awesome-icon
                                :icon="['fas', 'image']" /></label>
                        <button @click="uploadImage" class="btn-primary">Lưu</button>
                    </div>
                </div>
                <div class="w-[86%] mx-auto flex justify-end">
                    <button class="cancel-btn" @click="cancelAll">Huỷ</button>
                    <button v-if="isUpdate" @click="actionUpdate" class="edit-btn">Chỉnh sửa</button>
                    <button v-if="isCreate" @click="actionCreate" class="btn-primary">Lưu</button>
                </div>
            </div>
        </div>
        <Loading v-if="isLoading" />
    </div>
</template>
    
<script>
import { useLanguageStore } from '../stores/lang';
import API from '../API'
import MutiSelect from '../components/MutiSelect.vue';
import Loading from '../components/Loading.vue'
import functionCustom from '../utilities/functionCustom'
import { useThemeStore } from '../stores/theme';
import swal from '../utilities/swal2';
import { storage } from '../firebase'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
export default {
    components: {
        Loading,
        MutiSelect
    },
    setup() {
        const langStore = useLanguageStore()
        const themeStore = useThemeStore()
        return { langStore, themeStore }
    },
    data() {
        return {
            list: [],
            page: 1,
            allowancePage: 1,
            contractPage: 1,
            isShow: false,
            isCreate: false,
            isUpdate: false,
            isLoading: false,
            isShowInsuranceAmount: false,
            positionList: [],
            contractList: [],
            allowanceList: [],
            salaryTypeList: [],
            insuranceTypeList: [],
            contractTypeList: [],
            selectedPosition: null,
            selectedAllowance: [],
            selectedContract: null,
            headers: [
                { text: "Tên tài khoản", value: "userName", width: 200, fixed: "left" },
                { text: "Họ và Tên", value: "fullname", width: 200 },
                { text: "Giới tính", value: "genderType", width: 200 },
                { text: "Email", value: "email", width: 200 },
                { text: "Số điện thoại", value: "phoneNumber", width: 200 },
                { text: "Sinh nhật", value: "birthDay", width: 200 },
                // { text: "Tên ngân hàng", value: "bankName", width: 200 },
                // { text: "Tên tài khoản ngân hàng", value: "bankAccountName", width: 200 },
                // { text: "Số tài khoản ngân hàng", value: "bankAccountNumber", width: 200 },
                { text: "Địa chỉ", value: "address", width: 200 },
                { text: "Tình trạng", value: "workStatus", width: 200 },
                // { text: "Kinh nghiệm", value: "experiences", width: 200 },
                { text: "Hành động", value: "operation", width: 400 },
            ],
            imgTmp: null,
            tmpEmail: '',
            tmpMaternity: false,
            currentEmp: {
                userName: '',
                fullName: '',
                genderType: 1,
                email: '',
                phoneNumber: '',
                birthDay: '',
                bankName: '',
                bankAccountName: '',
                bankAccountNumber: '',
                address: '',
                experiences: '',
                image: 'https://placehold.co/600x400',
                identityNumber: '',
                isMaternity: false,
                role: 'Manager',
                startDate: '',
                endDate: '',
                basicSalary: 0
            },
            id: '',
            currentTheme: "",
            contract: {
                username: '',
                contractCode: '',
                file: '',
                job: '',
                // percentDeduction: 0,
                salaryType: 1,
                contractType: 1,
                isPersonalTaxDeduction: true,
                insuranceType: 1,
                insuranceAmount: 0,
                allowanceId: []
            }
        }
    },
    created() {
        this.getList()
        this.setTheme()
        this.getPositionList()
        this.getContractList()
        this.getAllowanceList()
        this.getEnumList()
    },
    computed: {
        formattedDate() {
            return this.currentEmp.birthDay = this.currentEmp.birthDay.split('T')[0];
        }
    },
    watch: {
        'themeStore.getTheme': function (val) {
            this.currentTheme == 'light-theme' ? this.currentTheme = 'dark-theme' : this.currentTheme = 'light-theme'
        },
        'contract.insuranceType': function (newValue) {
            if (newValue == 3) {
                this.isShowInsuranceAmount = true
            } else {
                this.contract.insuranceAmount = 0
                this.isShowInsuranceAmount = false
            }
        }
    },
    methods: {
        getList() {
            this.isLoading = true
            API.getListAccount(this.page)
                .then(res => {
                    this.isLoading = false
                    this.list = res.data.items
                })
                .catch(err => {
                    swal.error(err)
                    this.isLoading = false
                })
        },
        getAllowanceList() {
            API.getListAllowance(this.allowancePage)
                .then(res => {
                    this.allowanceList = res.data.result.items
                })
                .catch(err => swal.error(err))
        },
        getContractList() {
            API.getContractList(this.contractPage)
                .then(res => {
                    this.contractList = res.data.items
                })
                .catch(err => swal.error(err))
        },
        getPositionList() {
            API.getListPosition()
                .then(res => {
                    this.positionList = res.data.items
                })
                .catch(err => swal.error(err))
        },
        getEnumList() {
            API.salaryType()
                .then(res => {
                    this.salaryTypeList = res.data
                })
                .catch(err => swal.error(err))

            API.contractType()
                .then(res => {
                    this.contractTypeList = res.data
                })
                .catch(err => swal.error(err))

            API.insuranceType()
                .then(res => {
                    this.insuranceTypeList = res.data
                })
                .catch(err => swal.error(err))
        },
        uploadImage() {
            this.isLoading = true
            const currentTime = new Date();
            const uniqueFileName = 'image_' + currentTime.getTime() + '.jpg';
            const storageRef = ref(storage, 'images/' + uniqueFileName);
            this.imgTmp = null

            uploadBytes(storageRef, this.$refs.imageFile.files[0])
                .then(snapshot => {
                    return getDownloadURL(snapshot.ref);
                })
                .then(downloadURL => {
                    this.currentEmp.image = downloadURL;
                    swal.success('Tải ảnh lên thành công');
                    this.isLoading = false
                })
                .catch(error => {
                    swal.error('Lỗi khi tải ảnh lên:', error)
                    this.isLoading = false
                });
        },
        uploadPDF() {
            this.isLoading = true
            const currentTime = new Date();
            const uniqueFileName = 'pdf_' + currentTime.getTime() + '.pdf';
            const storageRef = ref(storage, 'pdfs/' + uniqueFileName);

            uploadBytes(storageRef, this.$refs.pdfFile.files[0])
                .then(snapshot => {
                    return getDownloadURL(snapshot.ref);
                })
                .then(downloadURL => {
                    this.isLoading = false
                    this.contract.file = downloadURL
                    swal.success('Tải file PDF lên thành công');
                })
                .catch(error => {
                    this.isLoading = false
                    swal.error('Lỗi khi tải file PDF lên:', error)
                })
        },
        showUpdate(item) {
            this.tmpMaternity = item.isMaternity
            this.tmpEmail = item.email

            this.id = item.id
            this.currentEmp.userName = item.userName
            this.currentEmp.fullName = item.fullname
            this.currentEmp.genderType = item.genderType
            this.currentEmp.email = item.email
            this.currentEmp.phoneNumber = item.phoneNumber
            this.currentEmp.birthDay = item.birthDay
            this.currentEmp.bankName = item.bankName
            this.currentEmp.bankAccountName = item.bankAccountName
            this.currentEmp.bankAccountNumber = item.bankAccountNumber
            this.currentEmp.address = item.address
            this.currentEmp.experiences = item.experiences
            this.currentEmp.image = item.image
            this.currentEmp.identityNumber = item.identityNumber
            this.currentEmp.isMaternity = item.isMaternity
            this.selectedPosition = item.positionId
            this.isShow = true
            this.isUpdate = true
        },
        actionUpdate() {
            if (!/^\d{12}$/.test(this.currentEmp.identityNumber)) {
                return swal.error("CCCD phải nhập đúng 12 số!");
            }
            if (!/^\d{10}$/.test(this.currentEmp.phoneNumber)) {
                return swal.error("phoneNumber phải nhập đúng 10 số và đúng định dạng!");
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.currentEmp.email)) {
                return swal.error("email không hợp lệ!");
            }
            this.isLoading = true
            if (this.tmpEmail != this.currentEmp.email) {
                const dataEmail = {
                    userId: this.id,
                    newEmail: this.currentEmp.email
                }
                API.updateEmail(dataEmail)
                    .then(res => { })
                    .catch(err => swal.error('Không thể chỉnh sửa email thành công, vui lòng kiểm tra lại'))
            }
            if (this.tmpMaternity != JSON.parse(this.currentEmp.isMaternity)) {
                API.updateMaternity(this.id)
                    .then(res => { })
                    .catch(err => swal.error('Không thể chỉnh sửa thai sản thành công, vui lòng kiểm tra lại'))
            }
            const data = {
                positionId: this.selectedPosition,
                fullName: this.currentEmp.fullName,
                address: this.currentEmp.address,
                genderType: Number.parseInt(this.currentEmp.genderType),
                identityNumber: this.currentEmp.identityNumber,
                birthDay: this.currentEmp.birthDay,
                bankAccountNumber: this.currentEmp.bankAccountNumber,
                bankAccountName: this.currentEmp.bankAccountName,
                bankName: this.currentEmp.bankName,
                username: this.currentEmp.userName,
                // email: this.currentEmp.email,
                // isMaternity: this.currentEmp.isMaternity ? true : false,
                image: this.currentEmp.image,
                phoneNumber: this.currentEmp.phoneNumber
            }
            API.updateEmployee(data)
                .then(res => {
                    this.isLoading = false
                    swal.success('Cập nhật thông tin thành công!')
                    this.getList()
                    this.cancelAll()
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err.response.data)
                })
        },
        actionCreate() {
            if (!/^\d{12}$/.test(this.currentEmp.identityNumber)) {
                return swal.error("CCCD phải nhập đúng 12 số!");
            }
            if (!/^\d{10}$/.test(this.currentEmp.phoneNumber)) {
                return swal.error("phoneNumber phải nhập đúng 10 số và đúng định dạng!");
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.currentEmp.email)) {
                return swal.error("email không hợp lệ!");
            }
            this.isLoading = true
            const data = {
                positionId: this.selectedPosition,
                fullName: this.currentEmp.fullName,
                address: this.currentEmp.address,
                genderType: Number.parseInt(this.currentEmp.genderType),
                identityNumber: this.currentEmp.identityNumber,
                birthDay: this.currentEmp.birthDay,
                username: this.currentEmp.userName,
                email: this.currentEmp.email,
                image: this.currentEmp.image,
                phoneNumber: this.currentEmp.phoneNumber,
                // role: this.currentEmp.role,
            }

            // this.contract.username = this.currentEmp.userName
            // this.contract.allowanceId = this.selectedAllowance

            API.createAccount(data)
                .then(res => {
                    this.getList()
                    swal.success('Tạo người dùng mới thành công')
                    this.cancelAll()
                    this.isLoading = false

                })
                .catch(err => {
                    this.isLoading = false
                    if (err.response.data.errors?.newEmp) {
                        return swal.error(err.response.data.errors.newEmp[0])
                    }
                    if (Array.isArray(err.response.data)) {
                        const listErr = err.response.data.join('\n')
                        return swal.error(listErr, 3000)
                    } else {
                        return swal.error(err.response.data)
                    }
                })
        },
        convertDate(date) {
            return functionCustom.convertDate(date)
        },
        showCreate() {
            this.isShow = true
            this.isCreate = true
        },
        cancelAll() {
            this.isCreate = false
            this.isShow = false
            this.isUpdate = false
            this.imgTmp = null
            this.selectedPosition = ''
            this.currentEmp = {
                userName: '',
                fullName: '',
                genderType: 1,
                email: '',
                phoneNumber: '',
                birthDay: '',
                bankName: '',
                bankAccountName: '',
                bankAccountNumber: '',
                address: '',
                experiences: '',
                image: 'https://placehold.co/600x400',
                identityNumber: '',
                isMaternity: false,
                role: 'Manager',
                startDate: '',
                endDate: '',
                basicSalary: 0
            }
            this.contract = {
                contractCode: '',
                file: '',
                job: '',
                // percentDeduction: 0,
                salaryType: 1,
                contractType: 1,
                isPersonalTaxDeduction: true,
                insuranceType: 1,
                insuranceAmount: 0,
                allowanceId: []
            }
            this.id = ''
        },
        goTo(userName, id) {
            this.$router.push({ name: 'emp-information', params: { username: userName, id: id } })
        },
        setTheme() {
            let curr = this.themeStore.getTheme
            this.currentTheme = curr == 'auto' ? 'dark-theme' : 'light-theme'
        },
        handleFileChange(event) {
            const file = event.target.files[0]
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader()
                reader.onload = (e) => {
                    this.imgTmp = e.target.result
                }
                reader.readAsDataURL(file)
            } else {
                swal.error('Bạn phải chọn đúng file ảnh để hiển thị')
            }
        },
        isInputEmpty(field) {
            return field === '';
        },
        unlockAcc(id) {
            this.isLoading = true
            API.unlockAcc(id)
                .then(res => {
                    this.isLoading = false
                    this.getList()
                    swal.success(res.data)
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err)
                })
        },
        logAcc(id) {
            this.isLoading = true
            API.lockAcc(id)
                .then(res => {
                    this.isLoading = false
                    this.getList()
                    swal.success(res.data)
                })
                .catch(err => {
                    this.isLoading = false
                    swal.error(err)
                })
        }
    }
}
</script>
    