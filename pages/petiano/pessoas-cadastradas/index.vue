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
        <em class="text-center"><b>Obs.:</b> Para tornar um petiano em um ex-petiano, modifique seu tipo de usuário de <b>petiano</b> para <u> <b>comum</b></u>.</em>
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
            :bordered="false"
            striped   
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
            <template v-slot:cell(actions)="row">
             <b-button  @click="row.toggleDetails" class="btn btn-sm btn-info">
                {{ row.detailsShowing ? 'Não modificar' : 'Modificar'}} email
              </b-button>              
            </template>
            <template v-slot:row-details>
              <b-card>
                <form @submit.prevent="mudarEmail(novoEmail)">
                  <div class="form-group  mr-2 mr-2">
                    <b-row class="mb-3">
                      <b-col sm="2" class="text-sm-right pt-2">
                        <label  for="email"><b>Novo email</b></label>
                      </b-col>
                      <b-col>
                        <b-form-input require v-model="novoEmail" id="email" placeholder="Digite o novo email"></b-form-input>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col>
                        <b-button class="text-xs-left" type="submit" block variant="success">Confirmar mudança</b-button>

                      </b-col>
                    </b-row>
                  </div>
                </form>
              </b-card>
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
  </div>
</template>

<script>

import Swal from "sweetalert2";
import Cookies from "js-cookie";

export default {
  name: "dashboard",
  layout: "menu/petiano",
  data() {
    return {
      isLoading: true,
      pessoas: {},
      currentPage: 1,
      novoEmail:"",
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
          key: "usuario",
          sortable: true,
          label: "Email",
          formatter: value => {
            return value.email;
          }
        },
        { key: "actions", label: "Ações disponíveis"  }
      ],
      modal: {},
      keyword: "",
      numPages: 1,
    };
  },
  mounted() {
    this.getPessoas();

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
    mudarEmail(email) {
      this.$axios
        .post("usuarios-atualizar-email", {
            email: email
          })
        .then(res => {
          Swal.fire({
            title: 'Email modificado',
            icon: 'success'
          })
        })
        .catch( err => {
          Swal.fire({
            title: "Houve um problema...",
            text: "Por favor, tente recarregar a página. Caso não dê certo," + 
            " tente novamente mais tarde.",
            icon: 'error',
          })
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