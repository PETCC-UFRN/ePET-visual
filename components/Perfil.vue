<template>
  <div class="backDark">
    <div align="center" class="mb-2">
      <b-avatar src="~/assets/users/LemureUsuario.jpeg"
        size="10em" variant="info" href=# class="align-text-top">
      </b-avatar> 
      <b-badge class='child inline-block-child'>Usúario</b-badge>   
    </div>

    <b-card>
      
      <h1 align="center" class="textDark"><strong>Lêmure Usuário</strong></h1>

      <hr class="my-4">

      <div class="textDark float-left mr-5">
        <h5><strong>Email: </strong>lemore@gmail.com</h5>
        <h5><strong>Login:</strong> @lemurec</h5>
        <h5><strong>Senha:</strong> ********</h5>
      </div>
      <div class="textDark float-rigth">
        <h5><strong>Data de nascimento: </strong>05/03/1996</h5>
        <h5><strong>CPF: </strong> 001.290.312-19</h5>
      </div>

      <div align="center" class="mt-5">
        <b-button class="float-left" variant="outline-primary" href="#">Editar perfil</b-button>
        <b-button class="float-right" variant="danger" href="#">Excluir conta</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "perfil",
    data() {
        return {
            currentPhoto: "https://images.pexels.com/photos/69954/lemur-madagascar-monkey-animal-world-69954.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
            plus: "~/assets/plus.png"
        };
    },

  methods: {
    preChangePhoto: function() {
        currentPhoto = plus;
        //currentPhoto: "https://images.pexels.com/photos/69954/lemur-madagascar-monkey-animal-world-69954.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
    }
  },
}

</script>


<style>

.parent {
  padding: 2rem;
}

.inline-block-child {
   margin-left: 0.5em;
  display: inline-block;
}

.backDark{
  background-color:#24333b;
}

.textDark{
  color: #24333b;
}

</style>