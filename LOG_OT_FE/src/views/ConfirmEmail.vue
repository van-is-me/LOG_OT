<template>
    <div class="wrapper-login-page w-full h-[100vh] bg-no-repeat">
        <router-link to="login"><button class="bg-red-400 text-[25px] hover:bg-red-300 rounded-lg px-3 py-1 text-white">Trở lại trang đăng nhập</button></router-link>
    </div>
</template>
<script>
import API from '../API'
import swal from '../utilities/swal2'
export default {
    data() {
        return {}
    },
    created() {
        this.confirmEmail()
    },
    methods: {
        confirmEmail() {
            const url = API.BASE_URL_V1 + this.$route.fullPath
            const tempUrl = new URL(url)
            const searchParams = new URLSearchParams(tempUrl.search)
            API.confirmEmail(searchParams.get('userId'), searchParams.get('code'))
                .then(res => {
                    console.log(res);
                    swal.success(res.data, 5000)
                })
                .catch(err => {
                    swal.error(err.response.data, 4000)
                })
        }
    }
}
</script>
<style scoped>
.wrapper-login-page {
    background: url(../assets/images/background-login.webp) left;
    position: relative;
    background-position: center;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>