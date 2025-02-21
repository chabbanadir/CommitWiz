<template>
  <!-- Wider container to match the width of your top blocks -->
  <div
    class="w-full mx-auto bg-white/80 backdrop-blur-sm border border-2 border-sky-500 
           rounded-xl p-6 shadow-md text-gray-900 transition-colors space-y-4"
  >
    <!-- Header & Filters (Optional) -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <!-- Title with icon -->
      <h3 class="text-xl font-bold text-gray-800 flex items-center gap-2">
        <Icon icon="mdi:source-repository" class="text-blue-600" width="40" height="40" />
        Repositories
      </h3>

      <!-- (Optional) Filters Row -->
      <div class="flex flex-col md:flex-row md:items-center md:justify-end gap-4 w-full md:w-auto">
        <!-- Search Box -->
        <div class="relative">
          <Icon icon="mdi:magnify" class="absolute left-2 top-3 text-gray-400" width="20" height="20" />
          <input
            v-model="localSearchText"
            type="text"
            placeholder="Search by name..."
            @input="emitFilter"
            class="pl-8 pr-3 py-2 w-full md:w-64 border border-1 border-sky-500  rounded-md focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          />
        </div>
        <!-- Language Dropdown -->
        <div class="relative">
          <Icon icon="mdi:filter-variant" class="absolute left-2 top-2 text-gray-400" width="20" height="20" />
          <select
            v-model="localLanguage"
            @change="emitFilter"
            class="pl-8 pr-3 py-2 w-full md:w-48 border border-1 border-sky-500  rounded-md focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
          >
            <option value="">All Languages</option>
            <option
              v-for="lang in allLanguages"
              :key="lang"
              :value="lang"
            >
              {{ lang }}
            </option>
          </select>
        </div>
      </div>
    </div>

    <!-- Repository List as a Responsive Grid -->
    <ul class="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      <li
        v-for="repo in reposWithLanguages"
        :key="repo.id"
        class="p-4 bg-white/70 border border-gray-100 rounded-md shadow-sm"
      >
        <!-- Repo Name + Icon -->
        <div class="flex items-center justify-between mb-2">
          <h4 class="font-semibold text-gray-700 flex items-center gap-2">
            <Icon icon="mdi:folder" class="text-blue-600" width="20" height="20" />
            {{ repo.name }}
          </h4>
          <div class="flex items-center gap-1 text-sm text-gray-500">
            <Icon icon="mdi:star" class="text-yellow-500" width="18" height="18" />
            {{ repo.stars }}
          </div>
        </div>
          <!-- Divider between title and languages -->
          <div class="border-t border-blue-500 my-2"></div>
          <!-- Language Distribution (Progress Bars) -->
        <div v-if="repo.languages?.length" class="space-y-2">
          <div
            v-for="langObj in repo.languages"
            :key="langObj.language"
            class="flex items-center gap-2"
          >
            <!-- Language Color Dot + Name -->
            <div class="w-1/3 flex items-center gap-1 text-sm font-medium text-gray-700">
              <span
                class="inline-block w-3 h-3 rounded-full"
                :style="{ backgroundColor: colorMap[langObj.language] || defaultColor }"
              ></span>
              {{ langObj.language }}
            </div>
            <!-- Progress Bar -->
            <div class="flex-1 bg-gray-200 h-2 rounded-full overflow-hidden">
              <div
                class="h-2 rounded-full transition-all duration-300"
                :style="{
                  width: langObj.percent + '%',
                  backgroundColor: colorMap[langObj.language] || defaultColor
                }"
              ></div>
            </div>
            <!-- Percent Text -->
            <span class="w-10 text-right text-sm text-gray-600">
              {{ langObj.percent }}%
            </span>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { Icon } from '@iconify/vue';

export default {
  name: 'RepositoryList',
  components: { Icon },
  props: {
    repositories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localSearchText: '',
      localLanguage: '',
      // Simple color map for demonstration
      colorMap: {
        Python: '#3572A5',
        TypeScript: '#3178C6',
        JavaScript: '#F1E05A',
        CSS: '#563D7C',
        HTML: '#E34F26',
        Vue: '#41B883',
        'C++': '#F34B7D',
        'C#': '#178600',
        Astro: '#FF5D01'
      },
      defaultColor: '#cccccc'
    };
  },
  computed: {
    /**
     * Returns only repositories that actually have language data.
     * This alone ensures any repository with an empty or missing
     * `languages` array will NOT appear in the list.
     */
    reposWithLanguages() {
      return this.repositories.filter(repo => {
        // Skip if `languages` doesn't exist or is empty
        if (!repo.languages || repo.languages.length === 0) {
          return false;
        }
        return true;
      });
    },

    /**
     * Collect all languages (used for the dropdown, if needed)
     */
    allLanguages() {
      const languageSet = new Set();
      this.repositories.forEach(repo => {
        repo.languages?.forEach(langObj => {
          languageSet.add(langObj.language);
        });
      });
      return [...languageSet].sort();
    }
  },
  methods: {
    /**
     * This method can still emit an event if your parent is handling
     * additional filtering. But for skipping empty-languages repos,
     * the logic is handled in `reposWithLanguages`.
     */
    emitFilter() {
      this.$emit('filter', {
        searchText: this.localSearchText,
        language: this.localLanguage
      });
    }
  }
};
</script>

<style scoped>
/* You can add or override custom styles here if desired. */
</style>
