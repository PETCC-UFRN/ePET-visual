<template>
  <div>
    <div class="container pt-5">

        <!-- <div
          class="col-md-4 h-100 d-flex justify-content-center align-items-center"
        > -->
        <div
          class="row justify-content-center mt-5 d-flex  align-items-center"
        >
        <div class="mt-3" >
            <b-img center src="/img/logo.svg" alt="Center image"></b-img>
              <h1 class="text-white text-center">Programa de Educação Tutorial</h1>
              <h2 class="text-center">Ciência da Computação</h2>
          
        </div>
              
          <!-- <div class="row">
            <div class="col-md-12">
            </div>
            <div class="col-md">
              <div  class="text-center">
                <h1 class="bg-light">Programa de Educação Tutorial</h1>
              <h2>Ciência da Computação</h2>
              </div>
              
            </div>
          </div> -->
          <!-- <canvas class="background"></canvas> -->

      </div>
    </div>
    <nuxt/>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 300;
  font-size: 36px;
  text-shadow: #000 2px 3px 2px;

}

h2 {
  text-decoration: underline;
  font-weight: 550;
  color: #050002;
}

@media(max-width: 500px){
  img {
    max-width: 240px;
  }
} 
</style>

<script>
  export default {
    layout: 'index',
    
  }
</script>
