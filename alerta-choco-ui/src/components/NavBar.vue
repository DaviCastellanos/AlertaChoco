<template>
  <div id="navBar" >
    <b-navbar toggleable="lg" type="light" variant="light" fixed="top">
        <b-navbar-brand>Sistema de Alertas PDET</b-navbar-brand>
        <b-navbar-nav class="ml-auto">
            <b-button v-if="!isUserAuthenticated" v-b-modal.login size="sm" class="my-2 my-sm-0" type="submit" variant="warning">AUTENTICAR</b-button>
        </b-navbar-nav>
    </b-navbar>
    <b-modal id="login" title="AUTENTICACIÓN" ok-only ok-title="ENTRAR" @ok="onSignIn()">
        <b-form-input :type="'email'" placeholder="email" v-model="email"> </b-form-input>
        <b-form-input :type="'password'" placeholder="contraseña" v-model="password" class="mt-2"> </b-form-input>
    </b-modal>
  </div>
</template>
    
<script>
import { BNavbar, BModal, BFormInput  } from 'bootstrap-vue'

export default {
    data () {
        return {
            email: null,
            password: null
        }
    },
    components:{
        BNavbar,
        BModal,
        BFormInput
    },
    methods: {
        onSignIn () {
            this.$store.dispatch('signUserIn', {email: this.email, password: this.password})
        }
    },
    computed: {
        isUserAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        }
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