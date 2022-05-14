<template>
    <form @submit.prevent="submit" class="max-w-sm my-12 mx-auto p-6 sm:p-8 bg-white border rounded">
        <div class="mb-4">
            <div class="block mb-1">
                <label for="name" class="font-bold mr-2">Username</label>
                <span id="name-desc" class="text-gray-500 text-sm">Emoji-only, must be unique</span>
            </div>
            <input type="text" required class="w-full border-gray-300 dark:border-gray-700 rounded" name="name" id="name" autocomplete="username" v-model="name" aria-describedby="name-desc">
            <ul class="text-red-500 list-disc list-inside mt-2" v-if="errors.name">
                <li :key="error" v-for="error in errors.name">{{ error }}</li>
            </ul>
        </div>

        <div class="mb-4">
            <label for="email" class="font-bold block mb-1">Email</label>
            <input type="email" required class="w-full border-gray-300 dark:border-gray-700 rounded" name="email" id="email" autocomplete="email" v-model="email">
            <ul class="text-red-500 list-disc list-inside mt-2" v-if="errors.email">
                <li :key="error" v-for="error in errors.email">{{ error }}</li>
            </ul>
        </div>

        <div class="mb-4">
            <label for="password" class="font-bold block mb-1">Password</label>
            <input type="password" required class="w-full border-gray-300 dark:border-gray-700 rounded" name="password" id="password" autocomplete="new-password" v-model="password">
            <ul class="text-red-500 list-disc list-inside mt-2" v-if="errors.password">
                <li :key="error" v-for="error in errors.password">{{ error }}</li>
            </ul>
        </div>

        <div class="mb-4">
            <label for="password_confirmation" class="font-bold block mb-1">Confirm password</label>
            <input type="password" required class="w-full border-gray-300 dark:border-gray-700 rounded" name="password_confirmation" id="password_confirmation" autocomplete="new-password" v-model="passwordConfirmation">
        </div>

        <div class="mt-6">
            <button type="submit" class="bg-indigo-500 text-white hover:bg-indigo-600 font-bold tracking-tight px-4 py-2 rounded">
                Create account 👋
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

        const name = ref('');
        const email = ref('');
        const password = ref('');
        const passwordConfirmation = ref('');

        const errors = ref({});

        const submit = () => {
            axios.post('/register', {
                name: name.value,
                email: email.value,
                password: password.value,
                password_confirmation: passwordConfirmation.value,
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
            name,
            email,
            password,
            passwordConfirmation,
            errors,
            submit,
        };
    },
};
</script>
