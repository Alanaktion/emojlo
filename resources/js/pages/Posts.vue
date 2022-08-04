<template>
    <h1 class="text-2xl mb-4">Recent posts</h1>
    <div class="bg-white dark:bg-gray-800 border rounded">
        <PostCard
            v-for="post in posts"
            class="p-4 border-t first:border-t-0"
            :key="post.id"
            :post="post"
            @deleted="posts.splice(posts.indexOf(post), 1)"
        />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import PostCard from '../components/PostCard.vue';

const posts = ref([]);

axios.get(`/api/posts`).then(response => {
    // TODO: handle pagination
    posts.value = response.data.data;
});
</script>
