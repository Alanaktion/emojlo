<template>
    <form @submit.prevent="submit">
        <div class="flex items-start gap-4 mb-2">
            <img class="rounded-full w-12 h-12"
                :src="`${user.gravatar}&s=48`"
                :srcset="`${user.gravatar}&s=96 2x`"
                alt>

            <div class="flex-1">
                <textarea ref="inputRef" required class="w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-900" placeholder="What's up?" v-model="body" />
                <ul class="text-red-500 list-disc list-inside mt-2" v-if="errors.body">
                    <li :key="error" v-for="error in errors.body">{{ error }}</li>
                </ul>
            </div>
        </div>

        <div class="flex items-center flex-row-reverse gap-2">
            <button type="submit" class="bg-indigo-500 text-white border border-indigo-500 hover:bg-indigo-600 hover:border-indigo-600 font-bold tracking-tight px-3 py-1 rounded" :disabled="loading">
                Post
            </button>
            <button type="reset" @click="$emit('cancel')" class="bg-white dark:bg-gray-800 text-indigo-500 dark:text-gray-200 border hover:bg-indigo-50 hover:dark:bg-gray-700 font-bold tracking-tight px-3 py-1 rounded">
                Cancel
            </button>
        </div>
    </form>
</template>

<script setup>
import { ref } from 'vue';
import { user } from '../functions';

const props = defineProps(['inputRef']);

const body = ref('');
const errors = ref({});
const inputRef = props.inputRef || ref(null);
const loading = ref(false);
const submit = () => {
    loading.value = true;
    axios.post('/api/posts', {
        body: body.value,
    }).then(() => {
        body.value = '';
        loading.value = false;
        emit('submitted');
    }).catch(error => {
        if (error.response?.status === 422) {
            errors.value = error.response.data.errors;
        }
        loading.value = false;
    });
};
</script>
