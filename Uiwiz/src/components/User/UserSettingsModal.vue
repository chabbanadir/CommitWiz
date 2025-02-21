<template>
  <teleport to="body">
    <div
      v-if="isOpen"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      @click.self="close"
    >
      <!-- Modal container -->
      <div class="bg-white w-full max-w-3xl p-6 rounded shadow-lg relative">
        <!-- Header (Title + Wiz Icon + Close Button) -->
        <div class="flex justify-between items-center mb-4">
          <!-- Title -->
          <h2 class="text-xl font-bold flex items-center">
            <Icon icon="mdi:account-cog" class="mr-2 text-indigo-600" width="24" height="24" />
            User Settings
          </h2>
          <!-- Right corner icons: Wiz toggle + Close -->
          <div class="flex items-center space-x-4">
            <!-- Wiz Toggle Icon -->
            <Icon
              icon="mdi:wizard-hat"
              :class="[ localData.wiz ? 'text-purple-600' : 'text-gray-400/50', 'cursor-pointer' ]"
              width="30"
              height="30"
              alt="Wiz"
              @click.stop="toggleWiz"
            />
            <!-- Close Button -->
            <button class="text-2xl font-bold" @click="close">&times;</button>
          </div>
        </div>

        <!-- Divider -->
        <hr class="mb-4 border-gray-300" />

        <!-- Form -->
        <form @submit.prevent="save" class="space-y-4 text-sm">
          <!-- Row 1: Username & Name -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Username -->
            <div>
              <label class="block font-medium mb-1 flex items-center">
                <Icon icon="mdi:account" class="mr-1 text-blue-600" width="18" height="18" />
                Username
              </label>
              <input
                v-model="localData.username"
                type="text"
                class="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <!-- Name -->
            <div>
              <label class="block font-medium mb-1 flex items-center">
                <Icon icon="mdi:account-circle" class="mr-1 text-green-600" width="18" height="18" />
                Name
              </label>
              <input
                v-model="localData.name"
                type="text"
                class="w-full border border-gray-300 rounded p-2"
              />
            </div>
          </div>

          <!-- Row 2: Email & Location -->
          <div class="grid grid-cols-2 gap-4">
            <!-- Email -->
            <div>
              <label class="block font-medium mb-1 flex items-center">
                <Icon icon="mdi:email" class="mr-1 text-purple-600" width="18" height="18" />
                Email
              </label>
              <input
                v-model="localData.email"
                type="email"
                class="w-full border border-gray-300 rounded p-2"
              />
            </div>
            <!-- Location -->
            <div>
              <label class="block font-medium mb-1 flex items-center">
                <Icon icon="mdi:map-marker" class="mr-1 text-yellow-600" width="18" height="18" />
                Location
              </label>
              <input
                v-model="localData.location"
                type="text"
                class="w-full border border-gray-300 rounded p-2"
              />
            </div>
          </div>

          <!-- Bio (single row) -->
          <div>
            <label class="block font-medium mb-1 flex items-center">
              <Icon icon="mdi:information-outline" class="mr-1 text-red-600" width="18" height="18" />
              Bio
            </label>
            <textarea
              v-model="localData.bio"
              class="w-full border border-gray-300 rounded p-2"
              rows="3"
            ></textarea>
          </div>

          <!-- Avatar URL + Image Preview -->
          <div class="grid grid-cols-3 gap-4 items-center">
            <div class="col-span-1 flex flex-col items-center">
              <label class="block font-medium mb-1 flex items-center">
                <Icon icon="mdi:image" class="mr-1 text-orange-600" width="18" height="18" />
                Avatar
              </label>
              <img
                :src="localData.avatar_url"
                alt="Avatar Preview"
                class="w-16 h-16 rounded-full object-cover border border-gray-300"
              />
            </div>
            <div class="col-span-2">
              <label class="block font-medium mb-1">Image URL</label>
              <input
                v-model="localData.avatar_url"
                type="text"
                class="w-full border border-gray-300 rounded p-2"
                placeholder="https://example.com/avatar.jpg"
              />
            </div>
          </div>

          <!-- Save Button (centered) -->
          <div class="flex justify-center mt-4">
            <button
              type="submit"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  </teleport>
</template>

<script>
import { Icon } from '@iconify/vue';
import axios from 'axios';

export default {
  name: 'UserSettingsModal',
  components: {
    Icon,
  },
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    user: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      // Make a local copy so we don't mutate props directly
      localData: { ...this.user },
    };
  },
  watch: {
    // Keep localData in sync if `user` prop changes
    user: {
      immediate: true,
      handler(newVal) {
        this.localData = { ...newVal };
      },
    },
  },
  emits: ['close', 'save'],
  methods: {
    close() {
      this.$emit('close');
    },
    async save() {
      try {
        // Send updated data to the backend. Assumes `id` is part of localData.
        const response = await axios.put(`http://0.0.0.0:3000/user-profile/${this.localData.id}`, this.localData);
        // Emit the updated data from the response back to the parent.
        this.$emit('save', response.data);
        this.close();
      } catch (error) {
        console.error('Error updating user profile:', error);
      }
    },
    toggleWiz() {
      this.localData.wiz = !this.localData.wiz;
    },
  },
};
</script>

<style scoped>
/* Additional custom styles can be added here if needed */
</style>
