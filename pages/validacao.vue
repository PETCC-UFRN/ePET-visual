<template>
  <div >
        <Comum/>  
        <div  class="container">
            <br>
            <h2 class="titulo">Validar certificado</h2>
            
            <div class="col-8 mx-auto" >
                <b-form>
                    <b-form-group
                        id="input-group-1"
                        label="Código de validação:"
                        label-for="input-1"
                        description="Disponível abaixo do código de barras.">
                        <b-form-input
                            id="input-1"
                            type="text"
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
                      <b-button id="show-btn" block variant="success"  @click="$bvModal.show('bv-modal-example')">Validar</b-button>

                       <b-modal  size="sm" id="bv-modal-example" hide-footer>
                        <template v-slot:modal-title>
                          <h3> <strong>Resultado</strong></h3> 
                        </template>
                        <div class="d-block text-center">
                          <div v-if="1 == 1" >
                            <h5><i class="fa fa-check fa-lg" aria-hidden="true"></i> Confirmado</h5>
                          </div>
                          <div v-else>
                              <h5><i class="fa fa-exclamation-circle fa-lg" aria-hidden="true"></i> Inválido</h5>
                          </div>
                        </div>
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
        VueRecaptcha
    },
    data() {
    return {
      codigoValidacao:""
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

 
