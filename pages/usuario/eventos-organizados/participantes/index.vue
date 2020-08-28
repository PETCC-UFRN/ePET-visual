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
            :items="participantes"
            :current-page="currentPage"
            :bordered="false"
            striped   
            :per-page="10"
            pills
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
              :total-rows="participantes.length"
              :per-page="10"
              v-model="currentPage"
              prev-text="Anterior"
              pills
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
  computed: {
    items() {
      return this.keyword
        ? this.eventos.filter(item => {
            item.evento.titulo.includes(this.keyword) ||
              item.pessoa.nome.includes(this.keyword);
          })
        : this.eventos;
    }
  },
  mounted() {
    this.consumirParticipantesApi();
  },
  methods: {
    consumirParticipantesApi() {
      this.$axios
        .get(`participantes-evento/${this.$route.query.idEvento}`)
        .then(res => {
          this.participantes = res.data.content;
        })
        .catch(err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: "Nenhum pessoa cadastrada",
              icon: "info"
            });
          } else {
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
