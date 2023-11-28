<template>
    <div class="bg-white">
        <h1 class="text-[20px] mt-4"><span class="font-bold">Tên phòng ban:</span> {{ department?.name }}</h1>
        <h1 class="text-[20px] mt-4"><span class="font-bold">Mô tả:</span> {{ department?.description }}</h1>
        <!-- <div class="w-[90%] mx-auto mt-10">
            <EasyDataTable :headers="headers" :items="list" header-text-direction="center" :table-class-name="currentTheme"
                body-text-direction="center">
            </EasyDataTable>
        </div> -->
    </div>
</template>
<script>
import API from '../../API'
import { useAuthStore } from '../../stores/auth'
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
            page: 1,
            department: null,
            headers: [
                { text: "Tên nhân viên", value: "Name", width: 200 },
                { text: "Mô tả", value: "Description", width: 200 },
                { text: "Ảnh", value: "Image", width: 200 },
                { text: "Loại bằng cấp", value: "DegreeType", width: 200 },
            ]
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            if (this.auth.listRoles?.[0] == 'Employee') {
                API.getDepartmentForEmp()
                    .then(res => {
                        this.department = res.data.position.department
                    })
                    .catch(err => swal.error(err))
            } else {
                API.getDepartmentByUser(this.$route.params.username)
                    .then(res => {
                        this.department = res.data
                    })
                    .catch(err => swal.error(err))
            }
        }
    }
}
</script>