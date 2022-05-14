import { ref } from 'vue';

export let user = ref(null);

const userJsonElement = document.getElementById('user-json');
if (userJsonElement) {
    user.value = JSON.parse(userJsonElement.textContent);
}

export async function refreshUser() {
    try {
        const response = await axios.get('/api/user');
        user.value = response.data;
    } catch (error) {
        user.value = null;
    }
}

export function formatDate(date) {
    const d = new Date(date);
    return d.toLocaleDateString();
}

export function formatDateTime(date) {
    const d = new Date(date);
    return d.toLocaleString();
}
