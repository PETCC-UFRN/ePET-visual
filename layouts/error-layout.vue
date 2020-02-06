<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="6">
          <div class="clearfix">
            <h1 class="float-left display-3 mr-4">404</h1>
            <h4 class="pt-3">Oops! Você está perdido.</h4>
            <p class="text-muted">A página que está procurando não foi encontrada.</p>
          </div>
          <b-button block href="/" variant="info"><i class="fa fa-home" aria-hidden="true"></i> Página inicial</b-button>
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

