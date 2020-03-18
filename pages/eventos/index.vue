<template>
  <div >
        <Comum/>  
        <div class="container">
          <br>
          <h1 class="mt-3 mb-0"><i class="far fa-calendar-alt"></i> Eventos</h1>
          <hr>
          <b-card-group columns class="cards">
                <div v-for="evento in eventos" :key="evento.id">
                  <a :href="'/eventos/' + evento.idEvento">
                    <b-card>
                      <b-card-title><h3>{{evento.titulo}} </h3></b-card-title>
                      <hr>
                      <b-card-text class="small text-muted">  <em>Postado em 15-10-2018 </em></b-card-text>
                      <b-card-text>
						  	<p  class="mt-0 mb-0"><b>Período de inscrição:</b> {{evento.d_inscricao}} a {{evento.d_inscricao_fim}}.</p>
							<p class="mt-0 mb-0"><b>Número de vagas:</b> {{evento.qtdVagas}}.</p>
							<p class="mt-0 mb-0"><b>Local:</b> {{evento.local}}.</p>
							<p class="mt-0 mb-0"><b>Carga horária:</b> {{evento.qtdCargaHoraria}}h.</p>
							<p class="mt-0 mb-0"><b>Valor da inscrição:</b> R$ {{evento.valor}},00.</p>
						</b-card-text>
                    </b-card>
                  </a>
                </div>
              </b-card-group>


          <!-- <div v-if="filterEventos.length > 0" class="col-9 mx-auto">
              <div v-for="evento in filterEventos" :key="evento.id">
                  <div class="space">
                    <b-card no-body class="overflow-hidden">
                      <b-row no-gutters>
                        <b-col md="6">
                          <b-card-img src="https://placekitten.com/300/300" class="rounded-0"></b-card-img>
                        </b-col>
                        <b-col md="1">
                        </b-col>
                        <b-col md="4">
                          <b-card-body title-tag="h2" :title="evento.titulo"></b-card-body>
                          <b-card-text text-tag="h5" class="regular-text">
                              ￼<p><b>Descrição:</b> {{evento.descricao}}.</p>
                              <br>
                              <p><b>Período de inscrição:</b> {{evento.d_inscricao}} a {{evento.d_inscricao_fim}}.</p>
                              <p><b>Número de vagas:</b> {{evento.qtdVagas}}.</p>
                              <p><b>Local:</b> {{evento.local}}.</p>
                              <p><b>Carga horária:</b> {{evento.qtdCargaHoraria}}h.</p>
                              <p><b>Valor da inscrição:</b> R$ {{evento.valor}},00.</p>
                              <div>
                                <b-button  class="btn" href="/login" variant="primary">Inscrever-me</b-button>
                              </div>
                          </b-card-text>
                        </b-col>

                        <b-col md="1">
                        </b-col>
                      </b-row>
                    </b-card>
                  </div>
              </div>    
              <br>
            </div>
            <div v-else>
              <br>  
              <h3 class="texto"> Nenhum evento cadastrado!</h3> 
              <br>
            </div> -->

        </div>
        <BottomBar/>
  </div>
</template>

<script>
import Comum from "~/components/Comum";
import axios from "~/axios";
import BottomBar from "~/components/anonymous/BottomBar";


export default {
    layout: 'index',
    components: {
        Comum,
        BottomBar
    },
    data() {
      return {
		eventos: [],
        mesNomes: [
          "JANEIRO", 
          "FEVEREIRO", 
          "MARÇO", 
          "ABRIL", 
          "MAIO",
          "JUNHO",
          "JULHO", 
          "AGOSTO", 
          "SETEMBRO", 
          "OUTUBRO", 
          "NOVEMBRO",
          "DEZEMBRO"]
      };
  },
  mounted() {
    axios.get("eventos").then(res => {
      this.eventos = res.data.content;
    });
  },
  computed: {
    filterEventos() {
      return this.eventos.filter(evento => evento.ativo == true) 
	},
	
    // mes() {
    //   if (this.noticia.inicio_exibicao != null) {
	// 	return "" + this.noticia.inicio_exibicao.substring(8,10) + " " + 
	// 	this.mesNomes[parseInt(this.noticia.inicio_exibicao.substring(5,7) , 10)] + " "+ 
	// 	this.noticia.inicio_exibicao.substring(0,4);
	
	//   }
	//   return "";
    // }   
  }
}
</script>


<style>

h1 {
  font-weight: bold;
  font-size: 40px;
  text-align: center;
}
em{
  font-size: 16px;
}
h3 {
  font-size: 25px;
}
p {
  font-size: 19px;
}

hr {
  margin-top: 10px;
  margin-bottom: 20px;
}

.cards {
  margin-bottom: 20px;
}
a {
  color: inherit;
}
</style>

 
