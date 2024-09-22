<template>
<div class="hover-post w-full h-fit px-8 py-4 flex flex-col cursor-pointer"
:class="[ isViewed ? 'text-slate-500 bg-slate-100' : 'text-black']"
>
    <!-- Просмотрено -->
    <p class="w-fit px-2 py-1 text-sm text-center rounded-full text-white bg-slate-400"
    v-if="isViewed"
    >Просмотрено</p>
    
    <!-- Название статьи -->
    <router-link class="text-2xl font-bold"
    :to="{ name: 'post-detail', params: { id: post.id } }" >
      {{ post.title }}
    </router-link>
    
    <!-- Автор -->
    <router-link class="font-bold text-orange-400"
    :to="{ name: 'author-detail', params: { id: post.userId } }"
    v-if="post.user"
    >
    @{{ post.user }}
    </router-link>
</div>
</template>

<script setup lang="ts">
import type { IPost, TPostWUser } from '@/api/iapi';
import { ref, toRefs } from 'vue';

const props = defineProps<{
    post: TPostWUser;
}>();
const { post } = toRefs( props );
const isViewed = ref( props.post.isViewed );
</script>

<style scoped>
.hover-post {
    @apply hover:bg-slate-700 active:bg-slate-600 hover:text-white hover:border-l-4 border-l-orange-400
}
</style>