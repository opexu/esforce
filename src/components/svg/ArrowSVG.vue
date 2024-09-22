<template>
<svg 
:class="rotateTw" xmlns="http://www.w3.org/2000/svg" :width="size" :height="size" viewBox="0 -960 960 960" >
    <path d="M686-450H160v-60h526L438-758l42-42 320 320-320 320-42-42 248-248Z"/>
</svg>
</template>

<script setup lang="ts">
import { computed } from 'vue';
const props = withDefaults( defineProps<{
    rotate?: 0 | 90 | 180;
    size?: number;
}>(), { rotate: 0, size: 48 });
const size = computed(() => props.size + 'px' );
const rotateTw = computed(() => {
    switch( props.rotate ){
        case 90: return 'rotate-90';
        case 180: return 'rotate-180';
        default: return '';
    }
})
</script>