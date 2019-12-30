<template>
  <div >
        <Comum/>  
        <div  class="container">
            <br>
            <h2 class="titulo">Eventos</h2>
            <div v-if="eventos.length > 0" class="col-8 mx-auto">
                <div v-for="evento in eventos" :key="evento.id">
                    <div v-if="evento.ativo == true"
                      class="space"
                    >
                        <b-card 
                        img-src="http://placehold.it/200x200" img-alt="Card image" img-top class="mb-3"
                        :title="evento.titulo"
                        sub-title="É preciso fazer login para poder se inscrever." 
                        title-tag="h3">
                            <b-card-text text-tag="h5" class="regular-text">
                                ￼<p><b>Descrição:</b> {{evento.descricao}}.</p>
                                <p><b>Período de inscrição:</b> {{evento.d_inscricao}} a {{evento.d_inscricao_fim}}.</p>
                                <p><b>Número de vagas:</b> {{evento.qtdVagas}}.</p>
                                <p><b>Local:</b> {{evento.local}}.</p>
                                <p><b>Carga horária:</b> {{evento.qtdCargaHoraria}}h.</p>
                                <p><b>Valor da inscrição:</b> R$ {{evento.valor}},00.</p>
                                <div>
                                  <b-button block class="btn" href="/login" variant="primary">Inscrever-me</b-button>
                                </div>
                            </b-card-text>
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

 
