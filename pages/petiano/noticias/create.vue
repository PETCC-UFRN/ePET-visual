<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h2><i class="fa fa-edit"></i> Cadastrar notícia</h2>
          </b-col>
          <b-col>
            <div class="card-actions">
              <nuxt-link to="/petiano/noticias/" class="btn btn-close btn-lg">
                <i class="icon-close"></i>
              </nuxt-link>
            </div>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <b-form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="titulo"><strong>Título</strong></label>
            <input
              id="titulo"
              type="text"
              placeholder="Digite o título"
              class="form-control"
              v-model="form.titulo"
              required
            />
          </div>
          <b-form-group>
            <label for="imagem">
              <strong>Imagem de capa</strong>
            </label>
            <b-img v-if="imageData !== ''" center class="mt-2 mb-4" v-bind="mainProps" :src="`${imageData}`" fluid alt="Responsive image"></b-img>
            <b-form-file
              v-model="file" accept=".jpg, .png, .gif" @change="previewImage"
              placeholder="Nenhuma imagem selecionada" browse-text="Selecionar imagem" id="anexo"></b-form-file>
            <b-form-text class="mb-1"> O tamanho máximo da imagem é de 10 megabytes. </b-form-text>
           
          </b-form-group>
          <div class="form-group">
            <label for="descricao"><strong>Descrição</strong></label>
            <b-form-textarea
              id="descricao"
              v-model="form.corpo"
              placeholder="Digite a descrição"
              rows="10"
              max-rows="10"
              required
            ></b-form-textarea>
          </div>
          <b-row>
            <b-col>
              <div class="form-group">
                <label for="inicioExibicao"><strong>Início de exibição</strong></label>
                <b-form-datepicker
                  id="inicioExibicao"
                  v-model="form.inicio_exibicao"
                  :min="minDate"
                  class="mb-2"
                  locale="pt-br"
                  placeholder="Escolha uma data"
                  required
                ></b-form-datepicker>
              </div>
            </b-col>
            <b-col>
              <div class="form-group">
                <label><strong>Fim de exibição</strong></label>
                <b-form-datepicker
                  :disabled="disabledDataExibicao"
                  v-model="form.limite_exibicao"
                  :min="form.inicio_exibicao"
                  class="mb-2"
                  locale="pt-br"
                  placeholder="Escolha uma data"
                  required
                ></b-form-datepicker>
              </div>
            </b-col>
          </b-row>
            
          <div class="form-group">
            <b-button type="submit" variant="primary">
              <i class="fa fa-dot-circle-o"></i> Enviar
            </b-button>
            <b-button type="reset" variant="danger" @click="clearForm">
              <i class="fa fa-ban"></i> Limpar campos
            </b-button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>

import Swal from "sweetalert2";
import moment from "moment";

export default {
  layout: "menu/petiano",
  data() {
    return {
      mainProps: { width: 425, height: 200},
      imageData: "",
      form: {
        file:[],
        progressValue: 0,
        titulo: "",
        corpo: "",
        inicio_exibicao: "",
        limite_exibicao: "",
        ativo: false,
        imagem: ""
      },
      minDate: null
    };
  },
  mounted() {
    this.minDate = moment().format("YYYY-MM-DD");
  },
  computed: {
    disabledDataExibicao() {
      return this.form.inicio_exibicao === ''; 
    }
  },
  methods: {
    previewImage: function(event) {
      let input = event.target;
      if (input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = (e) => {
          this.imageData = e.target.result;
        }
        
        reader.readAsDataURL(input.files[0]);
      }
    },
    submitForm() {
      
      if (this.file !== null && this.file.length !== 0) {
        const formData = new FormData()
        formData.append("file", this.file)
        this.$axios
          .post("http://177.20.148.190:8080/uploadfile",formData, {
            onUploadProgress: uploadEvent => {
              this.progressValue = `${Math.round(uploadEvent.loaded/ uploadEvent.total * 100)}%`
            }
          })
          .then(res => {
            this.form.imagem = res.data;
            this.progressValue = 0
            this.file = []
            this.criar();
          })
          .catch(err => {
            Swal.fire({
              title: "Foto não carregada",
              text: "Tente novamente em outro momento.",
              icon: "error"
            })
            .then( () => {
              this.progressValue = 0
              this.file = []
            });
          });
      }
      else {
        this.criar();
      }      
    },
    async criar(){
      if (this.checkForm()) {
        let idPetiano = 1;
        await this.$axios
         this.$axios.get("petianos-pessoa/" + this.$store.state.profile.idPessoa)
          .then(res => {
            idPetiano = res.data.idPetiano;
          });

        await this.$axios
          .post("noticia-cadastro/" + idPetiano, this.form)
          .then(res => {
            Swal.fire({
              title: "Notícia cadastrada",
              icon: "success"
            })
            .then( () =>{
              this.$router.push('/petiano/noticias');
            });
          })
          .catch(err => {
            Swal.fire({
              title: "Notícia não cadastradas",
              icon: "error"
            })
            .then( () => {
              this.$router.push('/petiano/noticias');
            });
          });
      } else {
        Swal.fire({
          title: "Campo(s) inválido(s)",
          icon: "error",
          html: `<ul>${this.errors.map(err => `<li>${err}</li>`)}</ul>`
            .replace('","', "")
            .replace(",", "")
        });
      }
    },
    clearForm() {
      this.form = Object.entries(this.form).map(item => {
        return (item = "");
      });
    },
    checkForm() {
      this.errors = [];
      if (!this.form.inicio_exibicao) {
        this.errors.push("O campo início exibição é obrigatório.");
      }
      if (!this.form.limite_exibicao) {
        this.errors.push("O campo fim exibição é obrigatório.");
      }
      if (this.errors.length === 0) {
        return true;
      }

      return false;
    }
  }
};
</script>


<style scoped>
h2 {
  font-weight: 300;
}

strong {
  color: gray;
  font-size: 16px;
}

</style>