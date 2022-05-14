<template>
    <div class="bg-white dark:bg-gray-800 border rounded">
        <PostCard
            class="p-4"
            :key="post.id"
            :post="post"
            v-if="post"
        />
    </div>
</template>

<script>
import { ref, watch } from 'vue';
import PostCard from '../components/PostCard.vue';

export default {
    components: {
        PostCard,
    },
    props: ['id'],
    setup(props) {
        const id = ref(props.id);
        const post = ref(null);
        const loadPost = () => {
            axios.get(`/api/posts/${id.value}`).then(response => {
                post.value = response.data;
            });
        };
        watch(id, loadPost, { immediate: true });
        return {
            post,
        };
    },
};
</script>
