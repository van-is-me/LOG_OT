<template>
    <div class="w-full">
        <div class="pb-8 xl:pb-10">
            <EasyDataTable :headers="header" :items="listAllowance"
                :table-class-name="themeStore.getTheme == 'auto' ? 'dark-theme' : 'light-theme'"
                header-text-direction="center" body-text-direction="center">
                <template #item-detail="item">
                    <div class="flex items-center justify-around my-2">
                        <button class="view-btn">
                            {{ $t('see detail') }}
                        </button>
                        <button class="edit-btn">{{ $t('edit') }}</button>
                        <button class="delete-btn">{{ $t('delete') }}</button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
    </div>
</template>
<script>
import API from '../../API'
import { useThemeStore } from '../../stores/theme';

export default {
    setup() {
        const themeStore = useThemeStore()
        return { themeStore }
    },
    data() {
        return {
            listAllowance: [],
            header: [
                { text: "ID", value: "id", width: 300 },
                { text: "Tên", value: "name", width: 150 },
                { text: "Số Lượng", value: "amount", width: 150 },
                { text: "Loại Phụ Cấp", value: "allowanceType", width: 150 },
                { text: "Yêu cầu", value: "requirements", width: 150 },
                { text: "Tiêu chí", value: "eligibility_Criteria", width: 150 },
                { text: "Xem chi tiết", value: "detail", width: 400 },
            ],
            page: 1
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            API.getListAllowance(this.page)
                .then(res => {
                    this.listAllowance = res.data.result.items
                })
                .catch(err => swal.error(err))
        },

    }
}
</script>