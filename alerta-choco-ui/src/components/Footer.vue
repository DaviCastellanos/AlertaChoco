<template>
  <b-container fluid id="footer">
    <br />
    <b-row no-gutters>
     <p id="disclaimer" class="text-light">
     Disclaimer: Lorem ipsum dolor sit amet consectetur adipiscing elit, curabitur nam nulla habitant porttitor lacinia et 
     nascetur, habitasse praesent magna etiam odio suscipit. Urna ante taciti ultrices parturient, vitae velit 
     magna, vel cras porttitor. Montes porttitor hendrerit netus sollicitudin rutrum elementum purus platea donec 
     aptent, erat arcu aliquet class ridiculus magna neque magnis dui himenaeos in, tristique volutpat primis 
     iaculis mus rhoncus interdum nisl luctus. 
     </p>      
    </b-row>
    <b-row no-gutters>
        <b-col sm="12" md="3">
            <div id="logo">
                <img class="img-fluid" src="@/images/logo-codhes-corregido.png">
            </div>
        </b-col>
        <b-col sm="12" md="3">
            <div id="logo">
                <img class="img-fluid" src="@/images/logo-fisch.png">
            </div>
        </b-col>
        <b-col sm="12" md="3">
            <div id="logo">
                <img class="img-fluid" src="@/images/logo-gobierno.png">
            </div>
        </b-col>
        <b-col sm="12" md="3">
            <div id="logo">
                <img class="img-fluid" src="@/images/logo-fmnu.png">
            </div>
        </b-col>
    </b-row>
  </b-container>
</template>


<script>

export default {
    components: {
    },
    data () {
    return {
      
      } 
    }
  }

</script>

<style scoped>

#logo{
    padding: 70px;
    vertical-align: bottom;
}

#footer {
    background-color: #00473B;
    width: 100%;
}
#disclaimer {
    font-size: 0.9rem;
    vertical-align: bottom;
    margin-top: 50px;
    margin-left: 50px;
    margin-right: 50px;
}
</style>