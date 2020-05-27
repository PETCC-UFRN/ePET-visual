<template>
  <div class="backDark">
    <div align="center" class="mb-2">
      <b-avatar :src="fotoPath" size="10em" variant="info" href="#" class="align-text-top"></b-avatar>
      <b-badge class="child inline-block-child">{{ status }}</b-badge>
    </div>

    <b-card>
      <h1 align="center" class="textDark">
        <strong>{{ nome }}</strong>
      </h1>

      <hr class="my-4" />
      <p v-html="perfilInfo"></p>

      <div class="row">
        <div class="textDark mr-5">
          <strong>CPF:</strong> {{ dataPerfil.cpf }} <br>
          <strong>Email:</strong> {{ email }} <br>
          <strong>Senha:</strong> ********
        </div>

        <div class="textDark" v-if="petianoTutorInfo">
          <strong>Áreas de interesse:</strong>
          {{ areaInteresse }}
          <strong>Data de ingresso:</strong>
          {{ dataIngresso }}
          <strong>Lattes:</strong>
          {{ lattes }}
          <strong>Site pessoal:</strong>
          <a style="color: #24333b;" :href="'//'+ sitePessoal" target="_blank">{{ sitePessoal }}</a>
        </div>
      </div>
    </b-card>
    <div align="center">
      <b-button
        class="float-left"
        variant="outline-primary"
        :href="'/petiano/perfil/edit/'"
      >Editar perfil</b-button>
      <b-button class="float-right" variant="danger" @click="deleteAccount">Excluir conta</b-button>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
export default {
  props: [
    "fotoPath",
    "status",
    "email",
    "cpf",
    "areaInteresse",
    "dataIngresso",
    "lattes",
    "sitePessoal",
    "petianoTutorInfo",
    "dataPerfil",
  ],

data() {
		return {
      // nome: this.dataPerfil.nome,
    }
},

mounted(){
this.carregar();
},

  methods: {

    carregar(){
      this.nome = this.dataPerfil.nome;
    },

    async deleteAccount() {
      const { value: password } = await Swal.fire({
        title: "Insira a senha para confirmar",
        input: "password",
        inputPlaceholder: "Insira a sua senha",
        customClass: {
          confirmButton: "btn btn-danger"
        },
        confirmButtonText: "Excluir",
        buttonsStyling: false,
        inputAttributes: {
          maxlength: 30,
          autocapitalize: "off",
          autocorrect: "off"
        }
      });

      if (password) {
        Swal.fire({
          customClass: {
            confirmButton: "btn btn-success"
          },
          buttonsStyling: false,
          icon: "success",
          title: "Conta excluída com sucesso!"
          //title: `Entered password: ${password}`
        });
      }
    }
  },
};
</script>


<style scoped>
.parent {
  padding: 2rem;
}

.inline-block-child {
  margin-left: 0.5em;
  display: inline-block;
}

.backDark {
  background-color: #24333b;
}

.textDark {
  color: #24333b;
}
</style>