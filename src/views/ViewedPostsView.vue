<template>
<div class="w-full h-full overflow-hidden">
    <div class="w-full h-full flex flex-col divide-y-2 overflow-auto">
        <PostItem
        v-for="( post ) in viewedPostArr" :key="post.id"
        :post="post"
        />
    </div>
</div>
</template>

<script setup lang="ts">
import PostItem from '@/components/post/PostItem.vue';
import usePost from '@/composables/usePost';

const { viewedPostArr } = usePost();

</script>