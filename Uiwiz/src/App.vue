<template>
  <div class="min-h-screen bg-image shadow-frame ">
    <router-view />
  </div>
</template>

<style>
.shadow-frame {
  box-shadow: inset 0 0 95px rgba(128, 0, 128, 0.6);
}
.bg-image {
  background-color: #fff;
  background-image: url('./assets/bg.jpg')  ;
  background-size: contain;
  background-repeat: repeat;

}
</style>
