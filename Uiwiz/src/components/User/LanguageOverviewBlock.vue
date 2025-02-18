<template>
  <div
    class="w-full max-w-xl mx-auto bg-white/80 backdrop-blur-sm border border-2 border-yellow-500 rounded-xl p-6 shadow-md text-gray-900 transition-colors space-y-4"
  >
    <!-- Title -->
    <h3 class="flex items-center text-2xl font-bold text-purple-700 mb-2">
      <Icon icon="mdi:chart-donut" class="mr-2" width="24" height="24" />
      Language Overview
    </h3>

    <!-- Select Dropdown -->
    <div>
      <label for="repoSelect" class="block mb-1 text-sm font-medium text-gray-700">
        Select a Repository
      </label>
      <select
        id="repoSelect"
        v-model="selectedRepo"
        class="w-full p-2 border border-gray-300 rounded-md 
               focus:outline-none focus:ring-2 focus:ring-purple-500 
               focus:border-purple-500 bg-white"
      >
        <option value="all">All Repositories</option>
        <option 
          v-for="repo in repositories" 
          :key="repo.id" 
          :value="repo.id"
        >
          {{ repo.name }}
        </option>
      </select>
    </div>

    <!-- Bar Visualization -->
    <div class="w-full">
      <div class="flex h-2 rounded overflow-hidden bg-gray-300 dark:bg-gray-600">
        <div
          v-for="item in languageData"
          :key="item.lang"
          class="h-2 transition-all duration-300"
          :style="{
            width: item.percentageString,
            backgroundColor: colorMap[item.lang] || defaultColor
          }"
        ></div>
      </div>
    </div>

    <!-- Legend -->
    <ul class="grid grid-cols-2 gap-2 list-none p-0 m-0">
      <li 
        v-for="item in languageData" 
        :key="item.lang" 
        class="flex items-center text-sm text-gray-800"
      >
        <span
          class="inline-block w-3 h-3 rounded-full mr-2"
          :style="{ backgroundColor: colorMap[item.lang] || defaultColor }"
        ></span>
        {{ item.lang }} ({{ item.percentageString }})
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'LanguageOverviewBlock',
  components: { Icon },
  props: {
    repositories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedRepo: 'all',
      // Tailwind-friendly color map (expand as needed)
      colorMap: {
        Python: '#3572A5',
        TypeScript: '#3178C6',
        Cython: '#fedf5b',
        SCSS: '#C6538C',
        'C#': '#178600',
        HTML: '#E34F26',
        C: '#555555',
        JavaScript: '#F1E05A',
        Astro: '#FF5D01',
        'C++': '#F34B7D',
        Dart: '#00B4AB',
        CSS: '#563D7C',
        Vue: '#41B883',
        Fortran: '#4D41B1',
        TeX: '#3D6117',
        // ...
      },
      defaultColor: '#cccccc'
    };
  },
  computed: {
    languageData() {
      // When "all" is selected, aggregate languages from all repositories
      if (this.selectedRepo === 'all') {
        const languageBytes = {};
        let totalBytes = 0;

        this.repositories.forEach(repo => {
          repo.languages.forEach(lang => {
            languageBytes[lang.language] = 
              (languageBytes[lang.language] || 0) + lang.bytes;
            totalBytes += lang.bytes;
          });
        });

        const entries = Object.entries(languageBytes).map(([lang, bytes]) => {
          const rawPercentage = (bytes / totalBytes) * 100;
          const numericPercentage = parseFloat(rawPercentage.toFixed(1));
          return {
            lang,
            bytes,
            numericPercentage,
            percentageString: numericPercentage + '%'
          };
        });

        return entries
          .filter(item => item.numericPercentage > 0)
          .sort((a, b) => b.numericPercentage - a.numericPercentage);
      } else {
        // Find the specific repository by id
        const repo = this.repositories.find(
          r => r.id === this.selectedRepo || r.id == this.selectedRepo
        );
        if (repo) {
          // Use the pre-calculated percent value from your backend
          return repo.languages
            .map(lang => ({
              lang: lang.language,
              numericPercentage: parseFloat(lang.percent),
              percentageString: lang.percent + '%'
            }))
            .sort((a, b) => b.numericPercentage - a.numericPercentage);
        }
        return [];
      }
    }
  }
};
</script>

<style scoped>
/* You can override or add styles here if needed, or rely purely on Tailwind classes. */
</style>
