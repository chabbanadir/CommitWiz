<template>
  <div class="auth-callback">
    <LoadingSpinner v-if="loading" />
    <div v-else-if="error" class="error-message">{{ error }}</div>
  </div>
</template>

<script>
import LoadingSpinner from '../LoadingSpinner.vue';

export default {
  name: 'AuthCallback',
  components: {
    LoadingSpinner
  },
  data() {
    return {
      loading: true,
      error: null,
      authToken: null,
      structuredData: {}
    };
  },
  created() {
    try {
      const token = this.$route.query.token;
      const userStr = this.$route.query.user;
      console.log("User in call back", userStr);
      if (!token || !userStr) {
        throw new Error('Missing authentication data.');
      }
      const userdata = JSON.parse(userStr);
      this.structuredData = {
        user: {
          id: userdata.user.id,
          username: userdata.user.username,
          name: userdata.user.name,
          bio: userdata.user.bio,
          avatar_url: userdata.user.avatar_url,
          email: userdata.user.email,
          location: userdata.user.location,
          wiz: userdata.user.wiz
        },
        repositories: userdata.repositories || [],
        metrics: {
          totalRepositories: (userdata.repositories && userdata.repositories.length) || 0
        }
      };
      this.authToken = token;
      setTimeout(() => {
        this.loading = false;
        localStorage.setItem('authToken', token);
        localStorage.setItem('userData', JSON.stringify(this.structuredData));
        console.log(this.structuredData);
        this.$router.push({ name: 'Dashboard' });
      }, 2000);
    } catch (err) {
      this.error = err.message;
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
  text-align: center;
}
</style>

