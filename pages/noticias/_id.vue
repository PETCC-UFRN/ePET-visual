<template>
  <div>
    <Comum/>  
    <div class="container">
     <b-card :title="form.titulo" header-tag="header"  footer-tag="footer">
      <template v-slot:header>
        <strong>Notícia</strong> <small>Completa</small>
      </template>
      <b-card-text>{{form.corpo}}</b-card-text>
      <template v-slot:footer>
        <em><small>Publicado por {{form.petiano.pessoa.nome}}</small></em>
      </template>
    </b-card>
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
      form: {
        titulo: "",
        corpo: "",
        petiano: {
          pessoa: {
            nome:""
          }
        }
      },
      alert: {
        message: "",
        class: ""
      }
    };
  },
  mounted(){
    axios.get('noticia/'+ this.$route.params.id).then((res) => {
        this.form = res.data;
    });
  }
};
</script>