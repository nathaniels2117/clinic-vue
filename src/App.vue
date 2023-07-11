<template>

  <v-app>
    <v-main class="vmain">
      <Navigation class="navigation" v-if="this.$store.getters.fetchUserInfo.length != 0"/>
      <router-view v-else/>
    </v-main>
    <!-- Notification Message -->
    <SnackBar/> 
    <!-- Notification Message End -->
  </v-app>
  
</template>

<script>

import Navigation from './components/includes/Navigation';
import SnackBar from './components/includes/SnackBar';

export default {
  name: 'App',
  components: {
    Navigation,
    SnackBar
  },
  data: () => ({
    //
  }),
};
</script>

<style scoped>
.vmain {
  /* background-image: url("Brochure Background.jpg"); */
  /* background-color: white; */
  background-image: url("Brochure Background.jpg");
  min-height: 500px; 

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* background-repeat: repeat-y; */
}
.navigation {
  /* background-color: lightgray; */
  background-image: url("Brochure Background.jpg");
  min-height: 500px; 

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  /* background-repeat: repeat-y; */
}
</style>