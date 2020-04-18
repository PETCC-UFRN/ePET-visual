<template>
	<div class="col-md-12">

		 <b-card  header-tag="header" >
			<template v-slot:header>
				<strong>Tutoria ministrada</strong> <small>Informações detalhadas</small>
			</template>
			<b-card-text>
      <h3>Disciplina</h3>
      <hr>
      <h3>Petiano</h3>
      <hr>
      <h3>Pessoa tutorada</h3>
      </b-card-text>
		</b-card>

	</div>
</template>
<script>
import axios from "~/axios";

export default {
	layout: "menu/petiano",
	data() {
		return {
			form: {
        pessoa: {
          nome: "",
          cpf: "",
          usuario: {
            email: ""
          }
        },
        tutoria: {
          petiano: {
            data_ingresso: null,
            data_egresso: null,
            pessoa: {
              nome: "",
              cpf: "",
              usuario: {
                email: ""
              }
            }
          },
          disciplina: {
            nome: "",
            codigo: ""
          },
          ativo: false
        },
        data: null,
        ativo: false        
			},
			alert: {
				message: "",
				class: ""
			}
		};
	},
	mounted(){
		axios.get('tutorias-ministradas/'+ this.$route.params.id).then((res) => {
				this.form = res.data.content;
		});
	}
};
</script>
