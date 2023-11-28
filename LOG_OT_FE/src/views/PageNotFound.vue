<template>
    <div>
        <div class="w-full flex justify-center">
            <router-link to="/">
                <button class=" m-2 md:m-4 rounded-lg text-white px-7 py-1 max-h-10 bg-[#438aab]">
                    {{ $t('backToHome') }}
                </button>
            </router-link>
        </div>
        <div class="w-full flex justify-center items-center">
            <img src="../assets/images/pageNotFound.png" alt="404" class="h-[30%]" />
        </div>
    </div>
</template>
<script></script>

