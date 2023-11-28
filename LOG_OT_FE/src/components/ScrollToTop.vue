<template>
    <button v-show="isActive" class="app-button" @click="scrollToTop">
        <span>
            <font-awesome-icon icon="fa-solid fa-sort-up" />
        </span>
    </button>
</template>
<script>
export default {
    data() {
        return {
            isActive: false
        }
    },
    created() {
        window.addEventListener('scroll', this.scrollFunction)
    },
    unmounted() {
        window.removeEventListener('scroll', this.scrollFunction)
    },
    methods: {
        scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                this.isActive = true
            } else {
                this.isActive = false
            }
        },
        scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' })
        }
    }
}
</script>
  
<style scoped>
.app-button {
    position: fixed;
    bottom: 40px;
    right: 40px;
}


button {
    outline: none;
    color: #fff;
    border: none;
    background: #405189;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

button span {
    display: block;
    width: 100%;
    height: 100%;
    padding: 8px 16px;
}

button:before,
button:after {
    position: absolute;
    content: '';
    height: 0%;
    width: 1px;
    background: #405189;
    transition: all 0.5s ease;
}

button:before {
    right: 0;
    top: 0;
}

button:after {
    left: 0;
    bottom: 0;
}

button:hover {
    color: #405189;
    background: transparent;
}

button:hover:before {
    height: 100%;
}

button:hover:after {
    height: 100%;
}

button span:before,
button span:after {
    position: absolute;
    content: '';
    background: #405189;
    transition: all 0.5s ease;
}

button span:before {
    left: 0;
    top: 0;
    width: 0%;
    height: 1px;
}

button span:after {
    right: 0;
    bottom: 0;
    width: 0%;
    height: 1px;
}

button span:hover:before {
    width: 100%;
}

button span:hover:after {
    width: 100%;
}
</style>