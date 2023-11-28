<template>
    <div>
        <div class="bg-white rounded-2xl w-full dark:bg-[#292e32]">
            <div
                class="w-full h-10 sm:h-14 bg-red-400 text-white font-bold rounded-t-2xl text-lg sm:text-3xl flex justify-center items-center dark:bg-[#292e32]">
                Xem thông tin chi tiết nhân viên
            </div>

            <div class="w-full pl-1 pr-1 sm:pl-2 sm:pr-2 dark:bg-[#292e32]">
                <div class="text-red-600 font-bold text-base sm:text-xl mt-1 sm:mt-2 mb-1 sm:mb-2">Thông tin chung</div>
                <div class="w-full flex flex-col xl:flex-row">
                    <div class="rounded-xl border-[2px] border-solid boder-[#ccc] p-1 flex flex-row w-full xl:w-3/4 mr-8">
                        <div class="mr-2 md:mr-2 lg:mr-8">
                            <img :src="auth?.image == '(null)' ? 'https://img.freepik.com/free-icon/user_318-804790.jpg' : auth?.image" alt="profile image"
                                class="rounded-xl w-[80px] h-full sm:w-[150px] sm:h-full" />
                        </div>
                        <div class="grid items-center text-xs sm:text-base">
                            <div class="flex">
                                <span class="w-[85px] sm:w-[115px]">Tên đăng nhập:</span>
                                <span>{{ auth?.username }}</span>
                            </div>
                            <div class="flex">
                                <span class="w-[85px] sm:w-[115px]">Email:</span>
                                <span>{{ auth?.email }}</span>
                            </div>
                            <div class="flex">
                                <span class="w-[85px] sm:w-[115px]">Họ và tên:</span>
                                <span>{{ auth?.fullName }}</span>
                            </div>
                            <!-- <div class="flex">
                                <span class="w-[85px] sm:w-[115px]">Số điện thoại:</span>
                                <span>{{ auth?. }}</span>
                            </div> -->

                            <div class="flex">
                                <span class="w-[85px] sm:w-[115px]">Ngày sinh:</span>
                                <span>11/11/2001</span>
                            </div>
                            <div class="flex">
                                <span class="w-[85px] sm:w-[115px]">Chức vụ:</span>
                                <span>{{ auth.listRoles[0] }}</span>
                            </div>
                        </div>
                    </div>
                    <div class="w-full xl:w-[46%] text-justify mt-1 sm:mt-2 xl:mt-0">
                        <span class="text-red-600 font-bold text-base sm:text-xl">Kinh nghiệm:</span>
                        <br>
                        Tôi là một lập trình viên Front-end có hơn 3 năm kinh nghiệm
                        trong việc phát triển giao diện cho các trang web và ứng dụng di động. Tôi đã từng tham gia
                        các dự án với công nghệ HTML, CSS, JavaScript, React,..., và từ đó tích lũy được nhiều kiến
                        thức, kinh nghiệm trong lĩnh vực này.
                    </div>
                </div>
                <div class="text-red-600 font-bold text-base sm:text-xl mt-1 sm:mt-2 mb-1 sm:mb-2">
                    Danh sách bảng lương
                </div>
                <div class="pb-8 xl:pb-10">
                    <EasyDataTable :headers="headers" :items="items"
                        :table-class-name="themeStore.getTheme == 'auto' ? 'dark-theme' : 'light-theme'"
                        header-text-direction="center" body-text-direction="center">
                        <template #item-status="{ status }">
                            <div class="text-white rounded-lg px-2 text-center mx-auto"
                                :class="status == 'Đã nhận' ? 'bg-green-400' : 'bg-red-500'">
                                {{ status }}
                            </div>
                        </template>
                        <template #item-detail="item">
                            <div>
                                <button @click="detailItem(item)"
                                    class="px-2 rounded-lg w-32 bg-green-500 text-white text-center">
                                    {{ $t('see detail') }}
                                </button>
                            </div>
                        </template>
                    </EasyDataTable>
                </div>
            </div>
        </div>
        <div v-show="isShow" class="h-screen w-screen bg-custom fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-50"
            @click.self="isShow = false">
            <div
                class="w-[95%] sm:w-1/2 xl:w-1/4 bg-white absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-2xl pb-8 xl:pb-10">
                <div
                    class="w-full h-10 sm:h-20 text-center bg-red-400 text-white font-bold rounded-t-2xl text-sm sm:text-3xl flex justify-center items-center sm">
                    Thông tin chi tiết lương tháng 5 năm 2023
                </div>
                <div class="w-full px-1 sm:sx-2 grid items-center text-xs sm:text-base justify-center mt-1 sm:mt-2">
                    <div class="flex">
                        <span class="w-[130px] sm:w-[200px]">Luơng cơ bản:</span>
                        <span>25,000,000 VND</span>
                    </div>
                    <div class="flex">
                        <span class="w-[130px] sm:w-[200px]">Thuế thu nhập cá nhân:</span>
                        <span>2,500,000 VND</span>
                    </div>
                    <div class="flex">
                        <span class="w-[130px] sm:w-[200px]">Bảo hiểm:</span>
                        <span>1,500,000 VND</span>
                    </div>
                    <div class="flex">
                        <span class="w-[130px] sm:w-[200px]">Bảo hiểm tai nạn:</span>
                        <span>1,000,000 VND</span>
                    </div>
                    <div class="flex">
                        <span class="w-[130px] sm:w-[200px]">Tổng lương:</span>
                        <span>20,000,000 VND</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { useThemeStore } from '../stores/theme';
import { useAuthStore } from '../stores/auth';
export default {
    setup() {
        const themeStore = useThemeStore()
        const authStore = useAuthStore()
        return { themeStore, authStore }
    },
    data() {
        return {
            auth: this.authStore.getAuth,
            defaultImage: "https://img.freepik.com/free-icon/user_318-804790.jpg",
            headers: [
                { text: "Mã Lương", value: "id", fixed: "left" },
                { text: "Ngày nhận", value: "receivedDate", width: 150 },
                { text: "Trạng thái", value: "status", width: 150 },
                { text: "Số tiền", value: "money", width: 150 },
                { text: "Xem chi tiết", value: "detail", width: 150 },
            ],
            items: [
                { id: '12345678', receivedDate: '10/1/2023', status: 'Chưa nhận', money: '20.000.000 VND' },
                { id: '22345678', receivedDate: '10/2/2023', status: 'Đã nhận', money: '20.000.000 VND' },
                { id: '12345678', receivedDate: '10/3/2023', status: 'Chưa nhận', money: '20.000.000 VND' },
                { id: '12345678', receivedDate: '10/4/2023', status: 'Chưa nhận', money: '20.000.000 VND' },
                { id: '12345678', receivedDate: '10/5/2023', status: 'Chưa nhận', money: '20.000.000 VND' },
            ],
            isShow: false
        }
    },
    methods: {
        detailItem(item) {
            console.log(item);
            this.isShow = true
        }
    }
}
</script>

<style scoped></style>