<template>
    <div>
      <p>Logging in...</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AuthCallback',
    mounted() {
      const params = new URLSearchParams(window.location.search)
      const token = params.get('token')
      if (token) {
        // Store the token in localStorage or use a state management solution (like Vuex)
        localStorage.setItem('authToken', token)
        // Redirect to your main page or dashboard
        this.$router.push({ name: 'Home' })
      } else {
        // Handle error or redirect to login again
        console.error('Authentication token not found.')
        this.$router.push({ name: 'Login' })
      }
    }
  }
  </script>
  