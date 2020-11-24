<template>
  <div>
    <div class="container  pt-5">
      <div class="row">
        <div class="col-md-8 mb-5"><h2>Email confirmado com sucesso!</h2>
          <hr>
          <p>
            Seu email foi devidamente confirmado e agora é possível acessar ao sistema 
            fazendo uso de seu email e sua senha. Está disponível a você a possibilidade
            de inscrição em eventos, emissão de seus certificados, entre outras coisas. Caso haja 
            qualquer dúvida, enviar email para: <a href="mailto:petcc@dimap.ufrn.br">petcc@dimap.ufrn.br</a>
          </p>
        </div>
        <img src="~/static/svg/mail-confirmed.svg" class="col-md-4 pull-right">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'index',
  }
</script>

<style scoped>
.container {
margin-top: 45px;
}


p {
font-size: 19px;
text-align: justify;
}
</style>
