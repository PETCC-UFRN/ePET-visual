<template>
  <div class="backDark">
    <div align="center" class="mb-2">
      <b-avatar :src="photoPath" size="10em" variant="info" href=# class="align-text-top">
      </b-avatar> 
      <b-badge class='child inline-block-child'>{{ status }}</b-badge>   
    </div>

    <b-card>
      
      <h1 align="center" class="textDark"><strong>{{ nome }}</strong></h1>

      <hr class="my-4">
    <p v-html="perfilInfo"></p>
      
    <!--
      <div class="textDark float-left mr-5">
        <h5><strong>Email: </strong>lemore@gmail.com</h5>
        <h5><strong>Senha:</strong> ********</h5>
      </div>
      <div class="textDark float-rigth">
        <h5><strong>Data de nascimento: </strong>05/03/1996</h5>
        <h5><strong>CPF: </strong> 001.290.312-19</h5>
      </div>
      -->

      <div align="center" class="mt-5">
        <b-button class="float-left" variant="outline-primary" href="#">Editar perfil</b-button>
        <b-button class="float-right" variant="danger" @click="deleteAccount">Excluir conta</b-button>
      </div>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props:['photoPath','nome', 'status', 'perfilInfo'],

  methods: {
    async deleteAccount(){
      const { value: password } = await Swal.fire({
        title: 'Insira a senha para confirmar',
        input: 'password',
        inputPlaceholder: 'Insira a sua senha',
        customClass: {
          confirmButton: 'btn btn-danger',
        },
        confirmButtonText: 'Excluir',
        buttonsStyling: false,
        inputAttributes: {
          maxlength: 30,
          autocapitalize: 'off',
          autocorrect: 'off'
      }
    })

    if (password) {
      
      Swal.fire({
        customClass: {
          confirmButton: 'btn btn-success'
        },
        buttonsStyling: false,
        icon: 'success',
        title: 'Conta excluída com sucesso!'
        //title: `Entered password: ${password}`
      })
    }
    }
  }

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