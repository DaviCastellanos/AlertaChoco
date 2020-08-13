<template>
  <b-container fluid>
    <b-row no-gutters>
      <nav-bar />
    </b-row>
    <div class="d-flex justify-content-center no-gutters">
      <router-view />
    </div>
    <Footer />
  </b-container>
</template>

<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
  }
};
</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
}
#buttons {
  margin: 2px;
}
</style>
