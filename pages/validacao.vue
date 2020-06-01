<template>
  <div>
    <Comum />
    <div class="container" id="verify">
      <br />
      <h2 class="titulo">Validar Declaração</h2>

      <div class="col-8 mx-auto">
        <b-form>
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
              class="mb-5"
              variant="success"
              @click="submit"
              v-b-modal.modalPopover
            >Verificar</b-button>
          </div>
          <!-- 
                        <b-modal id="modalPopover" title="Resultado da verificação" ok-only ok-variant="success">
                          <h4 style="text-align:center">{{resultadoVerificacao}}</h4>
                          <b-img center :src="imgVerificacao" height='70' width='70' class="center"></b-img>
                          <p v-html="dadosDeclaracao">
                          </p>
                      </b-modal>
          -->
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
//import '../node_modules/sweetalert2/src/sweetalert2.scss'

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
    submit: function() {
      //codigoValidacao =  this.$refs.input1
      //console.log(this.codigoValidacao)
      var result = "1234"; //Verificar o código e pegar dados do dono da declaração de validação TODO

      if (result === this.codigoValidacao) {
        var nome = "Jhonattan Cabral";
        var evento = "Curso de Python";
        //this.imgVerificacao = "/_nuxt/assets/cert3.png"
        this.resultadoVerificacao = "Declaração validada com sucesso!";
        this.dadosDeclaracao =
          "<br><b>Nome:</b> " + nome + "<br>" + "<b>Evento:</b> " + evento;
        Swal.fire({
          icon: "success",
          title: "Resultado da verificação:",
          html:
            "<h4>Declaração validada com sucesso!</h4><br>" +
            '<p align="left">' +
            this.dadosDeclaracao +
            "</p>",
          confirmButtonColor: "#4DBD74"
        });
      } else if ("cabralitalosamuel" === this.codigoValidacao) {
        Swal.fire({
          title: 'Visit the "about" page!',
          width: 600,
          padding: "3em",
          background: "#fff url(/images/trees.png)",
          backdrop: `
                rgba(0,0,123,0.4)
                url("https://i.giphy.com/media/bjE9JbNSckM0w/source.gif")
                left top
                no-repeat
              `
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Resultado da verificação:",
          html: "<h4>Código inválido!</h4><br>",
          confirmButtonColor: "#4DBD74"
        });

        //this.dadosDeclaracao = ""
        //this.imgVerificacao = "/_nuxt/assets/cancel3.png"
        //this.resultadoVerificacao = "Código inválido!"
      }
    }
  }
};
</script>


<style>
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
</style>

 
