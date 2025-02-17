<template>
    <div class="flex flex-col items-center justify-center border border-gray-300 rounded-md p-4 w-full">
      <div v-if="profile">
      <img :src="profile.avatar_url" alt="User Avatar"  class="rounded-full w-20 h-20 object-cover mb-2">
      <h2 class="font-semibold text-lg">{{ profile.name }}</h2>
      <p class="text-gray-600">@{{ profile.username }}</p>
      <p class="mt-2 text-sm text-center">{{ profile.bio }}</p>
      <p v-if="profile.email" class="text-sm text-gray-500">Email: {{ profile.email }}</p>
      <p v-if="profile.location" class="text-sm text-gray-500">Location: {{ profile.location }}</p>
      <!-- Other user info -->
    </div>

   
    </div>
  </template>
  
  <script>
  export default {
    name: 'UserProfileBlock',
    props: {
      profile: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  