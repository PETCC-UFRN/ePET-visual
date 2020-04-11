<template>
  <div>
    <div class="d-flex flex-column sticky-footer-wrapper">
        <footer>
            <b-row>
              <b-col >
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
                    <div >
                      <a class="mr-1" href="https://www.facebook.com/petccufrn/" target="_blank"><i class="fab fa-facebook-square"></i></a>
                      <a class="mr-1" href="https://www.instagram.com/petccufrn/" target="_blank"><i class="fab fa-instagram" ></i></a>
                      <a class="mr-1" href="https://github.com/PETCC-UFRN" target="_blank"><i class="fab fa-github"></i></a>
                      <a href="https://www.youtube.com/channel/UC_1IEMXjN5YMaUFYhcx4JXQ" target="_blank"><i class="fab fa-youtube"></i></a>

                    </div>
                  
                  </b-col>
  
                </b-row>
              </b-col>
              <b-col >
              </b-col>
            </b-row>
            <hr>
            <div style="text-align: center;" class="mb-3"> {{ year }} &copy; PET-CC UFRN - Template por <a href="http://coreui.io">CoreUI</a></div>
        </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'c-footer',
  data(){
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style scoped>


.flex-fill {
   flex:1 1 auto;
}
footer{
    background-color: #89023e;
}

i{
  font-size:24px;
}
a {
  color: white;
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

footer div{
    color: white;
}
</style>