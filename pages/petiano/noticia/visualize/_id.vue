<template>
	<div class="col-md-12">

		 <b-card :title="form.titulo" header-tag="header"  footer-tag="footer">
			<template v-slot:header>
				<strong>Notícia</strong> <small>Completa</small>
			</template>
			<b-card-text>{{form.corpo}}</b-card-text>
			<template v-slot:footer>
				<em><small>Publicado por {{form.petiano.pessoa.nome}}</small></em>
			</template>
		</b-card>

	</div>
</template>
<script>


export default {
	layout: "menu/petiano",
	data() {
		return {
			form: {
				titulo: "",
				corpo: "",
				petiano: {
					pessoa: {
						nome:""
					}
				}
			},
			alert: {
				message: "",
				class: ""
			}
		};
	},
	mounted(){
		this.$axios.get('noticia/'+ this.$route.params.id).then((res) => {
				this.form = res.data;
		});
	}
};
</script>