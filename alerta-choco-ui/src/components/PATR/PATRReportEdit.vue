<template>
  <b-container fluid id="reporte">
    <h4>EDITAR REPORTE PATR</h4>
    <br />

    <div class="mt-3">
      <h4>General</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Tipo de reporte: {{ FormatForm(this.tipoReporte) }}</h6>
          <b-form-select v-model="tipoReporte" :options="this.opcionesReporte" :state="lengthState(tipoReporte)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Subregion: {{ FormatForm(this.subregion) }}</h6>
          <b-form-select v-model="subregion" :options="this.opcionesSubregion" :state="lengthState(subregion)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Pilar: {{ FormatForm(this.pilar) }}</h6>
          <b-form-select v-model="pilar" :options="this.opcionesPilar" :state="lengthState(pilar)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Municipio: {{ FormatForm(this.municipio) }}</h6>
          <b-form-select v-model="municipio" :options="this.opcionesMunicipios" :state="lengthState(municipio)" lazy></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otro municipio? ¿cuál?:</h6>
          <b-form-input v-model="municipioOtro" aria-describedby="input-live-feedback" trim lazy placeholder="Opcional"></b-form-input>
        </div>

        <div class="mt-2 ml-2" v-if="this.arcgisAddress">
          <span class="font-italic">{{ this.arcgisAddress.address }}.</span> ¿Sobreescribir coordenadas? <input class="lg" type="checkbox" v-model="overrideCoordinates" />
        </div>

        <div class="mt-3">
          <h6>Fecha en la que ocurre el evento a reportar:</h6>
          <b-input-group class="mb-3">
            <b-form-input v-model="fechaOcurrencia" :disabled="true" type="text" :placeholder="FormatAsDate(this.fechaOcurrencia)" :state="lengthState(this.fechaOcurrencia)" autocomplete="off"></b-form-input>
            <b-input-group-append>
              <b-form-datepicker v-model="fechaOcurrencia" button-only right locale="es-LA" aria-controls="example-input"></b-form-datepicker>
            </b-input-group-append>
          </b-input-group>
        </div>
      </b-col>
    </b-row>

    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Iniciativa: {{ this.getPolicyTexts(this.getObjectByMunicipio(FormatForDB(this.municipio)), this.codigoIniciativa) }}</h6>
          <b-form-select v-model="codigoIniciativa" :options="this.opcionesIniciativas" :state="lengthState(codigoIniciativa)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra iniciativa? ¿cuál?:</h6>
          <b-form-input v-model="iniciativaOtra" aria-describedby="input-live-feedback" trim placeholder="Opcional"></b-form-input>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Acción de incidencia:</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Describa la acción:</h6>
          <b-form-input v-model="descripcionAccion" :state="lengthState(descripcionAccion)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Ante cuál/es entidad/es se realiza la acción:</h6>
          <b-form-select v-model="entidadesEstadoEnum1" :options="this.opcionesInstituciones" :state="lengthState(entidadesEstadoEnum1)" multiple :select-size="10"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra entidad? ¿cuál?:</h6>
          <b-form-input v-model="otraEntidad1" aria-describedby="input-live-feedback" trim placeholder="Opcional"></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Dependencia, división o similar de la entidad:</h6>
          <b-form-input v-model="dependenciaIncidencia" :state="lengthState(dependenciaIncidencia)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Cuál es el resultado esperado?</h6>
          <b-form-input v-model="resultadoIncidencia" :state="lengthState(resultadoIncidencia)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>
        <b-row>
          <b-col>
            <div class="mt-3">
              <h6>Tiempo de respuesta esperado:</h6>
              <b-form-input v-model="tiempoIncidencia" :state="lengthState(tiempoIncidencia)" aria-describedby="input-live-feedback" trim type="number" min="0"></b-form-input>
            </div>
            <div class="mt-3">
              <h6>Unidad de tiempo de espera: {{ FormatForm(this.tiempoUnidad) }}</h6>
              <b-form-select v-model="tiempoUnidad" :options="this.opcionesUnidadTiempo" :state="lengthState(tiempoUnidad)"></b-form-select>
            </div>
          </b-col>
        </b-row>

        <div class="mt-3">
          <h6>Quién presenta la acción:</h6>
          <b-form-input v-model="incidenciaQuien" :state="lengthState(incidenciaQuien)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Persona de contacto:</h6>
          <b-form-input v-model="incidenciaContacto" :state="lengthState(incidenciaContacto)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Teléfono de la persona de contacto:</h6>
          <b-form-input v-model="incidenciaTelefono" aria-describedby="input-live-feedback" trim placeholder="Opcional"></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Correo de la persona de contacto:</h6>
          <b-form-input v-model="incidenciaCorreo" aria-describedby="input-live-feedback" trim placeholder="Opcional"></b-form-input>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Implementación de Política Pública</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Tipo de implementación: {{ FormatForm(this.tipoImplementacion) }}</h6>
          <b-form-select v-model="tipoImplementacion" :options="this.opcionesImplementacion" :state="lengthState(tipoImplementacion)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra implementación? ¿cuál?:</h6>
          <b-form-input v-model="otraImplementacion" aria-describedby="input-live-feedback" trim placeholder="Opcional"></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Entidad/es que realiza/n la acción o participa/n en la implementación:</h6>
          <b-form-select v-model="entidadesEstadoEnum2" :options="this.opcionesInstituciones" :select-size="10" :state="lengthState(entidadesEstadoEnum2)" multiple></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra entidad? ¿cuál?:</h6>
          <b-form-input v-model="entidadesOtra2" aria-describedby="input-live-feedback" trim placeholder="Opcional"></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Dependencia división o similar de la entidad:</h6>
          <b-form-input v-model="dependenciaImplementacion" :state="lengthState(dependenciaImplementacion)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Describa la implementación que reporta:</h6>
          <b-form-input v-model="describaImplementacion" :state="lengthState(describaImplementacion)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Con esta acción se completa el proyecto aprobado? {{ FormatForm(this.completado1) }}</h6>
          <b-form-select v-model="completado1" :options="this.opcionesSiNo" :state="lengthState(completado1)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Con esta acción se avanza efectivamente en el proyecto aprobado? {{ FormatForm(this.avanza1) }}</h6>
          <b-form-select v-model="avanza1" :options="this.opcionesSiNo" :state="lengthState(avanza1)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Esta acción retrasa la implementación efectiva del proyecto aprobado? {{ FormatForm(this.retrasa1) }}</h6>
          <b-form-select v-model="retrasa1" :options="this.opcionesSiNo" :state="lengthState(retrasa1)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿De 1 a 5 que tan necesaria es esta acción para la implementación del proyecto? Valor: {{ this.accionNecesaria }}</h6>
          <b-form-input v-model="accionNecesaria" :state="lengthState(accionNecesaria)" aria-describedby="input-live-feedback" trim type="range" min="1" max="5"></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Persona de contacto en la institución:</h6>
          <b-form-input v-model="implementacionContacto" aria-describedby="input-live-feedback" trim placeholder="Opcional"></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Teléfono de la persona de contacto en la institución:</h6>
          <b-form-input v-model="implementacionTelefono" aria-describedby="input-live-feedback" trim placeholder="Opcional"></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Correo electrónico de la persona de contacto en la institución:</h6>
          <b-form-input v-model="implementacionCorreo" aria-describedby="input-live-feedback" trim placeholder="Opcional"></b-form-input>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Implementación autónoma:</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Tipo de implementación: {{ FormatForm(this.tipoImplementacion2) }}</h6>
          <b-form-select v-model="tipoImplementacion2" :options="this.opcionesImplementacion" :state="lengthState(tipoImplementacion2)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra implementación? ¿cuál?</h6>
          <b-form-input v-model="tipoImplementacionOtra2" aria-describedby="input-live-feedback" trim placeholder="Opcional"></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Organización que implementa la acción o participa de la implementación:</h6>
          <b-form-input v-model="organizacion" :state="lengthState(organizacion)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Agencia de cooperación u organismo intergubernamental que financia la implementación:</h6>
          <b-form-input v-model="agencia" :state="lengthState(agencia)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Entidad del gobierno que participa o acompaña la implementación:</h6>
          <b-form-select v-model="entidadesEstado" :options="this.opcionesInstituciones" :select-size="10" :state="lengthState(entidadesEstado)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Describa la implementación que reporta:</h6>
          <b-form-input v-model="describaImplementacion2" :state="lengthState(describaImplementacion2)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Con esta acción se completa el proyecto aprobado? {{ FormatForm(this.completado2) }}</h6>
          <b-form-select v-model="completado2" :options="this.opcionesSiNo" :state="lengthState(completado2)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Con esta acción se avanza efectivamente en el proyecto aprobado? {{ FormatForm(this.avanza2) }}</h6>
          <b-form-select v-model="avanza2" :options="this.opcionesSiNo" :state="lengthState(avanza2)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Esta acción retrasa la implementación efectiva del proyecto aprobado? {{ FormatForm(this.retrasa2) }}</h6>
          <b-form-select v-model="retrasa2" :options="this.opcionesSiNo" :state="lengthState(retrasa2)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿De 1 a 5 que tan necesaria es esta acción para la implementación del proyecto? Valor: {{ this.accionNecesaria2 }}</h6>
          <b-form-input v-model="accionNecesaria2" :state="lengthState(accionNecesaria2)" aria-describedby="input-live-feedback" trim type="range" min="1" max="5"></b-form-input>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Bloqueo institucional</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3">
          <h6>Tipo de bloqueo: {{ FormatForm(this.tipoBloqueo) }}</h6>
          <b-form-select v-model="tipoBloqueo" :options="this.opcionesBloqueo" :select-size="5" :state="lengthState(tipoBloqueo)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>Institucion/es en la/s que se identifica el bloqueo</h6>
          <b-form-select v-model="entidadesEstadoEnum3" :options="this.opcionesInstituciones" multiple :select-size="10" :state="lengthState(entidadesEstadoEnum3)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Otra institución? ¿cuál?</h6>
          <b-form-input v-model="entidadOtra3" aria-describedby="input-live-feedback" trim placeholder="Opcional"></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿El bloqueo ocurre en alguna dependencia o dirección?</h6>
          <b-form-input v-model="dependenciaBloqueo" :state="lengthState(dependenciaBloqueo)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>Describa el bloqueo:</h6>
          <b-form-input v-model="descripcionBloqueo" :state="lengthState(descripcionBloqueo)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Cuál es el principal efecto del bloqueo?</h6>
          <b-form-input v-model="efectoBloqueo" :state="lengthState(efectoBloqueo)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Cuál es el impacto previsto del bloqueo?</h6>
          <b-form-input v-model="impactoBloqueo" :state="lengthState(impactoBloqueo)" aria-describedby="input-live-feedback" trim></b-form-input>
        </div>

        <div class="mt-3">
          <h6>¿Se han interpuesto acciones de incidencia para superar el bloqueo? {{ FormatForm(this.accionesBloqueo) }}</h6>
          <b-form-select v-model="accionesBloqueo" :options="this.opcionesSiNo" :state="lengthState(accionesBloqueo)"></b-form-select>
        </div>

        <div class="mt-3">
          <h6>¿Las instituciones han tomado acciones para superar el bloqueo? {{ FormatForm(this.institucionesBloqueo) }}</h6>
          <b-form-select v-model="institucionesBloqueo" :options="this.opcionesSiNo" :state="lengthState(institucionesBloqueo)"></b-form-select>
        </div>

        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback id="input-live-feedback">
          Máximo 256 carácteres
        </b-form-invalid-feedback>
      </b-col>
    </b-row>
    <b-button v-if="userIsAuthenticated" @click="this.update" size="lg" class="text-light mt-5 mb-5" variant="warning" block :disabled="requiredFieldsCompleted()">Guardar cambios en reporte</b-button>
  </b-container>
