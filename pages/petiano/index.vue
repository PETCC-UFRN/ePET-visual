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
          <div class="row">
            <div class="col-md-12">
              <b-card
                header-tag="header"
                footer-tag="footer">
                <div slot="header">
                  <b-row>
                    <b-col>
                      <h3><i class="fa fa-align-justify"></i>  Próximos eventos</h3>
                    </b-col>
                  </b-row>
                </div>
                <div role="tablist" v-for="evento in eventos" :key="evento.idEvento">
                  <b-card no-body class="mb-1">
                    <b-card-header header-tag="header" class="p-1" role="tab">
                      <b-btn block href="#" v-b-toggle="'accordion' + evento.idEvento" variant="primary">{{evento.titulo}}</b-btn>
                    </b-card-header>
                    <b-collapse :id="'accordion' + evento.idEvento" accordion="my-accordion" role="tabpanel">
                      <b-card-body>
                        <p class="card-text">
                          <strong>Descrição: </strong>{{evento.descricao}}
                        </p>
                        <div class="card-text">
                          <p  class="mt-0 mb-0"><b>Período de inscrição:</b> {{evento.d_inscricao}} a {{evento.d_inscricao_fim}}.</p>
                          <p class="mt-0 mb-0"><b>Número de vagas:</b> {{evento.qtdVagas}}.</p>
                          <p class="mt-0 mb-0"><b>Local:</b> {{evento.local}}.</p>
                          <p class="mt-0 mb-0"><b>Carga horária:</b> {{evento.qtdCargaHoraria}}h.</p>
                          <p class="mt-0 mb-0"><b>Valor da inscrição:</b> R$ {{evento.valor}},00.</p>
                        </div>
                      </b-card-body>
                    </b-collapse>
                  </b-card>
                </div>
              </b-card>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12">
              <b-card
              header-tag="header"
              footer-tag="footer">
              <div slot="header">
                <b-row>
                  <b-col>
                    <h3><i class="fa fa-group fa-lg mt-4"></i> Petianos atuais</h3> 
                  </b-col>
                </b-row>
              </div>
                <b-table
                  :items="petianosAtuais"
                  :current-page="currentPage"
                  hover="hover"  
                  responsive="sm-6"
                  :per-page="2"
                  :fields="fields"
                >
                </b-table>
                <nav>
                  <b-pagination
                    :total-rows="petianosAtuais.length"
                    :per-page="2"
                    v-model="currentPage"
                    prev-text="Anterior"
                    next-text="Próximo"
                    hide-goto-end-buttons
                  />
                </nav>
              </b-card>
            </div>
          </div>
        </div>
        <div class="col-md-6">
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
          
                <b-list-group-item href="#" class="flex-column align-items-start mb-2">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{noticia.titulo}}</h5>
                    <small class="text-muted">{{noticia.inicio_exibicao}}</small>
                  </div>
                  <p class="mb-1">
                    {{noticia.corpo}}
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
import axios from "~/axios";
import style from "~/assets/css/loading.css";

export default {
  name: "dashboard",
  layout: "menu/petiano",
  data: function() {
    return {
      isLoading: true,
      noticias: [], // requisicao de noticias
      eventos: [],
      petianosAtuais: [],
      currentPage: 1,
      fields: [
        { key: "pessoa.nome", sortable: true, label: "Nome" },  
        { key: "pessoa.usuario.email", sortable: true, label: "Email" },
      ]
    };
  },
  mounted() {
    axios.get("noticia/?page=0").then(res => {
      this.noticias = res.data.content.slice(0,3);
      this.isLoading = false;
    })

    axios.get("eventos-abertos").then(res => {
      this.eventos = res.data;
    });

    axios.get("petianos-atuais").then(res => {
      this.petianosAtuais = res.data.content;
    });
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
