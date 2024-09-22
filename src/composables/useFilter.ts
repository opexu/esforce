import type { IFilter } from "@/scripts/config";
import { useDataStore } from "@/stores/dataStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";

export default function useFilter(){

    const dataStore = useDataStore();
    const { authorArr, filter } = storeToRefs( dataStore );
    const isFilter = computed(() => filter.value.enable );

    function setEnableFilter( force?: boolean ){
        if( force === undefined ) filter.value.enable = !filter.value.enable;
        else filter.value.enable = force;
    }

    function applyFilterBySearch( search: string ){
        const idArr = authorArr.value.filter( author => author.name.includes( search ) ).map( author => author.id );
        filter.value = { ...filter.value, search, idArr }
    }
    
    function applyFilterByAuthor( authorId: number ){
        const author = authorArr.value.find( author => author.id === authorId );
        filter.value = { ...filter.value, search: author?.name ?? '', idArr: [ authorId ] }
    }

    function applyFilter( data: string | number ){
        if( !isFilter.value ) return;
        typeof data === 'string' ? applyFilterBySearch( data ) : applyFilterByAuthor( data );
    }
    return { filter, isFilter, setEnableFilter, applyFilter }
}
