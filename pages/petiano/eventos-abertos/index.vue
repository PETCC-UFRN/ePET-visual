<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-calendar-check-o px-2"></i>Eventos abertos</h2>
          </b-col>
          <b-col>
            <nuxt-link
              class="btn btn-sm btn-primary float-right mt-4"
              to="/petiano/eventos-abertos/create"
            ><i class="fa fa-plus px-2" aria-hidden="true"></i> Adicionar evento</nuxt-link>
          </b-col>
        </b-row>
      </template>

      <div v-if="eventosLoading === true" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>
        <div v-if="eventos.length > 0">

          <b-input-group  class="mt-3 mb-3" >
            <b-form-input
              v-model="keyword"
              placeholder="Busca por título"
              type="text"
            ></b-form-input>
            <b-input-group-text slot="append">
              <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="search"><i class="fa fa-search"></i></b-btn>
            </b-input-group-text>
            <b-input-group-text slot="append">
              <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="cancelSearch"><i class="fa fa-remove"></i></b-btn>
            </b-input-group-text>
          </b-input-group>
          <b-table
            responsive="sm"
            :items="eventos"
            :current-page="currentPage"
            :bordered="false"
            striped   
            :per-page="20"
            :fields="fields"
          >
            <template  v-slot:cell(actions)="row">
              <nuxt-link
                class="btn btn-sm btn-cyan mt-2"
                :to="`/petiano/eventos-abertos/${row.item.idEvento}`"
              ><i class="fa fa-eye fa-fw"></i> Detalhes</nuxt-link>
              
              <b-button
                  @click.prevent="inscrever(row.item)"
                  class="btn btn-sm btn-success mt-1"
                ><i class="fa fa-check-circle fa-fw"></i> Inscrever</b-button>
            </template>
          </b-table>
          <div>
            <Pagination
              :totalRows="numItems"
              :perPage="perPage"
              v-on:currentPage="setCurrentPage"
            />
          </div>
        </div>
        <div v-else>
          <h5>Nenhum evento cadastrado</h5>
        </div>
      </div>
    </b-card>
  </div>
</template>

<script>


import Swal from "sweetalert2";
import moment from "moment";
import Pagination from "~/components/Pagination";

