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
                <b-card header-tag="header" footer-tag="footer">
                <div slot="header">
                  <b-row>
                    <b-col>
                      <h3>
                        <i class="fa fa-check fa-fw"></i> Minhas tutorias
                      </h3>
                    </b-col>
                  </b-row>
                </div>
                <b-list-group>
                  <div v-for="tt in tutorias" :key="tt.idTutoria_ministrada">
                    <b-list-group-item href="#" class="flex-column align-items-start mb-2">
                      <div class="d-flex w-100 justify-content-between">
                        <!-- <h5 class="mb-1">{{tt.disciplina.nome}}</h5> -->
                        <small class="text-muted">{{tt.data}}</small>
                      </div>
                      <p class="mb-1">{{tt.tutoria.petiano.pessoa.nome}}</p>
                      <!--
                      <small class="text-muted">
                        <em>Postado por {{noticia.petiano.pessoa.nome}}</em>
                      </small>
                      -->
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
                        <i class="fa fa-calendar-minus-o fa-fw"></i> Eventos abertos 
                      </h3>
                    </b-col>
                  </b-row>
                </div>
                <div role="tablist" v-for="evento in eventos_abertos" :key="evento.idEvento">
                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-btn
                        block
                        href="#"
                        v-b-toggle="'accordion' + evento.idEvento"
                        variant="primary"
                      >{{evento.titulo}}</b-btn>
                    </b-card-header>
                    <b-collapse
                      :id="'accordion' + evento.idEvento"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <p class="card-text">
                          <strong>Descrição:</strong>
                          {{evento.descricao}}
                        </p>
                        <nuxt-link
                            class="btn btn-sm btn-info w-100 mt-2"
                          :to="`usuario/eventos/eventos-abertos/${evento.idEvento}`"
                          >Ver mais informações</nuxt-link>      
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </div>
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
                        <i class="fa fa-calendar-check-o fa-fw"></i> Meus eventos 
                      </h3>
                    </b-col>
                  </b-row>
                </div>
                <div role="tablist" v-for="evento in eventos" :key="evento.idEvento">
                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-btn
                        block
                        href="#"
                        v-b-toggle="'accordion' + evento.idEvento"
                        variant="primary"
                      >{{evento.titulo}}</b-btn>
                    </b-card-header>
                    <b-collapse
                      :id="'accordion' + evento.idEvento"
                      accordion="my-accordion"
                      role="tabpanel"
                    >
                      <b-card-body>
                        <p class="card-text">
                          <strong>Descrição:</strong>
                          {{evento.descricao}}
                        </p>
                        <div class="card-text">
                          <p class="mt-0 mb-0">
                            <b>Período de inscrição:</b>
                            {{evento.d_inscricao}} a {{evento.d_inscricao_fim}}.
                          </p>
                          <p class="mt-0 mb-0">
                            <b>Número de vagas:</b>
                            {{evento.qtdVagas}}.
                          </p>
                          <p class="mt-0 mb-0">
                            <b>Local:</b>
                            {{evento.local}}.
                          </p>
                          <p class="mt-0 mb-0">
                            <b>Carga horária:</b>
                            {{evento.qtdCargaHoraria}}h.
                          </p>
                          <p class="mt-0 mb-0">
                            <b>Valor da inscrição:</b>
                            R$ {{evento.valor}},00.
                          </p>
                        </div>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </div>
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
                  <p class="mb-1">{{noticia.corpo}}</p>
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
      noticias: [], // requisicao de noticias
      tutorias: [],
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
      .get("noticia/?page=0")
      .then(res => {
        this.noticias = res.data.content.slice(0, 3);
        this.isLoading = false;
      })
      .catch(err => {
        if (err.response.status) {
          this.isLoading = false;
        }
      });
    
    this.$axios
      .get(`/pesquisar-pessoa-tutorias-ministradas/${this.$store.state.profile.idPessoa}`)
      .then(res => {
        this.tutorias = res.data.content.slice(0, 3);
        this.isLoading = false;
      })
      .catch(err => {
        if (err.response.status) {
          this.isLoading = false;
        }
      });
  },
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
  computed: {
    resNoticias: function() {
      return this.noticias.filter(item => {
        return (
          new Date(item.limite_exibicao).getTime() > Date.now() &&
          new Date(item.inicio_exibicao).getTime() < Date.now()
        );
      });
    }
  }
};
</script>


<style scoped>
h3, h4 {
  font-weight: 300;
}
</style>