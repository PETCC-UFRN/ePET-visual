<template>
  <div class="col-md-12">
    <b-alert :variant="this.alert.class" v-show="this.alert.class !== ''" show dismissible>
      {{ this.alert.message }}
      <!-- <b>&rArr;</b> -->
    </b-alert>
    <div class="card">
      <div class="card-body">
        <form @submit="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1">Nome:</label>
            <label for="exampleFormControlInput1">{{usuario.nome}}</label>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">CPF:</label>
            <label for="exampleFormControlInput1">{{usuario.cpf}}</label>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Área de interesse</label>
            <input type="text" class="form-control" v-model="usuario.area_interesse" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Lattes</label>
            <input type="text" class="form-control" v-model="usuario.lattes" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Site pessoal</label>
            <input type="text" class="form-control" v-model="usuario.site" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Data ingresso:</label>
            <input type="date" class="form-control" v-model="usuario.data_ingresso" />
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1">Data egresso:</label>
            <input type="date" class="form-control" v-model="usuario.data_egresso" />
          </div>
          <div class="form-group">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "../../axios";

export default {
  layout: "menu/petiano",
  props: ["guid"],
  data() {
    return {
      usuario: {
        id: 0,
        nome: "",
        cpf: "",
        area_interesse: "",
        lattes: "",
        site: "",
        data_ingresso: "",
        data_egresso: "",
        id_petiano: 0
      },
      alert: {
        message: "",
        class: ""
      }
    };
  },
  async mounted() {
    await axios.get("pessoas/3").then(res => {
      let pessoa = res.data;
      this.usuario.id = pessoa.idPessoa;
      this.usuario.nome = pessoa.nome;
      this.usuario.cpf = pessoa.cpf;
    });
    await axios
      .get("petianos-atuais")
      .then(res => {
        let res_ = res.data.content;
        let filtro = res_.filter(petiano_ => {
          return petiano_.pessoa.idPessoa === this.usuario.id;
        });

        if (!filtro[0].area_interesse)
          this.usuario.area_interesse = filtro[0].area_interesse;

        if (!filtro[0].lattes) this.usuario.lattes = filtro[0].lattes;

        if (!filtro[0].site_pessoal) this.usuario.site = filtro[0].site_pessoal;

        if (!filtro[0].data_egresso)
          this.usuario.data_egresso = filtro[0].data_egresso;

        if (!filtro[0].data_ingresso)
          this.usuario.data_ingresso = filtro[0].data_ingresso;

        this.usuario.id_petiano = filtro[0].idPetiano
      })
      .catch(err => {
        console.log(err);
      });
  },
  methods: {
    submitForm(e) {
        console.log(this.usuario)
      axios
        .put(`petianos-editar/${this.usuario.id}`, {
            data_ingresso: this.usuario.data_ingresso,
            area_interesse: this.usuario.area_interesse,
            lattes: this.usuario.lattes,
            site_pessoal: this.usuario.site_pessoal,
            })
        .then(res => {
            this.alert.class = "Primary Alert";
            this.alert.message = "Perfil atualizado!";
            console.log("Atualizado")
        })
        .catch(err => {
            console.log(err)
          this.alert.class = "danger";
          this.alert.message = "Perfil não atualizado. Tente novamente";
        });
      e.preventDefault();
    }
  }
};
</script>