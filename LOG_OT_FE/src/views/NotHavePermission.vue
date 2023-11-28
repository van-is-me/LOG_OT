<template>
    <div>
        <div v-if="auth?.listRoles?.[0] == 'Manager'" class="w-full flex justify-center">
            <router-link to="/">
                <button class=" m-2 md:m-4 rounded-lg text-white px-7 py-1 max-h-10 bg-[#438aab]">
                    {{ $t('backToHome') }}
                </button>
            </router-link>
        </div>
        <div v-if="auth?.listRoles?.[0] == 'Employee'" class="w-full flex justify-center">
            <router-link to="/AttendanceEmployee">
                <button class=" m-2 md:m-4 rounded-lg text-white px-7 py-1 max-h-10 bg-[#438aab]">
                    {{ $t('backToHome') }}
                </button>
            </router-link>
        </div>
        <div class="w-full flex justify-center items-center">
            <img src="https://forum.hestiacp.com/uploads/default/original/1X/8592157f8ed594f456bb3eefe8660e1e06ec51fc.png"
                alt="403" class="h-[30%]" />
        </div>
    </div>
</template>
<script>
import { useAuthStore } from '../stores/auth';

export default {
    setup() {
        const authStore = useAuthStore()
        return { authStore }
    },
    data() {
        return {
            auth: this.authStore.getAuth
        }
    }
}
</script>

