<template>
<div class="w-full px-4 py-2 h-fit flex flex-row items-center justify-center border-b-2 bg-slate-300">
    <input id="filter" ref="inputEl" class="w-full h-12 p-4 text-lg border rounded-lg"
    placeholder="Введите имя автора"
    type="text"
    v-model="inputText"
    @input="debouncedFn"
    />
</div>
</template>

<script setup lang="ts">
import useFilter from '@/composables/useFilter';
import { useDebounceFn } from '@vueuse/core'
import { onMounted, ref } from 'vue';

const inputEl = ref<HTMLInputElement|null>();
const { filter, applyFilter } = useFilter();
const inputText = ref('');
onMounted(() => {
    inputText.value = filter.value.search;
})
const debouncedFn = useDebounceFn(( event: Event ) => {
    if (!(event instanceof InputEvent) || !inputEl.value || !(event.target instanceof HTMLInputElement) || event.target !== inputEl.value) return;
    applyFilter( inputText.value );
}, 1000)

</script>