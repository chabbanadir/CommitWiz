<template>
  <div
    class="w-full max-w-sm mx-auto bg-white/80 backdrop-blur-sm border border-2 border-yellow-500 rounded-xl p-6 shadow-md text-gray-900 transition-colors"
  >
    <div class="flex flex-col items-center mb-5">
      <!-- Avatar -->
      <img
        :src="profile.avatar_url"
        alt="User Avatar"
        class="w-24 h-24 rounded-full object-cover mb-3 border-2 border-gray-300"
      />
      <!-- Name -->
      <h2 class="flex items-center text-2xl font-bold text-purple-700">
        <Icon icon="mdi:user" class="mr-2" width="24" height="24" />
        {{ profile.name }}
      </h2>
      <!-- Username -->
      <p class="text-gray-600">@{{ profile.username }}</p>
    </div>

    <!-- Bio -->
    <div
      v-if="profile.bio"
      class="flex items-center p-3 rounded-md bg-blue-50 border border-blue-100 mb-2"
    >
      <Icon icon="mdi:bio" class="mr-2 text-blue-600" width="35" height="35" />
      <span class="text-gray-800">{{ profile.bio }}</span>
    </div>

    <!-- Email -->
    <div
      v-if="profile.email"
      class="flex items-center p-3 rounded-md bg-green-50 border border-green-100 mb-2"
    >
      <Icon icon="mdi:email" class="mr-2 text-green-600" width="25" height="25" />
      <span class="text-gray-800">{{ profile.email }}</span>
    </div>

    <!-- Location -->
    <div
      v-if="profile.location"
      class="flex items-center p-3 rounded-md bg-yellow-50 border border-yellow-100"
    >
      <Icon icon="mingcute:location-fill" class="mr-2 text-yellow-600" width="25" height="25" />
      <span class="text-gray-800">{{ profile.location }}</span>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'UserProfileBlock',
  components: { Icon },
  props: {
    profile: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
/* Add any additional custom styles here if needed */
</style>
