<template>
    <header class="bg-white dark:bg-gray-800 p-4 sm:p-6 mb-8 border rounded" v-if="user">
        <div class="flex items-center gap-4">
            <img class="rounded-full w-16 h-16"
                :src="`${user.gravatar}&s=64`"
                :srcset="`${user.gravatar}&s=128 2x`"
                alt>
            <div>
                <h1 class="text-2xl">{{ username }}</h1>
                <div class="text-sm text-slate-600 dark:text-gray-400">Joined {{ formatDate(user.created_at) }}</div>
            </div>
            <div class="ml-auto" v-if="isMe">
                <button @click="edit" class="bg-white dark:bg-gray-800 text-indigo-500 dark:text-gray-200 border hover:bg-indigo-500 hover:dark:bg-gray-700 hover:text-white font-bold tracking-tight px-4 py-2 rounded">
                    Edit profile
                </button>
            </div>
            <!-- <div class="ml-auto" v-else-if="me">
                <button @click="edit" class="bg-white dark:bg-gray-800 text-indigo-500 dark:text-gray-200 border hover:bg-indigo-500 hover:dark:bg-gray-700 hover:text-white font-bold tracking-tight px-4 py-2 rounded">
                    Follow
                </button>
            </div> -->
        </div>
    </header>

    <div class="bg-white dark:bg-gray-800 border rounded">
        <div class="p-4">
            Latest posts
        </div>
        <PostCard
            v-for="post in posts"
            class="p-4 border-t"
            :key="post.id"
            :post="post"
            @deleted="posts.splice(posts.indexOf(post), 1)"
        />
    </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import PostCard from '../components/PostCard.vue';
import { formatDate, refreshUser, user as me } from '../functions';

const props = defineProps({
    username: {
        type: String,
        required: true,
    },
});

const username = ref(props.username);
const user = ref(null);

const isMe = computed(() => username.value === me.value?.name);

const fetchUser = () => {
    axios.get(`/api/users/${encodeURI(username.value)}`).then(response => {
        user.value = response.data;
    }).catch(() => {
        user.value = null;
        // TODO: show 404 route
    });
};
watch(username, fetchUser, { immediate: true });

const postCount = ref(null);
const posts = ref([]);
const fetchPosts = () => {
    axios.get(`/api/users/${encodeURI(username.value)}/posts`).then(response => {
        postCount.value = response.data.total;
        posts.value = response.data.data;
        // TODO: paginate on scroll
    }).catch(() => {
        postCount.value = null;
        posts.value = [];
    });
};
watch(username, fetchPosts, { immediate: true });

const edit = async () => {
    await refreshUser();
};
</script>
