<template>
  <div>
    <div v-if="isLoading" class="parent-lds-ellipsis">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-md-6">
          <b-row>
            <b-col>
              <b-card 
                header-tag="header" 
                footer-tag="footer"
              >
                <div slot="header">
                  <b-row>
                    <b-col>
                      <h3>
                        <i class="fa fa-graduation-cap fa-fw"></i> Minhas tutorias
                      </h3>
                    </b-col>
                  </b-row>
                </div>
                <b-list-group>
                  <div v-for="tt in tutorias" :key="tt.idTutoria_ministrada">
                    <b-list-group-item href="#" class="flex-column align-items-start mb-2">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{tt.tutoria.disciplina.nome}}</h5>
                        <small class="text-muted tamanho">{{tt.tutoria.data | moment}}</small>
                      </div>
                      <p class="mb-1">{{tt.tutoria.petiano.pessoa.nome}}</p>
                    </b-list-group-item>
                  </div>
                </b-list-group>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <b-card header-tag="header" footer-tag="footer">
                <div slot="header">
                  <b-row>
                    <b-col>
                      <h3>
                        <i class="fa fa-calendar-check-o fa-fw"></i> Eventos abertos 
                      </h3>
                    </b-col>
                  </b-row>
                </div>
                <b-list-group>
                  <div v-for="evento in eventos_abertos" :key="evento.idEvento">
                    <b-list-group-item :to="`/usuario/eventos-abertos/${evento.idEvento}`" class="flex-column align-items-start mb-2">
                      <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{{evento.titulo}}</h5>
                      </div>
                      <p class="mb-0">Carga horária: {{evento.qtdCargaHoraria}} h(s)</p>
                      <p class="mb-0">Valor da inscrição: {{new Intl.NumberFormat([], { style: 'currency', currency: 'BRL'}).format(evento.valor) }}</p>
                      <p class="mb-0">Quantidade de vagas: {{evento.qtdVagas}}</p>
                    </b-list-group-item>
                  </div>
                </b-list-group>    
              </b-card>
            </b-col>
          </b-row>
        </div>    

        <div class="col-md-6">
          <b-card header-tag="header" footer-tag="footer">
            <div slot="header">
              <b-row>
                <b-col>
                  <h3>
                    <i class="fa fa-newspaper-o" aria-hidden="true"></i> Notícias recentes
                  </h3>
                </b-col>
              </b-row>
            </div>
            <b-list-group>
              <div v-for="noticia in noticias" :key="noticia.idNoticia">
                <b-list-group-item :to="`/usuario/noticias/${noticia.idNoticia}`" class="flex-column align-items-start mb-2">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{noticia.titulo}}</h5>
                    <small class="text-muted">{{noticia.inicio_exibicao | moment}}</small>
                  </div>
                  <p class="mb-1">{{noticia.corpo | cortarCorpo}}</p>
                  <small class="text-muted">
                    <em>Postado por {{noticia.petiano.pessoa.nome}}</em>
                  </small>
                </b-list-group-item>
              </div>
            </b-list-group>
          </b-card>
        </div>

      </div>
    </div>
  </div>
</template>

<script>

import style from "~/assets/css/loading.css";
import moment from "moment";

export default {
  name: "dashboard",
  layout: "menu/usuario",
  data: function() {
    return {
      isLoading: true,
      noticias: [], 
      tutorias: [],
      numItemsTutoria: 0,
      eventos: [],
      eventos_abertos:[],
      currentPage: 1,
      fields: [
        { key: "titulo", sortable: true, label: "Título" },
        { key: "petiano.pessoa.nome", sortable: true, label: "Publicado por" },
        { key: "actions", label: "Ações disponíveis" }
      ]
    };
  },
  mounted() {
   
    this.$axios
      .get("eventos-abertos")
      .then(res => {
        this.eventos_abertos = res.data;
      });

    this.$axios
      .get("noticias-atuais/?page=0")
      .then(res => {
        this.noticias = res.data.content.slice(0, 3);
        this.isLoading = false;
      })
      .catch(err => {
        if (err.response.status) {
          this.isLoading = false;
        }
      });

      this.consumindoTutoriasMinistradasApi();
  },
  methods : {
    consumindoTutoriasMinistradasApi() {
      this.$axios
        .get(`/pesquisar-pessoa-tutorias-ministradas/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          this.tutorias = res.data.content;
          this.isLoading = false;
          this.numItemsTutoria = res.data.totalElements;

        })
        .catch( err => {
          if (err.response.status === 404) {}
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
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    },
    cortarCorpo(mensagem) {
      return mensagem.length > 120 ? `${mensagem.substring(0,120)}...`  : mensagem;
    },
    cortarCorpoEvento(mensagem) {
      return mensagem.length > 200 ? `${mensagem.substring(0,200)}...`  : mensagem;
    }
  },
};
</script>


<style scoped>
h3, h4 {
  font-weight: 300;
}
.tamanho {
  font-size: 15px;
}
</style>