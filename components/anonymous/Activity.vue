<template>
  <div class="col-md-12" v-if="noticias.length > 0">
    <div v-for="noticia in noticias.slice(0,3)" :key="noticia.id">
      <b-card-group deck>
        <b-card title="Title" header-tag="header">
          <template v-slot:header>
            <h6 class="mb-0">Evento</h6>
          </template>
          <b-card-text>Header and footers using slots.</b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>

        <b-card title="Title" header-tag="header">
          <template v-slot:header>
            <h6 class="mb-0">Notícia</h6>
          </template>
          <b-card-text>Header and footers using slots.</b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>

        <b-card title="Title" header-tag="header">
          <template v-slot:header>
            <h6 class="mb-0">Evento</h6>
          </template>
          <b-card-text>Header and footers using slots.</b-card-text>
          <b-button href="#" variant="primary">Go somewhere</b-button>
        </b-card>
      </b-card-group>
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
