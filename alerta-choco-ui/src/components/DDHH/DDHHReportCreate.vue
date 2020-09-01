<template>
  <b-container fluid id="form">
    <h4>NUEVO REPORTE DDHH</h4>
    <br />
    <div class="mt-3">
      <h4>Alerta</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Id Alerta: {{ this.idAlerta }}</h6>
        </div>

        <div class="mt-3">
          <h6>Código ANANSI:</h6>
          <b-form-input v-model="codigoAnansi" :state="lengthState(codigoAnansi)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Teléfono:</h6>
          <b-form-input v-model="telefono" :state="lengthState(telefono)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Cómo pasó:</h6>
          <b-form-input v-model="relatoComo" :state="lengthState(relatoComo)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Qué pasó:</h6>
          <b-form-input v-model="relatoQue" :state="lengthState(relatoQue)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Dónde pasó:</h6>
          <b-form-input v-model="relatoDonde" :state="lengthState(relatoDonde)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>A quién le pasó:</h6>
          <b-form-input v-model="relatoQuien" :state="lengthState(relatoQuien)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Situación actual:</h6>
          <b-form-input v-model="situacionActual" :state="lengthState(situacionActual)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Tiempo</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3 mb-3">
          <h6>Fecha de Reporte:</h6>
          <b-form-datepicker id="datepicker" v-model="fechaReporte" :state="lengthState(fechaReporte)" :placeholder="FormatAsDate(this.fechaReporte)"></b-form-datepicker>
        </div>

        <div class="mt-3">
          <h6>Fecha de ocurrencia:</h6>
          <b-form-datepicker id="datepicker" v-model="fechaOcurrencia" :state="lengthState(this.fechaOcurrencia)" :placeholder="FormatAsDate(this.fechaOcurrencia)"></b-form-datepicker>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Lugar</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Departamento ocurrencia:</h6>
          <b-form-input v-model="departamentoOcurrencia" :state="lengthState(departamentoOcurrencia)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Municipio ocurrencia:</h6>
          <b-form-input v-model="municipioOcurrencia" :state="lengthState(municipioOcurrencia)" aria-describedby="input-live-feedback" trim lazy></b-form-input>
        </div>

        <div class="mt-2 ml-2" v-if="this.arcgisAddress">
          <span class="font-italic">{{ this.arcgisAddress.address }}.</span> ¿Guardar coordenadas? <input class="lg" type="checkbox" v-model="overrideCoordinates" />
        </div>

        <div class="mt-3">
          <h6>Entorno de ocurrencia:</h6>
          <b-form-select v-model="entornoOcurrencia" :options="this.opcionesEntorno" :state="lengthState(entornoOcurrencia)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Territorio colectivo:</h6>
          <b-form-input v-model="territorioColectivo" :state="lengthState(territorioColectivo)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Barrio:</h6>
          <b-form-input v-model="barrio" :state="lengthState(barrio)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Evento</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Subcategoría:</h6>
          <b-form-select v-model="subcategoriaEventoEnum" :options="this.opcionesSubcategoria" multiple :select-size="10" :state="lengthState(subcategoriaEventoEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra subcategoría? ¿cuál?:</h6>
          <b-form-input v-model="subcategoriaEventoOtra" aria-describedby="input-live-feedback" placeholder="opcional" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Categoría:</h6>
          <b-form-select v-model="categoriaEvento" :options="this.opcionesCategoria" :state="lengthState(categoriaEvento)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Tipo de evento:</h6>
          <b-form-select v-model="tipoEvento" :options="this.opcionesTipo" :state="lengthState(tipoEvento)" :placeholder="this.tipoEvento"></b-form-select>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Víctimas</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Nombre Víctima:</h6>
          <b-form-input v-model="nombreVictima" :state="lengthState(nombreVictima)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Edad Víctima:</h6>
          <b-form-input v-model="edadVictima" :state="lengthState(edadVictima)" aria-describedby="input-live-feedback" trim type="number" min="0"></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Tiene discapacidad?:</h6>
          <b-form-select v-model="discapacidadEnum" :options="this.opcionesDiscapacidad" multiple :select-size="3" :state="lengthState(discapacidadEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Sexo:</h6>
          <b-form-select v-model="sexo" :options="this.opcionesSexo" :state="lengthState(sexo)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Perfil de la víctima:</h6>
          <b-form-input v-model="perfilVictima" :state="lengthState(perfilVictima)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Otras víctimas:</h6>
          <b-form-select v-model="otrasVictimas" :options="this.opcionesVictimas" :state="lengthState(otrasVictimas)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Relación con la víctima:</h6>
          <b-form-input v-model="relacionVictima" :state="lengthState(relacionVictima)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Pertenencia étnica:</h6>
          <b-form-select v-model="etniaVictima" :options="this.opcionesEtnia" :state="lengthState(etniaVictima)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Rol de víctima:</h6>
          <b-form-select v-model="rolVictimaEnum" :options="this.opcionesRol" multiple :select-size="3" :state="lengthState(rolVictimaEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otro rol? ¿cuál?:</h6>
          <b-form-input v-model="rolVictimaOtro" placeholder="Opcional" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Identidad de género:</h6>
          <b-form-select v-model="identidadGenero" :options="this.opcionesIdentidad" :state="lengthState(identidadGenero)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Medidas de protección existentes:</h6>
          <b-form-select v-model="medidasProteccionExistentes" :options="this.opcionesMedidas" :state="lengthState(medidasProteccionExistentes)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Total víctimas:</h6>
          <b-form-input v-model="totalVictimas" :state="lengthState(totalVictimas)" aria-describedby="input-live-feedback" trim type="number" min="0"></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Nombres de otras víctimas:</h6>
          <b-form-input v-model="otrasVictimasNombres" :state="lengthState(otrasVictimasNombres)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Afectación</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Tipo de sujeto afectado:</h6>
          <b-form-select v-model="afectadosEnum" :options="this.opcionesAfectados" multiple :select-size="3" :state="lengthState(afectadosEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>No. de familias afectadas:</h6>
          <b-form-input v-model="familias" :state="lengthState(familias)" aria-describedby="input-live-feedback" trim type="number" min="0"></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Pertenencia étnica de afectados:</h6>
          <b-form-select v-model="etniaAfectadosEnum" :options="this.opcionesEtniaAfectados" multiple :select-size="3" :state="lengthState(etniaAfectadosEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>No. de personas afectadas:</h6>
          <b-form-input v-model="numeroPersonas" :state="lengthState(numeroPersonas)" aria-describedby="input-live-feedback" trim type="number" min="0"></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Derechos límitados:</h6>
          <b-form-select v-model="derechosDDHEnum" :options="this.opcionesDerechos" multiple :select-size="10" :state="lengthState(derechosDDHEnum)"></b-form-select>
        </div>
      </b-col>
    </b-row>
    <hr />

    <div class="mt-3">
      <h4>Agresión</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Tipo de presunto responsable:</h6>
          <b-form-select v-model="tipoResponsableEnum" :options="this.opcionesResponsables" multiple :select-size="5" :state="lengthState(tipoResponsableEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Presunto responsable:</h6>
          <b-form-input v-model="presuntoResponsable" :state="lengthState(presuntoResponsable)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Situación asociada:</h6>
          <b-form-input v-model="situacionAsociada" :state="lengthState(situacionAsociada)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>
      </b-col>
    </b-row>
    <hr />

    <div class="mt-3">
      <h4>Capacidad</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Instituciones Informadas:</h6>
          <b-form-select v-model="institucionesEnum" :options="this.opcionesInstituciones" multiple :select-size="10" :state="lengthState(institucionesEnum)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra institución? ¿cuál?</h6>
          <b-form-input v-model="institucionOtra" aria-describedby="input-live-feedback" placeholder="Opcional" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Acciones de mitigación:</h6>
          <b-form-input v-model="accionesMitigacion" :state="lengthState(accionesMitigacion)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Riesgo percibido:</h6>
          <b-form-input v-model="riesgoPercibido" :state="lengthState(riesgoPercibido)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback id="input-live-feedback">
          Máximo 256 carácteres
        </b-form-invalid-feedback>
      </b-col>
    </b-row>
    <b-button v-if="userAccessIsPrivate" @click="this.save" size="lg" class="text-light mt-5 mb-3" variant="warning" block :disabled="requiredFieldsCompleted()">Crear nuevo reporte de DDHH</b-button>
  </b-container>
