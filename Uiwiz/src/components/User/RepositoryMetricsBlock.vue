<template>
    <div class="border border-gray-300 rounded-md p-4 w-full">
      <h3 class="text-lg font-semibold mb-2">Repository Metrics</h3>
      <p class="mb-1">Total Repositories: {{ totalRepositories }}</p>
      <p class="mb-1">Average Languages per Repository: {{ averageLanguages.toFixed(2) }}</p>
      <p v-if="topRepoByLanguageCount" class="mb-1">
        Repository with Most Languages:
        <strong>{{ topRepoByLanguageCount.name }}</strong>
        ({{ topRepoByLanguageCount.languages?.length || 0 }} languages)
      </p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RepositoryMetricsBlock',
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
  