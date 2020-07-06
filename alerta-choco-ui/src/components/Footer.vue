<template>
  <b-container fluid id="footer">
    <br />
    <b-row no-gutters>
     <p id="disclaimer" class="text-light">
     Powered by the Style Analytics Portfolio Analyzer: Information and analysis provided here through a strategic
     partnership between eVestment and Style Analytics. All portfolio holdings information is collected by eVestment
     directly from investment management firms and other sources believed to be reliable. eVestment and Style Analytics
     do not guarantee or warrant the accuracy, timeliness, or completeness of the information provided and are not
     responsible for any errors or omissions. Copyright 2020 eVestment Alliance, LLC. All Rights Reserved. 
     </p>      
    </b-row>
    <b-row no-gutters>
        <b-col sm="12" md="3">
            <div id="logo">
                <img class="img-fluid" src="@/images/un-logo.png">
            </div>
        </b-col>
        <b-col sm="12" md="3">
            <div id="logo">
                <img class="img-fluid" src="@/images/un-logo.png">
            </div>
        </b-col>
        <b-col sm="12" md="3">
            <div id="logo">
                <img class="img-fluid" src="@/images/un-logo.png">
            </div>
        </b-col>
        <b-col sm="12" md="3">
            <div id="logo">
                <img class="img-fluid" src="@/images/un-logo.png">
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
    padding: 70px
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