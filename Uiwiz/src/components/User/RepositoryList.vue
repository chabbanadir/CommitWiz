<template>
    <div class="border border-gray-300 rounded-md p-4 w-full">
      <h3 class="text-lg font-semibold mb-2">Repositories</h3>
  
      <!-- Filter controls -->
      <div class="flex items-center gap-2 mb-4">
        <input
          v-model="localSearchText"
          type="text"
          placeholder="Search by name..."
          @input="emitFilter"
          class="border border-gray-300 rounded-md p-2"
        />
        <select
          v-model="localLanguage"
          @change="emitFilter"
          class="border border-gray-300 rounded-md p-2"
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
  
      <!-- Display filtered repositories -->
      <ul class="space-y-2">
        <li
          v-for="repo in repositories"
          :key="repo.id"
          class="border-b border-gray-200 pb-2"
        >
          <h4 class="font-semibold">{{ repo.name }}</h4>
          <p v-if="repo.languages?.length" class="text-sm text-gray-600">
            Languages: {{ repo.languages.map(l => l.language).join(', ') }}
          </p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'RepositoryList',
    props: {
      repositories: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        localSearchText: '',
        localLanguage: ''
      };
    },
    computed: {
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
      emitFilter() {
        this.$emit('filter', {
          searchText: this.localSearchText,
          language: this.localLanguage
        });
      }
    }
  };
  </script>
  