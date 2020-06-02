<template>
  <div class="wrapper">
    <footer>
      <b-row>
        <b-col>
        </b-col>
        <b-col>
          <h4 class="mt-3">Institucional</h4>
          <nuxt-link to="/sobre">Sobre o PET-CC</nuxt-link>
          <br>
          <nuxt-link to="/desenvolvedores">Desenvolvedores</nuxt-link>
          <div>
            <h4 class="mt-3">Localização</h4>
            Departamento de Informática e Matemática Aplicada (DIMAp) - UFRN
          </div>
        </b-col>
        <b-col>
          <b-row>
            <div class="ml-3">
              <h4 class="mt-3">Explorer</h4>
              <nuxt-link to="/eventos">Eventos</nuxt-link>
              <br>
              <nuxt-link to="/noticias">Notícias</nuxt-link>
              <br>
              <nuxt-link to="/validacao">Validar certificado</nuxt-link>
            </div>
          </b-row>
          <b-row>
            <b-col>
              <h4 class="mt-3">Redes Sociais</h4>
              <div>
                <a class="mr-1" :href="facebook" target="_blank"><i
                  class="fab fa-facebook-square"></i></a>
                <a class="mr-1" :href="instagram" target="_blank"><i
                  class="fab fa-instagram-square"></i></a>
                <a class="mr-1" :href="github" target="_blank"><i 
                class="fab fa-github-square"></i></a>
                <a :href="youtube" target="_blank"><i
                  class="fab fa-youtube-square"></i></a>

              </div>

            </b-col>

          </b-row>
        </b-col>
        <b-col>
        </b-col>
      </b-row>
      <hr>
      <div class="text-center pb-3"> {{ year }} &copy; PET-CC UFRN - Template por <a
        href="http://coreui.io">CoreUI</a></div>
    </footer>
  </div>
</template>

<script>
export default {
    name: 'c-footer',
    data() {
      return {
        year: new Date().getFullYear(),
        informacoes: {
          github:"",
          youtube:"",
          facebook:"",
          instagram:""
        }
      }
    },
  mounted() {
    this.$axios
      .get("informacoes")
      .then(res => {
        this.informacoes = res.data;
      });
  }
}
</script>

<style scoped>
  .flex-fill {
    flex: 1 1 auto;
  }

  footer {
    background-color: #89023e;
  }

  i {
    font-size: 24px;
  }

  a {
    color: white !important;
  }

  h4 {
    font-weight: bold;
  }

  footer hr {
    height: 1px;
    color: white;
    background-color: white;
    border: none;

  }

  footer div {
    color: white;
  }

  .row {
    margin: 0;
  }

  .pb-3 {
    padding-bottom: 3em;
  }

  .navbar-fixed-bottom {
    padding-left: 0;
    padding-right: 0;
  }

  .navbar-fixed-bottom footer {
    width: 100%;
  }
</style>