</template>
<script>
import { AlertsService } from '@/services';
import frozen from '@/mixins/frozen.js';
import coordinates from '@/mixins/coordinates.js';
import { v4 as uuidv4 } from 'uuid';
import GeocodeService from '@/services/geocode-service.js';
import helpers from '@/mixins/helpers.js';

export default {
  mixins: [frozen, coordinates, helpers],
  data() {
    return {
      idAlerta: '',
      codigoAnansi: '',
      telefono: '',
      relatoComo: '',
      situacionActual: '',
      relatoQue: '',
      relatoDonde: '',
      relatoQuien: '',
      fechaOcurrencia: '',
      fechaReporte: '',
      departamentoOcurrencia: '',
      municipioOcurrencia: '',
      entornoOcurrencia: '',
      territorioColectivo: '',
      barrio: '',
      tipoEvento: '',
      categoriaEvento: '',
      subcategoriaEventoEnum: [],
      subcategoriaEventoOtra: '',
      nombreVictima: '',
      edadVictima: '',
      etniaVictima: '',
      rolVictimaEnum: [],
      rolVictimaOtro: '',
      discapacidadEnum: [],
      sexo: '',
      identidadGenero: '',
      perfilVictima: '',
      medidasProteccionExistentes: '',
      otrasVictimas: '',
      totalVictimas: '',
      otrasVictimasNombres: '',
      relacionVictima: '',
      afectadosEnum: [],
      familias: '',
      numeroPersonas: '',
      etniaAfectadosEnum: [],
      derechosDDHEnum: [],
      tipoResponsableEnum: [],
      presuntoResponsable: '',
      situacionAsociada: '',
      accionesMitigacion: '',
      riesgoPercibido: '',
      institucionesEnum: [],
      institucionOtra: '',
      arcgisAddress: '',
      overrideCoordinates: false
    };
  },
  watch: {
    municipioOcurrencia: function(val) {
      this.lookForCoordinates(val);
    }
  },
  methods: {
    requiredFieldsCompleted() {
      if (
        !this.codigoAnansi ||
        !this.telefono ||
        !this.relatoComo ||
        !this.situacionActual ||
        !this.relatoQue ||
        !this.relatoDonde ||
        !this.relatoQuien ||
        !this.fechaOcurrencia ||
        !this.fechaReporte ||
        !this.departamentoOcurrencia ||
        !this.municipioOcurrencia ||
        !this.entornoOcurrencia ||
        !this.territorioColectivo ||
        !this.barrio ||
        !this.tipoEvento ||
        !this.categoriaEvento ||
        !this.subcategoriaEventoEnum ||
        !this.nombreVictima ||
        !this.edadVictima ||
        !this.etniaVictima ||
        !this.rolVictimaEnum ||
        !this.discapacidadEnum ||
        !this.sexo ||
        !this.identidadGenero ||
        !this.perfilVictima ||
        !this.medidasProteccionExistentes ||
        !this.totalVictimas ||
        !this.relacionVictima ||
        !this.afectadosEnum ||
        !this.familias ||
        !this.numeroPersonas ||
        !this.etniaAfectadosEnum ||
        !this.derechosDDHEnum ||
        !this.tipoResponsableEnum ||
        !this.presuntoResponsable ||
        !this.situacionAsociada ||
        !this.accionesMitigacion ||
        !this.riesgoPercibido ||
        !this.institucionesEnum
      )
        return true;

      return false;
    },
    validateData(data, obj) {
      if (obj) {
        if (!data) return [];
        return data.split(',');
      }

      if (!data) return '';

      return this.FormatForm(data);
    },
    lengthState(str) {
      if (str.length > 256) return false;

      if (str.length <= 0) return false;

      return true;
    },
    wrapAlert() {
      let alert = '[{';

      if (this.overrideCoordinates) alert += `"geometry" : {"x": ${this.arcgisAddress.x},"y": ${this.arcgisAddress.y},"spatialReference": {"wkid": 4326}},`;
      else alert += '"geometry" : {"x": -74.063644,"y": 4.624335,"spatialReference": {"wkid": 4326}},';

      alert += '"attributes" : {';
      alert += '"verificado":"True",';
      alert += '"idAlerta":"' + this.FormatForDB(this.idAlerta) + '",';
      alert += '"codigoAnansi":"' + this.FormatForDB(this.codigoAnansi) + '",';
      alert += '"telefono":"' + this.FormatForDB(this.telefono) + '",';
      alert += '"relatoComo":"' + this.FormatForDB(this.relatoComo) + '",';
      alert += '"relatoDonde":"' + this.FormatForDB(this.relatoDonde) + '",';
      alert += '"relatoQue":"' + this.FormatForDB(this.relatoQue) + '",';
      alert += '"relatoQuien":"' + this.FormatForDB(this.relatoQuien) + '",';
      alert += '"situacionActual":"' + this.FormatForDB(this.situacionActual) + '",';
      alert += '"fechaReporte":"' + this.FormatDateForDB(this.fechaReporte) + '",';
      alert += '"relatoCuando":"N/A",';
      alert += '"puedeReportar":"N/A",';
      alert += '"recibeLlamada":"N/A",';
      alert += '"primerMensaje":"N/A",';
      alert += '"completado":"True",';
      alert += '"fechaOcurrencia":"' + this.FormatDateForDB(this.fechaOcurrencia) + '",';
      alert += '"fechaValidacion":"' + this.FormatDateForDB(this.fechaReporte) + '",';
      alert += '"departamentoOcurrencia":"' + this.FormatForDB(this.departamentoOcurrencia) + '",';
      alert += '"municipioOcurrencia":"' + this.FormatForDB(this.municipioOcurrencia) + '",';
      alert += '"entornoOcurrencia":"' + this.FormatForDB(this.entornoOcurrencia) + '",';
      alert += '"territorioColectivo":"' + this.FormatForDB(this.territorioColectivo) + '",';
      alert += '"barrio":"' + this.FormatForDB(this.barrio) + '",';
      alert += '"tipoEvento":"' + this.FormatForDB(this.tipoEvento) + '",';
      alert += '"categoriaEvento":"' + this.FormatForDB(this.categoriaEvento) + '",';
      alert += '"subcategoriaEventoEnum":"' + this.FormatForDB(this.subcategoriaEventoEnum) + '",';
      alert += '"subcategoriaEventoOtra":"' + this.FormatForDB(this.subcategoriaEventoOtra) + '",';
      alert += '"nombreVictima":"' + this.FormatForDB(this.nombreVictima) + '",';
      alert += '"edadVictima":"' + this.FormatForDB(this.edadVictima) + '",';
      alert += '"etniaVictima":"' + this.FormatForDB(this.etniaVictima) + '",';
      alert += '"rolVictimaEnum":"' + this.FormatForDB(this.rolVictimaEnum) + '",';
      alert += '"rolVictimaOtro":"' + this.FormatForDB(this.rolVictimaOtro) + '",';
      alert += '"discapacidadEnum":"' + this.FormatForDB(this.discapacidadEnum) + '",';
      alert += '"sexo":"' + this.FormatForDB(this.sexo) + '",';
      alert += '"identidadGenero":"' + this.FormatForDB(this.identidadGenero) + '",';
      alert += '"perfilVictima":"' + this.FormatForDB(this.perfilVictima) + '",';
      alert += '"medidasProteccionExistentes":"' + this.FormatForDB(this.medidasProteccionExistentes) + '",';
      alert += '"otrasVictimas":"' + this.FormatForDB(this.otrasVictimas) + '",';
      alert += '"totalVictimas":"' + this.FormatForDB(this.totalVictimas) + '",';
      alert += '"otrasVictimasNombres":"' + this.FormatForDB(this.otrasVictimasNombres) + '",';
      alert += '"relacionVictima":"' + this.FormatForDB(this.relacionVictima) + '",';
      alert += '"afectadosEnum":"' + this.FormatForDB(this.afectadosEnum) + '",';
      alert += '"familias":"' + this.FormatForDB(this.familias) + '",';
      alert += '"numeroPersonas":"' + this.FormatForDB(this.numeroPersonas) + '",';
      alert += '"etniaAfectadosEnum":"' + this.FormatForDB(this.etniaAfectadosEnum) + '",';
      alert += '"derechosDDHEnum":"' + this.FormatForDB(this.derechosDDHEnum) + '",';
      alert += '"tipoResponsableEnum":"' + this.FormatForDB(this.tipoResponsableEnum) + '",';
      alert += '"presuntoResponsable":"' + this.FormatForDB(this.presuntoResponsable) + '",';
      alert += '"situacionAsociada":"' + this.FormatForDB(this.situacionAsociada) + '",';
      alert += '"accionesMitigacion":"' + this.FormatForDB(this.accionesMitigacion) + '",';
      alert += '"riesgoPercibido":"' + this.FormatForDB(this.riesgoPercibido) + '",';
      alert += '"institucionesEnum":"' + this.FormatForDB(this.institucionesEnum) + '",';
      alert += '"institucionOtra":"' + this.FormatForDB(this.institucionOtra) + '"';
      alert += '}}]';

      //console.log(alert);
      return alert;
    },
    async save() {
      const response = await AlertsService.saveAlert(this.wrapAlert());
      //console.log(response);
      if (response.addResults[0].success) {
        this.$store.commit('SET_UPDATE_NEEDED', true);
        this.$router.push({ path: '/' });
      } else {
        this.$store.commit('SET_APP_ERROR', response.addResults[0].error.description);
      }
    },
    async lookForCoordinates(mun) {
      //console.log('LookForCoordinates of ' + mun);
      if (this.geocodeBusy) return;

      this.geocodeBusy = true;
      const response = await GeocodeService.getCoordinates(this.$store.getters.arcgisToken, mun);
      //console.log('Coordinates ', response);

      if (response && response.locations[0] && response.locations[0].address) {
        this.arcgisAddress = { address: response.locations[0].address, x: response.locations[0].location.x, y: response.locations[0].location.y };
      }

      this.geocodeBusy = false;
    }
  },
  created() {
    this.idAlerta = uuidv4();
  }
};
</script>

<style>
#form {
  margin: 0;
  padding: 5%;
  height: 100%;
  width: 100%;
}
</style>
