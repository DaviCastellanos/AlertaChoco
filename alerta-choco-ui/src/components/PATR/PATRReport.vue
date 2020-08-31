<template>
  <b-container fluid id="reporte" v-if="this.policy">
    <h4>FICHA REPORTE PATR</h4>
    <br />

    <div class="mt-3">
      <h4>General</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3" v-if="this.policy.attributes.OBJECTID">
          <span class="font-weight-bold">Id reporte: </span> <span>{{ this.policy.attributes.OBJECTID }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.tipoReporte">
          <span class="font-weight-bold">Tipo de reporte: </span> <span>{{ FormatForHuman(this.policy.attributes.tipoReporte) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.subregion">
          <span class="font-weight-bold">Subregion: </span> <span>{{ FormatForHuman(this.policy.attributes.subregion) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.pilar">
          <span class="font-weight-bold">Pilar: </span> <span>{{ FormatForHuman(this.policy.attributes.pilar) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.municipio">
          <span class="font-weight-bold">Municipio: </span> <span>{{ FormatForHuman(this.policy.attributes.municipio) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.municipioOtro">
          <span class="font-weight-bold">Otro municipio: </span> <span>{{ FormatForHuman(this.policy.attributes.municipioOtro) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.fechaOcurrencia">
          <span class="font-weight-bold">Fecha de ocurrencia: </span> <span>{{ FormatAsDate(this.policy.attributes.fechaOcurrencia) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.codigoIniciativa">
          <span class="font-weight-bold">Iniciativa: </span> <span>{{ this.getPolicyTexts(this.getObjectByMunicipio(this.policy.attributes.municipio), this.policy.attributes.codigoIniciativa) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.iniciativaOtra">
          <span class="font-weight-bold">Otra iniciativa: </span> <span>{{ FormatAsDate(this.policy.attributes.iniciativaOtra) }}</span>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Acción de incidencia:</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3" v-if="this.policy.attributes.descripcionAccion">
          <span class="font-weight-bold">Descripción de la acción: </span> <span>{{ FormatForHuman(this.policy.attributes.descripcionAccion) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.entidadesEstadoEnum1">
          <span class="font-weight-bold">Ante cuál/es entidad/es se realiza la acción: </span> <span>{{ this.getInstitucionesTexts(this.policy.attributes.entidadesEstadoEnum1) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.otraEntidad1">
          <span class="font-weight-bold">Otra entidad: </span> <span>{{ FormatForHuman(this.policy.attributes.otraEntidad1) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.dependenciaIncidencia">
          <span class="font-weight-bold">Dependencia, división o similar de la entidad: </span> <span>{{ FormatForHuman(this.policy.attributes.dependenciaIncidencia) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.resultadoIncidencia">
          <span class="font-weight-bold">Resultado esperado: </span> <span>{{ FormatForHuman(this.policy.attributes.resultadoIncidencia) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.tiempoIncidencia">
          <span class="font-weight-bold">Tiempo de respuesta esperado: </span> <span>{{ FormatForHuman(this.policy.attributes.tiempoIncidencia) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.tiempoUnidad">
          <span class="font-weight-bold">Unidad de tiempo de espera: </span> <span>{{ FormatForHuman(this.policy.attributes.tiempoUnidad) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.incidenciaQuien">
          <span class="font-weight-bold">Quien presenta la acción: </span> <span>{{ FormatForHuman(this.policy.attributes.incidenciaQuien) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.incidenciaContacto">
          <span class="font-weight-bold">Persona de contacto: </span> <span>{{ FormatForHuman(this.policy.attributes.incidenciaContacto) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.incidenciaTelefono">
          <span class="font-weight-bold">Teléfono persona de contacto: </span> <span>{{ FormatForHuman(this.policy.attributes.incidenciaTelefono) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.incidenciaCorreo">
          <span class="font-weight-bold">Correo persona de contacto: </span> <span>{{ FormatForHuman(this.policy.attributes.incidenciaCorreo) }}</span>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Implementación de Política Pública</h4>
    </div>
    <b-row>
      <b-col>
        <div class="mt-3" v-if="this.policy.attributes.tipoImplementacion">
          <span class="font-weight-bold">Tipo de implementación: </span> <span>{{ FormatForHuman(this.policy.attributes.tipoImplementacion) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.otraImplementacion">
          <span class="font-weight-bold">Otra implementación: </span> <span>{{ FormatForHuman(this.policy.attributes.otraImplementacion) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.entidadesEstadoEnum2">
          <span class="font-weight-bold">Entidad/es que realiza/n la acción o participa/n en la implementación: </span> <span>{{ this.getInstitucionesTexts(this.policy.attributes.entidadesEstadoEnum2) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.entidadesOtra2">
          <span class="font-weight-bold">Otra entidad: </span> <span>{{ FormatForHuman(this.policy.attributes.entidadesOtra2) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.dependenciaImplementacion">
          <span class="font-weight-bold">Dependencia división o similar de la entidad: </span> <span>{{ FormatForHuman(this.policy.attributes.dependenciaImplementacion) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.describaImplementacion">
          <span class="font-weight-bold">Describa la implementación que reporta: </span> <span>{{ FormatForHuman(this.policy.attributes.describaImplementacion) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.completado1">
          <span class="font-weight-bold">Completa el proyecto aprobado: </span> <span>{{ FormatForHuman(this.policy.attributes.completado1) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.avanza1">
          <span class="font-weight-bold">Avanza efectivamente en el proyecto aprobado: </span> <span>{{ FormatForHuman(this.policy.attributes.avanza1) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.retrasa1">
          <span class="font-weight-bold">Retrasa la implementación del proyecto aprobado: </span> <span>{{ FormatForHuman(this.policy.attributes.retrasa1) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.accionNecesaria">
          <span class="font-weight-bold">De 1 a 5 que tan necesaria es esta acción para la implementación del proyecto: </span> <span>{{ FormatForHuman(this.policy.attributes.accionNecesaria) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.implementacionContacto">
          <span class="font-weight-bold">Persona de contacto en la institución: </span> <span>{{ FormatForHuman(this.policy.attributes.implementacionContacto) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.implementacionTelefono">
          <span class="font-weight-bold">Teléfono de la persona de contacto en la institución: </span> <span>{{ FormatForHuman(this.policy.attributes.implementacionTelefono) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.implementacionCorreo">
          <span class="font-weight-bold">Correo de la persona de contacto en la institución: </span> <span>{{ FormatForHuman(this.policy.attributes.implementacionCorreo) }}</span>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Implementación autónoma:</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3" v-if="this.policy.attributes.tipoImplementacion2">
          <span class="font-weight-bold">Tipo de implementación: </span> <span>{{ FormatForHuman(this.policy.attributes.tipoImplementacion2) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.tipoImplementacionOtra2">
          <span class="font-weight-bold">Otra implementación: </span> <span>{{ FormatForHuman(this.policy.attributes.tipoImplementacionOtra2) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.organizacion">
          <span class="font-weight-bold">Organización que implementa la acción o participa de la implementación: </span> <span>{{ FormatForHuman(this.policy.attributes.organizacion) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.agencia">
          <span class="font-weight-bold">Agencia de cooperación u organismo intergubernamental que financia la implementación: </span> <span>{{ FormatForHuman(this.policy.attributes.agencia) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.entidadesEstado">
          <span class="font-weight-bold">Entidad del gobierno que participa o acompaña la implementación: </span> <span>{{ FormatForHuman(this.policy.attributes.entidadesEstado) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.describaImplementacion2">
          <span class="font-weight-bold">Describa la implementacióm que reporta: </span> <span>{{ FormatForHuman(this.policy.attributes.describaImplementacion2) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.completado2">
          <span class="font-weight-bold">Con esta acción se completa el proyecto aprobado: </span> <span>{{ FormatForHuman(this.policy.attributes.completado2) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.avanza2">
          <span class="font-weight-bold">Con esta acción se avanza efectivamente en el proyecto aprobado: </span> <span>{{ FormatForHuman(this.policy.attributes.avanza2) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.retrasa2">
          <span class="font-weight-bold">Esta acción retrasa la implementación efectiva del proyecto aprobado: </span> <span>{{ FormatForHuman(this.policy.attributes.retrasa2) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.accionNecesaria2">
          <span class="font-weight-bold">De 1 a 5 que tan necesaria es esta acción para la implementación del proyecto: </span> <span>{{ FormatForHuman(this.policy.attributes.accionNecesaria2) }}</span>
        </div>
      </b-col>
    </b-row>

    <hr />

    <div class="mt-3">
      <h4>Bloqueo institucional</h4>
    </div>

    <b-row>
      <b-col>
        <div class="mt-3" v-if="this.policy.attributes.tipoBloqueo">
          <span class="font-weight-bold">Tipo de bloqueo: </span> <span>{{ FormatForHuman(this.policy.attributes.tipoBloqueo) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.entidadesEstadoEnum3">
          <span class="font-weight-bold">Institucion/es en la/s que se identifica el bloqueo: </span> <span>{{ this.getInstitucionesTexts(this.policy.attributes.entidadesEstadoEnum3) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.entidadOtra3">
          <span class="font-weight-bold">Otra institución: </span> <span>{{ FormatForHuman(this.policy.attributes.entidadOtra3) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.dependenciaBloqueo">
          <span class="font-weight-bold">El bloqueo ocurre en alguna dependencia o dirección: </span> <span>{{ FormatForHuman(this.policy.attributes.dependenciaBloqueo) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.descripcionBloqueo">
          <span class="font-weight-bold">Describa el bloqueo: </span> <span>{{ FormatForHuman(this.policy.attributes.descripcionBloqueo) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.efectoBloqueo">
          <span class="font-weight-bold">Cuál es el principal efecto del bloqueo: </span> <span>{{ FormatForHuman(this.policy.attributes.efectoBloqueo) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.impactoBloqueo">
          <span class="font-weight-bold">Cuál es el impacto previsto del bloqueo: </span> <span>{{ FormatForHuman(this.policy.attributes.impactoBloqueo) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.accionesBloqueo">
          <span class="font-weight-bold">Se han interpuesto acciones de incidencia para superar el bloqueo: </span> <span>{{ FormatForHuman(this.policy.attributes.accionesBloqueo) }}</span>
        </div>

        <div class="mt-3" v-if="this.policy.attributes.institucionesBloqueo">
          <span class="font-weight-bold">Las instituciones han tomado acciones para superar el bloqueo: </span> <span>{{ FormatForHuman(this.policy.attributes.institucionesBloqueo) }}</span>
        </div>

        <!-- This will only be shown if the preceding input has an invalid state -->
        <b-form-invalid-feedback id="input-live-feedback">
          Máximo 256 carácteres
        </b-form-invalid-feedback>
      </b-col>
    </b-row>
    <hr />
    <div class="mt-3">
      <b-row>
        <b-col v-if="userAccessIsPrivate">
          <div class="mt-3">
            <b-button size="lg" :to="editURL" class="text-light my-2 my-sm-0" variant="warning">Editar reporte</b-button>
          </div>
        </b-col>
        <b-col v-if="userIsAdmin">
          <div class="mt-3 mb-3">
            <b-button size="lg" :to="deleteURL" class="text-light my-2 my-sm-0" variant="danger">Eliminar reporte</b-button>
          </div>
        </b-col>
      </b-row>
    </div>
  </b-container>
</template>
<script>
//import  PolicyService  from "@/services/policy-service.js";
import PublicPolicyOptions from '@/mixins/public-policy-options.js';
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
      tiempoUnidad: ''
    };
  },
  methods: {
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
    }
  },
  watch: {
    policies(val) {
      if (val) this.policy = this.$store.getters.policyById(this.$route.params.id);
    }
  },
  computed: {
    editURL() {
      return '/editpatrreport/' + this.$route.params.id;
    },
    deleteURL() {
      return '/deletepatrreport/' + this.$route.params.id;
    },
    policies() {
      return this.$store.getters.policies;
    },
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
    if (this.$store.getters.policies) this.policy = this.$store.getters.policyById(this.$route.params.id);
  }
};
</script>

<style>
#reporte {
  padding: 2%;
  width: 100%;
  height: 100%;
}
</style>
