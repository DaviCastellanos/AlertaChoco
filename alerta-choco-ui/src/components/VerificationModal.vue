<template>
    <b-modal size="xl" id="verification-modal" title="Verificación de alerta" @close="CleanData()" @hide="CleanData()">
        <b-row>
        <b-col>
            <div class="mt-3">
            <h6>Id Alerta:</h6> <p>{{this.alert.attributes.idAlerta}}</p> 
            </div>

            <div class="mt-3">
            <h6> Código ANANSI: </h6> <p>{{this.alert.attributes.codigoAnansi}}</p> 
            </div>

            <div class="mt-3">
            <h6> Teléfono: </h6> <p>{{this.alert.attributes.telefono}}</p> 
            </div>

            <div class="mt-3">
            <h6> Puede reportar: </h6> <p>{{FormatForHuman(this.alert.attributes.puedeReportar)}}</p> 
            </div>

            <div class="mt-3">
            <h6> Cómo pasó: </h6> <p><span v-html="FormatForHuman(this.alert.attributes.relatoComo)"></span></p> 
            </div>

            <div class="mt-3">
            <h6> Situación actual: </h6> <p><span v-html="FormatForHuman(this.alert.attributes.situacionActual)"></span></p> 
            </div>

            <div class="mt-3">
            <h6> Fecha de ocurrencia: </h6> <b-form-datepicker id="datepicker" v-model="fechaOcurrencia" :state="lengthState(fechaOcurrencia)" placeholder="Selecciona fecha"></b-form-datepicker> 
            </div>

            <div class="mt-3">
            <h6> Entorno de ocurrencia: </h6>
            <b-form-select v-model="entornoOcurrencia" :options="opcionesEntorno" :state="lengthState(entornoOcurrencia)"></b-form-select>
            </div>

            <div class="mt-3">
            <h6> Territorio colectivo: </h6> 
            <b-form-input 
                v-model="territorioColectivo"
                :state="lengthState(territorioColectivo)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Barrio: </h6> 
            <b-form-input 
                v-model="barrio"
                :state="lengthState(barrio)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

        </b-col>
        <b-col>
            <div class="mt-3">
            <h6> Cuándo pasó: </h6> <p> <span v-html="FormatForHuman(this.alert.attributes.relatoCuando)"></span></p> 
            </div>

            <div class="mt-3">
            <h6> Fecha reporte: </h6> <p>{{new Date(this.alert.attributes.fechaReporte)}}</p> 
            </div>

            <div class="mt-3">
            <h6> Primer mensaje: </h6> <p><span v-html="FormatForHuman(this.alert.attributes.primerMensaje)"></span></p> 
            </div>
        
            <div class="mt-3">
            <h6> Qué pasó: </h6> <p><span v-html="FormatForHuman(this.alert.attributes.relatoQue)"></span></p> 
            </div>

            <div class="mt-3">
            <h6> Dónde pasó: </h6> <p><span v-html="FormatForHuman(this.alert.attributes.relatoDonde)"></span></p> 
            </div>

            <div class="mt-3">
            <h6> Recibe llamada: </h6> <p><span v-html="FormatForHuman(this.alert.attributes.recibeLlamada)"></span></p> 
            </div>

            <div class="mt-3">
            <h6> Fecha de validacion: </h6> <b-form-datepicker id="datepicker" v-model="fechaValidacion" :state="lengthState(fechaValidacion)" placeholder="Selecciona fecha" ></b-form-datepicker> 
            </div>

            <div class="mt-3">
            <h6> Departamento ocurrencia: </h6> 
            <b-form-input 
                v-model="departamentoOcurrencia"
                :state="lengthState(departamentoOcurrencia)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Municipio ocurrencia: </h6> 
            <b-form-input 
                v-model="municipioOcurrencia"
                :state="lengthState(municipioOcurrencia)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Tipo de evento: </h6>
            <b-form-select v-model="tipoEvento" :options="opcionesTipo" :state="lengthState(tipoEvento)"></b-form-select>
            </div>

            <div class="mt-3">
            <h6> Categoría: </h6>
            <b-form-select v-model="categoriaEvento" :options="opcionesCategoria" :state="lengthState(categoriaEvento)"></b-form-select>
            </div>

            <!-- This will only be shown if the preceding input has an invalid state -->
            <b-form-invalid-feedback id="input-live-feedback"> Máximo 256 carácteres </b-form-invalid-feedback>
            </b-col>
        </b-row>
    </b-modal>
