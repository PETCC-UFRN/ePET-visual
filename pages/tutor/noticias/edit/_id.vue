<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h2>
              <i class="fa fa-edit"></i> Editando notícia
            </h2>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="titulo">
              <strong>Título</strong>
            </label>
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
            <b-img v-else center class="mt-2 mb-4" v-bind="mainProps" :src="`https://petcc.dimap.ufrn.br:8443/downloadfile/${foto}`" fluid alt="Responsive image"></b-img>
            
            <b-form-file
              v-model="file" accept=".jpg, .png, .gif" @change="previewImage"
              placeholder="Nenhuma imagem selecionada" browse-text="Selecionar imagem" id="anexo"></b-form-file>
            <b-form-text class="mb-1"> O tamanho máximo da imagem é de 10 megabytes. </b-form-text> 
          </b-form-group>
          <div class="form-group">
            <label for="descricao">
              <strong>Descrição</strong>
            </label>
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
                <label for="inicioExibicao">
                  <strong>Início de exibição</strong>
                </label>
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
                <label>
                  <strong>Fim de exibição</strong>
                </label>
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
              <i class="fa fa-dot-circle-o"></i> Salvar
            </b-button>
            <b-button to="/tutor/noticias/" variant="danger">
              <i class="fa fa-ban"></i> Cancelar
            </b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import moment from "moment";

export default {
  layout: "menu/tutor",
  data() {
    return {
			mainProps: { width: 425, height: 200},
      selected: [],
      file:[],
      imageData: "",
      foto: "",
      progressValue: 0,
      form: {
        titulo: "",
        corpo: "",
        imagem: "",
        inicio_exibicao: null,
        limite_exibicao: null,
        ativo: false
      },
      errors: [],
      minDate: null
    };
  },
  mounted() {
    this.minDate = moment().format("YYYY-MM-DD");

    this.$axios
      .get("noticia/" + this.$route.params.id)
      .then(res => {
        this.form = res.data;
        this.foto = this.filterNameFile(res.data.imagem);
        this.$nuxt.$emit("changeCrumbs", this.form.titulo);
      })
      .catch(err => {
        if (err.response.status === 404) {}
        else if (err.response.status === 403) {
          Swal.fire({
            title: "Houve um problema...",
            text: "Verifique se possui a permissão necessária ou se a sessão foi expirada. "
            + "Caso a sessão tenha sido expirado, tente novamente.",
            icon: "error"
          })
          .then( () => this.$route.push('/login'));
        } 
        else {
          Swal.fire({
            title: "Houve um problema...",
            text: "Por favor, tente recarregar a página. Caso não dê certo," + 
            " tente novamente mais tarde.",
            icon: "error"
          })
        }
      });
  },
  computed: {
    disabledDataExibicao() {
      return this.form.inicio_exibicao === "";
    }
  },
  methods: {
    filterNameFile(file) {
      return file.split('/').slice(2)[0];
    },
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
          .post("https://petcc.dimap.ufrn.br:8443/uploadfile",formData, {
            onUploadProgress: uploadEvent => {
              this.progressValue = `${Math.round(uploadEvent.loaded/ uploadEvent.total * 100)}%`
            }
          })
          .then(res => {
            this.form.imagem = res.data;
            this.progressValue = 0
            this.file = []
            this.atualizar();
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
        this.atualizar();
      }      
    },
    async atualizar(){
      if (this.checkForm()) {
        let idPetiano = 1;
        await this.$axios
          .get("petianos-pessoa/" + this.$store.state.profile.idPessoa)
          .then(res => {
            idPetiano = res.data.idPetiano;
          });

        await this.$axios
          .post("noticia-cadastro/" + idPetiano, this.form)
          .then(res => {
            Swal.fire({
              title: "Notícia editada",
              icon: "success"
            }).then(() => {
              this.$router.push("/tutor/noticias");
            });
          })
          .catch(err => {
            Swal.fire({
              title: "Notícia não editada",
              icon: "error"
            }).then(() => {
              this.$router.push("/tutor/noticias");
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
h2, h3 {
  font-weight: 300;
}

strong {
  color: gray;
  font-size: 16px;
}
</style>