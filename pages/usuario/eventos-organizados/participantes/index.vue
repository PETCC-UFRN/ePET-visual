<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3>
              <i class="fa fa-group fa-fw"></i> Participantes cadastrados
            </h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <div v-if="participantes.length > 0">
          <b-input-group class="mt-1 mb-3">
            <b-form-input v-model="keyword" placeholder="Busca por nome ou por CPF" type="text"></b-form-input>
            <b-input-group-text slot="append">
              <b-btn
                class="p-0"
                :disabled="!keyword"
                variant="link"
                size="sm"
                @click="keyword = ''"
              >
                <i class="fa fa-remove"></i>
              </b-btn>
            </b-input-group-text>
          </b-input-group>

          <b-table
            responsive="sm"
            :items="participantesFiltrados"
            :bordered="false"
            striped   
            :per-page="pageSize"
            :fields="fields"
          >

            <template v-slot:cell(actions)="row">
              <nuxt-link
                :to="`/usuario/eventos-organizados/participantes/anexos/${row.item.idParticipantes}`"
                class="btn btn-sm btn-indigo mt-1"
              >
                <i class="fa fa-files-o fa-fw" ></i> Anexos
              </nuxt-link>
            
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
        <div v-else>
          <h5>Nenhum participante cadastrado</h5>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "dashboard",
  layout: "menu/petiano",
  data() {
    return {
      form: {
        pessoa: 0
      },
      pessoas: {},
      participantes: [],
      keyword: "",
      eventos: [],
        currentPage: 1,
        numElements: 1,
        pageSize: 20,
      fields: [
        { key: "pessoa.nome", label: "Nome", sortable: true },
        {
          key: "pessoa.cpf",
          label: "CPF",
          sortable: true,
          formatter: value => {
            if (value != null)
              return `${value.substring(0, 3)}.${value.substring(
                3,
                6
              )}.${value.substring(6, 9)}-${value.substring(9, 11)}`;
          }
        },
        { key: "actions", label: "Ações disponíveis" }
      ]
    };
  },
  watch: {
    currentPage: function(val){
      this.$axios
        .get(`participantes-evento/${this.$route.query.idEvento}?page=${(val-1)}`)
        .then(res => {
          this.participantes = res.data.content;
          this.numElements = res.data.totalElements;
          this.currentPage = res.data.number + 1;          
          this.pageSize = res.data.pageable.pageSize;
        });
    }
  },
  computed: {
    participantesFiltrados () {
      return this.keyword
          ? this.participantes.filter(item => item.pessoa.nome.includes(this.keyword) || item.pessoa.cpf.includes(this.keyword))
          : this.participantes
    }
  },
  mounted() {
    this.consumirParticipantesApi();
  },
  methods: {
    consumirParticipantesApi() {
      this.$axios
        .get(`participantes-evento/${this.$route.query.idEvento}?page=0`)
        .then(res => {
          this.participantes = res.data.content;
          this.numElements = res.data.totalElements;
          this.currentPage = res.data.number + 1;          
          this.pageSize = res.data.pageable.pageSize;
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
    },
    
  }
};
</script>

<style scoped>

h3, h4 {
  font-weight: 300;
}

h4 {
  text-align: center;
}
strong {
  font-size: 18px;
}
</style>
