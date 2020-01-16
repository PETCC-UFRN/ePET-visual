<template>
  <div v-if="noticias.length > 0 || eventos.length > 0">
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
            <b-card    :title=noticias[0].titulo border-variant="info" header="Info" align="center"  >
              <template v-slot:header>
                <h6 class="mb-0">Notícia</h6>
              </template>
              <b-card-text>{{noticias[0].corpo}}</b-card-text>
            </b-card> 
            <b-card title="Title" border-variant="info" header="Info" align="center">
              <template v-slot:header>
                <h6 class="mb-0">Noticia</h6>
              </template>
              <b-card-text>Header and footers using slots.</b-card-text>
            </b-card> 
            <b-card  
              title="Title"  
              border-variant="danger"
              header="Danger"
              header-border-variant="danger"
              header-text-variant="danger"
              align="center">
              <template v-slot:header>
                <h6 class="mb-0">Evento</h6>
              </template>
              <b-card-text>Header and footers using slots.</b-card-text>
            </b-card> 
          </b-card-group>
        </template>
      </b-carousel-slide>
      
      <b-carousel-slide>
        <template v-slot:img>
          <b-card-group deck>
            <b-card        
      title="Title"   border-variant="info" header="Info" align="center"
              >
              <template v-slot:header>
                <h6 class="mb-0">Notícia</h6>
              </template>
              <b-card-text>Header and footers using slots.</b-card-text>
            </b-card> 
            <b-card  
            title="Title"   border-variant="info" header="Info" align="center">
              <template v-slot:header>
                <h6 class="mb-0">Noticia</h6>
              </template>
              <b-card-text>Header and footers using slots.</b-card-text>
            </b-card> 
            <b-card  
            title="Title"  
        border-variant="danger"
        header="Danger"
        header-border-variant="danger"
        header-text-variant="danger"
        align="center">
              <template v-slot:header>
                <h6 class="mb-0">Evento</h6>
              </template>
              <b-card-text>Header and footers using slots.</b-card-text>
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
      eventos: [],
      dia: new Date().getDate(),
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
    async getEventos() {
      axios.get("evento").then(res => {
        this.evento = res.data.content;
      });
    },
    async getNoticias() {
      axios.get("noticia").then(res => {
        this.noticias = res.data.content;
      });
    },
    even: function(arr) {
      
      return arr.slice().sort(function(a, b) {
        return a.inicio_exibicao - b.inicio_exibicao;
      });
    }
  },
  mounted() {
    this.getEventos();
    this.getNoticias();    
  }
}
</script>