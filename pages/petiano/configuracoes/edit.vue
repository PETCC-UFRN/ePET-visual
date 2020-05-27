<template>
  <div class="col-md-12">
    <b-card header-tag="header">
      <template v-slot:header>
        <b-row>
          <b-col cols="12">
            <h3><i class="fa fa-edit"></i> Informações do site</h3>
          </b-col>
        </b-row>  
      </template>
      <b-card-body>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Sobre o PET-CC:</strong></label>
            <b-form-textarea
              rows="8"
              v-model="informacoes.sobre"
            ></b-form-textarea>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Telefone:</strong></label>
            <input type="text" placeholder="Digite o telefone"  class="form-control" v-model="informacoes.telefone" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Endereço:</strong></label>
            <input type="text" placeholder="Digite o endereço"  class="form-control" v-model="informacoes.endereco" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Email:</strong></label>
            <input type="text" placeholder="Digite o e-mail"  class="form-control" v-model="informacoes.email" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Youtube:</strong></label>
            <input type="text" placeholder="Digite o Youtube"  class="form-control" v-model="informacoes.youtube" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Instagram:</strong></label>
            <input type="text" placeholder="Digite o Instagram"  class="form-control" v-model="informacoes.instagram" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Facebook:</strong></label>
            <input type="text" placeholder="Digite o Facebook"  class="form-control" v-model="informacoes.facebook" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Github:</strong></label>
            <input type="text" placeholder="Digite o Github"  class="form-control" v-model="informacoes.github" />
          </div>
          <!-- <div class="form-group">
            <label for="exampleFormControlInput1">Inicio exibição:</label>
            <input type="date" class="form-control" v-model="form.inicio_exibicao" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Fim exibição:</label>
            <input type="date" class="form-control" v-model="form.limite_exibicao" />
          </div> -->
          <div class="form-group">
            <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Salvar modificações</b-button>
            <b-button @click.prevent="cancelForm()" variant="danger"><i class="fa fa-ban"></i> Cancelar</b-button>
          </div>
        </form>
      </b-card-body> 
    </b-card>
  </div>
</template>

<script>


import Swal from "sweetalert2";

export default {
  layout: "menu/tutor",
  data: function() {
    return {
      form: {
        youtube: "",
        facebook: "",
        instagram: "",
        github: ""
      },
      informacoes:{
        idInformacao: 1,
        sobre: "",
        telefone: "",
        endereco: "",
        email: ""
      }
    };
  },
  mounted() {
    this.$axios.get("informacoes").then(res => {
      this.informacoes = res.data;
    });
  },
  methods: {
    cancelForm(){
      this.$router.push('/petiano/configuracoes-site')      
    },
    submitForm(e) {
      this.$axios.post("informacoes-cadastro", this.informacoes)
        .then(res => {
          Swal.fire({
            title: 'Edição realizada',
            icon: 'success',
            timer: 2000
          }).then( () => {
            this.$router.push('/petiano/configuracoes-site')
          })
        })
        .catch(err => {
          Swal.fire({
            title: 'Erro na edição',
            icon: 'warning',
            timer: 2000
          }).then( () => {
            this.$router.push('/petiano/configuracoes-site')
          })
        })
    }
  }
};

</script>
