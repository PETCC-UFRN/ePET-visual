<template>
  <div >
        <Comum/>  
        <div  class="container">
            <br>
            <h2 class="titulo">Eventos</h2>
            <div v-if="eventos.length > 0" class="col-12 mx-auto">
                <div v-for="evento in eventos" :key="evento.id">
                    <div v-if="evento.ativo == true">
                      <b-card 
                      img-src="https://picsum.photos/400/400/?image=20" img-alt="Card image" img-left class="mb-3"
                      :title="evento.titulo" 
                      sub-title="Para que seja possível realizar a inscrição, é necessário estar logado."
                      title-tag="h3">
                          <b-card-text text-tag="h5">
                              ￼<p><b>Descrição:</b> {{evento.descricao}}.</p>
                              <p><b>Período de inscrição:</b> {{evento.d_inscricao}} a {{evento.d_inscricao_fim}}.</p>
                              <p><b>Número de vagas:</b> {{evento.qtdVagas}}.</p>
                              <p><b>Local:</b> {{evento.local}}.</p>
                              <p><b>Carga horária:</b> {{evento.qtdCargaHoraria}}h.</p>
                              <p><b>Valor da inscrição:</b> R$ {{evento.valor}},00.</p>
                              <div>
                                 <b-button block href="#" variant="primary">Inscrever-me</b-button>
                              </div>
                          </b-card-text>
                      </b-card>
                    </div>
                </div>    
            </div>
            <div v-else> 
              <h4> Nenhum evento cadastrado!</h4> 
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

.titulo {
margin-top: 20px;
margin-bottom: 10px;
font-weight: bold;
text-align: center;
font-size: 36px;
box-sizing: border-box;
margin: .67em 0;

}

#regular-text {
color: #333;
box-sizing: border-box;
position: relative;
padding-right: 15px;
padding-left: 15px;
float: left;
width: 66.66666667%;
text-align: justify;
}

p {
  margin: 0px 0px 0px;
}
</style>

 
