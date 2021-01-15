<template>
  <div>
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h3>
              <i class="fa fa-edit"></i> Cadastrar participante
            </h3>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label>
            <h5>Nome</h5>
          </label>
          <v-pessoas label="nome" v-model="form.pessoa"></v-pessoas>
        </div>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <b-button block type="submit" variant="success">
              <i class="fa fa-check"></i> Confirmar cadastrado de participante
            </b-button>
          </div>
        </form>
      </div>
    </div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3>
              <i class="fa fa-group fa-fw"></i> Participantes cadastrados
            </h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <div v-if="participantes.length > 0">
          <b-input-group class="mt-1 mb-3">
            <b-form-input v-model="keyword" placeholder="Busca por nome ou por CPF" type="text"></b-form-input>
            <b-input-group-text slot="append">
              <b-btn
                class="p-0"
                :disabled="!keyword"
                variant="link"
                size="sm"
                @click="keyword = ''"
              >
                <i class="fa fa-remove"></i>
              </b-btn>
            </b-input-group-text>
          </b-input-group>

          <b-table
            responsive="sm"
            :items="participantesFiltrados"
            :bordered="false"
            striped
            :per-page="pageSize"
            :fields="fields"
          >
            <template v-slot:cell(confirmado)="row">
              <div class="form-check">
                <b-form-checkbox size="lg" v-model="row.item.confirmado" disabled></b-form-checkbox>
              </div>
            </template>
            <template v-slot:cell(espera)="row">
              <div class="form-check">
                <b-form-checkbox size="lg" v-model="row.item.espera" disabled></b-form-checkbox>
              </div>
            </template>

            <template v-slot:cell(actions)="row">
              <b-button
                @click="confirmar(row.item.idParticipantes)"
                class="btn btn-sm btn-success mt-2"
                v-if="row.item.confirmado === false"
              >
                <i class="fa fa-check" aria-hidden="true"></i> Confirmar
              </b-button>
              <b-button
                @click="del(row.item.idParticipantes, row.index)"
                class="btn btn-sm btn-danger mt-1"
              >
                <i class="fa fa-trash-o fa-fw"></i> Remover
              </b-button>
              <nuxt-link
                :to="`/petiano/eventos-organizados/participantes/anexos/${row.item.idParticipantes}`"
                class="btn btn-sm btn-indigo mt-1"
              >
                <i class="fa fa-files-o fa-fw" ></i> Anexos
              </nuxt-link>
            
            </template>
            <template v-slot:cell(frequencias)="row" v-if="frequenciasCadastradas !== []">
              <b-row>
                <div v-if="row.item.confirmado === true">
                  <input type="number" v-for="(idPeriodo, index) in (eventoPeriodos)" :key="index"
                         :class="'m-2 form-control freq-' + row.item.idParticipantes" min="0"
                         @input="criaFrequencia(idPeriodo, row.item.idParticipantes, $event)"
                         :value="acharAssiduidade(row.item.idParticipantes, idPeriodo) || 0">
                </div>
              </b-row>
              <b-row>
                Assiduidade: <span :class="'span-freq-' + row.item.idParticipantes"></span>
              </b-row>
            </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="numElements"
              :per-page="pageSize"
              pills
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              hide-goto-end-buttons
            />
          </nav>
        </div>
        <div v-else>
          <h5>Nenhum participante cadastrado</h5>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
  import Swal from "sweetalert2";
  import PessoasSelect from "~/components/selects/PessoasSelect";

  export default {
    name: "dashboard",
    layout: "menu/petiano",
    components: {
      "v-pessoas": PessoasSelect
    },
    data() {
      return {
        form: {
          pessoa: 0
        },  
        pessoas: [],
        eventoPeriodos: {},
        frequenciasCadastradas: [],
        participantes: [],
        keyword: "",
        currentPage: 1,
        numElements: 1,
        pageSize: 20,
        evento: {},
        fields: [
          {key: "pessoa.nome", label: "Nome", sortable: true},
          {
            key: "pessoa.cpf",
            label: "CPF",
            sortable: true,
            formatter: value => {
              if (value != null)
                return `${value.substring(0, 3)}.${value.substring(
                  3,
                  6
                )}.${value.substring(6, 9)}-${value.substring(9, 11)}`;
            }
          },
          {key: "actions", label: "Ações disponíveis"},
          {key: "frequencias", label: "Frequência em dias"},
        ]
      };
    },
    mounted() {
      this.consumirParticipantesApi();
      this.getEventoPeriodos();
      this.getFrequenciasCadastradas();
    },
    watch: {
      currentPage: function(val){
        this.$axios
          .get(`participantes-evento/${this.$route.query.idEvento}?page=${(val-1)}`)
          .then(res => {
            this.participantes = res.data.content;
            this.numElements = res.data.totalElements;
            this.currentPage = res.data.number + 1;          
            this.pageSize = res.data.pageable.pageSize;
          });
      }
    },
    computed: {
      participantesFiltrados () {
        return this.keyword
            ? this.participantes.filter(item => item.pessoa.nome.includes(this.keyword) || item.pessoa.cpf.includes(this.keyword))
            : this.participantes
      }
    },
    methods: {
      consumirParticipantesApi() {
        this.$axios
          .get(`participantes-evento/${this.$route.query.idEvento}?page=0`)
          .then(res => {
            this.evento = res.data.content.length > 0 ? res.data.content[0].evento : {};
            this.participantes = res.data.content;
            this.numElements = res.data.totalElements;
            this.currentPage = res.data.number + 1;          
            this.pageSize = res.data.pageable.pageSize;
          })  
          .catch(err => {
            if (err.response.status === 404) {}
            else if (err.response.status === 403) {
              Swal.fire({
                title: "Houve um problema...",
                text: "Verifique se possui a permissão necessária ou se a sessão foi expirada. "
                + "Caso a sessão tenha sido expirado, tente novamente.",
                icon: "error"
              })
              .then( () => this.$route.push('/login'));
            } 
            else {
              Swal.fire({
                title: "Houve um problema...",
                text: "Por favor, tente recarregar a página. Caso não dê certo," + 
                " tente novamente mais tarde.",
                icon: "error"
              })
            }
          });
      },
      submitForm(e) {
        e.preventDefault();
        this.$axios
          .post(
            `participantes-cadastrar/${this.$route.query.idEvento}/${this.form.pessoa}`
          )
          .then(res => {
            Swal.fire({
              title: "Participante cadastrado",
              icon: "success"
            }).then(() => {
              this.form = Object.entries(this.form).map(item => {
                return (item = "");
              });
              this.consumirParticipantesApi();
            });
          })
          .catch(err => {
            Swal.fire({
              title: "Participante não cadastrado",
              icon: "error"
            }).then(() => {
              this.form = Object.entries(this.form).map(item => {
                return (item = "");
              });
            });
          });
      },
      del(id, rowId) {
        this.$axios
          .delete("participantes-remove/" + id)
          .then(() => {
            Swal.fire({
              title: "Participante removido",
              icon: "success"
            }).then(() => {
              this.participantes.splice(rowId, 1);
            });
          })
          .catch(() => {
            Swal.fire({
              title: "Participante não removido",
              icon: "error"
            });
          });
      },
      fazerDowloadAnexo(idParticipante) {
        this.$axios
          .get(`anexos-participantes/${idParticipante}`, {responseType: 'arraybuffer'})
          .then(res => {
            let fileURL = window.URL.createObjectURL(new Blob([res.data], {type:'application/*'}));
            let fileLink = document.createElement('a');

            fileLink.href = fileURL;
            fileLink.setAttribute('download', `Participante-${idParticipanteCorrigido}`);
            document.body.appendChild(fileLink);
            fileLink.click();

          })
          .catch(err => {
            if (err.response.status === 404) {
              Swal.fire({
                title: 'Anexo não encontrado',
                icon: 'info',
              });
            }
            else {
              Swal.fire({
                title: "Houve um problema...",
                text: "Por favor, tente recarregar a página. Caso não dê certo," + 
                " tente novamente mais tarde.",
                icon: 'error'
              })
            }
          });
    },
    confirmar(id) {
        this.$axios.post(`participantes-confirmar/${id}`).then(() => {
          Swal.fire({
            title: "Participante confirmado",
            icon: "success"
          })
            .then(() => {
              this.consumirParticipantesApi();
            })
            .catch(() => {
              Swal.fire({
                title: "Participante não confirmado",
                icon: "error"
              });
            });
        });
      },
      getFrequenciasCadastradas() {
        this.$axios.get('frequencia-evento/' + this.$route.query.idEvento).then(res => {
          this.frequenciasCadastradas = res.data.content.map(frequencia => {
            this.updateDomAssiduidadeSpan(frequencia.participante.idParticipantes);
            return {
              idParticipante: frequencia.participante.idParticipantes,
              idPeriodo: frequencia.periodo_evento.idPeriodo_Evento,
              idFrequencia: frequencia.idFrequencia,
              assiduidade: frequencia.assiduidade,
            }
          });
        })
      },
      getEventoPeriodos() {
        this.$axios.get('periodo-evento-buscar/' + this.$route.query.idEvento).then(res => {
          this.eventoPeriodos = res.data.content.map(periodo => periodo.idPeriodo_Evento);
        });
      },
      criaFrequencia(idPeriodo, idParticipante, e) {
        if (!isNaN(e.target.value)) {
          this.$axios.post(`frequencia-cadastrar/${idPeriodo}/${idParticipante}`, {
            assiduidade: e.target.value
          }).then(() =>{
            this.updateDomAssiduidadeSpan(idParticipante);
          }).catch(() => {
            Swal.fire({
              title: "Não foi possível cadastrar a frequência",
              text: "Tente novamente mais tarde.",
              icon: "error"
            })
          });
        }
      },
      acharAssiduidade(idParticipante, idPeriodo) {
        let maybeFind = this.frequenciasCadastradas.find(i => i.idParticipante === idParticipante && i.idPeriodo === idPeriodo);
        this.updateDomAssiduidadeSpan(idParticipante);
        return (typeof maybeFind !== 'undefined') ? maybeFind.assiduidade : 0;
      },
      updateDomAssiduidadeSpan(idParticipante) {
        let total = [...this.$el.getElementsByClassName('freq-' + idParticipante)].reduce((c, i) => i.valueAsNumber + c, 0);
        let dom = this.$el.getElementsByClassName('span-freq-' + idParticipante);

        if (dom[0] && this.evento) {
          let percentual = (total * 100 / this.evento.qtdCargaHoraria);
          dom[0].textContent = percentual + '%';
          if(percentual < this.evento.percentual){
            dom[0].style.color = 'red';
          }else{
            dom[0].style.color = 'green';
          }
        }
      }
    }
  };
</script>

<style scoped>

  h3, h4 {
    font-weight: 300;
  }

  h4 {
    text-align: center;
  }

  strong {
    font-size: 18px;
  }
</style>
