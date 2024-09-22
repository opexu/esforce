<template>
<router-link class="hover w-full h-fit px-8 py-4 flex flex-col text-black"
:to="{ name: 'author-detail', params: { id: author.id } }" >
    <p class="text-2xl font-bold">
        {{ author.name }}
    </p>
</router-link>
</template>

<script setup lang="ts">
import type { IPost, IUser, TPostWUser } from '@/api/iapi';
import { ref, toRefs } from 'vue';

const props = defineProps<{
    author: IUser;
}>();
const { author } = toRefs( props );
</script>

<style scoped>
.hover {
    @apply hover:bg-slate-700 active:bg-slate-600 hover:text-white hover:border-l-4 border-l-orange-400
}
</style>