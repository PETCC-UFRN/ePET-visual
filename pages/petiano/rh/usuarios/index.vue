<template>
  <div class="animated fadeIn">
    <div v-if="tableItems.length > 0">
      <b-row>
        <b-col md="12">
          <b-card >

            <template v-slot:header>
              <h5>Petianos</h5>
            </template>

            <b-table
              class="mb-0 "
              hover
              head-variant="dark"
              responsive="sm"
              :current-page="currentPage"
              :bordered="false"
              :items="tableItemsPetianos"
              :fields="tableFieldsPetianos"
              :per-page="10"
            >
              <template v-slot:cell(actions)="row">
                <b-button class="btn btn-sm btn-danger"  @click="removerPetiano(row.item.idPetiano)">Remover Petiano</b-button>
              </template>
            </b-table>
            <nav>
              <b-pagination
                :total-rows="tableItemsPetianos.length"
                :per-page="10"
                v-model="currentPage"
                prev-text="Anterior"
                next-text="Próximo"
                hide-goto-end-buttons
              />
            </nav>
          </b-card>
          <b-card >
            <template v-slot:header>
              <h5>Usuários</h5>
            </template>

            <b-table
              class="mb-0"
              responsive="sm"
              :current-page="currentPage"
              hover
              :items="tableItems"
              :fields="tableFields"
              :per-page="10"
              head-variant="dark"
            >
              <template v-slot:cell(actions)="row">
                
                <b-button
                  class="btn btn-sm btn-danger"
                  @click="tornarPetiano(row.item.idPessoa)"
                  v-if="row.item.petiano"
                >Remover Petiano</b-button>
                <b-button
                  class="btn btn-sm btn-success" 
                  @click="tornarPetiano(row.item.idPessoa)" 
                  v-else
                >Tornar Petiano</b-button>
              </template>
            </b-table>
            <nav>
              <b-pagination
                :total-rows="tableItems.length"
                :per-page="10"
                v-model="currentPage"
                prev-text="Anterior"
                next-text="Próximo"
                hide-goto-end-buttons
              />
            </nav>
          </b-card>
        </b-col>
      </b-row>
    </div>
    <div class="row" v-else><h5>Nenhum usuário cadastrado</h5></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  //middleware: 'auth',
  name: "admin",
  layout: "menu/petiano",
  components: {},
  data: function() {
    return {
      currentPage: 1,
      tableItemsPetianos: [],
      tableItems: [],
      tableFieldsPetianos: [
        {key : "pessoa.nome", label: "Nome"},
        {key: "actions", label: "Ações disponíveis"}
      ],
      tableFields: [
        { key: "cpf", label: "CPF" },
        { key: "actions", label: "Ações disponíveis" }
      ]
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"])
  },
  mounted() {
    this.getPetianos();
    this.getUsuarios();
    
  },
  methods: {
    async atualizarTabelas(){
      this.getPetianos();
      this.getUsuarios();
    },
    async getUsuarios() {
      await axios
        .get("http://epet.imd.ufrn.br/service/api/pessoas", {
          auth: { username: "teste@gmail.com", password: "123456789" }
        })
        .then(res => {
          let data = res.data.content;
          let filtro = data.filter((pessoa) => {
            let flag = true;
            let e = null;
            for(e of this.tableItemsPetianos){
              console.log(e);
              if(e.pessoa.idPessoa === pessoa.idPessoa){
                flag = false;
              }
            }

            return flag;
          })
          
          this.tableItems = filtro;

          console.log(this.tableItems)
        })
        .catch(er => console.log(er));
    },
    async getPetianos() {
      await axios
        .get("http://epet.imd.ufrn.br/service/api/petianos-atuais", {
          auth: { username: "teste@gmail.com", password: "123456789" }
        })
        .then(res => {
          this.tableItemsPetianos = res.data.content;
        });
    },
    async removerPetiano(user){
      await axios.delete(`http://epet.imd.ufrn.br/service/api/petianos-remove/${user}`,
      {
        auth: {username: "teste@gmail.com", password: "123456789"}
      }).then(res => {
        console.log("Removido");
        this.atualizarTabelas()
      });
    },
    async tornarPetiano(user) {

      await axios
        .post(
          `http://epet.imd.ufrn.br/api/petianos-cadastro/${user}`,
          {data: {}},
          {
            auth: { username: "teste@gmail.com", password: "123456789" }
          }
        )
        .then(res => {
          console.log("FOI!");
          this.atualizarTabelas()
        });
    }
  }
};
</script>


