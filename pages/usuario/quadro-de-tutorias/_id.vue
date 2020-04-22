<template>
	<div class="col-md-12">
		 <b-card  header-tag="header" >
			<template v-slot:header>
        <b-row>
          <b-col cols="12">
            <h3>Tutoria</h3>
          </b-col>
          <b-col>
            <em>Informações detalhadas</em>
          </b-col>
        </b-row>
			</template>
			<b-card-text>
        <b-row>
          <b-col>
            <h4>Petiano responsável</h4>
            <ul>
              <li>
                <span><strong>Nome:</strong> {{form.petiano.pessoa.nome}}</span>
              </li>
              <li>
                <span><strong>Email:</strong> {{form.petiano.pessoa.usuario.email}}</span>
              </li>
            </ul>
          </b-col>
          <b-col>
            <h4>Disciplina</h4>
            <ul>
              <li>
                <span><strong>Nome:</strong> {{form.disciplina.nome}}</span>
              </li>
              <li>
                <span><strong>Código:</strong> {{form.disciplina.codigo}}</span>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-card-text>
		</b-card>

	</div>
</template>
<script>
import axios from "~/axios";

export default {
	layout: "menu/usuario",
	data() {
		return {
			form: {
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
			alert: {
				message: "",
				class: ""
			}
		};
	},
	mounted(){
		axios.get('tutorias/'+ this.$route.params.id).then((res) => {
				this.form = res.data;
		});
	}
};
</script>

<style scoped>
ul {
  list-style: none;
  padding-left: 10px;
}
</style>