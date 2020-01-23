<template>
  <div v-if="filterNoticias.length >= 5">
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
              <b-card 
                :title=noticia.titulo 
                border-variant="info" 
                header="Info" 
                align="center"  
                v-for="noticia in firstColumn" :key="noticia.id"
              >
                <template v-slot:header>
                  <h6 class="mb-0">Notícia</h6>
                </template>
                <b-card-text>{{noticia.descricao}}  
              </b-card-text>
              </b-card> 
          </b-card-group>
        </template>
      </b-carousel-slide>
     
      <b-carousel-slide>
        <template v-slot:img>
          <b-card-group deck>
              <b-card 
                :title=noticia.titulo 
                border-variant="info" 
                header="Info" 
                align="center"  
                v-for="noticia in secondColumn" :key="noticia.id"
              >
                <template v-slot:header>
                  <h6 class="mb-0">Notícia</h6>
                </template>
                <b-card-text>{{noticia.descricao}}  
              </b-card-text>
              </b-card> 
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
      noticiasPrimeiraColuna: [],
      noticiasSegundaColuna:[],
      dia: new Date().getDate(),
      mes: new Date().getMonth(),
      ano: new Date().getFullYear(),

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
  },
  computed: {
    filterNoticias() {
      return this.noticias.filter(noticia => new Date(this.ano,this.mes,this.dia) >= new Date(noticia.inicio_exibicao) &&
            new Date(this.ano, this.mes, this.dia) <= new Date(noticia.limite_exibicao)) 
    },    
    
    firstColumn() {
      if ( this.filterNoticias.length >= 5) {
        return this.filterNoticias.slice(0,3)
      }
      return this.filterNoticias
    },
  
    secondColumn() {
      if (this.filterNoticias.length >= 5) {
        return this.filterNoticias.slice(3,6) 
      }
      return this.filterNoticias
    }      
  } 
}
</script>