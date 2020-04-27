<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <b-img center fluid src="~/static/img/logo.svg"></b-img>
          <div class="clearfix">
            <h1 class="display-3 mr-4">Erro 404</h1>
            <h4 class="pt-3 pb-3">Oops, houve um problema. A página que está procurando não foi encontrada.</h4>
            <b-button class="bbutton md-3" block href="/" variant="primary"><i class="fa fa-home"></i> Página inicial</b-button>
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
h1, h4, p {
  text-align:center;
}

.bbutton {
  border-radius: 10px !important;
}

</style>