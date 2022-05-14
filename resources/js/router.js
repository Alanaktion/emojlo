import { createRouter, createWebHistory } from 'vue-router';
import { user } from './functions';
import Home from './pages/Home.vue';
import Posts from './pages/Posts.vue';
import Post from './pages/Post.vue';
import Users from './pages/Users.vue';
import User from './pages/User.vue';
import Login from './pages/auth/Login.vue';
import Register from './pages/auth/Register.vue';

const guestMiddleware = () => {
    if (user.value) {
        return {
            path: '/',
        };
    }
}

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/posts',
        component: Posts,
    },
    {
        path: '/posts/:id',
        component: Post,
        props: true,
    },
    {
        path: '/users',
        component: Users,
    },
    {
        path: '/@:username',
        component: User,
        props: true,
    },
    {
        path: '/login',
        component: Login,
        beforeEnter: [guestMiddleware],
    },
    {
        path: '/register',
        component: Register,
        beforeEnter: [guestMiddleware],
    },
];

export default createRouter({
    history: createWebHistory(),
    routes,
});
