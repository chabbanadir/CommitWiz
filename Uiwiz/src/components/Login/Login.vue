<template>
  <div class="min-h-screen w-full flex items-center justify-center p-4">
    <!-- Glassmorphism card -->
    <div class="backdrop-blur-md border bg-pbg border-white rounded-xl p-12  shadow-xl flex flex-col items-center">
      <!-- CommitWiz Logo -->
      <img
        src="../../assets/logo.png"
        alt="CommitWiz Logo"
        style="width: 200px;"
        class="mb-4 rounded rounded-full"
      />
      <!-- Title -->
      <h1 class="text-white text-7xl font-bold mb-12 px-12 text-stroke">COMMITWIZ</h1>
      <!-- GitHub Login Button -->
      <button
        @click="loginWithGithub"
        class="flex items-center bg-white/80 hover:bg-gray-200/90 text-gray-800 font-semibold py-3 px-6 border rounded-full border-sky-400 shadow-lg transition"
      >
        <img
          src="../../assets/GitHub-Logo.png"
          alt="GitHub Logo"
          style="width: 50px;"
          class="mr-2"
        />
        Login with GitHub
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  methods: {
    loginWithGithub() {
      const authWindow = window.open(
        'http://localhost:3000/auth/github',
        'GitHub Login',
        'width=600,height=700'
      );
      window.addEventListener(
        'message',
        (event) => {
          if (event.origin !== 'http://localhost:3000') return;
          const { token } = event.data;
          if (token) {
            localStorage.setItem('authToken', token);
            console.log(token);
            authWindow.close();
            this.$router.push({ name: 'Dashboard' });
          }
        },
        { once: true }
      );
    }
  }
};
</script>
