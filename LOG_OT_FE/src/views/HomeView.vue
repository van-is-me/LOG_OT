<template>
  <div class="bg-white">
    <div class="w-[90%] grid grid-cols-12 gap-3 mx-auto">
      <div v-for="(item, index) in list" :key="index"
        class="col-span-12 w-full md:col-span-6 lg:col-span-4 mx-auto rounded-md bg-white shadow-lg dark:bg-[#292e32] dark:text-white my-3 p-5 hover:bg-[#fdeaea]">
        <p class="text-gray-500">{{ item.title }} </p>
        <div class="flex justify-between items-end">
          <div>
            <p class="font-bold text-[30px]">{{ item.detail }}</p>
            <span class="text-blue-950 underline cursor-pointer mt-5">View all</span>
          </div>
          <div class="w-[50px] h-[50px] rounded-md flex items-center justify-center"
            :style="{ backgroundColor: generateRandomColor() }">
            <font-awesome-icon :icon="generateRandomIcon()" class="text-[25px] text-white" />
          </div>
        </div>
      </div>
    </div>
    <Loading v-show="isLoading" />
  </div>
</template>

<script>
import API from '../API';
import Loading from '../components/Loading.vue'
import swal from '../utilities/swal2';

export default {
  components: {
    Loading
  },
  data() {
    return {
      list: [],
      isLoading: false,
      faIconList: ['fa-solid fa-money-check-dollar', 'fa-solid fa-user']
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.isLoading = true
      API.getDashboard()
        .then(res => {
          this.isLoading = false
          this.list = res.data
        })
        .catch(err => {
          swal.error(err)
          this.isLoading = false
        })
    },
    generateRandomColor() {
      const minBrightness = 170 //độ sáng tối thiểu
      let color = '#'
      while (true) {
        color += Math.floor(Math.random() * 16777215).toString(16)
        const brightness = this.calculateBrightness(color)
        if (brightness >= minBrightness) {
          break;
        } else {
          color = '#'
        }
      }
      return color
    },
    calculateBrightness(color) {
      const hex = color.replace('#', '')
      const r = parseInt(hex.substr(0, 2), 16)
      const g = parseInt(hex.substr(2, 2), 16)
      const b = parseInt(hex.substr(4, 2), 16)
      const brightness = (r * 299 + g * 587 + b * 114) / 1000
      return brightness
    },
    generateRandomIcon() {
      const randomIndex = Math.floor(Math.random() * this.faIconList.length)
      return this.faIconList[randomIndex];
    },
  }
}
</script>