export default {
  name: "dashboard",
  layout: "menu/petiano",
  components: {
    Pagination
  },
  data() {
    return {
      eventosLoading: true,
      eventosAtivarLoading: false,
      eventosRemoverLoading: false,
      keyword: '',
      eventos: [],
      currentPage: 0,
      numItems: 0,
      perPage: 20,
      fields: [
        { key: "titulo", sortable: true, label: "Título"  },
        { key: "d_inscricao", sortable: true, label: "Início das inscrições" , formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY') } },
        { key: "d_inscricao_fim", sortable: true, label: "Fim das inscrições" , formatter: (date) => { if (date != null) return  moment(date).format('DD/MM/YYYY') } },
        { key: "d_evento_inicio", sortable: true, label: "Início do evento" , formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY') } },
        { key: "d_evento_fim", sortable: true, label: "Fim do eventos" , formatter: (date) => { if (date != null) return  moment(date).format('DD/MM/YYYY') } },
        { key: "actions", label: "Ações disponíveis"  }
      ]
    };
  },
  mounted () {
    this.consumindoEventosApi();
  },
  watch: {
    currentPage: function(val) {
      this.$axios.get("eventos?page=" + val).then(res => {
        this.eventos = res.data.content;
        this.numPages = res.data.totalElements;
      });
    }
  },
  methods: {
    cancelSearch() {
      this.keyword = ''
      this.consumindoEventosApi()
    },
    search() {
      this.$axios.get(`pesquisar-evento/${this.keyword}`)
        .then( res => {
          this.eventos = res.data.content;
        })
        .catch( err => {
            if (err.response.status === 404) {
              Swal.fire({
                title: "Nenhum evento cadastrado",
                icon: 'info',
              });
            }
            else {
              Swal.fire({
                title: "Houve um problema...",
                text: "Por favor, tente recarregar a página. Caso não dê certo," + 
                " tente novamente mais tarde.",
                icon: 'error',
              })
            }
        });
    },
    setCurrentPage(val){
      this.currentPage = val;
    },
    consumindoEventosApi() {
      this.$axios.get("eventos-abertos-nao-organizo-ativos")
        .then(res => {
          this.eventos = res.data.content;
          this.eventosLoading = false;
          this.numItems = res.data.totalElements;
        })
        .catch( err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhum evento cadastrado",
              icon: 'info',
            });
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error',
            })
          }
        });
    },
    inscrever(evento) {
      const idEvento = evento.idEvento
      const valor = evento.valor 
      const inscricao_inicio = moment(evento.d_inscricao).format('DD/MM'); 
      const inscricao_fim = moment(evento.d_inscricao_fim).format('DD/MM'); 

      const evento_inicio = moment(evento.d_evento_inicio).format('DD/MM'); 
      const evento_fim = moment(evento.d_evento_fim).format('DD/MM'); 

      const valorEvento = new Intl
              .NumberFormat([], { style: 'currency', currency: 'BRL'})
              .format(evento.valor);

      Swal.mixin({
        showCancelButton: true,
        confirmButtonText: 'Confirmo',
        cancelButtonText: 'Não confirmo',
        progressSteps: ['1', '2']
      }).queue([
        {
          title: 'Informações do evento',
          html: `<p><strong>Período de inscrição:</strong> ${inscricao_inicio} a ${inscricao_fim}</p> 
                  <p><strong>Período de realização:</strong> ${evento_inicio} a ${evento_fim}</p> 
                  <p><strong>Carga horária:</strong> ${evento.qtdCargaHoraria} h(s)</p> 
                  <p><strong>Total de vagas:</strong> ${evento.qtdVagas}</p> 
                  <p><strong>Valor da inscrição:</strong> ${valorEvento}</p>
                  <p><strong>Local do curso: </strong> ${evento.local}</p> 
                `
        },
        {
          title: 'Confirmação de inscrição',
          html: `Confirmo minha inscrição no evento ${evento.titulo}. Caso o evento <strong>NÃO SEJA GRATUITO</strong>, devo
          efetuar o pagamento do valor da inscrição em até 7 dias para que essa seja confirmada. Só dessa forma é
          que a vaga fica garantida.`
        }
      ])
      .then((result) => {
        if ( result.value != null) {
          this.$axios
            .post(`participantes-cadastrar/${idEvento}/${this.$store.state.profile.idPessoa}`)
            .then(res => {
              if (valor > 0) {
                Swal.fire({
                  title: "Inscrição realizada",
                  icon: "success",
                  text: "A confirmação da inscrição será mediante ao pagamento. Acesse a " +
                  "página de eventos inscritos para finalizar o pagamento da inscrição."
                });
              }
              else {
                Swal.fire({
                  title: "Inscrição realizada",
                  icon: "success",
                  text: "Sua inscrição também foi confirmada devido o evento ser gratuito." + 
                  " Preste atenção às datas e aproveite o evento."
                });
              }
            })
            .catch( err => {
              if (err.response.status === 500) {
                if (err.response.data.message === "Essa pessoa já fez sua inscrição no evento!") {
                  if (valor > 0) {
                    Swal.fire({
                      title: "Inscrição já foi realizada",
                      icon: 'info',
                      text: 'Verifique a situação da confirmação do pagamento da sua inscrição.' +
                      ' Para isso, acesse a página eventos inscritos.',
                    });
                  }
                  else {
                    Swal.fire({
                      title: "Inscrição já foi realizada",
                      icon: 'info',
                      text: "Sua inscrição também já foi confirmada devido o evento ser gratuito." + 
                      " Preste atenção às datas e aproveite o evento."
                    });
                  }
                }
                else {
                  Swal.fire({
                    title: "Inscrição não realizada",
                    icon: 'error',
                  });
                }  
              }
              else {
                Swal.fire({
                  title: "Houve um problema...",
                  text: "Por favor, tente recarregar a página. Caso não dê certo," + 
                  " tente novamente mais tarde.",
                  icon: 'error',
                });
              }  
            });
        }  
      });

    }
  }
};
</script>

<style scoped>
h2, h4 {
  font-weight: 300;
}
</style>
