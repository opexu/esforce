import { createRouter, createWebHistory } from 'vue-router'
import DataView from '@/views/DataView.vue'
import PostDetailView from '@/views/PostDetailView.vue'
import AuthorDetailView from '@/views/AuthorDetailView.vue'
import { Resource } from '@/scripts/config'

const router = createRouter( {
    history: createWebHistory( import.meta.env.BASE_URL ),
    routes: [
        {
            path: '/:pathMatch(.*)*',
            redirect: { name: 'posts' }
        },
        {
            path: '/' + Resource.Posts,
            name: Resource.Posts,
            component: DataView,
            strict: false
        },
        {
            path: '/' + Resource.PostsViewed,
            name: Resource.PostsViewed,
            component: DataView,
            strict: false
        },
        {
            path: '/' + Resource.Users,
            name: Resource.Users,
            component: DataView,
            strict: false
        },
        {
            path: '/post-detail/:id(\\d+)',
            name: 'post-detail',
            component: PostDetailView,
            props: true,
            beforeEnter: ( to, from, next ) => {
                const id = Number( to.params.id );
                console.log('beforeEnter: ', id)
                if( isNaN( id ) || id <= 0 ) next({ name: Resource.Posts });
                else next();
            }
        },
        {
            path: '/author-detail/:id(\\d+)',
            name: 'author-detail',
            component: AuthorDetailView,
            props: true,
            beforeEnter: ( to, from, next ) => {
                const id = Number( to.params.id );
                if( isNaN( id ) || id <= 0 ) next({ name: Resource.Users });
                else next();
            }
        },
    ]
} )

// router.beforeEach( async ( to, from, next ) => {
//     await useDataStore().init();
//     next();
// });

export default router
