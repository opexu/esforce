<template>
<svg xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 -960 960 960" >
    <path d="M440-160q-17 0-28.5-11.5T400-200v-240L161-745q-14-17-4-36t31-19h584q21 0 31 19t-4 36L560-440v240q0 17-11.5 28.5T520-160h-80Zm40-276 240-304H240l240 304Zm0 0Z"/>
</svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults( defineProps<{
    size?: number;
}>(), { rotate: 0, size: 48 });
const size = computed(() => props.size + 'px' );
</script>