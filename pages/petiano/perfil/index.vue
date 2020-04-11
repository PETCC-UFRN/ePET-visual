<template>
  <div>
    <b-card>
      <Perfil />
    </b-card>
  </div>
</template>

<script>
import axios from "~/axios";
import Perfil from "~/components/Perfil";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  components:{
    Perfil
  }
  /*data() {
    return {
      noticias: [],
      currentPage: 1,
      fields: [
        { key: "titulo", sortable: true, label: "Título" },
        { key: "petiano.pessoa.nome", sortable: true, label: "Publicado por" },
        { key: "actions", label: "Ações disponíveis"},
      ],
    };
  },*/
  /*mounted() {
    axios.get("noticia").then(res => {
      this.noticias = res.data.content;
    });
  }*/
};
</script>