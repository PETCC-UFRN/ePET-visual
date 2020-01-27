<template>
  <div>
    <div>
      <b-card header="Perfil">
        <div id="imagem" v-if="pessoa !== null">
          <div
            v-if="pessoa.tipo_usuario.nome === 'petiano' || pessoa.tipo_usuario.nome === 'tutor'"
          >
            <a
              class="btn btn-sm btn-primary float-right"
              style="color: white"
              href="/perfil/create"
            >Editar perfil</a>
            <div v-if="this.petiano">
              <img v-if="!this.petiano.foto" src="../../assets/default-user.png" />
            </div>
            <div v-else>
              <div>
                <img src="../../assets/default-user.png" />
              </div>
            </div>
          </div>
          <div v-else>
            <img src="../../assets/default-user.png" />
          </div>
        </div>
        <div id="informacoes" v-if="pessoa !== null">
          <h1>{{this.pessoa.nome}}</h1>
          <p>{{this.pessoa.cpf}}</p>

          <div id="petiano_info" v-if="pessoa.tipo_usuario.nome ==='petiano' && petiano">
            <p v-if="this.petiano.area_interesse">Área de interesse: {{this.petiano.area_interesse}}</p>
            <p v-if="this.petiano.lattes">Lattes: {{this.petiano.lattes}}</p>
            <p v-if="this.petiano.site_pessoal">Site pessoal: {{this.petiano.site_pessoal}}</p>

            <p v-if="this.petiano.data_ingresso">Data ingresso: {{this.petiano.data_ingresso}}</p>
            <p v-if="this.petiano.data_egresso">Data egresso: {{this.petiano.data_egresso}}</p>
          </div>
        </div>
      </b-card>
    </div>
  </div>
</template>

<script>
import axios from "../../axios";

export default {
  name: "dashboard",
  layout: "menu/petiano",
  data() {
    return {
      pessoa: null,
      petiano: null
    };
  },
  async mounted() {
    // await axios.get("pessoas/3").then(res => {
    //   this.pessoa = res.data;
    // });

    // if (this.pessoa) {
    //   await axios.get("petianos-atuais").then(res => {
    //     let res_ = res.data.content;
    //     let filtro = res_.filter(petiano => {
    //       return petiano.pessoa.idPessoa === this.pessoa. idPessoa;
    //     });

    //     this.petiano = filtro[1];
    //   });
    // }
  },
  methods: {
    del(id, rowId) {
      axios.delete("eventos-remove/" + id).then(() => {});
    },
    ativar(id) {
      axios.post("eventos-ativar/" + id).then(() => {
        // para não ter que atualizar os eventos em tempo real forçarei a página a atualizar
      });
    }
  }
};
</script>