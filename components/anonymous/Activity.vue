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
            <div v-for="evento in eventos" :key="evento.id">
              <div v-if="evento.ativo === true && countEventos < 3">
                <div> {{countEventos+=1}}</div>
                <b-card 
                  :title=evento.titulo 
                  border-variant="info" 
                  header="Info" 
                  align="center"  
                >
                  <template v-slot:header>
                    <h6 class="mb-0">Evento</h6>
                  </template>
                  <b-card-text>{{evento.descricao}}  
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
    async getEventos() {
      axios.get("eventos").then(res => {
        this.eventos = res.data.content;
      });
    },
    async getNoticias() {
      axios.get("noticia").then(res => {
        this.noticias = res.data.content;
      });
    }
  },
  mounted() {
    this.getEventos();
    this.getNoticias();    
  }  
}
</script>