<!-- TopBar.vue -->
<template>
  <div class="fixed top-0 left-0 w-full z-50 bg-purple-700 p-4  px-24 flex items-center justify-between shadow-md">
    <div class="flex items-center">
      <img src="../assets/logo.png" alt="Logo" class="h-8 w-auto mr-2 rounded-full" />
      <span class="text-white font-semibold text-base">{{ userName }}</span>
    </div>
    <!-- Right side: Button with Iconify icon -->
    <button
      @click="refreshData"
      class="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 transition flex items-center justify-center"
    >
      <!-- Iconify icon from the mdi set -->
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
    async refreshData() {
      try {
        // Call the backend refresh endpoint.
        const response = await fetch('/user-profile/refresh', {
          method: 'POST',
          credentials: 'include', // Ensure cookies/credentials are sent if needed.
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error('Failed to refresh user data.');
        }
        const updatedData = await response.json();
        // Emit the updated data to parent components.
        this.$emit('user-data-updated', updatedData);
      } catch (error) {
        console.error('Error refreshing user data:', error);
        // Optionally, display a notification/error message here.
      }
    }
  }
};
</script>

<!-- Tailwind classes are used directly in the template -->
