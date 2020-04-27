<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <b-row class="justify-content-center">
        <b-col md="5" sm="8">
          <b-card no-body class="mx-4">
            <b-card-body class="p-4">
              <b-img center class="mb-4" fluid src="~/static/img/logo.svg"></b-img>
              <h1>Esqueci a senha</h1>
              <p class="text-muted">Digite o endereço de e-mail da sua conta de usuário e enviaremos email contendo um link de redefinição de senha.</p>
              
              <b-input-group class="mt-4 mb-3">
                <b-input-group-prepend>
                  <b-input-group-text>@</b-input-group-text>
                </b-input-group-prepend>
                <input type="email" class="form-control" placeholder="Email" v-model="usuario.email">
              </b-input-group>

              <b-button variant="success" @click.prevent="register()" block> <i class="fa fa-envelope mr-2"></i> Enviar email de redefinição de senha</b-button>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </div>
</template>

<script>
import axios from "~/axios";
import Swal from "sweetalert2";

export default {
  name: 'Register',
  layout: 'clean',
  data: function (){
    return {
      usuario:{
        email: "",
      },
      error: null
    };
  },
  head () {
    return {
      title: "Esqueci a senha - PET-CC UFRN"
    }
  },

  methods: {
    async register(){
      try{
        
        await axios.post('forgot/',{
            email: this.usuario.email
          }).then(res => {
            this.usuario.email = "";

            Swal.fire({
              icon: "sucess",
              title: "Email enviado",
              text: "Foi enviado para o seu email um link para que sua conta " + 
              "tenha a senha resetada."
            });
            
          })
        // this.$router.push('/usuarios');
      } catch(err){
          Swal.fire({
            icon: "error",
            title: "Erro no envio...",
            text: err.message
          });
      }
    }
  }
}
</script>


<style scoped>

img {
  max-width: 200px;
}
</style>