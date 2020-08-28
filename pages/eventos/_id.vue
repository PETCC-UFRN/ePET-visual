<template>
  <div class="container pt-5">
    <br>
    <h1 class="mt-3 mb-0"><nuxt-link to="/eventos"> <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
 Voltar aos eventos</nuxt-link></h1>
      <hr>
    <b-row>
			<b-col>
				<b-img v-if="this.evento.imagem !== null" rounded center class="mt-3 mb-5" v-bind="mainProps" :src="`https://epet.imd.ufrn.br:8443/downloadfile/${imageData}`" fluid alt="Imagem do evento"></b-img>
				<h3>{{evento.titulo}}</h3>
				<p class="mt-4 mb-1">
					<strong>Perído de inscrições:</strong>
					<span v-if="evento.d_inscricao !== ''">{{ this.evento.d_inscricao | moment }}</span> -
					<span v-if="evento.d_inscricao_fim !== ''">{{ this.evento.d_inscricao_fim | moment}}</span>
				</p>
				<p class="mt-0 mb-1">
					<strong>Dias de realização do evento:</strong>
          
					<span v-for="(dia, index) in evento.periodo_evento" v-bind:key="(dia, index)">
            <span v-if="index == evento.periodo_evento.length - 1">
              {{ dia | moment }}
            </span>
            <span v-else>
              {{ dia | moment }},
            </span>
          </span> 
				</p>
				<p class="mt-0 mb-1">
					<strong>Carga horária:</strong>
					{{evento.qtdCargaHoraria}} hora(s)
				</p>
				<p class="mt-0 mb-1">
					<strong>Total de vagas:</strong>
					{{evento.qtdVagas}}
				</p>
				<p class="mt-0 mb-1">
					<strong>Valor da inscrição:</strong>
					{{new Intl
						.NumberFormat([], { style: 'currency', currency: 'BRL'})           
						.format(evento.valor) }}
				</p>
				<p class="mt-0 mb-4">
					<strong>Local do curso:</strong>
					{{evento.local}}
				</p><p class="mt-3 mb-2">{{evento.descricao}}</p>
				<p class="mt-3 mb-4"><em><strong>Observação:</strong> Para se inscrever no evento, é necessário acessar 
				a plataforma de gerenciamento de eventos e tutorias do PET-CC UFRN. Caso não possua ainda cadastro,
				é possível realizar o cadastro nessa <nuxt-link to="/register">página web</nuxt-link>. Porém, caso já tenha, 
				faça login através dessa <nuxt-link to="/login">página web</nuxt-link>.</em></p>
          
        <div v-for="anexo in anexos" :key="anexo.id" >
          <b-button class="btn btn-indigo mt-1 mb-3 float-right mr-2"
            @click="fazerDowloadAnexo(anexo.anexos.split('/').slice(2)[0])"
            style="color: white"> <i class="fa fa-download fa-fw"></i> 
            {{anexo.anexos.split('/').slice(2)[0].split('-').slice(2)[0]}}
          </b-button>
        </div>
			</b-col>
		</b-row>
  </div>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";

export default {
  layout: 'index',
	head () {
		return {
			title: 'PET-CC UFRN | Eventos'
		}
	},
  data() {
		return {
      anexos: [],
      quantidadeAnexos: 0,
      imageData: "",
      evento: {
				idEvento: 0,
				d_inscricao: "",
				d_inscricao_fim: "",
				descricao: "",
				local: "",
        qtdCargaHoraria: "",
        periodo_evento: [],
				qtdVagas: "",
				titulo: "",
				valor: "", 
			},
			mainProps: { width: 425, height: 200},
    }
	},
	mounted(){
		this.$axios
			.get('eventos-abertos/'+ this.$route.params.id)
			.then((res) => {
        this.evento = res.data;

        if (this.evento.imagem != null)
          this.imageData = this.filterNameFile(this.evento.imagem); 
        
        this.$axios
          .get(`anexos-evento/${this.evento.idEvento}`)
          .then(res => {
            this.quantidadeAnexos = res.data.length;
            this.anexos = res.data; 
          })
          .catch(err => {
            if (err.response.status === 404) {}
            else {
              Swal.fire({
                title: "Houve um problema...",
                text: "Por favor, tente recarregar a página. Caso não dê certo," + 
                " tente novamente mais tarde.",
                icon: 'error'
              })
            }
          });
      })
      .catch( err => {
        Swal.fire({
          title: "Houve um problema...",
          text: "Por favor, tente recarregar a página. Caso não dê certo," + 
          " tente novamente mais tarde.",
          icon: 'error',
        })
      
      });
	},
  filters: {
    moment: function(date) {
      return moment(date).format("DD/MM/YYYY");
    }
  },
	methods: {
    filterNameFile(file) {
      return file.split('/').slice(2)[0];
    },
    fazerDowloadAnexo(nomeAnexo) {
      this.$axios
        .get(`https://epet.imd.ufrn.br:8443/downloadfile/${nomeAnexo}`, {responseType: 'arraybuffer'})
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
    }
	}
};
</script>


<style scoped>

a {
  text-decoration: none;
}

h1 {
  font-weight: 300;
  font-size: 30px;
}

h3 {
  font-weight: 300;
  font-size: 25px;
}

div p {
  font-size: 17px;
}

hr {
  margin-top: 10px;
  margin-bottom: 20px;
}

.container {
  /* Tamanho da tela menos o footer e o container com o logo */
  min-height: 91.7vh;
}
</style>