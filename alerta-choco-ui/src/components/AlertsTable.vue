<template>
  <div id="alert" >
    <b-table striped hover dark :items="items" @row-clicked="rowClicked" :fields="fields"></b-table>
  </div>
</template>
    
<script>
import { AlertsService } from '@/services';
import { BTable } from 'bootstrap-vue'

export default {
    components:{
        BTable
    },
  data() {
      return {  
        fields: ['Amenaza','Fecha', 'Hora'],  
        items: []
      }
  },
  methods: {
    rowClicked(item)
    {
        this.$store.commit('CHANGE_MAP_CENTER', { lat: item.Lan, lon: item.Lon }) 
    },
    SetItems(features) {    
        for(var i = 0 ; i < features.length; i++)
        {


            this.items.push({ Fecha: this.FormatDate(features[i].attributes.date), 
                              Hora: this.FormatTime(features[i].attributes.date), 
                              Amenaza: features[i].attributes.threat,
                              Lan: features[i].geometry.x,
                              Lon: features[i].geometry.y})
        }
    }, 
    FormatDate (epoch) {
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        return new Date(epoch).toLocaleDateString("es-LA", options)
    },
    FormatTime(epoch) {
        var options = { hour: '2-digit', minute: '2-digit', second: '2-digit' };

        return new Date(epoch).toLocaleTimeString("es-LA", options)
    },
    async Request () {
        const response = await AlertsService.getAlerts();
        if(response)
        this.SetItems(this.OrderByDate(response.features).reverse())
    },
    OrderByDate (array) 
    {
        return array.sort(function(a, b) {
            var dateA = new Date(a.date), dateB = new Date(b.date);
            return dateA - dateB;
            })
    }
  },
  mounted() {
    this.Request()
  }
}

</script>

<style scoped>
#alert {
  padding: 0;
  margin: 1px   ;
  width: 100%;
  height: 50px;
}
</style>