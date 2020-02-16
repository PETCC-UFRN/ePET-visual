<template>
  <div >
        <Comum/>  
        <div  class="container" id="verify">
            <br>
            <h2 class="titulo">Validar declaração</h2>
            
            <div class="col-8 mx-auto" >
                <b-form>
                    <b-form-group
                        id="input-group-1"
                        label="Código de validação:"
                        label-for="input-1"
                        description="Disponível na sua declaração">
                        <b-form-input
                            id="input-1"
                            type="text"
                            ref="input1"
                            required
                            v-model="codigoValidacao"
                        ></b-form-input>
                    </b-form-group>
              
                    <b-form-group>
                      <vue-recaptcha
                        ref="recaptcha"
                        @verify="onCaptchaVerified"
                        @expired="onCaptchaExpired"
                        size="invisible"
                        sitekey="6LdlntYUAAAAAHlMubWMiUZnLeDd6NRhUsXG2IYn">
                      </vue-recaptcha>
                      <div  style="text-align:center;">
                        <b-button id="show-btn"  size="lg" variant="success" @click="submit" v-b-modal.modalPopover>Verificar</b-button>
                      </div>
                        <b-modal id="modalPopover" title="Resultado da verificação" ok-only ok-variant="success">
                          <!--<b-img center src="../assets/cancel3.png" height='70' width='70' class="center"></b-img>-->
                          <h4 style="text-align:center">{{resultadoVerificacao}}</h4>
                          <b-img center :src="imgVerificacao" height='70' width='70' class="center"></b-img>
                          <p v-html="dadosDeclaracao">

                          </p>
                      </b-modal>
                    </b-form-group>
                </b-form>
            </div>    
        </div>
        <BottomBar/>
  </div>
</template>

<script>
import Comum from "../components/Comum";
import axios from "../axios";
import BottomBar from "../components/anonymous/BottomBar";
import VueRecaptcha from 'vue-recaptcha';


export default {
    layout: 'index',
    components: {
        Comum,
        BottomBar,
        VueRecaptcha,
    },
    data() {
    return {
      codigoValidacao:"",
      resultadoVerificacao:"",
      imgVerificacao:"",
      dadosDeclaracao:""
    };
  },
  mounted() {
    let googleRecaptchaScript = document.createElement('script')
    googleRecaptchaScript.setAttribute('src', 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit')
    document.head.appendChild(googleRecaptchaScript)

    let recaptchaScript = document.createElement('script')
    recaptchaScript.setAttribute('src', 'https://unpkg.com/vue-recaptcha@latest/dist/vue-recaptcha.js')
    document.head.appendChild(recaptchaScript)

  },
  methods: {
    submit: function () {
      //codigoValidacao =  this.$refs.input1
      //console.log(this.codigoValidacao)

      var result = "1234" //Verificar o código e pegar dados do dono da declaração de validação TODO
      
      if(result === this.codigoValidacao){
        var nome = "Jhonattan Cabral"
        var evento = "Curso de Python"
        this.imgVerificacao = "/_nuxt/assets/cert3.png"
        this.resultadoVerificacao = "Declaração validada com sucesso!"
        this.dadosDeclaracao = "<br> Nome: " + nome + "<br>" + "Evento: " + evento
      } else{
        this.dadosDeclaracao = ""
        this.imgVerificacao = "/_nuxt/assets/cancel3.png"
        this.resultadoVerificacao = "Código inválido!"
      }

      // this.status = "submitting";
      this.$refs.recaptcha.execute();
    },
    onCaptchaVerified: function (recaptchaToken) {
      const self = this;
      self.status = "submitting";
      self.$refs.recaptcha.reset();
      axios.post("https://vue-recaptcha-demo.herokuapp.com/signup", {
        email: self.email,
        password: self.password,
        recaptchaToken: recaptchaToken
      }).then((response) => {
        self.sucessfulServerResponse = response.data.message;
      }).catch((err) => {
        self.serverError = getErrorMessage(err);


        //helper to get a displayable message to the user
        function getErrorMessage(err) {
          let responseBody;
          responseBody = err.response;
          if (!responseBody) {
            responseBody = err;
          }
          else {
            responseBody = err.response.data || responseBody;
          }
          return responseBody.message || JSON.stringify(responseBody);
        }

      }).then(() => {
        self.status = "";
      });


    },
    onCaptchaExpired: function () {
      this.$refs.recaptcha.reset();
    }
  }
}
</script>


<style>

.titulo {
margin-top: 20px;
margin-bottom: 10px;
font-weight: bold;
text-align: center;
font-size: 36px;
box-sizing: border-box;
margin: .67em 0;

}

#regular-text {
color: #333;
box-sizing: border-box;
position: relative;
padding-right: 15px;
padding-left: 15px;
float: left;
width: 66.66666667%;
text-align: justify;
}

p {
  margin: 0px 0px 0px;
}


</style>

 
