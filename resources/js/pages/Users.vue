<template>
    <h1 class="text-2xl mb-4">Users</h1>
    <ul>
        <li v-for="user in users" :key="user.id">
            <router-link :to="`/@${user.name}`" class="flex items-center gap-2 cursor-pointer">
                <img class="rounded-full w-8 h-8"
                    :src="`${user.gravatar}&s=32`"
                    :srcset="`${user.gravatar}&s=64 2x`"
                    alt>
                {{ user.name }}
            </router-link>
        </li>
    </ul>
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const users = ref([]);

        axios.get(`/api/users`).then(response => {
            // TODO: handle pagination
            users.value = response.data.data;
        });

        return {
            users,
        };
    },
};
</script>
