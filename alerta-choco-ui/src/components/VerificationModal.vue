<template>
    <b-modal size="xl" id="verification-modal" title="Verificación de alerta" @close="cleanData()" @hide="cleanData()">
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

            <div class="mt-3">
            <h6> Entorno de ocurrencia: </h6>
            <b-form-select v-model="subcategoriaEventoEnum" :options="opcionesSubcategoria" multiple :select-size="10" :state="lengthState(subcategoriaEventoEnum)"></b-form-select>
            </div>

            <div class="mt-3">
            <h6> ¿Otro entorno? ¿Cuál?: </h6> <b-form-input 
                v-model="departamentoOcurrencia"
                placeholder='Opcional'
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Medidas de protección existentes: </h6>
            <b-form-select v-model="medidasProteccionExistentes" :options="opcionesMedidas" :state="lengthState(medidasProteccionExistentes)"></b-form-select>
            </div>

            <div class="mt-3">
            <h6> Otras víctimas: </h6>
            <b-form-select v-model="otrasVictimas" :options="opcionesVictimas" :state="lengthState(otrasVictimas)"></b-form-select>
            </div>

            <div class="mt-3">
            <h6> Total víctimas: </h6> 
            <b-form-input 
                v-model="totalVictimas"
                :state="lengthState(totalVictimas)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Nombres de otras víctimas: </h6> 
            <b-form-input 
                v-model="otrasVictimasNombres"
                :state="lengthState(otrasVictimasNombres)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Relación con la víctima: </h6> 
            <b-form-input 
                v-model="relacionVictima"
                :state="lengthState(relacionVictima)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Tipo de sujeto afectado: </h6>
            <b-form-select v-model="afectadosEnum" :options="opcionesAfectados" multiple :select-size="3" :state="lengthState(afectadosEnum)"></b-form-select>
            </div>

            <div class="mt-3">
            <h6> No. de familias afectadas: </h6> 
            <b-form-input 
                v-model="familias"
                :state="lengthState(familias)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> No. de personas afectadas: </h6> 
            <b-form-input 
                v-model="numeroPersonas"
                :state="lengthState(numeroPersonas)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Pertenencia étnica de afectados: </h6>
            <b-form-select v-model="etniaAfectadosEnum" :options="opcionesEtniaAfectados" multiple :select-size="3" :state="lengthState(etniaAfectadosEnum)"></b-form-select>
            </div>

            <div class="mt-3">
            <h6> Situación asociada: </h6> 
            <b-form-input 
                v-model="situacionAsociada"
                :state="lengthState(situacionAsociada)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Riesgo percibido: </h6> 
            <b-form-input 
                v-model="riesgoPercibido"
                :state="lengthState(riesgoPercibido)" 
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

            <div class="mt-3">
            <h6> Nombre Víctima: </h6> <b-form-input 
                v-model="nombreVictima"
                :state="lengthState(nombreVictima)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Edad Víctima: </h6> <b-form-input 
                v-model="edadVictima"
                :state="lengthState(edadVictima)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Pertenencia étnica: </h6>
            <b-form-select v-model="etniaVictima" :options="opcionesEtnia" :state="lengthState(etniaVictima)"></b-form-select>
            </div>

            <div class="mt-3">
            <h6> Rol de víctima: </h6>
            <b-form-select v-model="rolVictimaEnum" :options="opcionesRol" multiple :select-size="3" :state="lengthState(rolVictimaEnum)"></b-form-select>
            </div>

            <div class="mt-3">
            <h6> ¿Otro rol? ¿Cuál?: </h6> <b-form-input 
                v-model="rolVictimaOtro"
                placeholder='Opcional'
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Sexo: </h6>
            <b-form-select v-model="sexo" :options="opcionesSexo" :state="lengthState(sexo)"></b-form-select>
            </div>

            <div class="mt-3">
            <h6> Identidad de género: </h6>
            <b-form-select v-model="identidadGenero" :options="opcionesIdentidad" :state="lengthState(identidadGenero)"></b-form-select>
            </div>

            <div class="mt-3">
            <h6> Perfil de la víctima: </h6> 
            <b-form-input 
                v-model="perfilVictima"
                :state="lengthState(perfilVictima)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Tipo de presunto responsable: </h6>
            <b-form-select v-model="tipoResponsableEnum" :options="opcionesResponsables" multiple :select-size="3" :state="lengthState(tipoResponsableEnum)"></b-form-select>
            </div>

            <div class="mt-3">
            <h6> Presunto responsable: </h6> 
            <b-form-input 
                v-model="presuntoResponsable"
                :state="lengthState(presuntoResponsable)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Acciones de mitigación: </h6> 
            <b-form-input 
                v-model="accionesMitigacion"
                :state="lengthState(accionesMitigacion)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <div class="mt-3">
            <h6> Instituciones Informadas: </h6>
            <b-form-select v-model="institucionesEnum" :options="opcionesInstituciones" multiple :select-size="5" :state="lengthState(institucionesEnum)"></b-form-select>
            </div>

            <div class="mt-3">
            <h6> ¿Otra institución? ¿Cuál?: </h6> 
            <b-form-input 
                v-model="otraInstitucion"
                :state="lengthState(otraInstitucion)" 
                aria-describedby="input-live-feedback"
                trim
            ></b-form-input>
            </div>

            <!-- This will only be shown if the preceding input has an invalid state -->
            <b-form-invalid-feedback id="input-live-feedback"> Máximo 256 carácteres </b-form-invalid-feedback>
            </b-col>
        </b-row>
        <b-row>
        <div class="mt-3">
            <h6> Derechos límitados: </h6>
            <b-form-select v-model="derechosDDHEnum" :options="opcionesDerechos" multiple :select-size="10" :state="lengthState(derechosDDHEnum)"></b-form-select>
            </div>
        </b-row>
    </b-modal>
