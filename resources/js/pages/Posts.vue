<template>
    <h1 class="text-2xl mb-4">Recent posts</h1>
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
import PostCard from '../components/PostCard.vue';

export default {
    components: {
        PostCard,
    },
    setup() {
        const posts = ref([]);

        axios.get(`/api/posts`).then(response => {
            // TODO: handle pagination
            posts.value = response.data.data;
        });

        return {
            posts,
        };
    },
};
</script>
