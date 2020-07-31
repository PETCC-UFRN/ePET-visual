<template>
  <div>
    <ol class="breadcrumb">
      <li
        class="breadcrumb-item"
        v-for="(item, index) in crumbsList"
        :key="index"
        :class="crumbsList.length-1 === index ? 'active' : ''"
      >
        <span v-if="index === 0">
          <nuxt-link :to="`/${item}`">{{"Início"}}</nuxt-link>
        </span>
        <span v-else-if="item == 'configuracoes'">
          <nuxt-link :to="`/${$route.path.split('/').slice(1).slice(0,index+1).join('/')}`">
          {{"Configurações"}}</nuxt-link>
        </span>
        <span v-else-if="item == 'edit'">Editar</span>
        <span v-else-if="item == 'participantes'">Participantes</span>
        <span v-else-if="item == 'organizadores'">Organizadores</span>
        <span v-else-if="item == 'create'">Cadastrar</span>
        <span v-else-if="item == 'gerenciar-anexos'">Gerenciar anexos</span>
        <span v-else>
          <nuxt-link
            :to="`/${$route.path.split('/').slice(1).slice(0,index+1).join('/')}`"
          >{{item.replace(/^\w/, c => c.toUpperCase()).replace(/-/gi, " ") }}</nuxt-link>
        </span>
      </li>
    </ol>
  </div>
</template>

  <script>
export default {
  data() {
    return {
      crumbsList: []
    };
  },
  mounted() {
    this.updateList();
    this.$nuxt.$on("changeCrumbs", (value, index) => {
      if (! index) {
        index = this.crumbsList.length - 1;
      }

      this.$set(this.crumbsList, index, value);
    });
  },
  watch: {
    $route() {
      this.updateList();
    },
  },
  methods: {
    updateList() {
      this.crumbsList = this.$route.path.split("/").slice(1);
    },
  }
};
</script>

<style scoped>
.breadcrumb-item.active a {
  color: #6c757d !important;
}
</style>
