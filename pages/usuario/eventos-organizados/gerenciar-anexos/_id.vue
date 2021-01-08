<template>
  <div class="col-md-12">
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3>Adicionar anexo</h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <b-form-file 
          v-model="file"
          placeholder="Nenhum arquivo" browse-text="Selecionar arquivo" id="anexo"></b-form-file>
        <b-form-text> O tamanho máximo de arquivo é de 10 megabytes. </b-form-text>          

        <b-progress :value="progressValue" :max="100" show-progress animated></b-progress>
          <b-button block
            @click="fazerUploadAnexo()"
            class="btn btn-sm btn-success mt-2">
            Anexar arquivo
          </b-button>
      </b-card-body>
    </b-card>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3><i class="fa fa-files-o fa-fw" ></i>Gerenciar anexos</h3>
          </b-col>
        </b-row>
      </template>
      <b-card-body>
        <b-table
          responsive="sm"
          :items="anexos"
          :current-page="currentPage"
          :bordered="false"
          striped   
          :per-page="10"
          :fields="fields"
          >
          <template v-slot:cell(actions)="row">
            <b-button 
                @click.prevent="fazerDowloadAnexo(row.item.anexos)" 
              class="btn btn-sm btn-success mt-2">
              <i class="fa fa-download fa-fw"></i> Download
            </b-button>
            <b-button 
                @click.prevent="removeAnexo(row.item.idAnexo)" 
              class="btn btn-sm btn-danger mt-2">
              <i class="fa fa-trash-o fa-fw"></i> Remover
            </b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="anexos.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Anterior"
            next-text="Próximo"
            pills
            hide-goto-end-buttons
          />
        </nav>
      </b-card-body>
    </b-card>
  </div>
</template>
<script>
import Swal from "sweetalert2";
import moment from "moment";

export default {
  layout: "menu/usuario",
  data() {
    return {
      file:[],
      progressValue: 0,
      anexosUpload:[],
      anexos: [],
      quantidadeAnexos: 0,
      currentPage: 1,
      fields: [
        { key: "anexos", sortable: true, label: "Nome", 
          formatter: value => {
            if (value != null) return value.split('/').slice(2)[0].split('-').slice(2)[0];
          }},
        { key: "actions", label:"Ações disponíveis" },
      ],
      evento: {
        periodo_evento: [],
        d_inscricao: "",
        d_inscricao_fim: "",
        descricao: "",
        dias_compensacao: 0,
        fim_rolagem: "",
        inicio_rolagem: "",
        local: "",
        participante_anexos: false,
        percentual: 0,
        qtdCargaHoraria: "",
        qtdVagas: 0,
        textoDeclaracaoEvento: "",
        textoDeclaracaoEventoOrganizador: "",
        titulo: "",
        valor: 0,
        ativo: false
      },
      errors: [],
      minDate: null
    };
  },
  mounted() {
    this.minDate = moment().format("YYYY-MM-DD");

    this.$axios
      .get("eventos/" + this.$route.params.id)
      .then(res => {
        this.evento = res.data;
        this.$nuxt.$emit("changeCrumbs", this.evento.titulo);
      })
      .catch(err => {
        Swal.fire({
          title: "Houve um problema...",
          text:
            "Por favor, tente recarregar a página. Caso não dê certo," +
            " tente novamente mais tarde.",
          icon: "error"
        });
      });

    this.consumindoApiAnexos();
  },
  methods: {
    consumindoApiAnexos() {
      this.$axios
        .get(`anexos-evento/${this.$route.params.id}`)
        .then(res => {
          this.quantidadeAnexos = res.data.length;
          this.anexos = res.data; 
        })
        .catch(err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: 'Notícia não possui anexos',
              icon: 'info',
            });
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error'
            })
          }
        });
    },
    fazerUploadAnexo(evento) {
      const formData = new FormData()
      formData.append("file", this.file)

      this.$axios
        .post(`anexos-evento-upload/${this.$route.params.id}`, formData, {
          onUploadProgress: uploadEvent => {
            this.progressValue = `${Math.round(uploadEvent.loaded/ uploadEvent.total * 100)}%`
          }
        })
        .then(res => {
  
          this.$axios
            .post(`anexos-evento-cadastro/${this.$route.params.id}`, {
                anexos: res.data.anexos,
                idAnexo: res.data.idAnexo,
                evento: this.evento
              }
            )
            .then(res => {
              Swal.fire({
                title: "Anexo da notícia enviado",
                icon: "success"
              })
              .then( () => {
                this.progressValue = 0
                this.file = []
                this.consumindoApiAnexos();
              });
            })
            .catch(err => {
              Swal.fire({
                title: "Anexo da notícia não enviado",
                text: "Tente novamente em outro momento.",
                icon: "error"
              });
            });
        })
        .catch(err => {
          Swal.fire({
            title: "Upload do anexo não concluído",
            text: "Tente novamente em outro momento.",
            icon: "error"
          });
        });
    },
    fazerDowloadAnexo(nomeAnexo) {
      nomeAnexo = nomeAnexo.split('/').slice(2)[0]

      this.$axios
        .get(`http://177.20.148.190:8080/downloadfile/${nomeAnexo}`, {responseType: 'arraybuffer'})
        .then(res => {
          let fileURL = window.URL.createObjectURL(new Blob([res.data], {type:'application/*'}));
          let fileLink = document.createElement('a');

          let nomeAnexoCorrigido = nomeAnexo.split('-').slice(2)[0];

          fileLink.href = fileURL;
          fileLink.setAttribute('download', nomeAnexoCorrigido);
          document.body.appendChild(fileLink);
          fileLink.click();

        })
        .catch(err => {
          if (err.response.status === 404) {
            Swal.fire({
              title: 'Anexo não encontrado',
              icon: 'info',
            });
          }
          else {
            Swal.fire({
              title: "Houve um problema...",
              text: "Por favor, tente recarregar a página. Caso não dê certo," + 
              " tente novamente mais tarde.",
              icon: 'error'
            })
          }
        });
    },
    removeAnexo(idAnexo) {
      this.$axios
        .delete(`anexos-evento-remove/${idAnexo}`)
        .then(res => {
          Swal.fire({
            title: "Anexo removido",
            icon: "success"
          })
          .then(res => this.consumindoApiAnexos());
        })
        .catch(err => {
          Swal.fire({
            title: "Anexo não removido",
            text: "Tente novamente em outro momento.",
            icon: 'error'
          });
        });
    }
  },
};
</script>


<style scoped>
h2, h3 {
  font-weight: 300;
}

strong {
  color: gray;
  font-size: 16px;
}
</style>