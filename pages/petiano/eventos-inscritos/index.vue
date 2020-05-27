<template>
  <div class="animated fadeIn">
    <div v-if="tableItems.length > 0">
      <b-row>
        <b-col md="12">
          <b-card >
            <template v-slot:header>
              <h4>Petianos</h4>
            </template>

            <b-input-group  class="mb-3" >
                <!-- Always bind the id to the input so that it can be focused when needed -->
                <b-form-input
                  v-model="keywordPetiano"
                  placeholder="Busca"            
                  type="text"
                ></b-form-input>
                <b-input-group-text slot="append">
                  <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="keyword = ''"><i class="fa fa-remove"></i></b-btn>
              </b-input-group-text>
              </b-input-group>


            <b-table
              class="mb-3"
              outlined
              striped hover 
              responsive="sm"
              :current-page="currentPage"
              :items="itemsPetianos"
              :fields="tableFieldsPetianos"
              :per-page="10"
            >
              <template v-slot:cell(actions)="row">
                <b-button class="btn btn-sm btn-danger"  
                @click="removerPetiano(row.item.idPetiano)"><i class="fa fa-trash-o fa-fw"></i> Remover petiano</b-button>
              </template>
            </b-table>
            <nav>
              <b-pagination
                :total-rows="itemsPetianos.length"
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
              <h4>Usuários</h4>
            </template>

              <b-input-group  class="mb-3" >
                  <!-- Always bind the id to the input so that it can be focused when needed -->
                  <b-form-input
                    v-model="keyword"
                    placeholder="Busca"            
                    type="text"
                  ></b-form-input>
                  <b-input-group-text slot="append">
                    <b-btn class="p-0" :disabled="!keyword" variant="link" size="sm" @click="keyword = ''"><i class="fa fa-remove"></i></b-btn>
                </b-input-group-text>
                </b-input-group>


              <b-table
                class="mb-3"
                responsive="sm"
                :current-page="currentPage"
                :items="itemsUsuarios"
                :fields="tableFields"
                striped hover 
                :per-page="10"
                outlined
              >
                <template v-slot:cell(actions)="row">
                  
                  <b-button
                    class="btn btn-sm btn-danger"
                    @click="tornarPetiano(row.item.idPessoa)"
                    v-if="row.item.petiano"
                  ><i class="fa fa-trash-o fa-fw"></i>Remover petiano</b-button>
                  <b-button
                    class="btn btn-sm btn-warning" 
                    @click="tornarPetiano(row.item.idPessoa)" 
                    v-else
                  ><i class="fa fa-check" aria-hidden="true"></i> Tornar petiano</b-button>
                </template>
              </b-table>
              <nav>
                <b-pagination
                  :total-rows="itemsUsuarios.length"
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
    <div class="row" v-else>
        <b-card
    no-body
    style="max-width: 20rem;"
    img-src="https://img.r7.com/images/2014/04/11/6wao8iijic_687qho1a4h_file.jpg"
    img-alt="Image"
    img-top
  >
    <template v-slot:header>
      <h6 class="mb-0">Nenhum usuário cadastrado...</h6>
    </template>
  </b-card>
      
      
      </div>
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
      keywordPetiano: '',
      keyword: '',
      currentPage: 1,
      tableItemsPetianos: [],
      tableItems: [],
      tableFieldsPetianos: [
        {key : "pessoa.nome", label: "Nome"},
        {key: "actions", label: "Ações disponíveis"}
      ],
      tableFields: [
        { key: "nome"},
        { key: "cpf", label: "CPF" , formatter: (value) => { if (value != null) return `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9, 11)}` }},
        { key: "actions", label: "Ações disponíveis" }
      ]
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
    
    itemsUsuarios () {
      return this.keyword
          ? this.tableItems.filter(item => item.nome.includes(this.keyword) || item.cpf.includes(this.keyword))
          : this.tableItems
    },
    
    itemsPetianos () {
      return this.keywordPetiano
          ? this.tableItemsPetianos.filter(item => item.pessoa.nome.includes(this.keyword))
          : this.tableItemsPetianos
    }
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
      await this.$axios
       this.$axios.get("https://epet.imd.ufrn.br:8443/api/pessoas", {
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
      await this.$axios
       this.$axios.get("http://epet.imd.ufrn.br/service/api/petianos-atuais", {
          auth: { username: "teste@gmail.com", password: "123456789" }
        })
        .then(res => {
          this.tableItemsPetianos = res.data.content;
        });
    },
    async removerPetiano(user){
      await this.$axios.delete(`http://epet.imd.ufrn.br/service/api/petianos-remove/${user}`,
      {
        auth: {username: "teste@gmail.com", password: "123456789"}
      }).then(res => {
        console.log("Removido");
        this.atualizarTabelas()
      });
    },
    async tornarPetiano(user) {

      await this.$axios
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


