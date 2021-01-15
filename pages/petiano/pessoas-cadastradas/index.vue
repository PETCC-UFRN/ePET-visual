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
            :bordered="false"
            striped   
            :per-page="pageSize"
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
             <b-button v-if="row.item.tipo_usuario.nome == 'comum'"  v-b-modal="'my-modal'"  @click="idUsuario = row.item.usuario.idUsuario " class="btn btn-sm btn-info">
                Modificar email
             </b-button>  
            </template>
          </b-table>
          <nav>
            <b-pagination
              :total-rows="numElements"
              :per-page="pageSize"
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
    <b-modal id="my-modal" hide-footer no-close-on-backdrop>
      <template v-slot:modal-title>
        <h5 class="text-center">Atualizar email</h5>
      </template>
        <div class="d-block text-center tamanho">
          <p>Insira o novo email e em seguida confirme o email escrevendo novamente. Por fim, aperte no botão de confirmar.</p>
        </div>
      <b-form-input id="email" v-model="email" type="email" class="mb-2 mt-2" placeholder="Nova email"></b-form-input>
      <b-input-group v-if="email !== ''" class="mb-4">
        <b-form-input id="coemail" aria-describedby="input-live-feedback"  
          v-model="coemail" type="email" class="mb-2 mt-2" :state="confirmandoEmail" placeholder="Confirmar email"></b-form-input>
        <b-form-invalid-feedback id="input-live-feedback" class="tamanho">
          Os emails não conferem
        </b-form-invalid-feedback>   
      </b-input-group>
      <b-button v-if="email !== '' && email === coemail" @click="mudarEmail" variant="primary" class="w-100">Confirmar</b-button>
    </b-modal>
    
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
      pessoas: [],
      currentPage: 1,
      email:"",
      coemail:"",
      idUsuario:"",
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
      numElements: 1,
      pageSize: 20
    };
  },
  computed: {
    confirmandoEmail() {
      return (this.coemail == this.email) ? true : false
    }
  },
  mounted() {
    this.getPessoas();

  },
  watch: {
    currentPage: function(val){
      this.$axios
        .get("pessoas?page=" + (val-1))
        .then(res => {
          this.pessoas = res.data.content;
          this.numElements = res.data.totalElements;
          this.pageSize = res.data.pageable.pageSize;
        });
    }
  },
  methods: {
    mudarEmail() {
      this.$axios
        .post("usuarios-atualizar-email/", 
          {
            "email":this.email,
            "id": this.idUsuario
          }
        )
        .then(res => {
          Swal.fire({
            title: "Email atualizado",
            icon: "success"
          });

          this.email = '';
          this.idUsuario = '';

          this.getPessoas();
        })
        .catch(err => {
          Swal.fire({
            title: "Email não atualizado",
            icon: "error"
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
        .get("pessoas?page=0")
        .then(res => {
          this.pessoas = res.data.content;
          this.numElements = res.data.totalElements;
          this.currentPage = res.data.number + 1;          
          this.pageSize = res.data.pageable.pageSize;
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