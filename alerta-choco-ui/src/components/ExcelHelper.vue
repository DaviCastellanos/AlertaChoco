<template>
  <div>
    <export-excel class="btn btn-default" :data="defineItems" worksheet="Worksheet" :name="defineName">
      <b-button> {{ title }} </b-button>
    </export-excel>
  </div>
</template>

<script>
import froze from '../mixins/frozen.js';
import helpers from '@/mixins/helpers.js';
import PublicPolicyOptions from '@/mixins/public-policy-options.js';

export default {
  mixins: [froze, helpers, PublicPolicyOptions],
  props: {
    tableType: String,
    title: String
  },
  computed: {
    defineName() {
      if (this.tableType === 'DDHH') return 'ReportesDDHH.xls';
      if (this.tableType === 'FOLLOWUPS') return 'SeguimientosAReportesDDHH.xls';
      if (this.tableType === 'PATR') return 'ReportesPATR.xls';

      return 'filename.xls';
    },
    defineItems() {
      if (this.tableType === 'DDHH') return this.ddhhItems;
      if (this.tableType === 'PATR') return this.patrItems;
      if (this.tableType === 'FOLLOWUPS') return this.followUpsItems;

      return null;
    },
    followUpsItems() {
      if (!this.$store.getters.followUps) return;
      let items = [];
      let val = JSON.parse(JSON.stringify(this.$store.getters.followUps));
      val.forEach(el => {
        if (el.attributes.tipoSeguimientoEnum) el.attributes.tipoSeguimientoEnum = this.getObjectTexts('opcionesTipoSeguimiento', el.attributes.tipoSeguimientoEnum);
        if (el.attributes.fechaAccionRespuesta) el.attributes.fechaAccionRespuesta = this.FormatAsDate(el.attributes.fechaAccionRespuesta);
        if (el.attributes.descripcionSituacion) el.attributes.descripcionSituacion = this.FormatForHuman(el.attributes.descripcionSituacion);
        if (el.attributes.evolucionSituacion) el.attributes.evolucionSituacion = this.FormatForHuman(el.attributes.evolucionSituacion);
        if (el.attributes.actoresInvolucrados) el.attributes.actoresInvolucrados = this.FormatForHuman(el.attributes.actoresInvolucrados);
        if (el.attributes.accionesMitigacion) el.attributes.accionesMitigacion = this.FormatForHuman(el.attributes.accionesMitigacion);
        if (el.attributes.riesgoPercibido) el.attributes.riesgoPercibido = this.FormatForHuman(el.attributes.riesgoPercibido);
        if (el.attributes.institucionesInformadasEnum) el.attributes.institucionesInformadasEnum = this.getObjectTexts('opcionesInstituciones', el.attributes.institucionesInformadasEnum);
        if (el.attributes.otraInstitucion) el.attributes.otraInstitucion = this.FormatForHuman(el.attributes.otraInstitucion);
        if (el.attributes.accionSeguimiento) el.attributes.accionSeguimiento = this.FormatForHuman(el.attributes.accionSeguimiento);
        if (el.attributes.otraAccionSeguimiento) el.attributes.otraAccionSeguimiento = this.FormatForHuman(el.attributes.otraAccionSeguimiento);
        if (el.attributes.descripcionAccion) el.attributes.descripcionAccion = this.FormatForHuman(el.attributes.descripcionAccion);
        if (el.attributes.entidadesAccionEnum) el.attributes.entidadesAccionEnum = this.getObjectTexts('opcionesEntidades', el.attributes.entidadesAccionEnum);
        if (el.attributes.otraEntidad) el.attributes.otraEntidad = this.FormatForHuman(el.attributes.otraEntidad);
        if (el.attributes.dependenciaEntidad) el.attributes.dependenciaEntidad = this.FormatForHuman(el.attributes.dependenciaEntidad);
        if (el.attributes.resultadoEsperado) el.attributes.resultadoEsperado = this.FormatForHuman(el.attributes.resultadoEsperado);
        if (el.attributes.tiempoEsperado) el.attributes.tiempoEsperado = this.FormatForHuman(el.attributes.tiempoEsperado);
        if (el.attributes.quienPresentaAccion) el.attributes.quienPresentaAccion = this.FormatForHuman(el.attributes.quienPresentaAccion);
        if (el.attributes.personaContacto) el.attributes.personaContacto = this.FormatForHuman(el.attributes.personaContacto);
        if (el.attributes.telefonoContacto) el.attributes.telefonoContacto = this.FormatForHuman(el.attributes.telefonoContacto);
        if (el.attributes.emailContacto) el.attributes.emailContacto = this.FormatForHuman(el.attributes.emailContacto);
        if (el.attributes.trato) el.attributes.trato = this.FormatForHuman(el.attributes.trato);
        if (el.attributes.tipoRespuesta) el.attributes.tipoRespuesta = this.FormatForHuman(el.attributes.tipoRespuesta);
        if (el.attributes.otraRespuesta) el.attributes.otraRespuesta = this.FormatForHuman(el.attributes.otraRespuesta);
        if (el.attributes.trato) el.attributes.trato = this.FormatForHuman(el.attributes.trato);
        if (el.attributes.entidadesRespuestaEnum) el.attributes.entidadesRespuestaEnum = this.getObjectTexts('opcionesEntidades', el.attributes.entidadesRespuestaEnum);
        if (el.attributes.otraEntidadRespuesta) el.attributes.otraEntidadRespuesta = this.FormatForHuman(el.attributes.otraEntidadRespuesta);
        if (el.attributes.dependenciaEntidadRespuesta) el.attributes.dependenciaEntidadRespuesta = this.FormatForHuman(el.attributes.dependenciaEntidadRespuesta);
        if (el.attributes.descripcionRespuesta) el.attributes.descripcionRespuesta = this.FormatForHuman(el.attributes.descripcionRespuesta);
        if (el.attributes.mitigaRiesgo) el.attributes.mitigaRiesgo = this.FormatForHuman(el.attributes.mitigaRiesgo);
        if (el.attributes.protegeDefensores) el.attributes.protegeDefensores = this.FormatForHuman(el.attributes.protegeDefensores);
        if (el.attributes.esperaOtraRespuesta) el.attributes.esperaOtraRespuesta = this.FormatForHuman(el.attributes.esperaOtraRespuesta);
        if (el.attributes.personaContactoInstitucion) el.attributes.personaContactoInstitucion = this.FormatForHuman(el.attributes.personaContactoInstitucion);
        if (el.attributes.telefonoContactoInstitucion) el.attributes.telefonoContactoInstitucion = this.FormatForHuman(el.attributes.telefonoContactoInstitucion);
        if (el.attributes.emailContactoInstitucion) el.attributes.emailContactoInstitucion = this.FormatForHuman(el.attributes.emailContactoInstitucion);
        if (el.attributes.quienRecibeRespuesta) el.attributes.quienRecibeRespuesta = this.FormatForHuman(el.attributes.quienRecibeRespuesta);
        if (el.attributes.personaRecibeRespuesta) el.attributes.personaRecibeRespuesta = this.FormatForHuman(el.attributes.personaRecibeRespuesta);
        if (el.attributes.telefonoContactoRespuesta) el.attributes.telefonoContactoRespuesta = this.FormatForHuman(el.attributes.telefonoContactoRespuesta);
        if (el.attributes.emailContactoRespuesta) el.attributes.emailContactoRespuesta = this.FormatForHuman(el.attributes.emailContactoRespuesta);
        if (el.attributes.tratoRespuesta) el.attributes.tratoRespuesta = this.FormatForHuman(el.attributes.tratoRespuesta);
        items.push(el.attributes);
      });
      //console.log('alert items ', items);
      return items;
    },
    patrItems() {
      if (!this.$store.getters.policies) return;
      //console.log('PATR ITEMS');
      let items = [];
      let val = JSON.parse(JSON.stringify(this.$store.getters.policies));
      val.forEach(el => {
        el.attributes.iniciativa = this.getPolicyTexts(this.getObjectByMunicipio(el.attributes.municipio), el.attributes.codigoIniciativa);
        if (el.attributes.tipoReporte) el.attributes.tipoReporte = this.FormatForHuman(el.attributes.tipoReporte);
        if (el.attributes.subregion) el.attributes.subregion = this.FormatForHuman(el.attributes.subregion);
        if (el.attributes.pilar) el.attributes.pilar = this.FormatForHuman(el.attributes.pilar);
        if (el.attributes.municipio) el.attributes.municipio = this.FormatForHuman(el.attributes.municipio);
        if (el.attributes.fechaOcurrencia) el.attributes.fechaOcurrencia = this.FormatAsDate(el.attributes.fechaOcurrencia);
        if (el.attributes.descripcionAccion) el.attributes.descripcionAccion = this.FormatForHuman(el.attributes.descripcionAccion);
        if (el.attributes.entidadesEstadoEnum1) el.attributes.entidadesEstadoEnum1 = this.getObjectTexts('opcionesInstituciones', el.attributes.entidadesEstadoEnum1);
        if (el.attributes.otraEntidad1) el.attributes.otraEntidad1 = this.FormatForHuman(el.attributes.otraEntidad1);
        if (el.attributes.dependenciaIncidencia) el.attributes.dependenciaIncidencia = this.FormatForHuman(el.attributes.dependenciaIncidencia);
        if (el.attributes.resultadoIncidencia) el.attributes.resultadoIncidencia = this.FormatForHuman(el.attributes.resultadoIncidencia);
        if (el.attributes.tiempoIncidencia) el.attributes.tiempoIncidencia = this.FormatForHuman(el.attributes.tiempoIncidencia);
        if (el.attributes.incidenciaQuien) el.attributes.incidenciaQuien = this.FormatForHuman(el.attributes.incidenciaQuien);
        if (el.attributes.incidenciaContacto) el.attributes.incidenciaContacto = this.FormatForHuman(el.attributes.incidenciaContacto);
        if (el.attributes.incidenciaTelefono) el.attributes.incidenciaTelefono = this.FormatForHuman(el.attributes.incidenciaTelefono);
        if (el.attributes.incidenciaCorreo) el.attributes.incidenciaCorreo = this.FormatForHuman(el.attributes.incidenciaCorreo);
        if (el.attributes.tipoImplementacion) el.attributes.tipoImplementacion = this.FormatForHuman(el.attributes.tipoImplementacion);
        if (el.attributes.otraImplementacion) el.attributes.otraImplementacion = this.FormatForHuman(el.attributes.otraImplementacion);
        if (el.attributes.entidadesEstadoEnum2) el.attributes.entidadesEstadoEnum2 = this.getObjectTexts('opcionesInstituciones', el.attributes.entidadesEstadoEnum2);
        if (el.attributes.entidadesOtra2) el.attributes.entidadesOtra2 = this.FormatForHuman(el.attributes.entidadesOtra2);
        if (el.attributes.dependenciaImplementacion) el.attributes.dependenciaImplementacion = this.FormatForHuman(el.attributes.dependenciaImplementacion);
        if (el.attributes.describaImplementacion) el.attributes.describaImplementacion = this.FormatForHuman(el.attributes.describaImplementacion);
        if (el.attributes.completado1) el.attributes.completado1 = this.FormatForHuman(el.attributes.completado1);
        if (el.attributes.avanza1) el.attributes.avanza1 = this.FormatForHuman(el.attributes.avanza1);
        if (el.attributes.retrasa1) el.attributes.retrasa1 = this.FormatForHuman(el.attributes.retrasa1);
        if (el.attributes.accionNecesaria) el.attributes.accionNecesaria = this.FormatForHuman(el.attributes.accionNecesaria);
        if (el.attributes.implementacionContacto) el.attributes.implementacionContacto = this.FormatForHuman(el.attributes.implementacionContacto);
        if (el.attributes.implementacionTelefono) el.attributes.implementacionTelefono = this.FormatForHuman(el.attributes.implementacionTelefono);
        if (el.attributes.implementacionCorreo) el.attributes.implementacionCorreo = this.FormatForHuman(el.attributes.implementacionCorreo);
        if (el.attributes.tipoImplementacion2) el.attributes.tipoImplementacion2 = this.FormatForHuman(el.attributes.tipoImplementacion2);
        if (el.attributes.tipoImplementacionOtra2) el.attributes.tipoImplementacionOtra2 = this.FormatForHuman(el.attributes.tipoImplementacionOtra2);
        if (el.attributes.organizacion) el.attributes.organizacion = this.FormatForHuman(el.attributes.organizacion);
        if (el.attributes.agencia) el.attributes.agencia = this.FormatForHuman(el.attributes.agencia);
        if (el.attributes.entidadesEstado) el.attributes.entidadesEstado = this.getObjectTexts('opcionesInstituciones', el.attributes.entidadesEstado);
        if (el.attributes.describaImplementacion2) el.attributes.describaImplementacion2 = this.FormatForHuman(el.attributes.describaImplementacion2);
        if (el.attributes.completado2) el.attributes.completado2 = this.FormatForHuman(el.attributes.completado2);
        if (el.attributes.avanza2) el.attributes.avanza2 = this.FormatForHuman(el.attributes.avanza2);
        if (el.attributes.retrasa2) el.attributes.retrasa2 = this.FormatForHuman(el.attributes.retrasa2);
        if (el.attributes.accionNecesaria2) el.attributes.accionNecesaria2 = this.FormatForHuman(el.attributes.accionNecesaria2);
        if (el.attributes.tipoBloqueo) el.attributes.tipoBloqueo = this.FormatForHuman(el.attributes.tipoBloqueo);
        if (el.attributes.entidadesEstadoEnum3) el.attributes.entidadesEstadoEnum3 = this.getObjectTexts('opcionesInstituciones', el.attributes.entidadesEstadoEnum3);
        if (el.attributes.entidadOtra3) el.attributes.entidadOtra3 = this.FormatForHuman(el.attributes.entidadOtra3);
        if (el.attributes.dependenciaBloqueo) el.attributes.dependenciaBloqueo = this.FormatForHuman(el.attributes.dependenciaBloqueo);
        if (el.attributes.descripcionBloqueo) el.attributes.descripcionBloqueo = this.FormatForHuman(el.attributes.descripcionBloqueo);
        if (el.attributes.efectoBloqueo) el.attributes.efectoBloqueo = this.FormatForHuman(el.attributes.efectoBloqueo);
        if (el.attributes.impactoBloqueo) el.attributes.impactoBloqueo = this.FormatForHuman(el.attributes.impactoBloqueo);
        if (el.attributes.accionesBloqueo) el.attributes.accionesBloqueo = this.FormatForHuman(el.attributes.accionesBloqueo);
        if (el.attributes.institucionesBloqueo) el.attributes.institucionesBloqueo = this.FormatForHuman(el.attributes.institucionesBloqueo);
        if (el.attributes.municipioOtro) el.attributes.municipioOtro = this.FormatForHuman(el.attributes.municipioOtro);
        if (el.attributes.iniciativaOtra) el.attributes.iniciativaOtra = this.FormatForHuman(el.attributes.iniciativaOtra);
        if (el.attributes.tiempoUnidad) el.attributes.tiempoUnidad = this.FormatForHuman(el.attributes.tiempoUnidad);
        items.push(el.attributes);
      });
      //console.log('alert items ', items);
      return items;
    },
    ddhhItems() {
      if (this.$store.getters.alerts.length <= 1) return;
      let items = [];
      let val = JSON.parse(JSON.stringify(this.$store.getters.alerts));
      val.forEach(el => {
        if (el.attributes.fechaReporte) el.attributes.fechaReporte = this.FormatAsDate(el.attributes.fechaReporte);
        if (el.attributes.verificado) el.attributes.verificado = this.FormatForHuman(el.attributes.verificado);
        if (el.attributes.departamentoOcurrencia) el.attributes.departamentoOcurrencia = this.FormatForHuman(el.attributes.departamentoOcurrencia);
        if (el.attributes.municipioOcurrencia) el.attributes.municipioOcurrencia = this.FormatForHuman(el.attributes.municipioOcurrencia);
        if (el.attributes.entornoOcurrencia) el.attributes.entornoOcurrencia = this.FormatForHuman(el.attributes.entornoOcurrencia);
        if (el.attributes.tipoEvento) el.attributes.tipoEvento = this.FormatForHuman(el.attributes.tipoEvento);
        if (el.attributes.categoriaEvento) el.attributes.categoriaEvento = this.FormatForHuman(el.attributes.categoriaEvento);
        if (el.attributes.subcategoriaEventoEnum) el.attributes.subcategoriaEventoEnum = this.getObjectTexts('opcionesSubcategoria', el.attributes.subcategoriaEventoEnum);
        if (el.attributes.subcategoriaEventoOtra) el.attributes.subcategoriaEventoOtra = this.FormatForHuman(el.attributes.subcategoriaEventoOtra);
        if (el.attributes.etniaVictima) el.attributes.etniaVictima = this.FormatForHuman(el.attributes.etniaVictima);
        if (el.attributes.rolVictimaEnum) el.attributes.rolVictimaEnum = this.getObjectTexts('opcionesRol', el.attributes.rolVictimaEnum);
        if (el.attributes.rolVictimaOtro) el.attributes.rolVictimaOtro = this.FormatForHuman(el.attributes.rolVictimaOtro);
        if (el.attributes.discapacidadEnum) el.attributes.discapacidadEnum = this.getObjectTexts('opcionesDiscapacidad', el.attributes.discapacidadEnum);
        if (el.attributes.sexo) el.attributes.sexo = this.FormatForHuman(el.attributes.sexo);
        if (el.attributes.identidadGenero) el.attributes.identidadGenero = this.FormatForHuman(el.attributes.identidadGenero);
        if (el.attributes.medidasProteccionExistentes) el.attributes.medidasProteccionExistentes = this.FormatForHuman(el.attributes.medidasProteccionExistentes);
        if (el.attributes.otrasVictimas) el.attributes.otrasVictimas = this.FormatForHuman(el.attributes.otrasVictimas);
        if (el.attributes.otrasVictimasNombres) el.attributes.otrasVictimasNombres = this.FormatForHuman(el.attributes.otrasVictimasNombres);
        if (el.attributes.relacionVictima) el.attributes.relacionVictima = this.FormatForHuman(el.attributes.relacionVictima);
        if (el.attributes.tipoEvento) el.attributes.tipoEvento = this.FormatForHuman(el.attributes.tipoEvento);
        if (el.attributes.tipoResponsableEnum) el.attributes.tipoResponsableEnum = this.getObjectTexts('opcionesResponsables', el.attributes.tipoResponsableEnum);
        if (el.attributes.afectadosEnum) el.attributes.afectadosEnum = this.getObjectTexts('opcionesAfectados', el.attributes.afectadosEnum);
        if (el.attributes.etniaAfectadosEnum) el.attributes.etniaAfectadosEnum = this.getObjectTexts('opcionesEtniaAfectados', el.attributes.etniaAfectadosEnum);
        if (el.attributes.derechosDDHEnum) el.attributes.derechosDDHEnum = this.getObjectTexts('opcionesDerechos', el.attributes.derechosDDHEnum);
        if (el.attributes.primerMensaje) el.attributes.primerMensaje = this.FormatForHuman(el.attributes.primerMensaje, true);
        if (el.attributes.puedeReportar) el.attributes.puedeReportar = this.FormatForHuman(el.attributes.puedeReportar, true);
        if (el.attributes.relatoQue) el.attributes.relatoQue = this.FormatForHuman(el.attributes.relatoQue, true);
        if (el.attributes.relatoQuien) el.attributes.relatoQuien = this.FormatForHuman(el.attributes.relatoQuien, true);
        if (el.attributes.relatoComo) el.attributes.relatoComo = this.FormatForHuman(el.attributes.relatoComo, true);
        if (el.attributes.relatoCuando) el.attributes.relatoCuando = this.FormatForHuman(el.attributes.relatoCuando, true);
        if (el.attributes.relatoDonde) el.attributes.relatoDonde = this.FormatForHuman(el.attributes.relatoDonde, true);
        if (el.attributes.situacionActual) el.attributes.situacionActual = this.FormatForHuman(el.attributes.situacionActual, true);
        if (el.attributes.recibeLlamada) el.attributes.recibeLlamada = this.FormatForHuman(el.attributes.recibeLlamada, true);
        if (el.attributes.fechaValidacion) el.attributes.fechaValidacion = this.FormatAsDate(el.attributes.fechaValidacion);
        if (el.attributes.territorioColectivo) el.attributes.territorioColectivo = this.FormatForHuman(el.attributes.territorioColectivo);
        if (el.attributes.barrio) el.attributes.barrio = this.FormatForHuman(el.attributes.barrio);
        if (el.attributes.presuntoResponsable) el.attributes.presuntoResponsable = this.FormatForHuman(el.attributes.presuntoResponsable);
        if (el.attributes.situacionAsociada) el.attributes.situacionAsociada = this.FormatForHuman(el.attributes.situacionAsociada);
        if (el.attributes.accionesMitigacion) el.attributes.accionesMitigacion = this.FormatForHuman(el.attributes.accionesMitigacion);
        if (el.attributes.riesgoPercibido) el.attributes.riesgoPercibido = this.FormatForHuman(el.attributes.riesgoPercibido);
        if (el.attributes.institucionesEnum) el.attributes.institucionesEnum = this.getObjectTexts('opcionesInstituciones', el.attributes.institucionesEnum);
        if (el.attributes.institucionOtra) el.attributes.institucionOtra = this.FormatForHuman(el.attributes.institucionOtra);
        if (el.attributes.telefono) el.attributes.telefono = el.attributes.telefono.replace('whatsapp:', '');
        if (el.attributes.nombreVictima) el.attributes.nombreVictima = this.FormatForHuman(el.attributes.nombreVictima);
        if (el.attributes.perfilVictima) el.attributes.perfilVictima = this.FormatForHuman(el.attributes.perfilVictima);
        if (el.attributes.fechaOcurrencia) el.attributes.fechaOcurrencia = this.FormatAsDate(el.attributes.fechaOcurrencia);
        if (el.attributes.completado) el.attributes.completado = this.FormatForHuman(el.attributes.completado);

        items.push(el.attributes);
      });
      //console.log('alert items ', items);
      return items;
    }
    //   csvExport() {
    //   const arrData = this.alertsItems();
    //   let csvContent = 'data:text/csv;charset=utf-8,';
    //   csvContent += [Object.keys(arrData[0]).join(';'), ...arrData.map(item => Object.values(item).join(';'))].join('\n').replace(/(^\[)|(\]$)/gm, '');

    //   const data = encodeURI(csvContent);
    //   const link = document.createElement('a');
    //   link.setAttribute('href', data);
    //   link.setAttribute('download', 'ALERTAS_RED_ANANSI.csv');
    //   link.click();
    // },
  }
};
</script>

<style scoped>
#table {
  padding: 2%;
  width: 100%;
  height: 100%;
}
</style>
