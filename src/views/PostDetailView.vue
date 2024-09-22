<template>
<div class="hover-post w-full h-fit px-8 py-4 flex flex-col gap-8"
:class="[ isViewed ? 'text-slate-500' : 'text-black']"
>
    <!-- Имя автора -->
    <router-link class="lg:text-xl font-bold text-orange-400"
    :to="{ name: 'author-detail', params: { id: post?.userId } }" 
    v-if="post?.user"
    >
        #{{ post?.user }}
    </router-link>

    <!-- Заголовок статьи -->
    <div class="px-4 py-2 border-l-2 border-orange-400">
        <p class="text-xl md:text-2xl lg:text-4xl font-bold">{{ post?.title }}</p>
    </div>
    
    
    <!-- Описание статьи -->
    <p class="text-sm md:text-xl lg:text-2xl">{{ post?.body }}</p>
</div>
</template>

<script setup lang="ts">
import type { TPostWUser } from '@/api/iapi';
import usePost from '@/composables/usePost';
import { Resource } from '@/scripts/config';
import { computed, onBeforeMount, onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { getPost, setViewed } = usePost();

const props = defineProps<{
    id: string,
}>();
const id = computed(() => Number( props.id ));

const post = ref<TPostWUser>();
onBeforeMount(() => {
    const _post = getPost( id.value );
    if( !_post ) router.push({ name: Resource.Posts });
    else {
        setViewed( _post.id );
        post.value = _post;
    }
})

const isViewed = computed(() => !!post.value?.isViewed );
</script>
