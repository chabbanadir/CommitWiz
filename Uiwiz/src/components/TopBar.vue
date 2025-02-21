<!-- TopBar.vue -->
<template>
  <div class="fixed top-0 left-0 w-full z-50 bg-purple-700 p-4 px-24 flex items-center justify-between shadow-md">
    <div class="flex items-center">
      <img src="../assets/logo.png" alt="Logo" class="h-8 w-auto mr-2 rounded-full" />
      <span class="text-white font-semibold text-base">{{ userName }}</span>
    </div>
    <button
      @click="emitRefresh"
      class="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition flex items-center justify-center"
    >
      <Icon icon="mdi:refresh" class="w-5 h-5" />
    </button>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'TopBar',
  components: { Icon },
  props: {
    userName: {
      type: String,
      required: true
    }
  },
  methods: {
    emitRefresh() {
      // Simply emit an event to inform the parent to refresh the user data.
      this.$emit('user-data-refresh');
    }
  }
};
</script>
