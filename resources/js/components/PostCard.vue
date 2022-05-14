<template>
    <article class="flex gap-4">
        <img class="rounded-full w-12 h-12"
            :src="`${post.user.gravatar}&s=48`"
            :srcset="`${post.user.gravatar}&s=96 2x`"
            alt>
        <div class="flex-1">
            <header class="flex items-center gap-2 text-sm mb-1">
                <router-link :to="`/@${post.user.name}`">
                    {{ post.user.name }}
                </router-link>
                <router-link :to="`/posts/${post.id}`" class="text-gray-500">
                    {{ formatDateTime(post.created_at) }}
                </router-link>
                <button @click="deletePost" class="ml-auto text-red-500" v-if="isMine">
                    Delete
                </button>
            </header>
            <p class="text-base">
                <span class="whitespace-pre-wrap">{{ post.body }}</span>
            </p>
        </div>
    </article>
</template>

<script>
import { computed, ref } from 'vue';
import { formatDateTime, user } from '../functions';

export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
    },
    setup(props, { emit }) {
        const post = ref(props.post);
        const isMine = computed(() => post.value.user_id === user.value?.id);

        const deletePost = () => {
            if (confirm('Are you sure you want to delete this post?')) {
                axios.post(`/api/posts/${post.value.id}`, {
                    _method: 'DELETE',
                }).then(() => {
                    emit('deleted');
                });
            }
        };

        return {
            post,
            isMine,
            deletePost,
            formatDateTime,
        };
    },
};
</script>