</template>
<script>
import PolicyService from '@/services/policy-service.js';
import PublicPolicyOptions from '@/mixins/public-policy-options.js';
import GeocodeService from '@/services/geocode-service.js';
import helpers from '@/mixins/helpers.js';

export default {
  mixins: [PublicPolicyOptions, helpers],
  data() {
    return {
      policy: null,
      tipoReporte: '',
      subregion: '',
      pilar: '',
      municipio: '',
      iniciativa: '',
      codigoIniciativa: '',
      fechaOcurrencia: '',
      descripcionAccion: '',
      entidadesEstadoEnum1: [],
      otraEntidad1: '',
      dependenciaIncidencia: '',
      resultadoIncidencia: '',
      tiempoIncidencia: '',
      incidenciaQuien: '',
      incidenciaContacto: '',
      incidenciaTelefono: '',
      incidenciaCorreo: '',
      tipoImplementacion: '',
      otraImplementacion: '',
      entidadesEstadoEnum2: [],
      entidadesOtra2: '',
      dependenciaImplementacion: '',
      describaImplementacion: '',
      completado1: '',
      avanza1: '',
      retrasa1: '',
      accionNecesaria: '',
      implementacionContacto: '',
      implementacionTelefono: '',
      implementacionCorreo: '',
      tipoImplementacion2: '',
      tipoImplementacionOtra2: '',
      organizacion: '',
      agencia: '',
      entidadesEstado: '',
      describaImplementacion2: '',
      completado2: '',
      avanza2: '',
      retrasa2: '',
      accionNecesaria2: '',
      tipoBloqueo: '',
      entidadesEstadoEnum3: [],
      entidadOtra3: '',
      dependenciaBloqueo: '',
      descripcionBloqueo: '',
      efectoBloqueo: '',
      impactoBloqueo: '',
      accionesBloqueo: '',
      institucionesBloqueo: '',
      municipioOtro: '',
      iniciativaOtra: '',
      tiempoUnidad: '',
      arcgisAddress: '',
      overrideCoordinates: false,
      hasInited: false
    };
  },
  watch: {
    municipio: function(val) {
      //console.log('mun ' + val + ' ' + this.hasInited);
      if (this.hasInited && val != 'Otro') this.lookForCoordinates(val);

      this.hasInited = true;
    },
    municipioOtro: function(val) {
      //console.log('Otromun ' + val + ' ' + this.hasInited);
      if (this.hasInited) this.lookForCoordinates(val);
    }
  },
  methods: {
    requiredFieldsCompleted() {
      // if (
      //   !this.tipoReporte ||
      //   !this.subregion ||
      //   !this.pilar ||
      //   !this.municipio ||
      //   !this.codigoIniciativa ||
      //   !this.fechaOcurrencia ||
      //   !this.descripcionAccion ||
      //   !this.entidadesEstadoEnum1 ||
      //   !this.dependenciaIncidencia ||
      //   !this.resultadoIncidencia ||
      //   !this.tiempoIncidencia ||
      //   !this.incidenciaQuien ||
      //   !this.tipoImplementacion ||
      //   !this.entidadesEstadoEnum2 ||
      //   !this.dependenciaImplementacion ||
      //   !this.describaImplementacion ||
      //   !this.completado1 ||
      //   !this.avanza1 ||
      //   !this.retrasa1 ||
      //   !this.accionNecesaria ||
      //   !this.tipoImplementacion2 ||
      //   !this.organizacion ||
      //   !this.agencia ||
      //   !this.entidadesEstado ||
      //   !this.describaImplementacion2 ||
      //   !this.completado2 ||
      //   !this.avanza2 ||
      //   !this.retrasa2 ||
      //   !this.accionNecesaria2 ||
      //   !this.tipoBloqueo ||
      //   !this.entidadesEstadoEnum3 ||
      //   !this.dependenciaBloqueo ||
      //   !this.descripcionBloqueo ||
      //   !this.efectoBloqueo ||
      //   !this.impactoBloqueo ||
      //   !this.accionesBloqueo ||
      //   !this.institucionesBloqueo ||
      //   !this.tiempoUnidad
      // )
      //   return true;

      return false;
    },
    validateData(data, obj) {
      if (obj) {
        if (!data) return [];
        return data.split(',');
      }

      if (!data) return '';

      if (typeof data === 'number') {
        if (data > 15000000) data = this.FormatAsDate(data);
        else data = data.toString();
      }

      return this.FormatForm(data);
    },
    lengthState(str) {
      if (str.length > 256) return false;

      if (str.length <= 0) return false;

      return true;
    },
    wrapPolicy() {
      let alert = '[{';

      if (this.overrideCoordinates) alert += `"geometry" : {"x": ${this.arcgisAddress.x},"y": ${this.arcgisAddress.y},"spatialReference": {"wkid": 4326}},"attributes" : {`;
      else alert += '"attributes" : {';

      alert += '"OBJECTID":"' + this.policy.attributes.OBJECTID + '",';
      alert += '"tipoReporte":"' + this.FormatForDB(this.tipoReporte) + '",';
      alert += '"subregion":"' + this.FormatForDB(this.subregion) + '",';
      alert += '"pilar":"' + this.FormatForDB(this.pilar) + '",';
      alert += '"municipio":"' + this.FormatForDB(this.municipio) + '",';
      alert += '"iniciativa":"' + this.FormatForDB(this.iniciativa) + '",';
      alert += '"codigoIniciativa":"' + this.FormatForDB(this.codigoIniciativa) + '",';
      alert += '"fechaOcurrencia":"' + this.FormatDateForDB(this.fechaOcurrencia) + '",';
      alert += '"descripcionAccion":"' + this.FormatForDB(this.descripcionAccion) + '",';
      alert += '"entidadesEstadoEnum1":"' + this.FormatForDB(this.entidadesEstadoEnum1) + '",';
      alert += '"otraEntidad1":"' + this.FormatForDB(this.otraEntidad1) + '",';
      alert += '"dependenciaIncidencia":"' + this.FormatForDB(this.dependenciaIncidencia) + '",';
      alert += '"resultadoIncidencia":"' + this.FormatForDB(this.resultadoIncidencia) + '",';
      alert += '"tiempoIncidencia":"' + this.FormatForDB(this.tiempoIncidencia) + '",';
      alert += '"incidenciaQuien":"' + this.FormatForDB(this.incidenciaQuien) + '",';
      alert += '"incidenciaContacto":"' + this.FormatForDB(this.incidenciaContacto) + '",';
      alert += '"incidenciaTelefono":"' + this.FormatForDB(this.incidenciaTelefono) + '",';
      alert += '"incidenciaCorreo":"' + this.FormatForDB(this.incidenciaCorreo) + '",';
      alert += '"tipoImplementacion":"' + this.FormatForDB(this.tipoImplementacion) + '",';
      alert += '"otraImplementacion":"' + this.FormatForDB(this.otraImplementacion) + '",';
      alert += '"entidadesEstadoEnum2":"' + this.FormatForDB(this.entidadesEstadoEnum2) + '",';
      alert += '"entidadesOtra2":"' + this.FormatForDB(this.entidadesOtra2) + '",';
      alert += '"dependenciaImplementacion":"' + this.FormatForDB(this.dependenciaImplementacion) + '",';
      alert += '"describaImplementacion":"' + this.FormatForDB(this.describaImplementacion) + '",';
      alert += '"completado1":"' + this.FormatForDB(this.completado1) + '",';
      alert += '"avanza1":"' + this.FormatForDB(this.avanza1) + '",';
      alert += '"retrasa1":"' + this.FormatForDB(this.retrasa1) + '",';
      alert += '"accionNecesaria":"' + this.FormatForDB(this.accionNecesaria) + '",';
      alert += '"implementacionContacto":"' + this.FormatForDB(this.implementacionContacto) + '",';
      alert += '"implementacionTelefono":"' + this.FormatForDB(this.implementacionTelefono) + '",';
      alert += '"implementacionCorreo":"' + this.FormatForDB(this.implementacionCorreo) + '",';
      alert += '"tipoImplementacion2":"' + this.FormatForDB(this.tipoImplementacion2) + '",';
      alert += '"tipoImplementacionOtra2":"' + this.FormatForDB(this.tipoImplementacionOtra2) + '",';
      alert += '"organizacion":"' + this.FormatForDB(this.organizacion) + '",';
      alert += '"agencia":"' + this.FormatForDB(this.agencia) + '",';
      alert += '"entidadesEstado":"' + this.FormatForDB(this.entidadesEstado) + '",';
      alert += '"describaImplementacion2":"' + this.FormatForDB(this.describaImplementacion2) + '",';
      alert += '"completado2":"' + this.FormatForDB(this.completado2) + '",';
      alert += '"avanza2":"' + this.FormatForDB(this.avanza2) + '",';
      alert += '"retrasa2":"' + this.FormatForDB(this.retrasa2) + '",';
      alert += '"accionNecesaria2":"' + this.FormatForDB(this.accionNecesaria2) + '",';
      alert += '"tipoBloqueo":"' + this.FormatForDB(this.tipoBloqueo) + '",';
      alert += '"entidadesEstadoEnum3":"' + this.FormatForDB(this.entidadesEstadoEnum3) + '",';
      alert += '"entidadOtra3":"' + this.FormatForDB(this.entidadOtra3) + '",';
      alert += '"dependenciaBloqueo":"' + this.FormatForDB(this.dependenciaBloqueo) + '",';
      alert += '"descripcionBloqueo":"' + this.FormatForDB(this.descripcionBloqueo) + '",';
      alert += '"efectoBloqueo":"' + this.FormatForDB(this.efectoBloqueo) + '",';
      alert += '"impactoBloqueo":"' + this.FormatForDB(this.impactoBloqueo) + '",';
      alert += '"accionesBloqueo":"' + this.FormatForDB(this.accionesBloqueo) + '",';
      alert += '"institucionesBloqueo":"' + this.FormatForDB(this.institucionesBloqueo) + '",';
      alert += '"municipioOtro":"' + this.FormatForDB(this.municipioOtro) + '",';
      alert += '"iniciativaOtra":"' + this.FormatForDB(this.iniciativaOtra) + '",';
      alert += '"tiempoUnidad":"' + this.FormatForDB(this.tiempoUnidad) + '"';
      alert += '}}]';

      //console.log(alert);
      return alert;
    },
    async update() {
      //console.log(this.wrapPolicy());
      const response = await PolicyService.updatePolicy(this.wrapPolicy());
      //console.log(response);
      if (response.updateResults[0].success) {
        this.$store.commit('SET_UPDATE_NEEDED', true);
        this.$router.push({ path: '/' });
      } else {
        this.$store.commit('SET_APP_ERROR', response.updateResults[0].error.description);
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
    },
    fillForm() {
      this.fechaOcurrencia = this.validateData(this.policy.attributes.fechaOcurrencia);
      (this.tipoReporte = this.validateData(this.policy.attributes.tipoReporte)),
        (this.subregion = this.validateData(this.policy.attributes.subregion)),
        (this.pilar = this.validateData(this.policy.attributes.pilar)),
        (this.municipio = this.validateData(this.policy.attributes.municipio)),
        (this.iniciativa = this.validateData(this.policy.attributes.iniciativa)),
        (this.codigoIniciativa = this.validateData(this.policy.attributes.codigoIniciativa)),
        (this.descripcionAccion = this.validateData(this.policy.attributes.descripcionAccion)),
        (this.entidadesEstadoEnum1 = this.validateData(this.policy.attributes.entidadesEstadoEnum1, true)),
        (this.otraEntidad1 = this.validateData(this.policy.attributes.otraEntidad1)),
        (this.dependenciaIncidencia = this.validateData(this.policy.attributes.dependenciaIncidencia)),
        (this.resultadoIncidencia = this.validateData(this.policy.attributes.resultadoIncidencia)),
        (this.tiempoIncidencia = this.validateData(this.policy.attributes.tiempoIncidencia)),
        (this.incidenciaQuien = this.validateData(this.policy.attributes.incidenciaQuien)),
        (this.incidenciaContacto = this.validateData(this.policy.attributes.incidenciaContacto)),
        (this.incidenciaTelefono = this.validateData(this.policy.attributes.incidenciaTelefono)),
        (this.incidenciaCorreo = this.validateData(this.policy.attributes.incidenciaCorreo)),
        (this.tipoImplementacion = this.validateData(this.policy.attributes.tipoImplementacion)),
        (this.otraImplementacion = this.validateData(this.policy.attributes.otraImplementacion)),
        (this.entidadesEstadoEnum2 = this.validateData(this.policy.attributes.entidadesEstadoEnum2, true)),
        (this.entidadesOtra2 = this.validateData(this.policy.attributes.entidadesOtra2)),
        (this.dependenciaImplementacion = this.validateData(this.policy.attributes.dependenciaImplementacion)),
        (this.describaImplementacion = this.validateData(this.policy.attributes.describaImplementacion)),
        (this.completado1 = this.validateData(this.policy.attributes.completado1)),
        (this.avanza1 = this.validateData(this.policy.attributes.avanza1)),
        (this.retrasa1 = this.validateData(this.policy.attributes.retrasa1)),
        (this.accionNecesaria = this.validateData(this.policy.attributes.accionNecesaria)),
        (this.implementacionContacto = this.validateData(this.policy.attributes.implementacionContacto)),
        (this.implementacionTelefono = this.validateData(this.policy.attributes.implementacionTelefono)),
        (this.implementacionCorreo = this.validateData(this.policy.attributes.implementacionCorreo)),
        (this.tipoImplementacion2 = this.validateData(this.policy.attributes.tipoImplementacion2)),
        (this.tipoImplementacionOtra2 = this.validateData(this.policy.attributes.ipoImplementacionOtra2)),
        (this.organizacion = this.validateData(this.policy.attributes.organizacion)),
        (this.agencia = this.validateData(this.policy.attributes.agencia)),
        (this.entidadesEstado = this.validateData(this.policy.attributes.entidadesEstado)),
        (this.describaImplementacion2 = this.validateData(this.policy.attributes.describaImplementacion2)),
        (this.completado2 = this.validateData(this.policy.attributes.completado2)),
        (this.avanza2 = this.validateData(this.policy.attributes.avanza2)),
        (this.retrasa2 = this.validateData(this.policy.attributes.retrasa2)),
        (this.accionNecesaria2 = this.validateData(this.policy.attributes.accionNecesaria2)),
        (this.tipoBloqueo = this.validateData(this.policy.attributes.tipoBloqueo)),
        (this.entidadesEstadoEnum3 = this.validateData(this.policy.attributes.entidadesEstadoEnum3, true)),
        (this.entidadOtra3 = this.validateData(this.policy.attributes.entidadOtra3)),
        (this.dependenciaBloqueo = this.validateData(this.policy.attributes.dependenciaBloqueo)),
        (this.descripcionBloqueo = this.validateData(this.policy.attributes.descripcionBloqueo)),
        (this.efectoBloqueo = this.validateData(this.policy.attributes.efectoBloqueo)),
        (this.impactoBloqueo = this.validateData(this.policy.attributes.impactoBloqueo)),
        (this.accionesBloqueo = this.validateData(this.policy.attributes.accionesBloqueo)),
        (this.institucionesBloqueo = this.validateData(this.policy.attributes.institucionesBloqueo)),
        (this.municipioOtro = this.validateData(this.policy.attributes.municipioOtro)),
        (this.iniciativaOtra = this.validateData(this.policy.attributes.iniciativaOtra)),
        (this.tiempoUnidad = this.validateData(this.policy.attributes.tiempoUnidad));
    }
  },
  computed: {
    opcionesMunicipios() {
      if (this.subregion == 'Chocó') return this.opcionesMunicipiosChoco;

      return [
        { value: '', text: 'Selecciona una' },
        { value: 'Otro', text: 'Otro' }
      ];
    },
    opcionesIniciativas() {
      //console.log('texto es ' + this.getPolicyTexts(this.opcionesIniciativas, this.codigoIniciativa))
      if (this.subregion != 'Chocó')
        return [
          { value: '', text: 'Selecciona una' },
          { value: 'Otro', text: 'Otro' }
        ];

      if (this.municipio == 'Acandí') return this.opcionesIniciativasAcandi;
      if (this.municipio == 'Bojayá') return this.opcionesIniciativasBojaya;
      if (this.municipio == 'Carmen del Darien') return this.opcionesIniciativasCarmenDelDarien;
      if (this.municipio == 'Condoto') return this.opcionesIniciativasCondoto;
      if (this.municipio == 'El Litoral del San Juan') return this.opcionesIniciativasElLitoralDelSanJuan;
      if (this.municipio == 'Istmina') return this.opcionesIniciativasIstmina;
      if (this.municipio == 'Medio Atrato') return this.opcionesIniciativasMedioAtrato;
      if (this.municipio == 'Medio San Juan') return this.opcionesIniciativasMedioSanJuan;
      if (this.municipio == 'Murindó') return this.opcionesIniciativasMurindo;
      if (this.municipio == 'Novitá') return this.opcionesIniciativasNovita;
      if (this.municipio == 'Riosucio') return this.opcionesIniciativasRiosucio;
      if (this.municipio == 'Sipí') return this.opcionesIniciativasSipi;
      if (this.municipio == 'Unguía') return this.opcionesIniciativasUnguia;
      if (this.municipio == 'Vigía del Fuerte') return this.opcionesIniciativasVigiaDelFuerte;

      return this.opcionesIniciativasSubregion;
    }
  },
  mounted() {
    if (this.$store.getters.policies) {
      this.policy = this.$store.getters.policyById(this.$route.params.id);
      //console.log('This policy', this.policy);
      this.fillForm();
    }
  }
};
</script>
