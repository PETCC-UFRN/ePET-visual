<template>
  <div>
    <Comum/>
    <div class="container">
      <div class="row">
        <div class="col-md-8 mb-5"><h2>Email confirmado com sucesso!</h2>
          <hr>
          <p style="text-align: justify">
            Bem vindx ao <strong>EPET</strong> o sistema de gerenciamento do Programa de Educação Tutorial.
            Seu email foi confirmado e você já pode fazer login. Increva-se em eventos, emita seus certificados
            e gerencie suas atividades do sistema, qualquer dúvida:
            <a href="mailto:#">petcc@dimap.ufrn.br</a>
          </p>
        </div>
        <img src="~/static/svg/mail-confirmed.svg" class="col-md-4 pull-right">
      </div>
    </div>
    <BottomBar/>
    <nuxt/>
  </div>
</template>

<script>
  import Comum from "~/components/Comum";
  import BottomBar from "~/components/anonymous/BottomBar";

  export default {
    layout: 'index',
    components: {
      Comum,
      BottomBar,
    }
  }
</script>

<style scoped>
  .container {
    margin-top: 45px;
  }
</style>
