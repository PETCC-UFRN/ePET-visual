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
                  <div v-for="evento in eventos" :key="evento.idEvento">
                    <b-list-group-item :to="`/tutor/eventos-abertos/${evento.idEvento}`" class="flex-column align-items-start mb-2">
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
                    <h3><i class="fa fa-group mt-2"></i> Membros ativos</h3> 
                  </b-col>
                </b-row>
              </div>
                <b-table
                  :items="petianosAtuais"
                  :current-page="currentPage"
                  hover="hover"  
                  responsive="sm"
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
                    pills
                    hide-goto-end-buttons
                  />
                </nav>
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
          
                <b-list-group-item :to = "`/tutor/noticias/${noticia.idNoticia}`"  class="flex-column align-items-start mb-2">
                  <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{{noticia.titulo}}</h5>
                    <small class="text-muted">{{noticia.inicio_exibicao | moment}}</small>
                  </div>
                  <p class="mb-1">
                    {{noticia.corpo | cortarCorpo}}
                  </p>
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
  layout: "menu/tutor",
  data: function() {
    return {
      isLoading: true,
      noticias: [], // requisicao de noticias
      eventos: [],
      petianosAtuais: [],
      currentPage: 1,
      fields: [
        { key: "pessoa.nome", label: "Nome" },
        { key: "pessoa.usuario.email", label: "Email" },  
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

    this.$axios.get("petianos-atuais").then(res => {
      this.petianosAtuais = res.data.content;
    });
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
