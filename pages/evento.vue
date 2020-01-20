<template>
  <div >
        <Comum/>  
        <div class="container">
          <br>
          <h2 class="titulo">Eventos</h2>
          <div v-if="eventos.length > 0" class="col-9 mx-auto">
              <div v-for="evento in eventos" :key="evento.id">
                  <div v-if="evento.ativo == true" class="space">
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
              <h3> Nenhum evento cadastrado!</h3> 
              <br>
            </div>

        </div>
        <BottomBar/>
  </div>
</template>

<script>
import Comum from "../components/Comum";
import axios from "../axios";
import BottomBar from "../components/anonymous/BottomBar";


export default {
    layout: 'index',
    components: {
        Comum,
        BottomBar
    },
    data() {
    return {
      eventos: []
    };
  },
  mounted() {
    axios.get("eventos").then(res => {
      this.eventos = res.data.content;
    });
  }
}
</script>


<style>
.btn{
margin-top: 20px;
margin-bottom: 10px;
}
.titulo {
margin-top: 20px;
margin-bottom: 10px;
font-weight: bold;
text-align: center;
font-size: 36px;
box-sizing: border-box;
margin: .67em 0;

}


.space {
margin-bottom: 40px;
}

.regular-text {
margin-top: -15px;
}


p {
  margin: 0px 0px 0px;
}
</style>

 
