<template>
  <div id="table">
    <b-table
      responsive
      sticky-header="750px"
      striped
      hover
      light
      :items="this.alertItems()"
      :fields="this.getFields()"
    >
      <template v-slot:cell(que)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(quien)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(como)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(cuando)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(donde)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(situacionActual)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(primerMensaje)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(recibeLlamada)="data">
        <span v-html="data.value"></span>
      </template>
      <template v-slot:cell(botonVerificar)="data">
        <b-button size="sm" :to="data.value" class="mr-2" variant="warning"
          >Verificar</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
import { BTable } from "bootstrap-vue";

export default {
  components: {
    BTable,
  },
  data() {
    return {
      selectedAlert: {},
    };
  },
  methods: {
    getFields() {
      console.log("getFields ");
      return [
        { tdClass: "w-5", key: "primerMensaje", label: "Primer mensaje" },
        { key: "que", tdClass: "w-5", label: "Qué pasó" },
        { key: "quien", tdClass: "w-5", label: "Quién es la víctima" },
        { key: "como", tdClass: "w-5", label: "Cómo paso" },
        { key: "cuando", tdClass: "w-3", label: "Cuándo pasó" },
        { key: "donde", tdClass: "w-3", label: "Dónde pasó" },
        { key: "situacionActual", tdClass: "w-5", label: "Situación actual" },
        {
          key: "recibeLlamada",
          tdClass: "w-1",
          sortable: true,
          label: "Recibe llamada",
        },
        {
          key: "verificado",
          tdClass: "w-1",
          sortable: true,
          label: "Verificado",
        },
        {
          key: "completado",
          tdClass: "w-1",
          sortable: true,
          label: "Completado",
        },
        {
          key: "fechaReporte",
          tdClass: "w-1",
          sortable: true,
          label: "Fecha reporte",
        },
        {
          key: "puedeReportar",
          tdClass: "w-1",
          sortable: true,
          label: "Puede reportar",
        },
        { key: "botonVerificar", tdClass: "w-1", label: "" },
      ];
    },
    alertItems() {
      console.log("alertItems ");
      const features = this.$store.getters.alerts;
      const items = [];
      if (features != undefined && features.length > 1) {
        for (var i = 0; i < features.length; i++) {
          const date = new Date(features[i].attributes.fechaReporte);
          items.push({
            primerMensaje: this.FormatForHuman(
              features[i].attributes.primerMensaje
            ),
            fechaReporte: this.FormatForHuman(
              date.getDate() +
                "/" +
                (date.getMonth() + 1) +
                "/" +
                date.getFullYear()
            ),
            puedeReportar: this.FormatForHuman(
              features[i].attributes.puedeReportar
            ),
            que: this.FormatForHuman(features[i].attributes.relatoQue),
            quien: this.FormatForHuman(features[i].attributes.relatoQuien),
            como: this.FormatForHuman(features[i].attributes.relatoComo),
            cuando: this.FormatForHuman(features[i].attributes.relatoCuando),
            donde: this.FormatForHuman(features[i].attributes.relatoDonde),
            situacionActual: this.FormatForHuman(
              features[i].attributes.situacionActual
            ),
            recibeLlamada: this.FormatForHuman(
              features[i].attributes.recibeLlamada
            ),
            verificado: this.FormatForHuman(features[i].attributes.verificado),
            completado: this.FormatForHuman(features[i].attributes.completado),
            botonVerificar: "/verify/" + features[i].attributes.idAlerta,
          });
        }
      }
      return items;
    },
  },
  computed: {
    userAccess() {
      if (!this.$store.getters.user || !this.$store.getters.user.role)
        return "public";
      const role = this.$store.getters.user.role;
      if (role === "admin") return "private";
      if (role === "defensor" || role === "analyst") return "sensitive";
      return null;
    },
  },
};
</script>

<style scoped>
#table {
  padding: 0;
  margin: 2px;
  width: 100%;
  height: 100%;
}
</style>
