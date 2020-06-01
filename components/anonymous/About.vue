<template>
  <div class="row" style="margin-top: 45px">
    <div class="col-md-8 mb-1">
      <h2 class="sobreTitulo">Sobre o PET-CC</h2>
      <hr>
      <p style="text-align: justify">
        {{informacoes.sobre}}
      </p>
      <nuxt-link class="btn btn-success btn-lg mt-3 mb-3" to="/sobre" style="color: white">Saber mais &raquo;</nuxt-link>
    </div>
    <div class="col-md-4 mb-5">
      <h2 class="contato">Contato</h2>
      <hr>
      <address>
        <abbr title="Phone">Telefone:</abbr>
        {{informacoes.telefone}}
        <br class="mb-1">
        <abbr title="Address">Endereço físico:</abbr>
        {{informacoes.endereco}}
        <br  class="mb-1">
        <abbr title="Email">Email:</abbr>
        <a href="mailto:#">{{informacoes.email}}</a>
      </address>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      informacoes: {
        email:"",
        endereco:"",
        telefone:"",
        sobre:""
      }
    };
  },
  mounted() {
    this.$axios
      .get("informacoes")
      .then(res => {
        this.informacoes = res.data;
      });
  },
}
</script>



<style scoped>
.sobreTitulo .contato{
  font-weight: 300;
  font-size: 30px;
}
.sobreTitulo {
  text-align: center;
}
p, address {
  font-size: 16px;
}
</style>

