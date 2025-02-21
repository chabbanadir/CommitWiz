<!-- Dashboard.vue -->
<template>
  <div class="border bg-pbg/97 p-12 h-screen overflow-auto shadow-xl shadow-frame">
    <top-bar
      :userName="userData?.user?.names || 'CommitWiz'"
      @user-data-refresh="handleUserDataUpdated"
    />
    <div class="flex flex-col gap-8 mt-12">
      <div class="flex flex-col md:flex-row gap-4">
        <user-profile-block :profile="userData.user" @update:profile="userData.user = $event"/>
        <language-overview-block :repositories="userData.repositories" />
        <repository-metrics-block :repositories="userData.repositories" />
      </div>
      <repository-list
        :repositories="filteredRepositories"
        @filter="handleFilter"
      />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import TopBar from '../TopBar.vue';
import UserProfileBlock from './UserProfileBlock.vue';
import LanguageOverviewBlock from './LanguageOverviewBlock.vue';
import RepositoryMetricsBlock from './RepositoryMetricsBlock.vue';
import RepositoryList from './RepositoryList.vue';

export default {
  name: 'Dashboard',
  components: {
    TopBar,
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
    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      this.$router.push({ name: 'Home' });
      return;
    }
    this.userData = JSON.parse(storedUserData);
  },
  computed: {
    filteredRepositories() {
      if (!this.userData) return [];
      return this.userData.repositories.filter(repo => {
        const nameMatch = repo.name.toLowerCase().includes(this.filters.searchText.toLowerCase());
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
    handleUserDataUpdated() {
      const dt = localStorage.getItem('userData');
      const data = JSON.parse(dt)
      console.log("User Data :" , data.user.id);

      axios.get(`http://0.0.0.0:3000/user-profile/${data.user.id}`, {

      })
      .then(response => {
        const updatedData = response.data;
        this.userData = updatedData;
        console.log('Response:', response);

        localStorage.setItem('userData', JSON.stringify(updatedData));
      })
      .catch(error => {
        console.error('Error refreshing user data:', error);
      });
    },
    handleFilter(newFilters) {
      this.filters = { ...this.filters, ...newFilters };
    }
  }
};
</script>

<style>

.shadow-frame {
  box-shadow: inset 0 0 95px rgba(128, 0, 128, 0.6);
}
</style>
