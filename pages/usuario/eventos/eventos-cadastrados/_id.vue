<template>
  <div>
    <b-card
      v-if="loaded"
      header="Evento"
      header-tag="header"
      :footer="'Local: ' + evento.local"
      :title="evento.titulo"
    >
      <b-card-text>
        <span v-html="evento.descricao"></span>
      </b-card-text>
    </b-card>
  </div>
</template>

<script>


export default {
  name: "dashboard",
  layout: "menu/usuario",
  data() {
    return { evento: [], loaded: false };
  },
  mounted() {
    this.$axios.get("eventos/" + this.$route.params.id).then(res => {
      this.evento = res.data;
      this.loaded = true;
    });
  }
};
</script>