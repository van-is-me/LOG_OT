import { useAuthStore } from '../stores/auth'
export default function auth({ next, router }) {
    const user = JSON.parse(sessionStorage.getItem('auth'))
    const token = sessionStorage.getItem('token');

    const authStore = useAuthStore()
    if (token) {
        window.axios.defaults.headers.common = { 'Authorization': `Bearer ${sessionStorage.getItem('token')}` };

        authStore.setAuth(user)
        return next()
    }
    else window.location.href = "/login"

}
