import { defineStore } from "pinia";
import { useApiStore } from "./apiStore";
import { useLocalStorage } from '@vueuse/core'
import type { IPost, IUser, TPostWUser, TUser } from "@/api/iapi";
import { Resource, type IFilter } from "@/scripts/config";
import { ref } from "vue";

export const useDataStore = defineStore('dataStore', () => {

    const isLoading = ref(false);
    const apiStore = useApiStore();

    const postArr = useLocalStorage<TPostWUser[]>( Resource.Posts, [] );
    const authorArr = useLocalStorage<IUser[]>( Resource.Users, [] );
    const filter = useLocalStorage<IFilter>( 'filterKey', { enable: false, field: Resource.Posts, search: '', idArr: [] } );

    async function init(){
        isLoading.value = true;
        if( postArr.value.length === 0 && authorArr.value.length === 0 ){
            const [ posts, authors ] = await apiStore.getResorceAll();
            postArr.value = posts.map( post => ({ ...post, isViewed: false, user: null }));
            authorArr.value = authors;
        }
        else if( postArr.value.length === 0 ) {
            const posts = await apiStore.getPosts();
            postArr.value = posts.map( post => ({ ...post, isViewed: false, user: null }));
        }
        else if( authorArr.value.length === 0 ) {
            const authors = await apiStore.getAuthors();
            authorArr.value = authors;
        }

        const authorObj = authorArr.value.reduce(( obj, author ) => {
            obj[ author.id ] = author;
            return obj;
        }, {} as TUser);

        postArr.value = postArr.value.map( post => {
            return {
                ...post,
                user: authorObj[ post.userId ]?.name ?? null
            }
        });

        isLoading.value = false;
    }
    
    function clear(){
        postArr.value = [];
        authorArr.value = [];
        filter.value = null;
    }
    return { isLoading, postArr, authorArr, filter, init, clear }
})