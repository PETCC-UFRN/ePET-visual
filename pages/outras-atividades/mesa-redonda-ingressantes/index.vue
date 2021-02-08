<template>
  <div >
    <div class="container pt-5">
      <div class="mx-auto mt-5">
        <h1 class="mt-5 mb-5 text-center">Mesa Redonda com Ingressantes</h1>  

        
        <b-card>
            <p>Em complemento às ações de boas vindas promovidas pelas Coordenações dos Cursos de
                Bacharelado em Tecnologia da Informação e da Ciência da Computação voltadas aos 
                ingressantes destes Cursos, a Mesa Redonda é uma iniciativa do PET Ciência da 
                Computação voltada a facilitar a adaptação destes novos alunos à vida universitária. 
                Esta atividade normalmente conta a participação de alunos veteranos, egressos e de 
                pós-graduação do Curso de Ciência da Computação e de cursos relacionados, favorecendo 
                a interação de alunos de diferentes períodos letivos e esclarecendo dúvidas comuns a quem 
                está começando o curso. A Mesa Redonda tem, em média, 2 horas de duração, ocorrendo no 
                primeiro período letivo do ano. Em 2021, esta atividade é prevista para ocorrer no mês de 
                junho e poderá ocorrer de forma remota, via uma live, se a situação de isolamento social 
                permanecer até o momento de sua execução.</p>
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
			title: 'PET-CC UFRN | Mesa Redonda com ingressantes'
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
