import type { IUser, TPostWUser } from "@/api/iapi";
import { Resource } from "@/scripts/config";
import { useDataStore } from "@/stores/dataStore";
import { storeToRefs } from "pinia";
import { computed } from "vue";
import useFilter from "./useFilter";

export default function usePost(){

    const dataStore = useDataStore();
    const { postArr, authorArr } = storeToRefs( dataStore );
    const { isFilter, filter } = useFilter();

    const filteredPostArr = computed<TPostWUser[]>(() => {
        if( isFilter.value ){
            const idArr = filter.value.idArr;
            return postArr.value.filter( post => idArr.includes( post.userId ) );
        }else{
            return postArr.value;
        }
    });

    const filteredAuthorArr = computed<IUser[]>(() => {
        if( isFilter.value ){
            const idArr = filter.value.idArr;
            return authorArr.value.filter( author => idArr.includes( author.id ) );
        }else{
            return authorArr.value;
        }
    });
    
    const viewedPostArr = computed<TPostWUser[]>(() => {
        return filteredPostArr.value.filter( post => post.isViewed );
    });

    function getPost( id: number ){
        return postArr.value.find( post => post.id === id );
    }

    function setViewed( id: number ){
        const index = postArr.value.findIndex( post => post.id === id );
        if( index === -1 ) return;
        const oldPost = postArr.value[ index ];
        postArr.value.splice( index, 1, { ...oldPost, isViewed: true });
    }

    function getAuthor( id: number ){
        return authorArr.value.find( author => author.id === id );
    }
    
    function getDataArr( resource: Resource ){
        switch( resource ){
            case Resource.Posts: return filteredPostArr;
            case Resource.PostsViewed: return viewedPostArr;
            case Resource.Users: return filteredAuthorArr;
        }
    }

    return { filteredPostArr, authorArr, viewedPostArr, filter, getPost, setViewed, getAuthor, getDataArr }
}