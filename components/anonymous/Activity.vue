<template>
  <div>
    <br>
    <h2 style="text-align: center;">Destaques</h2>
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
      title="Title"   border-variant="info" header="Info" align="center"
              >
              <template v-slot:header>
                <h6 class="mb-0">Notícia</h6>
              </template>
              <b-card-text>The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.</b-card-text>
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
    }
  },
  mounted() {
  axios.get("noticia").then(res => {
    this.noticias = res.data.content;
  });
  }
}
</script>