<template>
    <div class="bg-white">
        <div class="w-full flex flex-wrap items-center justify-around my-5">
            <div class="my-5">
                <label class="border-b-2 border-black dark:border-white" for="date">{{ $t('choose start ot date') }}</label>
                <input v-model="startDate" type="datetime-local" id="date"
                    class="mx-4 dark:bg-[#292e32] bg-gray-100 px-2 py-1">
            </div>
            <div class="my-5">
                <label class="border-b-2 border-black dark:border-white" for="date">{{ $t('choose end ot date') }}</label>
                <input v-model="endDate" type="datetime-local" id="date"
                    class="mx-4 dark:bg-[#292e32] bg-gray-100 px-2 py-1">
            </div>
            <button @click="createRequest" class="custom-btn">{{ $t('save') }}</button>
        </div>
        <div class="w-[80%] mx-auto">
            <EasyDataTable :headers="headers" :items="items" :table-class-name="currentTheme">
                <template #item-operation="item">
                    <div class="operation-wrapper">
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                </template>
            </EasyDataTable>
        </div>
    </div>
</template>
<script>
import otRequest from '../service/ot-request'
import { useThemeStore } from '../stores/theme'
export default {
    setup() {
        const themeStore = useThemeStore()
        return { themeStore }
    },
    components: {
    },
    data() {
        return {
            startDate: '',
            endDate: '',
            currentTheme: '',
            headers: [
                { text: "PLAYER", value: "player" },
                { text: "TEAM", value: "team" },
                { text: "NUMBER", value: "number" },
                { text: "POSITION", value: "position" },
                { text: "HEIGHT", value: "indicator.height" },
                { text: "WEIGHT (lbs)", value: "indicator.weight", sortable: true },
                { text: "LAST ATTENDED", value: "lastAttended", width: 200 },
                { text: "COUNTRY", value: "country" },
                { text: "Operation", value: "operation" },
            ],
            items: [
                { player: "Stephen Curry", team: "GSW", number: 30, position: 'G', indicator: { "height": '6-2', "weight": 185 }, lastAttended: "Davidson", country: "USA" },
                { player: "Lebron James", team: "LAL", number: 6, position: 'F', indicator: { "height": '6-9', "weight": 250 }, lastAttended: "St. Vincent-St. Mary HS (OH)", country: "USA" },
                { player: "Kevin Durant", team: "BKN", number: 7, position: 'F', indicator: { "height": '6-10', "weight": 240 }, lastAttended: "Texas-Austin", country: "USA" },
                { player: "Giannis Antetokounmpo", team: "MIL", number: 34, position: 'F', indicator: { "height": '6-11', "weight": 242 }, lastAttended: "Filathlitikos", country: "Greece" },
            ]
        }
    },
    created() {
        this.setTheme()
    },
    watch: {
        'themeStore.getTheme': function (val) {
             this.currentTheme == 'light-theme' ? this.currentTheme = 'dark-theme' : this.currentTheme = 'light-theme'
        }
    },
    methods: {
        createRequest() {
            if (this.startDate == '' || this.endDate == '') return swal.error(this.$t('empty all'))
            swal.confirm(`${this.$t('confirm ot')} ${functionCustom.convertDate(this.startDate)}`).then((result) => {
                if (result.value) {
                    console.log(this.time);
                    console.log(this.date);
                }
            })
        },
        setTheme() {
            let curr =  this.themeStore.getTheme
            this.currentTheme = curr == 'auto' ? 'dark-theme' : 'light-theme'
        }
    }
}
</script>
<style scoped>
.custom-btn {
    font-size: 17px;
    padding: 0.5em 2em;
    border: transparent;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
    background: #405189;
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