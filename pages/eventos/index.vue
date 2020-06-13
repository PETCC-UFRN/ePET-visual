<template>
  	<div >
      <div class="container">
			<br>
			<h2 class="mt-5 mb-0">Eventos</h2>
			<hr>
			<div v-if="eventos.length > 0">
				<b-card-group columns class="cards">
				<div v-for="evento in eventos" :key="evento.id">
					<nuxt-link :to="'/eventos/' + evento.idEvento">
						<b-card>
							<b-card-title><h5>{{evento.titulo}} </h5></b-card-title>
							<hr>
							<b-card-text class="small text-muted">  <em>Postado em 15-10-2018 </em></b-card-text>
							<b-card-text>
							<p  class="mt-0 mb-0"><b>Período de inscrição:</b> {{evento.d_inscricao}} a {{evento.d_inscricao_fim}}.</p>
							<p class="mt-0 mb-0"><b>Número de vagas:</b> {{evento.qtdVagas}}.</p>
							<p class="mt-0 mb-0"><b>Local:</b> {{evento.local}}.</p>
							<p class="mt-0 mb-0"><b>Carga horária:</b> {{evento.qtdCargaHoraria}}h.</p>
							<p class="mt-0 mb-0"><b>Valor da inscrição:</b> R$ {{evento.valor}},00.</p>
							</b-card-text>
						</b-card>
					</nuxt-link>
				</div>
				</b-card-group>
          	</div>
			<div v-else>
 				<h5>Não existe evento aberto.</h5>
				<br>
			</div>
        </div>
  	</div>
</template>

<script>


export default {
  layout: 'index',
	head () {
		return {
			title: 'PET-CC UFRN | Eventos'
		}
	},
    data() {
      return {
		eventos: [],
        mesNomes: [
          "JANEIRO",
          "FEVEREIRO",
          "MARÇO",
          "ABRIL",
          "MAIO",
          "JUNHO",
          "JULHO",
          "AGOSTO",
          "SETEMBRO",
          "OUTUBRO",
          "NOVEMBRO",
          "DEZEMBRO"]
      };
  },
  mounted() {
    this.$axios.get("eventos-abertos").then(res => {
      this.eventos = res.data;
    });
  },
  computed: {
    filterEventos() {
      return this.eventos.filter(evento => evento.ativo == true)
	}
  }
}
</script>


<style scoped>
a {
	color: #000000;
	text-decoration: none;
 }


h2 {
  font-weight: 300;
  font-size: 50px;
  text-align: center;
  color: white;
}
em{
  font-size: 16px;
}
h3 {
  font-size: 25px;
}

hr {
  margin-top: 10px;
  margin-bottom: 20px;
  background-color:white;
}

.cards {
  margin-bottom: 20px;
}
a {
  color: inherit;
}

.container {
  /* Tamanho da tela menos o footer e o container com o logo */
  min-height: calc(95vh - 256px);
}
</style>
