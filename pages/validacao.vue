<template>
  <div>
    <Comum />
    <div class="container" id="verify">
      <br />
      <div class="col-8 mx-auto">
        <h2 class="titulo">Validar Declaração</h2>
        <b-form @submit.prevent="submitForm">
          <b-form-group
            id="input-group-1"
            label="Código de validação:"
            label-for="input-1"
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
    <BottomBar />
  </div>
</template>

<script>
import Comum from "../components/Comum";
import BottomBar from "../components/anonymous/BottomBar";
import Swal from "sweetalert2";

export default {
  layout: "index",
  components: {
    Comum,
    BottomBar
  },
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
  font-weight: 300;
  text-align: center;
  font-size: 36px;
  box-sizing: border-box;
  margin: 0.67em 0;
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

 
