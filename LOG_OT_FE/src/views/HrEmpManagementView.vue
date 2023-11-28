<template>
    <div>
        <div class="bg-white w-full p-3">
            <button @click="createEmp" class="custom-btn mb-2 sm:mb-5 text-xs sm:text-base">{{ $t('create emp') }}</button>
            <EasyDataTable :headers="headers" :items="items" :table-class-name="currentTheme" header-text-direction="center"
                body-text-direction="center">
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button @click="updateEmp" class="mr-2 bg-green-400 px-2 rounded-lg">Edit</button>
                        <button class="bg-red-400 px-2 rounded-lg">Delete</button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
        <div v-show="isShow" class="h-screen w-screen bg-custom fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
            @click.self="isShow = false">
            <div
                class="w-[95%] sm:w-1/2 xl:w-1/2 bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-2xl pb-4 xl:pb-6">
                <div
                    class="w-full h-10 sm:h-10 text-center bg-red-400 text-white font-bold rounded-t-2xl text-sm sm:text-3xl flex justify-center items-center sm">
                    Tạo nhân viên mới
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Mã nhân viên:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="empid" type="text" v-model="empid"
                            placeholder="Nhập mã nhân viên">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Họ và tên:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="empname" type="text" v-model="empname"
                            placeholder="Nhập tên nhân viên">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="gender" class="w-[100px] sm:w-[130px]"><span>Giới tính:</span></label>
                        <div class="pr-1 sm:pr-3">
                            <label for="male" class="pr-1 sm:pr-2">Male</label>
                            <input type="radio" id="male" value="male" v-model="gender" class="items-center">
                        </div>
                        <div class="pr-1 sm:pr-3">
                            <label for="female" class="pr-1 sm:pr-2">Female</label>
                            <input type="radio" id="female" value="female" v-model="gender">
                        </div>
                        <div class="pr-1 sm:pr-3">
                            <label for="other" class="pr-1 sm:pr-2">Other</label>
                            <input type="radio" id="other" value="other" v-model="gender">
                        </div>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="email" class="w-[100px] sm:w-[130px]"><span>Email:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="email" type="text" v-model="email"
                            placeholder="Nhập địa chỉ Email">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="phonenumber" class="w-[100px] sm:w-[130px]"><span>Số điện thoại:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="phonenumber" type="text"
                            v-model="phonenumber" placeholder="Nhập số điện thoại">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="birthday" class="w-[100px] sm:w-[130px]"><span>Ngày sinh:</span></label>
                        <input v-model="birthday" type="datetime-local" id="birthday"
                            class="dark:bg-[#292e32] bg-gray-100 w-[155px] sm:w-[235px] xl:w-[300px]">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="address" class="w-[100px] sm:w-[130px]"><span>Địa chỉ:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="address" type="text" v-model="address"
                            placeholder="Nhập địa chỉ">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="image" class="w-[100px] sm:w-[130px]"><span>Hình ảnh:</span></label>
                        <div class="block">
                            <div class="w-20 h-20 rounded-lg p-1 border-[1px] border-[#ccc] border-solid mb-1 sm:mb-2">
                                <img :src="imageUrl" v-if="imageUrl" alt="Selected Image" class="w-full h-full rounded-lg">
                            </div>
                            <input type="file" id="image" accept="image/*" @change="handleImageChange" class="w-[155px] sm:w-[235px] xl:w-[300px]">
                        </div>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="bankname" class="w-[100px] sm:w-[130px]"><span>Tên ngân hàng:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="bankname" type="text" v-model="bankname"
                            placeholder="Nhập tên ngân hàng">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="bankaccountnumber" class="w-[100px] sm:w-[130px]"><span>Số tài khoản:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="bankaccountnumber" type="text"
                            v-model="bankaccountnumber" placeholder="Nhập STK ngân hàng">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="username" class="w-[100px] sm:w-[130px]"><span>Username:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="username" type="text" v-model="username"
                            placeholder="Nhập username">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="password" class="w-[100px] sm:w-[130px]"><span>Password:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="password" type="text" v-model="password"
                            placeholder="Nhập password">
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Tạo nhân viên
                        </button>
                        <button @click="exit" type="exit" class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl">
                            Hủy tạo
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="isShow2" class="h-screen w-screen bg-custom fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
            @click.self="isShow2 = false">
            <div
                class="w-[95%] sm:w-1/2 xl:w-1/2 bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-2xl pb-4 xl:pb-6">
                <div
                    class="w-full h-10 sm:h-10 text-center bg-red-400 text-white font-bold rounded-t-2xl text-sm sm:text-3xl flex justify-center items-center sm">
                    Chỉnh sửa thông tin
                </div>
                <div
                    class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center p-1 sm:p-2 mt-1 sm:mt-2">
                    <div class="flex p-1 sm:p-2">
                        <label for="empid" class="w-[100px] sm:w-[130px]"><span>Mã nhân viên:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="empid" type="text" v-model="empid"
                            placeholder="Nhập mã nhân viên">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="empname" class="w-[100px] sm:w-[130px]"><span>Họ và tên:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="empname" type="text" v-model="empname"
                            placeholder="Nhập tên nhân viên">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="gender" class="w-[100px] sm:w-[130px]"><span>Giới tính:</span></label>
                        <div class="pr-1 sm:pr-3">
                            <label for="male" class="pr-1 sm:pr-2">Male</label>
                            <input type="radio" id="male" value="male" v-model="gender" class="items-center">
                        </div>
                        <div class="pr-1 sm:pr-3">
                            <label for="female" class="pr-1 sm:pr-2">Female</label>
                            <input type="radio" id="female" value="female" v-model="gender">
                        </div>
                        <div class="pr-1 sm:pr-3">
                            <label for="other" class="pr-1 sm:pr-2">Other</label>
                            <input type="radio" id="other" value="other" v-model="gender">
                        </div>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="email" class="w-[100px] sm:w-[130px]"><span>Email:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="email" type="text" v-model="email"
                            placeholder="Nhập địa chỉ Email">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="phonenumber" class="w-[100px] sm:w-[130px]"><span>Số điện thoại:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="phonenumber" type="text"
                            v-model="phonenumber" placeholder="Nhập số điện thoại">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="birthday" class="w-[100px] sm:w-[130px]"><span>Ngày sinh:</span></label>
                        <input v-model="birthday" type="datetime-local" id="birthday"
                            class="dark:bg-[#292e32] bg-gray-100 w-[155px] sm:w-[235px] xl:w-[300px]">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="address" class="w-[100px] sm:w-[130px]"><span>Địa chỉ:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="address" type="text" v-model="address"
                            placeholder="Nhập địa chỉ">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="image" class="w-[100px] sm:w-[130px]"><span>Hình ảnh:</span></label>
                        <div class="block">
                            <div class="w-20 h-20 rounded-lg p-1 border-[1px] border-[#ccc] border-solid mb-1 sm:mb-2">
                                <img :src="imageUrl" v-if="imageUrl" alt="Selected Image" class="w-full h-full rounded-lg">
                            </div>
                            <input type="file" id="image" accept="image/*" @change="handleImageChange" class="w-[155px] sm:w-[235px] xl:w-[300px]">
                        </div>
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="bankname" class="w-[100px] sm:w-[130px]"><span>Tên ngân hàng:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="bankname" type="text" v-model="bankname"
                            placeholder="Nhập tên ngân hàng">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="bankaccountnumber" class="w-[100px] sm:w-[130px]"><span>Số tài khoản:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="bankaccountnumber" type="text"
                            v-model="bankaccountnumber" placeholder="Nhập STK ngân hàng">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="username" class="w-[100px] sm:w-[130px]"><span>Username:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="username" type="text" v-model="username"
                            placeholder="Nhập username">
                    </div>
                    <div class="flex p-1 sm:p-2">
                        <label for="password" class="w-[100px] sm:w-[130px]"><span>Password:</span></label>
                        <input class="bg-slate-200 w-[155px] sm:w-[235px] xl:w-[300px] px-2 sm:px-3" id="password" type="text" v-model="password"
                            placeholder="Nhập password">
                    </div>
                    <div class="flex justify-center p-1 sm:p-2 mt-3 sm:mt-5">
                        <button type="submit"
                            class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl mr-4 sm:mr-8">
                            Tạo nhân viên
                        </button>
                        <button @click="exit2" type="exit" class="bg-red-400 text-white p-1 sm:p-2 rounded-md sm:rounded-xl">
                            Hủy tạo
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            gender: '',
            imageFile: null,
            headers: [
                { text: "Mã nhân viên", value: "empid", width: 100, fixed: "left", },
                { text: "Họ và tên", value: "empname", width: 140, },
                { text: "Giới tính", value: "gender", width: 100, },
                { text: "Email", value: "email", width: 130 },
                { text: "Số điện thoại", value: "phonenumber", width: 120 },
                { text: "Ngày sinh", value: "birthday", width: 80 },
                { text: "Địa chỉ", value: "address", width: 150 },
                { text: "Hình ảnh", value: "image", width: 100 },
                { text: "Tên ngân hàng", value: "bankname", width: 110 },
                { text: "Số tài khoản", value: "bankaccountnumber", width: 100 },
                { text: "Username", value: "username", width: 100 },
                { text: "Password", value: "password", width: 100 },
                { text: "Action", value: "operation", width: 120 },
            ],
            items: [
                { empid: "abcdef231123", empname: "Nguyen Duc Hai Van", gender: "nam", email: "trjace@gmail.com", phonenumber: '010101010101', birthday: "01/01/2001", address: "Viet Nam number one", image: "Van dep trai", bankname: "Vietcombank", bankaccountnumber: '000000000000', username: "vandeptraine", password: "123daaaa", },
                { empid: "abcdef231123", empname: "Nguyen Duc Hai Van", gender: "nam", email: "trjace@gmail.com", phonenumber: '010101010101', birthday: "01/01/2001", address: "Viet Nam number one", image: "Van dep trai", bankname: "Vietcombank", bankaccountnumber: '000000000000', username: "vandeptraine", password: "123daaaa", },
                { empid: "abcdef231123", empname: "Nguyen Duc Hai Van", gender: "nam", email: "trjace@gmail.com", phonenumber: '010101010101', birthday: "01/01/2001", address: "Viet Nam number one", image: "Van dep trai", bankname: "Vietcombank", bankaccountnumber: '000000000000', username: "vandeptraine", password: "123daaaa", },
                { empid: "abcdef231123", empname: "Nguyen Duc Hai Van", gender: "nam", email: "trjace@gmail.com", phonenumber: '010101010101', birthday: "01/01/2001", address: "Viet Nam number one", image: "Van dep trai", bankname: "Vietcombank", bankaccountnumber: '000000000000', username: "vandeptraine", password: "123daaaa", },
                { empid: "abcdef231123", empname: "Nguyen Duc Hai Van", gender: "nam", email: "trjace@gmail.com", phonenumber: '010101010101', birthday: "01/01/2001", address: "Viet Nam number one", image: "Van dep trai", bankname: "Vietcombank", bankaccountnumber: '000000000000', username: "vandeptraine", password: "123daaaa", },
                { empid: "abcdef231123", empname: "Nguyen Duc Hai Van", gender: "nam", email: "trjace@gmail.com", phonenumber: '010101010101', birthday: "01/01/2001", address: "Viet Nam number one", image: "Van dep trai", bankname: "Vietcombank", bankaccountnumber: '000000000000', username: "vandeptraine", password: "123daaaa", },
                { empid: "abcdef231123", empname: "Nguyen Duc Hai Van", gender: "nam", email: "trjace@gmail.com", phonenumber: '010101010101', birthday: "01/01/2001", address: "Viet Nam number one", image: "Van dep trai", bankname: "Vietcombank", bankaccountnumber: '000000000000', username: "vandeptraine", password: "123daaaa", },
                { empid: "abcdef231123", empname: "Nguyen Duc Hai Van", gender: "nam", email: "trjace@gmail.com", phonenumber: '010101010101', birthday: "01/01/2001", address: "Viet Nam number one", image: "Van dep trai", bankname: "Vietcombank", bankaccountnumber: '000000000000', username: "vandeptraine", password: "123daaaa", },
                { empid: "abcdef231123", empname: "Nguyen Duc Hai Van", gender: "nam", email: "trjace@gmail.com", phonenumber: '010101010101', birthday: "01/01/2001", address: "Viet Nam number one", image: "Van dep trai", bankname: "Vietcombank", bankaccountnumber: '000000000000', username: "vandeptraine", password: "123daaaa", },
                { empid: "abcdef231123", empname: "Nguyen Duc Hai Van", gender: "nam", email: "trjace@gmail.com", phonenumber: '010101010101', birthday: "01/01/2001", address: "Viet Nam number one", image: "Van dep trai", bankname: "Vietcombank", bankaccountnumber: '000000000000', username: "vandeptraine", password: "123daaaa", },
                { empid: "abcdef231123", empname: "Nguyen Duc Hai Van", gender: "nam", email: "trjace@gmail.com", phonenumber: '010101010101', birthday: "01/01/2001", address: "Viet Nam number one", image: "Van dep trai", bankname: "Vietcombank", bankaccountnumber: '000000000000', username: "vandeptraine", password: "123daaaa", },
                { empid: "abcdef231123", empname: "Nguyen Duc Hai Van", gender: "nam", email: "trjace@gmail.com", phonenumber: '010101010101', birthday: "01/01/2001", address: "Viet Nam number one", image: "Van dep trai", bankname: "Vietcombank", bankaccountnumber: '000000000000', username: "vandeptraine", password: "123daaaa", },
            ],
            isShow: false,
            isShow2: false,
        }
    },
    methods: {
        createEmp() {
            this.isShow = true
        },
        updateEmp() {
            this.isShow2 = true
        },
        exit() {
            this.isShow = false
        },
        exit2() {
            this.isShow2 = false
        },
        handleImageChange(event) {
            this.imageFile = event.target.files[0]
        }
    },
    computed: {
        imageUrl() {
            return this.imageFile ? URL.createObjectURL(this.imageFile) : null
        }
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
