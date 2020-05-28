<template>
	<div class="col-md-12">

		 <b-card  header-tag="header" >
			<template v-slot:header>
        <b-row>
          <b-col cols="12">
            <h3>Tutoria ministrada</h3>
          </b-col>
          <b-col>
            <em>Informações detalhadas</em>
          </b-col>
        </b-row>
			</template>
			<b-card-text>
        <b-row>
          <b-col>
            <h4>Tutoria</h4>
            <ul>
              <li><strong>Data:</strong> {{form.tutoria.data}}</li>
            </ul>
          </b-col>
          <b-col>
            <h4>Disciplina</h4>
            <ul>
              <li>
                <span><strong>Nome:</strong> {{form.tutoria.disciplina.nome}}</span>
              </li>
              <li>
                <span><strong>Código:</strong> {{form.tutoria.disciplina.codigo}}</span>
              </li>
            </ul>
          </b-col>
        </b-row>
        <hr>
        <b-row>
          <b-col>
            <h4>Petiano responsável</h4>
            <ul>
              <li>
                <span><strong>Nome:</strong> {{form.tutoria.petiano.pessoa.nome}}</span>
              </li>
              <li>
                <span><strong>Email:</strong> {{form.tutoria.petiano.pessoa.usuario.email}}</span>
              </li>
            </ul>
          </b-col>
          <b-col>
            <h4>Pessoa tutorada</h4>
            <ul>
              <li>
                <span><strong>Nome:</strong> {{form.pessoa.nome}}</span>
              </li>
              <li>
                <span><strong>Email:</strong> {{form.pessoa.usuario.email}}</span>
              </li>
              <li>
                <span><strong>CPF:</strong> {{form.pessoa.usuario.cpf}}</span>
              </li>
            </ul>
          </b-col>
        </b-row>
      </b-card-text>
		</b-card>

	</div>
</template>
<script>


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
		this.$axios.get('tutorias-ministradas/'+ this.$route.params.id).then((res) => {
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