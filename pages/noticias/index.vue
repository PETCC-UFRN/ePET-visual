<template>
  <div>
      <Comum/>  
      <div class="container">
          <br>
          <h1 class="titulo mt-3 mb-0"><i class="far fa-newspaper"></i> Notícias</h1>
          <hr>
          <b-card-group columns>
            <div v-for="noticia in noticias" :key="noticia.id">
              <b-card> 
                <b-card-text class="small text-muted"> 10 FEVEVEIRO 2020 </b-card-text>
                <hr>
                <b-card-title><h5>{{noticia.titulo}}</h5></b-card-title>
                <b-card-text>
                  This card has supporting text below as a natural lead-in to additional content.
                </b-card-text>
                <b-card-text class="small text-muted">                   
                   <em>Publicado por Daniel</em></b-card-text>
              </b-card>
            </div>
          </b-card-group>

          <!-- <div class="col-8 mx-auto" v-if="filterNoticias.length > 0">
              <div v-for="noticia in filterNoticias" :key="noticia.id">
                
                <b-card  header-tag="header" >
                  <template v-slot:header>
                    <h4>{{noticia.titulo}}</h4>
                  </template>
                  <b-card-text>
                    <p>{{noticia.corpo}}</p>
                  </b-card-text>
                </b-card>
              </div>    
          </div>
          <div v-else class="col-8 mx-auto"> 
            <br>
            <h3 class="texto">Não há nenhuma notícia cadastrada.</h3>
            <br>
          </div>
          <div>
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
        noticias: [],
    };
  },
  mounted() {
    axios.get("noticia").then(res => {
      this.noticias = res.data.content;
    });
  }

}
</script>


<style>

.titulo {
  font-weight: bold;
  font-size: 40px;
}

h1 {
  text-align: center;
}

hr {
  margin-top: 10px;
  margin-bottom: 20px;
}

</style>

 
