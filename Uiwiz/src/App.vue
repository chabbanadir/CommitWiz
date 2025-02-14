<template>
  <div class="min-h-screen bg-image bg-white border-[2px] border-purple-700 shadow-frame" >
    <!-- Full-Screen Frame with Inner Shadow -->
      <router-view />

  </div>

</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Stronger, More Defined Inner Shadow */
.shadow-frame {
  box-shadow: inset 0px 0px 95px rgba(128, 0, 128, 0.8), 
              inset 0px 20000px 95px rgba(128, 0, 128, 0.5);
}
.bg-image {
  background-image: url('./assets/bg1.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
