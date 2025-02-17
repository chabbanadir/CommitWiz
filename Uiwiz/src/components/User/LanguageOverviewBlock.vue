<template>
  <!-- Container with border & padding -->
  <div class="flex flex-col gap-4 w-full border border-gray-300 rounded-md p-4">
    
    <!-- Filter dropdown -->
    <div class="mb-4">
      <select v-model="selectedRepo" class="form-select">
        <option value="all">All Repositories</option>
        <option v-for="repo in repositories" :key="repo.id" :value="repo.id">
          {{ repo.name }}
        </option>
      </select>
    </div>
    
    <!-- Bar visualization -->
    <div class="w-full">
      <div class="flex h-2 rounded overflow-hidden bg-gray-300 dark:bg-gray-600">
        <div
          v-for="item in languageData"
          :key="item.lang"
          class="h-2"
          :style="{
            width: item.percentageString,
            backgroundColor: colorMap[item.lang] || defaultColor
          }"
        ></div>
      </div>
    </div>
    
    <!-- Legend -->
    <ul class="grid grid-cols-2 gap-x-4 gap-y-2 list-none p-0 m-0">
      <li v-for="item in languageData" :key="item.lang" class="flex items-center">
        <span
          class="inline-block w-3 h-3 rounded-full mr-2"
          :style="{ backgroundColor: colorMap[item.lang] || defaultColor }"
        ></span>
        {{ item.lang }} {{ item.percentageString }}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  name: 'LanguageOverviewBlock',
  props: {
    repositories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedRepo: 'all',
      // Tailwind-friendly color map (expand as needed):
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
            languageBytes[lang.language] = (languageBytes[lang.language] || 0) + lang.bytes;
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

        return entries.filter(item => item.numericPercentage > 0)
                      .sort((a, b) => b.numericPercentage - a.numericPercentage);
      } else {
        // Find the specific repository by id
        const repo = this.repositories.find(r => r.id === this.selectedRepo || r.id == this.selectedRepo);
        if (repo) {
          // Use the pre-calculated percent value from your backend
          return repo.languages.map(lang => ({
            lang: lang.language,
            numericPercentage: parseFloat(lang.percent), // assumes percent is numeric or string convertible
            percentageString: lang.percent + '%'
          })).sort((a, b) => b.numericPercentage - a.numericPercentage);
        }
        return [];
      }
    }
  }
};
</script>
