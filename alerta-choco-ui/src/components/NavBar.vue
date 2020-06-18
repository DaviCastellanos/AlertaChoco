<template>
  <div id="navBar" >
    <b-navbar toggleable="lg" type="dark" variant="dark" fixed="top">
        <b-navbar-brand>Sistema de Alertas PDET</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-button size="sm" class="my-2 my-sm-0" type="submit" variant="warning">AUTENTICAR</b-button>
        </b-navbar-nav>
    </b-navbar>
  </div>
</template>
    
<script>
import { BNavbar } from 'bootstrap-vue'

export default {
    components:{
        BNavbar
    }
}

</script>

<style scoped>
#navBar {
  padding: 0;
  margin: 0;
  margin-bottom: 6px;
  width: 100%;
  height: 50px;
}
</style>