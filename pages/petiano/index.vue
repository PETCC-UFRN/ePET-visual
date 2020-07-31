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
        <div class="col-md-7">
          <div class="row">
            <div class="col-md-12">
              <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <b-row>
                  <b-col>
                    <h3><i class="fa fa-graduation-cap fa-fw"></i> Minhas tutorias</h3> 
                  </b-col>
                </b-row>
              </div>
                <b-table
                  :items="petianosTutoriasMinistradas"
                  :current-page="currentPage"
                  hover="hover"  
                  :bordered="false"
                  striped   
                  responsive="sm"
                  :per-page="4"
                  :fields="fieldsPetianoTutorias"
                >
                </b-table>
                <nav>
                  <b-pagination
                    :total-rows="petianosTutoriasMinistradas.length"
                    :per-page="4"
                    v-model="currentPage"
                    prev-text="Anterior"
                    next-text="Próximo"
                    pills
                    hide-goto-end-buttons
                  />
                </nav>
              </b-card>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
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
                <div role="tablist" v-for="evento in eventos" :key="evento.idEvento">
                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-btn
                        block
                        href="#"
                        v-b-toggle="'accordion' + evento.idEvento"
                        variant="teal"
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
                          :to="`petiano/eventos-abertos/${evento.idEvento}`"
                          >Ver detalhes</nuxt-link>      
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </div>
              </b-card>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <b-card
            header-tag="header"
            footer-tag="footer">
            <div slot="header">
              <b-row>
                <b-col>
                  <h3><i class="fa fa-newspaper-o" aria-hidden="true"></i> Notícias recentes</h3> 
                </b-col>
              </b-row>
            </div>
            <b-list-group>
              <div v-for="noticia in noticias" :key="noticia.idNoticia">
                <b-list-group-item :to="`/petiano/noticias/${noticia.idNoticia}`" class="flex-column align-items-start mb-2">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{noticia.titulo}}</h5>
                    <small class="text-muted">{{noticia.inicio_exibicao | moment}}</small>
                  </div>
                  <p class="mb-1">
                    {{noticia.corpo | cortarCorpo}}
                  </p>
                  <small class="text-muted"><em>Postado por {{noticia.petiano.pessoa.nome}}</em></small>
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
  layout: "menu/petiano",
  data: function() {
    return {
      isLoading: true,
      noticias: [], // requisicao de noticias
      eventos: [],
      petianosTutoriasMinistradas: [],
      currentPage: 1,
      fields: [
        { key: "pessoa.nome", sortable: true, label: "Nome" },  
        { key: "pessoa.usuario.email", sortable: true, label: "Email" },
      ],
      fieldsPetianoTutorias: [
        { key: "pessoa.nome", sortable: true, label: "Solicitante" },
        { key: "tutoria.disciplina.nome", sortable: true, label: "Disciplina"},    
        { key: "data", sortable: true, label: "Data", formatter: (date) => { if (date != null) return  moment(date).format('DD/MM/YYYY') } },  
        { key: "pessoa.usuario.email", sortable: true, label: "Email" },
      ]
    };
  },
  mounted() {
    this.$axios.get("noticia/?page=0").then(res => {
      this.noticias = res.data.content.slice(0,3);
      this.isLoading = false;
    })

    this.$axios.get("eventos-abertos").then(res => {
      this.eventos = res.data;
    });

    this.$axios.get("pesquisar-petiano-tutoria-ministradas").then(res => {
      this.petianosTutoriasMinistradas = res.data.content;
    });
  },
  filters: {
    cortarCorpo(mensagem) {
      return mensagem.length > 120 ? `${mensagem.substring(0,120)}...`  : mensagem;
    },
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
  computed: {
    resNoticias: function() {
      return this.noticias.filter(item => {
        return new Date(item.limite_exibicao).getTime() > Date.now() && new Date(item.inicio_exibicao).getTime() < Date.now();
      });
    }
  }
};
</script>

<style scoped>
h3 {
  font-weight: 300;
}
</style>