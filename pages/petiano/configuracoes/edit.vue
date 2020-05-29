<template>
  <div class="col-md-12">
    <b-card header-tag="header">
      <template v-slot:header>
        <b-row>
          <b-col cols="12">
            <h3><i class="fa fa-edit"></i> Editando informações</h3>
          </b-col>
        </b-row>  
      </template>
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="exampleFormControlInput1"><strong>Sobre o PET-CC:</strong></label>
          <b-form-textarea
            rows="8"
            v-model="informacoes.sobre"
          ></b-form-textarea>
        </div>
        <b-row>
          <b-col>
            <div class="form-group">
              <label for="exampleFormControlInput1"><strong>Telefone:</strong></label>
              <input type="text" placeholder="Digite o telefone"  class="form-control" v-model="informacoes.telefone" />
            </div>
          </b-col>
          <b-col>
            <div class="form-group">
              <label for="exampleFormControlInput1"><strong>Youtube:</strong></label>
              <input type="text" placeholder="Digite o Youtube"  class="form-control" v-model="informacoes.youtube" />
            </div>    
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <div class="form-group">
              <label for="exampleFormControlInput1"><strong>Email:</strong></label>
              <input type="text" placeholder="Digite o e-mail"  class="form-control" v-model="informacoes.email" />
            </div>
          </b-col>
          <b-col>
            <div class="form-group">
              <label for="exampleFormControlInput1"><strong>Facebook:</strong></label>
              <input type="text" placeholder="Digite o Facebook"  class="form-control" v-model="informacoes.facebook" />
            </div>
          </b-col>
        </b-row> 
        <b-row>
          <b-col>
            <div class="form-group">
              <label for="exampleFormControlInput1"><strong>Github:</strong></label>
              <input type="text" placeholder="Digite o Github"  class="form-control" v-model="informacoes.github" />
            </div>
          </b-col>
          <b-col>
            <div class="form-group">
              <label for="exampleFormControlInput1"><strong>Instagram:</strong></label>
              <input type="text" placeholder="Digite o Instagram"  class="form-control" v-model="informacoes.instagram" />
            </div>        
          </b-col>
        </b-row>          
        <div class="form-group">
          <label for="exampleFormControlInput1"><strong>Endereço:</strong></label>
          <input type="text" placeholder="Digite o endereço"  class="form-control" v-model="informacoes.endereco" />
        </div>
        <div class="form-group">
          <b-button type="submit" variant="primary"><i class="fa fa-dot-circle-o"></i> Salvar modificações</b-button>
          <b-button @click.prevent="cancelForm()" variant="danger"><i class="fa fa-ban"></i> Cancelar</b-button>
        </div>
      </form>
    </b-card>
  </div>
</template>

<script>


import Swal from "sweetalert2";

export default {
  layout: "menu/petiano",
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
      this.$router.push('/petiano/configuracoes')      
    },
    submitForm(e) {
      this.$axios.post("informacoes-cadastro", this.informacoes)
        .then(res => {
          Swal.fire({
            title: 'Informações atualizadas',
            icon: 'success'
          }).then( () => {
            this.$router.push('/petiano/configuracoes')
          })
        })
        .catch(err => {
          Swal.fire({
            title: 'Informações não atualizadas',
            icon: 'warning',
          }).then( () => {
            this.$router.push('/petiano/configuracoes')
          })
        })
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
}
</style>