</template>
<script>

export default {
    data () {
        return {
            opcionesSubcategoria : [
                {value: "0", text: "Abuso Sexual"}, 
                {value: "1", text: "Accidente o incidente con Minas Antipersona o Municiones sin explotar"}, 
                {value: "2", text: "Actos contra los derechos reproductivos"},
                {value: "3", text: "Actos contra los derechos sexuales"},
                {value: "4", text: "Amenazas"},
                {value: "5", text: "Ataque a bienes civiles"},
                {value: "6", text: "Ataque indiscriminado"},
                {value: "7", text: "Bloqueo de Vías"}, 
                {value: "8", text: "Bombardeo"}, 
                {value: "9", text: "Confinamiento"}, 
                {value: "10", text: "Confrontación armada o combates"},
                {value: "11", text: "Control social"}, 
                {value: "12", text: "Desaparición Forzada"}, 
                {value: "13", text: "Desnudez Forzada"},
                {value: "14", text: "Desplazamiento Forzado"},
                {value: "15", text: "Despojo de tierras y territorios"},
                {value: "16", text: "Detención arbitraria"},
                {value: "17", text: "Enamoramiento"},
                {value: "18", text: "Estigmatización"},
                {value: "19", text: "Explotación sexual"},
                {value: "20", text: "Extorsión"}, 
                {value: "21", text: "Homicidio"},
                {value: "22", text: "Feminicidio"}, 
                {value: "23", text: "Hostigamientos"}, 
                {value: "24", text: "Incursión de grupos armados"},
                {value: "25", text: "Lesiones"},
                {value: "26", text: "Ocupación de bienes civiles"}, 
                {value: "27", text: "Paro armado"},
                {value: "28", text: "Reclutamiento forzado"},
                {value: "29", text: "Secuestro"},
                {value: "30", text: "Tortura"},
                {value: "31", text: "Trata de personas"},
                {value: "32", text: "Uso o vinculación de niños, niñas y adolescentes"},
                {value: "33", text: "Violación"},
                {value: "34", text: "Violencia de pareja o intrafamilar"},
                {value: "35", text: "Otra"}
            ],
            opcionesCategoria : [
                {value: '', text: 'Selecciona una'},    
                {value: 'Agresion directa', text: 'Agresión directa'}, 
                {value: 'Violencia armada', text: 'Violencia armada'}, 
                {value: 'Situacion sospechosa', text: 'Situación sospechosa'}, 
            ],
            opcionesTipo : [
                {value: '', text: 'Selecciona una'},    
                {value: 'Individual', text: 'Individual'}, 
                {value: 'Colectivo', text: 'Colectivo'}, 
            ],
            opcionesEntorno : [
                { value: '', text: 'Selecciona una' },
                { value: 'Rural', text: 'Rural' },
                { value: 'Cabecera municipal', text: 'Cabecera municipal' },
                { value: 'Centro poblado', text: 'Centro poblado' }
            ],
            fechaOcurrencia: '',
            fechaValidacion: '',
            departamentoOcurrencia: '',
            municipioOcurrencia: '',
            entornoOcurrencia: '',
            territorioColectivo: '',
            barrio: '',
            tipoEvento: '',
            categoriaEvento: ''
        }
    },
    methods: {
        CleanData() {
            this.fechaOcurrencia = '',
            this.fechaValidacion = '',
            this.departamentoOcurrencia = '',
            this.municipioOcurrencia = '',
            this.entornoOcurrencia = '',
            this.territorioColectivo = '',
            this.barrio = '',
            this.tipoEvento = '',
            this.categoriaEvento = ''
        },
        lengthState(str) {
            if(str.length > 256)
                return false;

            if(str.length <= 0)
                return false;  

            return  true;
        }
    },
    computed: {
        primerMensaje () {
            return this.FormatForHuman(this.alert.attributes.primerMensaje)
        }
    },
    props: {
        alert: {
            type: Object,
            required: true
        }
    }
}
</script>