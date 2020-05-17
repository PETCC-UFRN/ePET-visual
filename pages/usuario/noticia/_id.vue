<template>
  <div>
    <b-card
      v-if="loaded"
      header="Notícia"
      header-tag="header"
      :footer="'Adicionado por: ' + noticia.petiano.pessoa.nome"
      :title="noticia.corpo"
    >
      <b-card-text>
        <span v-html="noticia.corpo"></span>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>


export default {
  name: "dashboard",
  layout: "menu/usuario",
  data() {
    return { noticia: [], loaded: false };
  },
  mounted() {
    this.$axios.get("noticia/" + this.$route.params.id).then(res => {
      this.noticia = res.data;
      this.loaded = true;
      console.log(this.noticia.petiano.pessoa.nome);
    });
  }
};
</script>