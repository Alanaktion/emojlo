<template>
    <Dialog as="div" class="relative z-10" :initialFocus="inputRef" @close="body = ''">
        <div class="fixed inset-0 bg-slate-100/30 dark:bg-gray-900/30 backdrop-blur-sm transition-opacity" />
        <div class="fixed z-10 inset-0 overflow-y-auto">
            <div class="flex items-end sm:items-center justify-center p-4 text-center sm:p-0">
                <DialogPanel class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all p-4 sm:my-8 sm:max-w-lg sm:w-full">
                    <DialogTitle class="text-lg font-medium mb-4">New post</DialogTitle>
                    <PostForm @submitted="$emit('close')" @cancel="$emit('close')" :inputRef="inputRef" />
                </DialogPanel>
            </div>
        </div>
    </Dialog>
</template>

<script>
import { ref } from 'vue';
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    DialogDescription,
} from '@headlessui/vue';
import PostForm from './PostForm.vue';

export default {
    components: {
        Dialog,
        DialogPanel,
        DialogTitle,
        DialogDescription,
        PostForm,
    },
    setup() {
        const inputRef = ref(null);
        return {
            inputRef,
        };
    },
};
</script>
