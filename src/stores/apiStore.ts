import { API } from "@/api/api";
import type { IPost, IUser } from "@/api/iapi";
import { Resource } from "@/scripts/config";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useApiStore = defineStore('apiStore', () => {

    const api = new API( 'https://jsonplaceholder.typicode.com' );

    async function getPosts(){
        try{
            const postsArr = await api.findPostArr();
            return postsArr;
        }catch(e){
            console.error('Ошибка получения списка статей: ', e);
            return [];
        }
    }

    async function getAuthors(){
        try{
            const authorsArr = await api.findAuthorArr();
            return authorsArr;
        }catch(e){
            console.error('Ошибка получения списка авторов: ', e);
            return [];
        }
    }

    async function getResorceAll(): Promise<[IPost[], IUser[]]> {
        try{
            const resorces = await Promise.all([
                api.findResource( Resource.Posts ),
                api.findResource( Resource.Users )
            ]);
            return resorces
        }catch(e){
            console.error('Ошибка получения ресурсов: ', e);
            return [[],[]]
        }
    }

    return { 
        api, 
        getPosts,
        getAuthors,
        getResorceAll
    }
});