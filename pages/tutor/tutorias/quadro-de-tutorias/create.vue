<template>
  <div>
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h3><i class="fa fa-edit px-2"></i>Cadastrar disciplina</h3>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
          <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Código:</strong></label>
            <the-mask :mask="['AAA####']" class="form-control" placeholder="Digite o código" v-model="form.codigo" />
            <b-form-text>Código no formato AAA#### (três letras e 4 números)</b-form-text>
          </div>
          <div class="form-group">
            <label for="exampleFormControlInput1"><strong>Nome:</strong></label>
            <input type="text" class="form-control" placeholder="Digite o nome" v-model="form.nome" />
          </div>
          <div class="form-group">
            <b-button block type="submit" variant="success"><i class="fa fa-check"></i> Confirmar cadastro de disciplina</b-button>
          </div>
        </form>
      </div>
    </div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3><i class="fa fa-book px-2"></i>Disciplinas ativas cadastradas</h3>
          </b-col>
        </b-row>          
      </template>
      <div v-if="disciplinas.length > 0">
        <b-table
          responsive="sm"
          :items="disciplinas"
          :current-page="currentPage"
          :bordered="true"
          :per-page="10"
          :fields="fields"
        >
          <template v-slot:cell(actions)="row">
            <b-button 
              @click="cadastrar(row.item.idDisciplina)" 
              class="btn btn-sm btn-warning"
            ><i class="fa fa-check" aria-hidden="true"></i> Tornar tutor da disciplina
            </b-button>
            <!--<a
              class="btn btn-sm btn-primary"
              style="color: white"
              href='disciplina/edit/${row.item.id_disciplina}'
            >Editar {{row.item.id_disciplina}}</a>-->
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="disciplinas.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Anterior"
            next-text="Próximo"
            pills
            hide-goto-end-buttons
          />
        </nav>
      </div>
      <div v-else>
        <h5>Nenhuma disciplina ativa cadastrada</h5>
      </div>
    </b-card>
  </div>
</template>

<script>
import axios from "~/axios";
import Swal from "sweetalert2";
import {TheMask} from 'vue-the-mask';

export default {
  name: "dashboard",
  layout: "menu/tutor",
  components: {TheMask},
  
  data() {
    return {
      form: {
        codigo: "",
        ativo: true,
        nome: ""
      },
      disciplinas: [],
      currentPessoa:[],
      currentPetiano:[],
      currentPage: 1,
      fields: [
        { key: "codigo", sortable: true, label: "Código" },
        { key: "nome", sortable: true, label: "Nome" },
        { key: "actions", sortable: true, label: "Ações disponíveis" },
      ]
    };
  },
  mounted() {
    axios
      .get("pessoas-usuario")
      .then(res => {
        this.currentPessoa = res.data;
        if( res.data.tipo_usuario.nome != "petiano" && 
          res.data.tipo_usuario.nome != "tutor") {
          this.$router.push("/");
        }
      })
      .finally( () =>{
        axios
          .get(`petianos-pessoa/${this.currentPessoa.idPessoa}`)
          .then( res2 => {
            this.currentPetiano = res2.data;
          })
          .catch( () => {
            if (err.response.status === 404) {
              Swal.fire({
                title: "Nenhum petiano cadastrado",
                icon: 'error',
              });
            }
            else {
              Swal.fire({
                title: "Falha em consumir API",
                icon: 'error',
              })
              .then( () => {
                  let vm = this;
                  setTimeout(function() {
                    location.reload();
                  }, 1500);
              });
            }
          }); 
      });
  },
  async fetch() { 
    this.consumirDisciplinasApi();
  },
  methods: {
    consumirDisciplinasApi() {
      axios
        .get("disciplinas-ativas")
        .then( res => {
          this.disciplinas = res.data.content;
        })
        .catch( err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhum pessoa cadastrada",
              icon: 'info',
            });
          }
          else {
            Swal.fire({
              title: "Falha em consumir API",
              icon: 'error',
            })
            .then( () => {
                let vm = this;
                setTimeout(function() {
                  location.reload();
                }, 1500);
            });
          }
        });
    },
    submitForm(e) {
      e.preventDefault();
      axios
        .post("disciplinas", this.form)
        .then(res => {
          Swal.fire({
            title: 'Disciplina cadastrada',
            icon: 'success',
          })
          .then( () => {
            this.reset();          
            this.consumirDisciplinasApi();
          });
        })
        .catch(err => {
          Swal.fire({
            title: 'Disciplina não cadastrada',
            icon: 'error',
          });
        });
    },
    cadastrar(id){
      axios
        .post(`tutoria-cadastro/${this.currentPetiano.idPetiano}/${id}/`)
        .then( () => {
          Swal.fire({
            title: 'Disciplina tutorada cadastrada',
            icon: 'success',
          })
          .then( () => {
            this.$router.push("/tutor/tutorias/quadro-de-tutorias/");        
          });
        })
        .catch( () => {
          Swal.fire({
            title: 'Disciplina tutorada não cadastrada',
            icon: 'error',
          });
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