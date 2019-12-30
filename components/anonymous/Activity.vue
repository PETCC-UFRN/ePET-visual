<template>
  <div class="col-md-4" v-if="noticias.length > 0">
    <div v-for="noticia in noticias.slice(0,3)" :key="noticia.id">
  
      <div class="card h-100">
        <div class="card-body">
          <h4 class="card-title">Boas vindas</h4>
          
          {{dia}}
          
          <p
            class="card-text"
          >A cada matrícula o PET-CC realiza eventos para receber os novos alunos do BTI.</p>
        </div>
        <div class="card-footer">
          <a href="#" class="btn btn-success" style="color:white">Saber mais</a>
        </div>
      </div>
    </div>
  </div>
  <div v-else > 
      <h3>Não há nenhuma notícia cadastrada.</h3>
  </div>


</template>

<script>
import axios from "../../axios";

export default {
  data() {
    return {
      noticias: [],
      dia: new Date().getDate() 
    };
  },
  mounted() {
    axios.get("noticia").then(res => {
      this.noticias = res.data.content;
    });
  }
  
}
</script>
