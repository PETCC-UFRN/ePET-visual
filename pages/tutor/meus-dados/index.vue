<template>
  <b-card>
    <template v-slot:header>
      <b-row>
        <b-col>
          <h2>
            <i class="fa fa-user px-2"></i> Meus dados
          </h2>
        </b-col>
      </b-row>
    </template>
    <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
      <h4>Carregando...</h4>
      <b-spinner
        style="width: 3rem; height: 3rem;"
        type="grow"
        variant="primary"
        label="Large Spinner"
      ></b-spinner>
    </div>
    <div v-else>
      <b-form @submit.prevent="onSubmit">
        <div v-if="form.data_ingresso != null">
          Período de participação: <b>{{form.data_ingresso | moment}}</b> - <b v-if="form.data_egresso != null">{{form.data_egresso | moment}}</b> 
        </div>
        <div class="row justify-content-center d-flex  align-items-center mb-3">
            <b-avatar :src="`${form.foto}`" class="mb-3" size="10em"></b-avatar>
        </div> 

        <b-form-file
              v-model="file"
              placeholder="Nenhuma foto selecionada" browse-text="Selecionar foto" id="anexo"></b-form-file>
            <b-form-text class="mb-1"> O tamanho máximo da foto é de 10 megabytes. </b-form-text>
            <b-progress :value="progressValue" :max="100"  show-progress animated></b-progress>
            <b-button block @click="fazerUploadImagem" 
              class="btn btn-sm btn-success mt-2 mb-4">
              Carregar foto
            </b-button> 

        <b-form-group for="nome" label="Nome completo">
          <b-form-input id="nome" v-model="form.pessoa.nome" required></b-form-input>
          <b-form-text
            id="password-help-block"
          >Este nome estará presente nos certificados e declarações providos pelo sistema.</b-form-text>
        </b-form-group>
        
        <b-form-group label="Email">
          <b-form-input :value="form.pessoa.usuario.email" type="email" required></b-form-input>
        </b-form-group>

        <b-form-group label="Área de interesse">
          <b-form-input v-model="form.area_interesse"></b-form-input>
        </b-form-group>

        <b-form-group label="Lattes">
          <b-form-input v-model="form.lattes" type="url"></b-form-input>
        </b-form-group>

        <b-form-group label="Site pessoal">
          <b-form-input v-model="form.site_pessoal" type="url"></b-form-input>
        </b-form-group>

        <b-button class="float-left  w-25" type="submit" variant="primary">Atualizar</b-button>
        <b-button class="float-right w-25" type="reset" variant="danger">Limpar</b-button>
      </b-form>
    </div>
    
  </b-card>
</template>

<script>
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import moment from "moment";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  data() {
    return {
      file:[],
      progressValue: 0,
      isLoading: true,
      form: {
        pessoa: {
          nome: "",
          foto: "",
          usuario: {
            email: ""
          }
        }
      }
    };
  },
  filters: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY");
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
    fazerUploadImagem(evento) {
      const formData = new FormData()
      formData.append("file", this.file)
      this.$axios
        .post("https://epet.imd.ufrn.br:8443/uploadfile",formData, {
          onUploadProgress: uploadEvent => {
            this.progressValue = `${Math.round(uploadEvent.loaded/ uploadEvent.total * 100)}%`
          }
        })
        .then(res => {
          this.form.foto = res.data;

          Swal.fire({
            title: "PDF de template atualizado",
            icon: "success"
          })
          .then( () => {
            this.progressValue = 0
            this.file = []
          });
        })
        .catch(err => {
          Swal.fire({
            title: "PDF de template não atualizado",
            text: "Tente novamente em outro momento.",
            icon: "error"
          })
          .then( () => {
            this.progressValue = 0
            this.file = []
          });
        });
    },
    getInfo() {
       this.$axios
        .get(`/petianos-pessoa/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          this.form = res.data;
          this.isLoading = false;
        })
        .catch(err => {
          Swal.fire({
            title: "Houve um problema...",
            text: "Por favor, tente recarregar a página. Caso não dê certo," + 
            " tente novamente mais tarde.",
            icon: "error"
          })
        });
    },

    onSubmit() {
      this.$axios
        .post("pessoas-atualizar/", {
          ...this.$store.state.profile,
          nome: this.form.pessoa.nome,
        })
        .catch(err => {
          this.submitAlert(true);
          console.log(err);
        });

      this.$axios
        .put(`petianos-editar/${this.$store.state.profile.idPessoa}`, this.form)
        .catch(err => {
          this.submitAlert(true);
          console.log(err);
        });

      this.submitAlert(false);
    },

    submitAlert(withError) {
      let icon_ = "success";
      let title_ = "Perfil atualizado";
      let text_ = "";

      if (withError) {
        icon_ = "error";
        title_ = "Perfil não atualizado";
        text_ = "Por favor, tente novamente.";
      }

      if (!(this.form.pessoa.nome == "")) {
        Swal.fire({
          icon: icon_,
          title: title_,
          text: text_,
        });
      }
    }
  }
};
</script>

<style scoped>
h2,
h4 {
  font-weight: 300;
}
</style>