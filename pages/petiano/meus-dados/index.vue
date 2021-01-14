<template>
<div class="col-md-8">
  <b-card>
    <template v-slot:header>
      <b-row>
        <b-col>
          <h2>
            <i class="fa fa-user px-2"></i> Meus dados
          </h2>
        </b-col>
        <b-col>
          <b-row>
            <b-col>
              <b-button variant="warning" v-b-modal="'my-modal'" class="float-right mt-2">Modificar senha</b-button>
            </b-col>
          </b-row>
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
        <div class="row justify-content-center d-flex  align-items-center">
          <b-avatar v-if="imageData !== ''" :src="`${imageData}`" class="mb-3" size="10em"></b-avatar>
          <b-avatar v-else :src="`https://petcc.dimap.ufrn.br:8443/downloadfile/${fotoPessoa}`" class="mb-3" size="10em"></b-avatar>
        </div> 

        <h2 class="row justify-content-center d-flex  align-items-center mb-3"><b-badge>PETIANO</b-badge></h2>

        <b-form-file
          v-model="file"
          @change="previewImage" accept="image/*"
          placeholder="Nenhuma foto selecionada" browse-text="Selecionar foto" id="anexo"></b-form-file>
        <b-form-text class="mb-3"> Recomenda-se que a foto tenha dimensões de 300x300. </b-form-text>
            
        <b-form-group for="nome" label="Nome completo">
          <b-form-input id="nome" v-model="form.pessoa.nome" required></b-form-input>
          <b-form-text id="password-help-block"
            >Este nome estará presente nas declarações providas pelo sistema.</b-form-text>
        </b-form-group>
        
        <b-form-group label="Email">
          <b-form-input disabled  :value="form.pessoa.usuario.email" type="email" required></b-form-input>
        </b-form-group>

        <b-form-group for="area_interesse" label="Área de interesse">
          <b-form-textarea
              required id="area_interesse"
              v-model="form.area_interesse"
              placeholder="Digite a descrição"
              rows="3"
              max-rows="3"
            ></b-form-textarea>
        </b-form-group>

        <b-form-group label="Lattes">
          <b-form-input v-model="form.lattes" type="url"></b-form-input>
        </b-form-group>

        <b-form-group label="Site pessoal">
          <b-form-input v-model="form.site_pessoal" type="url"></b-form-input>
        </b-form-group>

        <b-button block type="submit" variant="primary">Atualizar</b-button>
      </b-form>
    </div>
  </b-card>

  <b-modal id="my-modal" hide-footer no-close-on-backdrop>
    <template v-slot:modal-title>
      <h5 class="text-center">Atualizar senha</h5>
    </template>
    <div class="d-block text-center tamanho">
      <p>Recomendações para uma senha segura:</p>
      <ul class="text-left">
        <li>Tamanho maior ou igual a 12;</li>
        <li>Letra maiúscula;</li>
        <li>Letra minúscula;</li>
        <li>Caractere especial;</li>
        
      </ul>
    </div>
    
    <b-form-input id="password" v-model="senha" type="password" class="mb-2" placeholder="Nova senha"></b-form-input>
    <b-input-group v-if="senha !== ''" class="mb-4">
      <b-form-input id="copassword" aria-describedby="input-live-feedback"  
        v-model="cosenha" type="password" class="mb-2" :state="confirmandoSenha" placeholder="Confirmar senha"></b-form-input>
      <b-form-invalid-feedback id="input-live-feedback" class="tamanho">
        As senhas não conferem
      </b-form-invalid-feedback>   
    </b-input-group>
    <b-button v-if="senha !== '' && senha === cosenha" @click="mudarSenha" variant="primary" class="w-100">Confirmar</b-button>
  </b-modal>
</div>
</template>

<script>
import moment from "moment";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

export default {
  name: "dashboard",
  layout: "menu/petiano",
  data() {
    return {
      file:[],
      imageData: "",
      fotoPessoa: "",
      progressValue: 0,
      isLoading: true,
      form: {
        pessoa: {
          nome: "",
          foto: "",
          usuario: {
            email: ""
          }
        },
      },
      senha:'',
      cosenha:''
    };
  },
  computed: {
    confirmandoSenha() {
      return (this.cosenha == this.senha) ? true : false
    }
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
    mudarSenha() {
      this.$axios
        .post("usuarios-atualizar/", 
          {
            "email":this.form.pessoa.usuario.email,
            "senha": this.senha
          }
        )
        .then(res => {
          Swal.fire({
            title: "Senha atualizada",
            icon: "success"
          })
        })
        .catch(err => {
          Swal.fire({
            title: "Senha não atualizada",
            icon: "error"
          })
        });
    },
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
    onSubmit() {
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
            this.form.foto = res.data;
            this.progressValue = 0
            this.file = [];
            
            this.atualizar();
          })
          .catch(err => {
            Swal.fire({
              title: "Foto na carregada",
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

      this.submitAlert(false);
    },
    getInfo() {
       this.$axios
        .get(`/petianos-pessoa/${this.$store.state.profile.idPessoa}`)
        .then(res => {
          this.form = res.data;
          
          if (this.form.foto != null)
            this.fotoPessoa = this.filterNameFile(this.form.foto)
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
    atualizar() {
      this.$axios
        .post("pessoas-atualizar/", {
          ...this.$store.state.profile,
          nome: this.form.pessoa.nome
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
      let title_ = "Dados atualizados";
      let text_ = "";

      if (withError) {
        icon_ = "error";
        title_ = "Dados não atualizados";
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
.tamanho {
  font-size: 18px;
}
</style>