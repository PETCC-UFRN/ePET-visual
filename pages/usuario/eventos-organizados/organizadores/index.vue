<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3>
              <i class="fa fa-group fa-fw"></i> Organizadores cadastrados
            </h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <div v-if="organizadores.length > 0">
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
            id="f"
            responsive="sm"
            :items="organizadoresFiltrados"
            :current-page="currentPage"
            :bordered="false"
            striped   
            :per-page="10"
            :fields="fields"
          >
          </b-table>
          <nav>
            <b-pagination
              :total-rows="organizadoresFiltrados.length"
              :per-page="10"
              pills
              v-model="currentPage"
              prev-text="Anterior"
              next-text="Próximo"
              hide-goto-end-buttons
            />
          </nav>
        </div>
        <div v-else>
          <h5>Nenhum organizador cadastrado</h5>
        </div>
      </b-card-body>
    </b-card>
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "dashboard",
  layout: "menu/usuario",
  data() {
    return {
      form: {
        pessoa: 0
      },
      keyword: "",
      limit: 20,
      pessoas:[],
      organizadores: [],
      currentPage: 1,
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
      ]
    };
  },
  computed: {
    organizadoresFiltrados () {
      return this.keyword
          ? this.organizadores.filter(item => item.pessoa.nome.includes(this.keyword) || item.pessoa.cpf.includes(this.keyword))
          : this.organizadores
    }
  },
  mounted(){
    this.consumirOrganizadoresApi();
  },
  async fetch() {
    this.consumirOrganizadoresApi();
  },
  methods: {
    consumirOrganizadoresApi() {
      this.$axios
        .get(`organizadores-evento/${this.$route.query.idEvento}`)
        .then(res => {
          this.organizadores = res.data;
        })
        .catch(err => {
          if (err.response && err.response.status === 404) { } 
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: "error"
            });
          }
        });
    }
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
