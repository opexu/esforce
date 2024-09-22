<template>
<Transition name="fade" mode="out-in" appear>
<div class="w-full flex flex-col" :key="isDetailView.toString()">
    
    <div class="w-full flex flex-col md:flex-row">
    
        <template
        v-if="!isDetailView"
        >
            <button class="w-full h-16 px-4 py-2 sm:text-sm md:text-xl lg:text-2xl uppercase flex flex-row gap-4 items-center justify-start text-center hover:bg-slate-600 active:bg-slate-500 text-white"
            v-for="( data, key ) in menuObj" :key="key"
            :class="[ isActive( data.routeName ) ? 'bg-slate-900 font-bold text-orange-400 fill-orange-400 hover:text-orange-300 hover:fill-orange-300 border-b-2 md:border-b-4 border-orange-400' : 'bg-slate-700 fill-white' ]"
            @click="onMenuClick( key as string )"
            >
                <Arrow 
                :size="24"
                :rotate="isActive( data.routeName ) ? 90 : 0"
                />
                <p>{{ key }}</p>
            </button>
            <button class="w-full sm:w-full md:w-fit h-16 px-4 flex flex-row items-center justify-center  active:bg-slate-500"
            :class="[ isFilter ? 'bg-orange-400 fill-black hover:bg-orange-300' : 'bg-slate-700 fill-white hover:bg-slate-600' ]"
            @click="onFilterClick"
            >
                <FilterSVG :size="24"/>
            </button>
        </template>
        <template
        v-else
        >
            <button  class="w-full h-16 px-4 py-2 sm:text-sm md:text-xl lg:text-2xl uppercase flex flex-row gap-4 items-center justify-start text-center hover:bg-slate-600 active:bg-slate-500 text-white bg-slate-700 fill-white"
            @click="backClick"
            >
                <Arrow 
                :size="24"
                :rotate="180"
                />
                <p>Назад</p>
            </button>
        </template>
    
    </div>
    
    <Filter
    v-if="isFilter && !isDetailView"
    />
</div>
</Transition>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Arrow from '@/components/svg/ArrowSVG.vue';
import { Resource } from '@/scripts/config';
import Filter from '@/components/menu/Filter.vue';
import FilterSVG from '@/components/svg/FilterSVG.vue';
import useFilter from '@/composables/useFilter';

type TMenu = {[ key: string ]: { routeName: Resource }}

const menuObj: TMenu = reactive({
    'Статьи': {
        routeName: Resource.Posts
    },
    'Просмотренные': {
        routeName: Resource.PostsViewed
    },
    'Авторы': {
        routeName: Resource.Users
    }
});

const route = useRoute();
const router = useRouter();
const isActive = computed(() => ( routeName: string ) => routeName === route.name )
const isDetailView = computed(() => !!!Object.values( menuObj ).map( obj => obj.routeName ).includes( route.name as Resource ) )
function onMenuClick( key: string ){
    router.push( menuObj[ key ]?.routeName );
}

function backClick(){
    router.back();
}

const { isFilter, setEnableFilter } = useFilter();
function onFilterClick(){
    setEnableFilter();
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
