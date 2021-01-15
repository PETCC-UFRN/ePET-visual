<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h2><i class="fa fa-check-circle px-2"></i>Tutorias ministradas</h2>
          </b-col>
        </b-row>
      </template>

      <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
        <h4>Carregando...</h4>
        <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
      </div>
      <div v-else>

        <div v-if="tutorias_ministradas.length > 0">
          <b-table
            responsive="sm"
            :items="tutorias_ministradas"
            :current-page="currentPage"
            :bordered="false"
            striped   
            :per-page="10"
            :fields="fields"
          >
            <template v-slot:cell(actions)="row">

              <b-button
                class="btn btn-sm btn-success"
                @click.prevent="mostrar(row)"
              >
                <i class="fa fa-check fa-fw"></i> Ativar
              </b-button>
              
            </template>
          </b-table>
          <div>
            <Pagination :totalRows="numItems" :perPage="perPage" v-on:currentPage="setCurrentPage"/>
          </div>

        </div>
        <div v-else>
          <h5>Nenhuma tutoria ministrada</h5>
        </div>
      </div>
    </b-card>

    <b-modal ref="modal-create"  hide-footer no-close-on-backdrop>
      <template v-slot:modal-title>
        <h5 class="text-center tam">Confirmação de data de tutoria</h5>
      </template>
      <div class="d-block text-center tamanho">
        <p>Informe a data em que a tutoria será realizada ou que foi realizada. Assim, aparecerá um botão de confirmação. Caso deseje modificar a data, basta clicar novamente em <strong>ATIVAR</strong>.</p>
      </div>
      <b-form-datepicker
        id="data-ingresso"
        v-model="modal.dataTutoria"
        type="date"
        required
        locale="pt-br"
        label-no-date-selected="Nenhuma data selecionada"
      ></b-form-datepicker>
      <b-button v-if="modal.dataTutoria != ''" variant="primary" @click="ativar('create')" class="w-100 mt-2">Confirmar</b-button>
    </b-modal>
  </div>
</template>

<script>
  import Swal from "sweetalert2";
  import Pagination from "~/components/Pagination";

  import moment from "moment";

  export default {
    name: "dashboard",
    layout: "menu/petiano",
    components: {
      Pagination,
    },
    data() {
      return {
        modal: {dataTutoria: ""},
        isLoading: true,
        idTutoriaMinistrada: "",
        tutorias_ministradas: [],
        currentPage: 0,
        numItems: 0,
        perPage: 20,
        fields: [
          {key: "tutoria.disciplina.codigo", label: "Código", sortable: true},
          {key: "tutoria.disciplina.nome", label: "Disciplina", sortable: true},
          {key: "data", sortable: true, label: "Data da tutoria", formatter: (date) => { if (date != null) return moment(date).format('DD/MM/YYYY')}  },
          {key: "tutoria.petiano.pessoa.nome", label: "Responsável", sortable: true},
          {key: "pessoa.nome", label: "Ministrado", sortable: true},
        { key: "actions", label: "Ações disponíveis"  }
          
        ]
      };
    },
    watch: {
      currentPage: function (val) {
        this.$axios.get("tutorias-ministradas?page=" + val).then(res => {
          this.noticias = res.data.content;
          this.numPages = res.data.totalElements;
        });
      }
    },
    mounted() {
      this.getTutoriasMinistradas();
    },
    methods: {
      showModal(name) {
        this.$refs[name].show();
      },
      hideModal(name) {
        this.$refs[name].hide();
      },
      mostrar(row) {
        this.idTutoriaMinistrada = row.item.idTutoria_ministrada;
       
        this.$set(this.modal, "item", row.item);
        this.showModal("modal-create");


      },
      ativar(type) {
        this.$axios
          .post(`tutorias-ministradas-ativar/${this.idTutoriaMinistrada}/${this.modal.dataTutoria} `)
          .then(res => {
            this.hideModal("modal-create");
            this.modal.dataTutoria = "";

            Swal.fire({
              title: "Tutoria ministrada ativada",
              text: "Preste atenção a data registrada. Mesmo que a data da tutoria seja alterada, o sistema contabilizará como a primeira data escolhida.",
              icon: "success"
            })
            .then( () => this.getTutoriasMinistradas());
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
      del(id, rowId) {
        this.$axios.delete("tutoria-desativa/" + id).then(() => {
          this.tutorias_ministradas.splice(rowId, 1);
          Swal.fire({
            title: "Tutoria removida com sucesso.",
            icon: "success"
          }).catch(err => {
            Swal.fire({
              title: "Tutoria não pode ser desativada, tente novamente mais tarde.",
              icon: "error"
            });
          });
        });
      },
      getTutoriasMinistradas() {
        this.$axios
          .get("pesquisar-petiano-tutoria-ministradas")
          .then(res => {
            this.tutorias_ministradas = res.data.content;
            this.numItems = res.data.totalElements;
            this.isLoading = false;
          })
          .catch(err => {
            if (err.response.status === 404) {}
            else if (err.response.status === 403) {
              Swal.fire({
                title: "Houve um problema...",
                text: "Verifique se possui a permissão necessária ou se a sessão foi expirada. "
                + "Caso a sessão tenha sido expirado, tente novamente.",
                icon: "error"
              })
              .then( () => this.$route.push('/login'));
            } 
            else {
              Swal.fire({
                title: "Houve um problema...",
                text: "Por favor, tente recarregar a página. Caso não dê certo," + 
                " tente novamente mais tarde.",
                icon: "error"
              })
            }
            this.isLoading = false
          });
      },
      setCurrentPage(val) {
        this.currentPage = val;
      },
    }
  };
</script>

<style scoped>
h2, h4 {
  font-weight: 300;
}
.tamanho {
  font-size: 18px;
}

.tam {
  font-size: 22px;
}
</style>