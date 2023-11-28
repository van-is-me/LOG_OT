<template>
    <div class="bg-white">
        <div class="w-[90%] mx-auto mt-10">
            <!-- <div class="w-[90%] mx-auto">
                <button v-if="auth.listRoles?.[0] == 'Employee'" class="btn-primary">Tạo mới</button>
            </div> -->
            <EasyDataTable :headers="headers" :items="list" header-text-direction="center" :table-class-name="currentTheme"
                body-text-direction="center">
            </EasyDataTable>
        </div>
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
            API.getListDegreeByUserId(this.$route.params.id, this.page)
                .then(res => {
                    this.list = res.data.result.items
                })
                .catch(err => swal.error(err))
        }
    }
}
</script>