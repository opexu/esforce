<template>
<div class="hover-post w-full h-fit px-8 py-4 flex flex-col gap-4">
    
    <!-- email -->
    <p class="lg:text-xl font-bold text-orange-400">{{ author?.email }}</p>

    <!-- Имя -->
    <p class="mt-4 text-xl md:text-2xl lg:text-4xl font-bold">{{ author?.name }}</p>
    
    <!-- Адрес -->
    <p class="mt-4 text-sm md:text-xl lg:text-2xl">{{ author?.address.city }}</p>

    <!-- Телефон -->
    <p class="text-sm md:text-xl lg:text-2xl">{{ author?.phone }}</p>

    <!-- Сайт -->
    <p class="text-sm md:text-xl lg:text-2xl">{{ author?.website }}</p>

    <!-- Компания -->
    <p class="text-sm md:text-xl lg:text-2xl">{{ author?.company.name }}</p>

    <button class="text-xl font-bold text-orange-400 text-start hover:text-orange-300"
    @click="toFilterPosts"
    >
        Статьи автора
    </button>
</div>
</template>

<script setup lang="ts">
import type { IUser } from '@/api/iapi';
import useFilter from '@/composables/useFilter';
import usePost from '@/composables/usePost';
import { Resource } from '@/scripts/config';
import { computed, onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { getAuthor } = usePost();
const { setEnableFilter, applyFilter } = useFilter();
const props = defineProps<{
    id: string,
}>();
const id = computed(() => Number( props.id ));

const author = ref<IUser>();
onBeforeMount(() => {
    const _author = getAuthor( id.value );
    if( !_author ) router.push({ name: Resource.Users });
    else {
        author.value = _author;
    }
})

function toFilterPosts(){
    if( !author.value ) return;
    setEnableFilter( true );
    applyFilter( author.value.id );
    router.push({ name: Resource.Posts })
}
</script>
    