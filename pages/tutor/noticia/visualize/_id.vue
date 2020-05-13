<template>
	<div class="col-md-12">

		 <b-card>
			<template v-slot:header>
        <b-row>
          <b-col>
            <h3>Informações públicas</h3>
          </b-col>
        </b-row>
			</template>
			<b-card-body>
				<div v-if="isLoading === true" class="d-flex justify-content-center">
          <h4>Carregando...</h4>
          <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
        </div>
        <div v-else>
					<spain class="mt-0 mb-2">
            <h5>Título:</h5> <h6> {{form.titulo}}</h6>
          </spain>
          <p class="mt-3 mb-2">
            <strong>Corpo:</strong>
            {{form.corpo}}
          </p>
          <p class="mt-0 mb-1">
            <strong>Responsável:</strong>
            {{form.petiano.pessoa.nome}}
          </p>
				</div>
			</b-card-body>
		</b-card>

		 <b-card>
			<template v-slot:header>
        <b-row>
          <b-col>
            <h3>Outras informações</h3>
          </b-col>
        </b-row>
			</template>
			<b-card-body>
				<div v-if="isLoading === true" class="d-flex justify-content-center">
          <h4>Carregando...</h4>
          <b-spinner style="width: 3rem; height: 3rem;" type="grow" variant="primary" label="Large Spinner"></b-spinner>
        </div>
        <div v-else>
					<p class="mt-3 mb-2">
            <strong>Perído de exibição:</strong>
						<span v-if="form.inicio_exibicao !== null && form.limite_exibicao !== null">
            	{{ this.form.inicio_exibicao | moment }} - {{ this.form.limite_exibicao | moment}}
						</span>
          </p>
        </div>
			</b-card-body>
		</b-card>
	</div>
</template>

<script>
import axios from "~/axios";
import moment from "moment";

export default {
	layout: "menu/tutor",
	data() {
		return {
			isLoading: true,
			form: {
				titulo: "",
				corpo: "",
				inicio_exibicao: "",
				limite_exibicao: "",
				petiano: {
					pessoa: {
						nome:""
					}
				}
			}
		};
	},
  filters: {
    moment: function (date) {
      return moment(date).format('DD/MM/YYYY');
    }
  },
	mounted(){
		axios
			.get(`noticia/${this.$route.params.id}`)
			.then((res) => {
				this.form = res.data;
				this.isLoading = false;
			});
	}
};
</script>


<style scoped>
ul {
  list-style: none;
  padding-left: 10px;
}
p {
  font-size: 15px;
}
strong {
  font-size: 16px;
}
h3, h4 {
  font-weight: 300;
}
h5, h6 {
  display: inline;
  font-size: 18px;
}
</style>