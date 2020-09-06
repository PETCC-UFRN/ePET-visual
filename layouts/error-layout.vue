<template>
  <div class="site">
    <div class="container pt-4 site-content">
      <b-row class="mt-3 justify-content-center">
        <b-col sm="6">
          <b-img center fluid src="~/static/img/pet-logo.png"></b-img>
          <div class="clearfix">
            <h1 class="display-3 mr-4">Erro 404</h1>
            <h4 class="pt-3 pb-3">Oops, houve um problema. A página que está procurando não foi encontrada.</h4>
            <b-button class="bbutton md-3" block to="/" variant="primary"><i class="fa fa-home"></i> Página inicial</b-button>
          </div>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
export default {
   head: {
      title: 'PET-CC UFRN'
   }
}
</script>

<style scoped>
h1, h4 {
  text-align:center;
}

.site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.site-content {
  flex: 1;
}


@media(max-width: 500px){
h1 {
  font-size: 36px;
}
img {
  max-width: 200px;
}
h4 {
  font-size: 20px;
}
}

.bbutton {
  border-radius: 2px !important;
}

</style>
