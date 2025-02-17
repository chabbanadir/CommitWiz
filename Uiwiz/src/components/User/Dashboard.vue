<template>
  <!-- Main Dashboard Container with Tailwind classes -->
  <div class=" border bg-pbg/97  p-12 h-screen overflow-auto shadow-xl shadow-frame">
    <div class="flex flex-col gap-8">
      <!-- Top row: three blocks side-by-side -->
      <div class="flex flex-row gap-4">
        <user-profile-block :profile="userData.user" />
        <language-overview-block :repositories="userData.repositories" />
        <repository-metrics-block :repositories="userData.repositories" />
      </div>

      <!-- Repository list with dynamic filters -->
      <repository-list
        :repositories="filteredRepositories"
        @filter="handleFilter"
      />
    </div>
  </div>
</template>

<script>
import UserProfileBlock from './UserProfileBlock.vue';
import LanguageOverviewBlock from './LanguageOverviewBlock.vue';
import RepositoryMetricsBlock from './RepositoryMetricsBlock.vue';
import RepositoryList from './RepositoryList.vue';

export default {
  name: 'Dashboard',
  components: {
    UserProfileBlock,
    LanguageOverviewBlock,
    RepositoryMetricsBlock,
    RepositoryList
  },
  data() {
    return {
      userData: null,
      filters: {
        searchText: '',
        language: ''
      }
    };
  },
  created() {
    // Load userData from localStorage (set in AuthCallback.vue)
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      // If missing, redirect or handle error
      this.$router.push({ name: 'Home' });
      return;
    }
    this.userData = JSON.parse(storedUserData);
  },
  computed: {
    filteredRepositories() {
      if (!this.userData) return [];
      return this.userData.repositories.filter(repo => {
        // Match by repo name
        const nameMatch = repo.name
          .toLowerCase()
          .includes(this.filters.searchText.toLowerCase());

        // Match by language (if a language filter is set)
        let languageMatch = true;
        if (this.filters.language) {
          languageMatch = repo.languages?.some(
            langObj => langObj.language === this.filters.language
          );
        }

        return nameMatch && languageMatch;
      });
    }
  },
  methods: {
    handleFilter(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
    }
  }
};
</script>

<!-- No <style> block needed since we rely on Tailwind classes -->

<style>
.shadow-frame {
  box-shadow: inset 0 0 95px rgba(128, 0, 128, 0.6);
}
</style>