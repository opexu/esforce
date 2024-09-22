<template>
<div class="w-full h-full flex flex-col overflow-hidden">
    <!-- <button @click="clearStorage">ClearStorage</button> -->
    <Menu/>
    <Transition name="fade" mode="out-in" appear>
    <div class="w-full h-full" :key="$route.fullPath">
        <RouterView/>
    </div>
    </Transition>
    <Transition name="fade" mode="out-in" appear>
    <Preloader v-if="isLoading"/>
    </Transition>
</div>
</template>

<script setup lang="ts">
import { onBeforeMount, onMounted } from 'vue';
import { RouterView } from 'vue-router'
import Preloader from '@/components/common/Preloader.vue';
import { storeToRefs } from 'pinia';
import { useDataStore } from './stores/dataStore';
import Menu from '@/components/menu/Menu.vue';

const dataStore = useDataStore()
const { isLoading } = storeToRefs( dataStore );

onBeforeMount( async () => {
    await dataStore.init();
})

function clearStorage(){
    dataStore.clear();
}


</script>

<style scoped>
.fade-enter-active, 
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter, 
.fade-leave-to{
    opacity: 0.0;
}
</style>
