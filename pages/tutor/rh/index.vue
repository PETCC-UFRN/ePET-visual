<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h3>Pessoas cadastradas</h3>
      </template>
      <div v-if="pessoas.length > 0">
        <!-- <b-input-group  class="mt-3 mb-3" >
          <b-form-input
            placeholder="Busca"            
            type="text"
          ></b-form-input>
          <b-input-group-text slot="append">
            <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="keyword = ''"><i class="fa fa-remove"></i></b-btn>
        </b-input-group-text>-->
        <!-- </b-input-group> -->

        <b-table
          responsive="sm"
          :items="pessoas"
          :current-page="currentPage"
          :bordered="true"
          :per-page="10"
          :fields="fields"
        >
          <template v-slot:cell(tipo_usuario)="row">
            <select @change="changePermission(row, $event)" class="form-control">
              <option
                v-for="tipo in tipos_usuario"
                :key="tipo.idTipo_usuario"
                :value="tipo.idTipo_usuario"
                :selected="row.item.tipo_usuario.idTipo_usuario === tipo.idTipo_usuario"
              >{{ tipo.nome }}</option>
            </select>
          </template>
        </b-table>
        <!-- <nav>
          <b-pagination
            :total-rows="items.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Anterior"
            next-text="Próximo"
            hide-goto-end-buttons
          />
        </nav>-->
      </div>
      <div v-else>Nenhuma pessoa cadastrada</div>
    </b-card>

    <b-modal ref="modal" title="Informações adicionais" hide-footer>
      <b-form-datepicker id="data-ingresso" v-model="modal.data_ingresso" type="date" required></b-form-datepicker>
      <b-button variant="primary" @click="createPetiano()" class="float-right">OK</b-button>
    </b-modal>
  </div>
</template>

<script>
import axios from "~/axios";
import Cookies from "js-cookie";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  data() {
    return {
      pessoas: {},
      tipos_usuario: {},
      currentPage: 1,
      fields: [
        { key: "nome", sortable: true },
        { key: "cpf", sortable: false },
        {
          key: "tipo_usuario",
          sortable: true,
          label: "Tipo de usuário",
          formatter: value => {
            return value.nome;
          }
        },
        {
          key: "usuario",
          sortable: true,
          label: "Email",
          formatter: value => {
            return value.email;
          }
        }
      ],
      modal: {}
    };
  },
  mounted() {
    console.log(Cookies.get('auth'));
    axios.get("pessoas").then(res => {
      this.pessoas = res.data.content;
    });

    axios.get("tipo-usuario").then(res => {
      this.tipos_usuario = res.data;
    });
  },
  methods: {
    async changePermission(row, event) {
      let id_usuario = row.item.usuario.idUsuario;
      let id_tipo = event.target.value;
      await axios
        .post(
          "pessoas-cadastro-atualizar/" + id_tipo + "/" + id_usuario,
          this.pessoas.filter(item => item.idPessoa === row.item.idPessoa)[0]
        )
        .then(res => {
          if (id_tipo == 2) {
            this.$set(this.modal, "item", row.item);
            this.showModal();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showModal() {
      console.log("abre modal");
      this.$refs["modal"].show();
    },
    hideModal() {
      this.$refs["modal"].hide();
    },
    createPetiano() {
      let pessoaSelected = this.pessoas.filter(
              item => item.idPessoa === this.modal.item.idPessoa
            )[0];
      pessoaSelected['data_ingresso'] = this.modal.data_ingresso;

      axios
        .post(
          "petianos-cadastro/" + this.modal.item.idPessoa,
          pessoaSelected
        )
        .then(res => {
          this.hideModal();
        })
        .catch(err => {
          alert('Algo deu errado na hora de cadastrar o petiano. Tente novamente mais tarde!');
        });
    }
  }
};
</script>

<style scoped>
h3 {
  text-align: center;
}
</style>