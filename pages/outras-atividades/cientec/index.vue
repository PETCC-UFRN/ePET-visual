<template>
  <div >
    <div class="container pt-5">
      <div class="mx-auto mt-5">
        <h1 class="mt-5 mb-5 text-center">Participação na Semana de Ciência, Tecnologia e Cultura (CIENTEC) da UFRN</h1>  
        <b-card>
          <p>A Semana de Ciência, Tecnologia e Cultura (CIENTEC) da UFRN é um evento anual promovido por esta instituição com o intuito de estreitar sua interface com a sociedade, ao expor os principais fundamentos e resultados de suas atividades científicas, 
            tecnológicas e culturais. O Programa de Educação Tutorial do Curso de Ciência da Computação da UFRN tem participado das ultimas edições deste evento, apresentando resultados científicos e/ou tecnológicos obtidos por alunos deste Curso e, em especial, 
            por alunos vinculados a este grupo PET, com o apoio de seus docentes. Em 2021, a realização desta atividade estará condicionada ao final do isolamento social decorrente da pandemia da COVID19.
          </p>
        </b-card>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  layout: 'index',
	head () {
		return {
			title: 'PET-CC UFRN | CIENTEC'
		}
	},
  data() {
    return {
    }
  },
}
</script>


<style scoped>
p {
  font-size: 18px;
  text-align: justify;
}
a {
	color: #000000;
	text-decoration: none;
 }


h1 {
  font-weight: 300;
  font-size: 32px;
}


h2, h4 {
  font-weight: 300;
}

h5 {
  font-size: 20px;
}

p.card-text {
  font-size: 20px;
}
@media(max-width: 500px){
  h5 {
    font-size: 17.5px;
  }
  p.card-text {
    font-size: 15px;
  }
} 
em{
  font-size: 16px;
}

.cards {
  margin-bottom: 20px;
}


.container-fluid {
  /* Tamanho da tela menos o footer e o container com o logo */
  min-height: 91.7vh;
}

</style>
