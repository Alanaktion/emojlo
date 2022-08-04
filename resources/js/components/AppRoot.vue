<template>
    <nav class="bg-teal-500 dark:bg-teal-700 text-white py-4 sm:py-6 mb-6">
        <div class="max-w-3xl mx-auto px-4 flex items-center gap-4">
            <router-link to="/" class="text-xl font-bold tracking-tight">
                {{ appName }}
            </router-link>
            <router-link to="/" class="text-teal-50 hover:text-white text-sm cursor-pointer p-1">
                🏠 Home
            </router-link>
            <router-link to="/posts" class="text-teal-50 hover:text-white text-sm cursor-pointer p-1">
                📰 Posts
            </router-link>
            <router-link to="/users" class="text-teal-50 hover:text-white text-sm cursor-pointer p-1">
                👪 Users
            </router-link>
            <div class="ml-auto flex items-center gap-4" v-if="user">
                <router-link :to="{name: 'user', params: {username: user.name}}" class="text-teal-50 hover:text-white text-sm cursor-pointer flex items-center gap-2 p-1">
                    <img class="rounded-full w-6 h-6"
                        :src="`${user.gravatar}&s=24`"
                        :srcset="`${user.gravatar}&s=48 2x`"
                        alt>
                    {{ user.name }}
                </router-link>
                <button type="button" @click="postDialogOpen = true" class="text-teal-50 hover:text-indigo-500 dark:hover:text-white hover:bg-white hover:dark:bg-indigo-500 text-sm font-bold cursor-pointer px-3 py-1 border border-white dark:border-teal-100 hover:dark:border-indigo-100 rounded">
                    Post
                </button>
            </div>
            <div class="ml-auto flex items-center gap-4" v-else>
                <router-link to="/login" class="text-teal-50 hover:text-white text-sm cursor-pointer p-1">
                    Sign in
                </router-link>
                <router-link to="/register" class="text-teal-50 hover:text-indigo-500 hover:bg-white hover:dark:bg-teal-500 text-sm font-bold cursor-pointer px-3 py-1 border border-white dark:border-teal-100 rounded">
                    Join 👋
                </router-link>
            </div>
        </div>
    </nav>
    <div class="max-w-3xl mx-auto px-4 pb-16">
        <router-view />
    </div>
    <PostDialog :open="postDialogOpen" @close="postDialogOpen = false" />
</template>

<script setup>
import { ref } from 'vue';
import { user } from '../functions';
import PostDialog from './PostDialog.vue';

const appName = ref(document.querySelector('title').textContent);
const postDialogOpen = ref(false);
</script>
