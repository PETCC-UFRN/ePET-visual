<template>
  <div class="animated fadeIn">
    <div v-if="tableItems.length > 0">
      <b-row>
        <b-col md="12">
          <b-card header="Petianos">
            <b-table
              class="mb-0 table-outline"
              responsive="sm"
              :current-page="currentPage"
              hover
              :items="tableItemsPetianos"
              :fields="tableFieldsPetianos"
              :per-page="10"
              head-variant="light"
            >
              <template v-slot:cell(actions)="row">
                <b-button @click="removerPetiano(row.item.idPetiano)">Remover Petiano</b-button>
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
          <b-card header="Usuários">
            <b-table
              class="mb-0 table-outline"
              responsive="sm"
              :current-page="currentPage"
              hover
              :items="tableItems"
              :fields="tableFields"
              :per-page="10"
              head-variant="light"
            >
              <template v-slot:cell(actions)="row">
                
                <b-button
                  @click="tornarPetiano(row.item.idPessoa)"
                  v-if="row.item.petiano"
                >Remover Petiano</b-button>
                <b-button @click="tornarPetiano(row.item.idPessoa)" v-else>Tornar Petiano</b-button>
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
    <div class="row" v-else>Nenhum usuário cadastrado.</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  //middleware: 'auth',
  name: "admin",
  layout: "adminLayout",
  components: {},
  data: function() {
    return {
      currentPage: 1,
      tableItemsPetianos: [],
      tableItems: [],
      tableFieldsPetianos: [
        {key : "pessoa.nome", label: "Nome"},
        {key: "actions", label: "Ações"}
      ],
      tableFields: [
        { key: "cpf", label: "CPF" },
        { key: "actions", label: "Ações" }
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
        .get("http://localhost:8080/api/pessoas", {
          auth: { username: "h@email.com", password: "password" }
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
        .get("http://localhost:8080/api/petianos-atuais", {
          auth: { username: "h@email.com", password: "password" }
        })
        .then(res => {
          this.tableItemsPetianos = res.data.content;
        });
    },
    async removerPetiano(user){
      await axios.delete(`http://localhost:8080/api/petianos-remove/${user}`,
      {
        auth: {username: "h@email.com", password: "password"}
      }).then(res => {
        console.log("Removido");
        this.atualizarTabelas()
      });
    },
    async tornarPetiano(user) {

      await axios
        .post(
          `http://localhost:8080/api/petianos-cadastro/${user}`,
          {data: {}},
          {
            auth: { username: "h@email.com", password: "password" }
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