</template>
<script>

export default {
    data () {
        return {
            opcionesSubcategoria : [
                {value: "", text: "Selecciona varias (Usa cmd o ctrl)"}, 
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
            opcionesEtnia : [
                { value: '', text: 'Selecciona una' },
                { value: 'Afrocolombiano, negro o palenquero', text: 'Afrocolombiano, negro o palenquero'},
                { value: 'Indigena', text: 'Indígena'}, 
                { value: 'Raizal', text: 'Raizal'},
                { value: 'Rom', text: 'Rom'},
                { value: 'Mestizo', text: 'Mestizo'},
                { value: 'Blanco', text: 'Blanco'},
                { value: 'Ninguna de las anteriores', text: 'Ninguna de las anteriores'}
            ],
            opcionesEtniaAfectados : [
                { value: '', text: 'Selecciona varias (Usa cmd o ctrl)' },
                { value: '0', text: 'Afrocolombiano, negro o palenquero'},
                { value: '1', text: 'Indígena'}, 
                { value: '2', text: 'Raizal'},
                { value: '3', text: 'Rom'},
                { value: '4', text: 'Mestizo'},
                { value: '5', text: 'Blanco'},
                { value: '6', text: 'Ninguna de las anteriores'}
            ],
            opcionesRol : [
                {value: "", text: "Selecciona varias (Usa cmd o ctrl)"},
                { value: '0', text: 'Autoridad espiritual / sabedor tradicional'},
                { value: '1', text: 'Líder / esa organizativo'},
                { value: '2', text: 'Familiar Defensor / a'},
                { value: '3', text: 'Líder / esa cultural'},
                { value: '4', text: 'Etnoeducador'},
                { value: '5', text: 'Partera'},
                { value: '6', text: 'Otro'}
            ],
            opcionesSexo: [
                { value: '', text: 'Selecciona una' },
                { value: 'Mujer', text: 'Mujer'},
                { value: 'Hombre', text: 'Hombre'},
                { value: 'Intersexual', text: 'Intersexual'},   
            ],
            opcionesIdentidad: [
                { value: '', text: 'Selecciona una' },
                { value: 'Si', text: 'Sí'},
                { value: 'No', text: 'No'},
                { value: 'Sin informacion', text: 'Sin información'},
            ],
            opcionesVictimas: [
                { value: '', text: 'Selecciona una'},
                { value: 'Si', text: 'Sí'},
                { value: 'No', text: 'No'}
            ],
            opcionesAfectados: [
                { value: '', text: 'Selecciona varias (Usa cmd o ctrl)'},
                { value: '0', text: 'Familia'},
                { value: '1', text: 'Comunidad'},
                { value: '2', text: 'Territorio'},
                { value: '3', text: 'Organización'}
            ],
            opcionesMedidas: [
                { value: '', text: 'Selecciona una'},
                { value: 'Sin informacion', text: 'Sin información'},
                { value: 'Solicitada - en tramite', text: 'Solicitada - en trámite'},
                { value: 'Solicitada - negada', text: 'Solicitada - negada'},
                { value: 'Solicitada - Otorgada', text: 'Solicitada - Otorgada'},
                { value: 'Levantada', text: 'Levantada'}
            ],
            opcionesDerechos: [
                { value: '', text: 'Selecciona varias (Usa cmd o ctrl)'},
                { value: '0', text: 'Gestionar la protección de otras personas o la propia'},
                { value: '1', text: 'Asociarse u organizarse para la defensa de los derechos humanos'},
                { value: '2', text: 'Reunirse o manifestarse pacíficamente'},
                { value: '3', text: 'Recabar, obtener, recibir y poseer información sobre derechos humanos'},
                { value: '4', text: 'Promover debates y principios nuevos sobre derechos humanos'},
                { value: '5', text: 'Presentar ante insituciones públicas críticas o propuestas de mejora'},
                { value: '6', text: 'Denunciar las políticas y acciones oficiales y a que se examinen estas denuncias'},
                { value: '7', text: 'Ofrecer y prestar asistencia para defender los derechos humanos'},
                { value: '8', text: 'Asistir a las audiencias, reuniones con insituciones, procedimientos y juicios públicos'},
                { value: '9', text: 'Dirigirse sin barreras a las ONG y a comunicarse con ellas'},
                { value: '10', text: 'Contar con recursos eficaces para la protección y defensa de los derechos humanos'},
                { value: '11', text: 'Ejercer legitimamente la ocupación o profesión de defensor de derechos humanos'},
                { value: '12', text: 'Obtener protección eficaz de las leyes nacionales al reaccionar u oponerse, por medios pacíficos, a actividades y actos, con inclusión de las omisiones, imputables a los Estados que causen violaciones de los derechos humanos'},
                { value: '13', text: 'Solicitar, recibir y utilizar recursos con el objeto de proteger los derechos humanos'},
            ],
            opcionesResponsables: [
                { value: '', text: 'Selecciona varias (Usa cmd o ctrl)'},
                { value: '0', text: 'Fuerza Pública'},
                { value: '1', text: 'Grupo Guerrillero'},
                { value: '2', text: 'Grupo heredero del paramilitarismo'},
                { value: '3', text: 'Grupo disidente de guerrillas'},
                { value: '4', text: 'Grupo de seguridad privada'},
                { value: '5', text: 'Desconocido'}      
            ],
            opcionesInstituciones: [
                { value: '', text: 'Selecciona varias (Usa cmd o ctrl)'},
                { value: '0', text: 'Policía'},
                { value: '1', text: 'Ejército'},
                { value: '2', text: 'Otras fuerzas militares'},
                { value: '3', text: 'Defensoría del Pueblo'},
                { value: '4', text: 'Unidad Nacional de Protección'},
                { value: '5', text: 'Personería'},
                { value: '6', text: 'Alcaldía (secretarías)'},
                { value: '7', text: 'Comisaría o Inspección de Policia'},
                { value: '8', text: 'Otra'}
            ],
            fechaOcurrencia: '',
            fechaValidacion: '',
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
            otraInstitucion: ''
        }
        
    },
    methods: {
        cleanData() {
            this.fechaOcurrencia = '',
            this.fechaValidacion = '',
            this.departamentoOcurrencia = '',
            this.municipioOcurrencia = '',
            this.entornoOcurrencia = '',
            this.territorioColectivo = '',
            this.barrio = '',
            this.tipoEvento = '',
            this.categoriaEvento = '',
            this.subcategoriaEventoEnum = [],
            this.subcategoriaEventoOtra = '',
            this.nombreVictima = '',
            this.edadVictima = '',
            this.etniaVictima = '',
            this.rolVictimaEnum = [],
            this.rolVictimaOtro = '',
            this.sexo = '',
            this.identidadGenero = '',
            this.perfilVictima = '',
            this.medidasProteccionExistentes = '',
            this.otrasVictimas = '',
            this.totalVictimas = '',
            this.otrasVictimasNombres = '',
            this.relacionVictima = '',
            this.afectadosEnum = [],
            this.familias = '',
            this.numeroPersonas = '',
            this.etniaAfectadosEnum = [],
            this.derechosDDHEnum = [],
            this.tipoResponsableEnum = [],
            this.presuntoResponsable = '',
            this.situacionAsociada = '',
            this.accionesMitigacion = '',
            this.riesgoPercibido = '',
            this.institucionesEnum = [],
            this.otraInstitucion = ''
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