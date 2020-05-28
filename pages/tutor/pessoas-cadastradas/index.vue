<template>
  <div>
    <b-card>
      <template v-slot:header>
        <h2><i class="fa fa-group px-2"></i>Pessoas cadastradas</h2>
      </template>
      <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>
        <div v-if="pessoas.length > 0">
          <b-input-group  class="mt-3 mb-3" >
            <b-form-input
              v-model="keyword"
              placeholder="Buscar por nome ou por CPF"            
              type="text"
            ></b-form-input>
            <b-input-group-text slot="append">
              <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="search"><i class="fa fa-search"></i></b-btn>
            </b-input-group-text>
            <b-input-group-text slot="append">
              <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="cancelSearch"><i class="fa fa-remove"></i></b-btn>
            </b-input-group-text>
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
              pills
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              hide-goto-end-buttons
            />
          </nav>
        </div>
        <div v-else><h5>Nenhuma pessoa cadastrada</h5></div>
      </div>
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

import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  data() {
    return {
      isLoading: true,
      pessoas: {},
      tipos_usuario: {},
      currentPage: 1,
      fields: [
        { key: "nome", sortable: true },
        { key: "cpf", sortable: false, label: "CPF",
          formatter: value => {
            if (value != null)
              return `${value.substring(0, 3)}.${value.substring(
                3,
                6
              )}.${value.substring(6, 9)}-${value.substring(9, 11)}`;
          }
        },
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
        },
      ],
      modal: {},
      keyword: "",
      numPages: 1,
    };
  },
  mounted() {
    this.getPessoas();

    this.$axios.get("tipo-usuario").then(res => {
      this.tipos_usuario = res.data;
    });
  },
  watch: {
    currentPage: function(val){
      this.$axios.get("pessoas?page=" + val).then(res => {
        this.pessoas = res.data.content;
        this.numPages = res.data.totalPages;
      });
    }
  },
  methods: {
    async changePermission(row, event) {
      let id_usuario = row.item.usuario.idUsuario;
      let id_tipo = event.target.value;
      await this.$axios
        .post(
          "pessoas-cadastro-atualizar/" + id_tipo + "/" + id_usuario,
          this.pessoas.filter(item => item.idPessoa === row.item.idPessoa)[0]
        )
        .then(res => {
          if (id_tipo == 2) {
            this.$set(this.modal, "item", row.item);
            this.showModal("modal-create");
          } else if (id_tipo != 2) {
            this.$set(this.modal, "item", row.item);
            this.showModal("modal-update");
          }
        })
        .catch(err => {
          Swal.fire({
            title: "Houve um problema...",
            text: "Por favor, tente recarregar a página. Caso não dê certo," + 
            " tente novamente mais tarde.",
            icon: "error"
          });
        });
    },
    showModal(name) {
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

      this.$axios
        .post("petianos-cadastro/" + this.modal.item.idPessoa, pessoaSelected)
        .then(res => {
          this.hideModal("modal-create");
          this.hideModal("modal-update");
        })
        .catch(err => {
          Swal.fire({
            title: "Houve um problema...",
            text: "Por favor, tente recarregar a página. Caso não dê certo," + 
            " tente novamente mais tarde.",
            icon: 'error'
          });
        });
    },
    cancelSearch() {
      this.keyword = "";
      this.getPessoas();
    },
    search() {
      this.$axios
        .get(`pesquisar-pessoa/${this.keyword}`)
        .then(res => {
          this.pessoas = res.data.content;
        })
        .catch( err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhuma pessoa encontrada",
              icon: 'info',
            });
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error',
            })
          }
        });
    },
    getPessoas(){
      this.$axios
        .get("pessoas")
        .then(res => {
          this.pessoas = res.data.content;
          this.numPages = res.data.totalPages;
          this.isLoading = false;
        })
        .catch( err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhuma pessoa cadastrada",
              icon: 'info',
            });
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error',
            })
          }
        });
    }
  }
};
</script>

<style scoped>
.bbutton {
  border-radius: 0px !important;
}


h2, h4 {
  font-weight: 300;
}
</style>