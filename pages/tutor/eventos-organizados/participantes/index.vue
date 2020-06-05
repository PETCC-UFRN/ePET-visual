<template>
  <div>
    <div class="card">
      <div class="card-header">
        <b-row>
          <b-col>
            <h3>
              <i class="fa fa-edit"></i> Cadastrar participante
            </h3>
          </b-col>
        </b-row>
      </div>
      <div class="card-body">
        <div class="form-group">
          <label for="exampleFormControlInput1">
            <h5>Nome</h5>
          </label>
          <v-pessoas label="nome" v-model="form.pessoa"></v-pessoas>
        </div>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <b-button block type="submit" variant="success">
              <i class="fa fa-check"></i> Confirmar cadastrado de participante
            </b-button>
          </div>
        </form>
      </div>
    </div>
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
            <template v-slot:cell(confirmado)="row">
              <div class="form-check">
                <b-form-checkbox size="lg" v-model="row.item.confirmado" disabled></b-form-checkbox>
              </div>
            </template>
            <template v-slot:cell(espera)="row">
              <div class="form-check">
                <b-form-checkbox size="lg" v-model="row.item.espera" disabled></b-form-checkbox>
              </div>
            </template>

            <template v-slot:cell(actions)="row">
              <b-button
                @click="confirmar(row.item.idParticipantes)"
                class="btn btn-sm btn-success"
                v-if="row.item.confirmado === false"
              >
                <i class="fa fa-check" aria-hidden="true"></i> Confirmar
              </b-button>
              <b-button
                @click="del(row.item.idParticipantes, row.index)"
                class="btn btn-sm btn-danger"
              >
                <i class="fa fa-trash-o fa-fw"></i> Remover
              </b-button>
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
import PessoasSelect from "~/components/selects/PessoasSelect";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  components: {
    "v-pessoas": PessoasSelect
  },
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
    submitForm(e) {
      e.preventDefault();
      this.$axios
        .post(
          `participantes-cadastrar/${this.$route.query.idEvento}/${this.form.pessoa}`
        )
        .then(res => {
          Swal.fire({
            title: "Participante cadastrado",
            icon: "success"
          }).then(() => {
            this.form = Object.entries(this.form).map(item => {
              return (item = "");
            });
            this.consumirParticipantesApi();
          });
        })
        .catch(err => {
          Swal.fire({
            title: "Participante não cadastrado",
            icon: "error"
          }).then(() => {
            this.form = Object.entries(this.form).map(item => {
              return (item = "");
            });
          });
        });
    },
    del(id, rowId) {
      this.$axios
        .delete("participantes-remove/" + id)
        .then(() => {
          Swal.fire({
            title: "Participante removido",
            icon: "success"
          }).then(() => {
            this.participantes.splice(rowId, 1);
          });
        })
        .catch(() => {
          Swal.fire({
            title: "Participante não removido",
            icon: "error"
          });
        });
    },
    confirmar(id) {
      this.$axios.post(`participantes-confirmar/${id}`).then(() => {
        Swal.fire({
          title: "Participante confirmado",
          icon: "success"
        })
          .then(() => {
            this.consumirParticipantesApi();
          })
          .catch(() => {
            Swal.fire({
              title: "Participante não confirmado",
              icon: "error"
            });
          });
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
