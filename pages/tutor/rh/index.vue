<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h3>Pessoas cadastradas</h3>
      </template>
      <div v-if="pessoas.length > 0">
        <b-input-group class="mt-3 mb-3">
          <b-form-input placeholder="Busca" type="text" v-model="keyword"></b-form-input>
          <b-input-group-append>
            <b-button variant="success" @click="search">
              <i class="fa fa-search"></i>
            </b-button>
            <b-button variant="outline-danger" @click="getPessoas">
              <i class="fa fa-remove"></i>
            </b-button>
          </b-input-group-append>
        </b-input-group>

        <b-table
          responsive="sm"
          :items="pessoas"
          :current-page="currentPage"
          :bordered="true"
          :per-page="20"
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
        <nav>
          <b-pagination
            :total-rows="numPages"
            :per-page="20"
            v-model="currentPage"
            prev-text="Anterior"
            next-text="Próximo"
            hide-goto-end-buttons
          />
        </nav>
      </div>
      <div v-else>Nenhuma pessoa cadastrada</div>
    </b-card>

    <b-modal ref="modal-create" title="Informações adicionais" hide-footer no-close-on-backdrop>
      <label for="data-ingresso">Data ingresso</label>
      <b-form-datepicker
        id="data-ingresso"
        v-model="modal.data_ingresso"
        type="date"
        required
        locale="pt-br"
        label-no-date-selected="Nenhuma data selecionada"
      ></b-form-datepicker>
      <b-button variant="primary" @click="createOrUpdatePetiano('create')" class="float-right">OK</b-button>
    </b-modal>

    <b-modal ref="modal-update" title="Informações adicionais" hide-footer no-close-on-backdrop>
      <label for="data-egresso">Data egresso</label>
      <b-form-datepicker
        id="data-egresso"
        v-model="modal.data_egresso"
        type="date"
        required
        locale="pt-br"
        label-no-date-selected="Nenhuma data selecionada"
      ></b-form-datepicker>
      <b-button variant="primary" @click="createOrUpdatePetiano('update')" class="float-right">OK</b-button>
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
      modal: {},
      keyword: "",
      numPages: 1,
    };
  },
  mounted() {
    this.getPessoas();

    axios.get("tipo-usuario").then(res => {
      this.tipos_usuario = res.data;
    });
  },
  watch: {
    currentPage: function(val){
      axios.get("pessoas?page=" + val).then(res => {
        this.pessoas = res.data.content;
        this.pageable = res.data.totalPages;
      });
    }
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
            // se tipo petiano
            this.$set(this.modal, "item", row.item);
            this.showModal("modal-create");
          } else if (id_tipo != 2) {
            this.$set(this.modal, "item", row.item);
            this.showModal("modal-update");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    showModal(name) {
      console.log("abre modal");
      this.$refs[name].show();
    },
    hideModal(name) {
      this.$refs[name].hide();
    },
    createOrUpdatePetiano(type) {
      let pessoaSelected = this.pessoas.filter(
        item => item.idPessoa === this.modal.item.idPessoa
      )[0];
      if (type === "create") {
        pessoaSelected["data_ingresso"] = this.modal.data_ingresso;
        pessoaSelected["data_egresso"] = null;
      } else {
        pessoaSelected["data_egresso"] = this.modal.data_egresso;
      }

      axios
        .post("petianos-cadastro/" + this.modal.item.idPessoa, pessoaSelected)
        .then(res => {
          this.hideModal("modal-create");
          this.hideModal("modal-update");
        })
        .catch(err => {
          alert(
            "Algo deu errado na hora de cadastrar o petiano. Tente novamente mais tarde!"
          );
        });
    },
    search() {
      axios.get("pesquisar-pessoa/" + this.keyword).then(res => {
        this.pessoas = res.data.content;
      });
    },
    getPessoas(){
      axios.get("pessoas").then(res => {
        this.pessoas = res.data.content;
        this.pageable = res.data.totalPages;

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