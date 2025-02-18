<template>
  <div
    class="w-full max-w-md mx-auto bg-white/80 border border-2 border-yellow-500 rounded-xl p-6 shadow-md text-gray-900 transition-colors"
  >
    <!-- Header -->
    <h3 class="flex items-center text-2xl font-bold mb-5 gap-2">
      <Icon
        icon="mdi:chart-bar"
        class="text-black"
        width="28"
        height="28"
      />
      <span>Repository Metrics</span>
    </h3>

    <div class="space-y-4">
      <!-- Total Repositories -->
      <div
        class="flex items-center gap-2 p-3 rounded-md bg-purple-50/50 border border-purple-100"
      >
        <Icon
          icon="mdi:source-repository"
          class="text-purple-600"
          width="20"
          height="20"
        />
        <span class="font-semibold text-gray-700">Total Repositories:</span>
        <span class="ml-auto font-bold text-purple-700">
          {{ totalRepositories }}
        </span>
      </div>

      <!-- Average Languages -->
      <div
        class="flex items-center gap-2 p-3 rounded-md bg-green-50/50 border border-green-100"
      >
        <Icon
          icon="mdi:code-tags"
          class="text-green-600"
          width="20"
          height="20"
        />
        <span class="font-semibold text-gray-700">
          Average Languages per Repo:
        </span>
        <span class="ml-auto font-bold text-green-700">
          {{ averageLanguages.toFixed(2) }}
        </span>
      </div>

      <!-- Most Languages -->
      <div
        v-if="topRepoByLanguageCount"
        class="flex items-center p-3 rounded-md bg-yellow-50/50 border border-yellow-100"
      >
        <!-- Left side: label + repo name -->
        <div class="flex items-center gap-2">
          <Icon
            icon="mdi:star"
            class="text-yellow-600"
            width="20"
            height="20"
          />
          <span class="font-semibold text-gray-700">Most Languages:</span>
          <span class="font-medium text-gray-800">
            {{ topRepoByLanguageCount.name }}
          </span>
        </div>

        <!-- Right side: big number in a circle -->
        <div
          class="ml-auto flex items-center justify-center w-12 h-12 rounded-full bg-yellow-200 text-yellow-800"
        >
          <span class="text-2xl font-extrabold">
            {{ topRepoByLanguageCount.languages?.length || 0 }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'RepositoryMetricsBlock',
  components: { Icon },
  props: {
    repositories: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalRepositories() {
      return this.repositories.length;
    },
    averageLanguages() {
      if (!this.repositories.length) return 0;
      let total = 0;
      this.repositories.forEach(repo => {
        total += (repo.languages?.length || 0);
      });
      return total / this.repositories.length;
    },
    topRepoByLanguageCount() {
      if (!this.repositories.length) return null;
      return this.repositories.reduce((maxRepo, currentRepo) => {
        const maxCount = maxRepo.languages?.length || 0;
        const currentCount = currentRepo.languages?.length || 0;
        return currentCount > maxCount ? currentRepo : maxRepo;
      });
    }
  }
};
</script>

<style scoped>
/* You can add or override styles here if needed, or keep it purely Tailwind-based */
</style>
