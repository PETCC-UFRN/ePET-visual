<template>
  <div v-if="noticias.length > 6">
    <br>
    <h2 style="text-align:center;">Destaques</h2>
    <br>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="6000"
      background="#ffffff"
      img-width="1024"
      img-height="480"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide>
        <template v-slot:img>
          <b-card-group deck>
            <div v-for="noticia in noticias" :key="noticia.id">
              <div v-if="new Date(ano,mes,dia) >= new Date(noticia.inicio_exibicao) &&
                          new Date(ano,mes,dia) <= new Date(noticia.limite_exibicao) && countEventos < 3">
                <div> {{countEventos+=1}}</div>
                <b-card 
                  :title=noticia.titulo 
                  border-variant="info" 
                  header="Info" 
                  align="center"  
                >
                  <template v-slot:header>
                    <h6 class="mb-0">Notícia</h6>
                  </template>
                  <b-card-text>{{evento.corpo}}  
                </b-card-text>
                </b-card> 
              </div>
            </div>
          </b-card-group>
        </template>
      </b-carousel-slide>
      
    </b-carousel>
    <br>
  </div>
</template>

<script>
import axios from "../../axios";
export default {
  data() {
    return {
      noticias: [],
      eventos: [], 
      dia: new Date().getDate(),
      countEventos:0,
      slide: 0,
      sliding: null
    }
  },
  methods: {
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    async getNoticias() {
      axios.get("noticia").then(res => {
        this.noticias = res.data.content;
      });
    }
  },
  mounted() {
    this.getNoticias();    
  }  
}
</script>