<template>
    <header class="bg-white p-6 sm:p-12 mb-8 border rounded" v-if="!user">
        <p class="text-lg font-medium mb-6">Sign up to join a weird social network!</p>
        <router-link to="/register" class="bg-indigo-500 text-white hover:bg-indigo-600 text-lg font-bold px-4 py-2 rounded">
            Join 👋
        </router-link>
    </header>
    <header class="bg-white p-4 mb-8 border rounded" v-else>
        <PostForm @submit="loadFirstPage" />
    </header>

    <h2 class="text-lg font-medium" v-if="!user">Recent posts</h2>

    <div class="bg-white border rounded">
        <PostCard
            v-for="post in posts"
            class="p-4 border-t first:border-t-0"
            :key="post.id"
            :post="post"
            @deleted="posts.splice(posts.indexOf(post), 1)"
        />
    </div>
</template>

<script>
import { ref } from 'vue';
import { user } from '../functions';
import PostCard from '../components/PostCard.vue';
import PostForm from '../components/PostForm.vue';

export default {
    components: {
        PostCard,
        PostForm,
    },
    setup() {
        const posts = ref([]);
        const nextPageUrl = ref(null);
        const loadNextPage = () => {
            if (nextPageUrl.value) {
                axios.get(nextPageUrl.value).then(response => {
                    posts.value = posts.value.concat(response.data.data);
                    nextPageUrl.value = response.data.next_page_url;
                });
            }
        };
        const loadFirstPage = () => {
            axios.get('/api/posts').then(response => {
                posts.value = response.data.data;
                nextPageUrl.value = response.data.next_page_url;
            });
        };
        loadFirstPage();

        return {
            user,
            posts,
            loadFirstPage,
        };
    },
};
</script>
