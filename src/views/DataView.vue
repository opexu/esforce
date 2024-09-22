<template>
<div class="w-full h-full overflow-hidden">
    <div class="w-full h-full flex flex-col divide-y-2 overflow-auto">
        
        <template
        v-for="( data ) in dataArr" :key="data.id"
        >
            <PostItem
            v-if="isUser( data )"
            :post="data"
            />
            <AuthorItem
            v-else
            :author="data"
            />
        </template>

    </div>
</div>
</template>

<script setup lang="ts">
import type { IUser, TPostWUser } from '@/api/iapi';
import AuthorItem from '@/components/author/AuthorItem.vue';
import PostItem from '@/components/post/PostItem.vue';
import usePost from '@/composables/usePost';
import { type Resource } from '@/scripts/config';
import { useRoute } from 'vue-router';

const route = useRoute();
const { getDataArr } = usePost();
const dataArr = getDataArr( route.name as Resource )
function isUser( data: TPostWUser | IUser ): data is TPostWUser {
    return 'userId' in data;
}
</script>