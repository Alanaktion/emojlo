<template>
    <form @submit.prevent="submit" class="max-w-sm my-12 mx-auto p-6 sm:p-8 bg-white dark:bg-gray-800 border rounded">
        <div class="mb-4">
            <label for="email" class="block font-bold mb-1">Email</label>
            <input type="email" required class="w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-900" name="email" id="email" autocomplete="email" v-model="email">
            <ul class="text-red-500 list-disc list-inside mt-2" v-if="errors.email">
                <li :key="error" v-for="error in errors.email">{{ error }}</li>
            </ul>
        </div>

        <div class="mb-4">
            <label for="password" class="block font-bold mb-1">Password</label>
            <input type="password" required class="w-full rounded border-gray-300 dark:border-gray-700 dark:bg-gray-900" name="password" id="password" autocomplete="new-password" v-model="password">
            <ul class="text-red-500 list-disc list-inside mt-2" v-if="errors.password">
                <li :key="error" v-for="error in errors.password">{{ error }}</li>
            </ul>
        </div>

        <div class="mt-6">
            <button type="submit" class="bg-indigo-500 text-white hover:bg-indigo-600 font-bold tracking-tight px-4 py-2 rounded">
                Sign in 🔓
            </button>
        </div>
    </form>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { refreshUser } from '../../functions';

export default {
    setup() {
        const router = useRouter();

        const email = ref('');
        const password = ref('');

        const errors = ref({});

        const submit = () => {
            axios.post('/login', {
                email: email.value,
                password: password.value,
            }).then(response => {
                refreshUser();
                router.push('/');
            }).catch(error => {
                if (error.response?.status === 422) {
                    errors.value = error.response.data.errors;
                }
            });
        };

        return {
            email,
            password,
            errors,
            submit,
        };
    },
};
</script>
