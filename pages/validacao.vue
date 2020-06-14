<template>
  <div>
    <div class="container-fluid pt-5" id="verify">
      <br />
      <div class="col-8 mx-auto mt-5">
        <h1 class="text-white">Validar declaração</h1>
        <b-form @submit.prevent="submitForm">
          <b-form-group
            class="mt-5"
            id="input-group-1"
            label="Código de validação:"
            label-for="input-1"
            label-class="text-black"
            description="Disponível na sua declaração."
          >
            <b-form-input id="input-1" type="text" ref="input1" required v-model="codigoValidacao"></b-form-input>
          </b-form-group>
          <div style="text-align:center;">
            <b-button
              id="show-btn"
              size="lg"
              block
              type="submit"
              class="mb-5"
              variant="success"
              v-b-modal.modalPopover
            >Verificar</b-button>
          </div>
        </b-form>
      </div>
      <div>
        <br />
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  layout: "index",
  data() {
    return {
      codigoValidacao: "",
      resultadoVerificacao: "",
      imgVerificacao: "",
      dadosDeclaracao: ""
    };
  },
  methods: {
    submitForm() {
      
      this.$axios
        .get(`certificado/validar/${this.codigoValidacao}`)
        .then(res => {
          this.resultadoVerificacao = res.data;
          Swal.fire({
            icon: "success",
            title: "Resultado da verificação:",
            html:"<h4>Declaração validada com sucesso!</h4><br>", 
            confirmButtonColor: "#4DBD74"
          });
        })
        .catch( err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Certificado inválido",
              icon: 'error',
            })
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error',
            })
          }  
        });
    }
  }
};
</script>


<style scoped>
.titulo {
  margin-top: 20px;
  margin-bottom: 10px;
  box-sizing: border-box;
  margin: 0.67em 0;
}

h1 {
  font-weight: 300;
  text-align: center;
  font-size: 50px;
  text-shadow: #000 2px 3px 2px;

  
}

@media(max-width: 500px){
  h1 {
    font-size: 40px;
  }
} 

p {
  margin: 0px 0px 0px;
}

.container {
  /* Tamanho da tela menos o footer e o container com o logo */
  min-height: calc(95vh - 256px);
  display: flex;
  align-items :center;
}

</style>

 
