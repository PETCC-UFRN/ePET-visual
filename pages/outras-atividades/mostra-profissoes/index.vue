<template>
  <div >
    <div class="container pt-5">
      <div class="mx-auto mt-5">
        <h1 class="mt-5 mb-5 text-center">Participação na Mostra de Profissões da UFRN</h1>  

        
        <b-card>
            <p>Anualmente, a UFRN organiza a Mostra de Profissões, um evento voltado a
 estudantes do Ensino Médio e ao público em geral interessado em conhecer
  os cursos oferecidos pela UFRN e as oportunidades de profissionalização
   associadas. Neste evento, o Curso de Ciência da Computação é geralmente apresentado ao público por alunos e professores da UFRN, com eventual
    participação de ex-alunos e de profissionais de destaque no mercado de
     trabalho. Nesse contexto, este grupo PET apoia a Coordenação do Curso
      de Ciência da Computação, participando da elaboração de slides e
       realização das apresentações relativas a este Curso, mostrando suas
        particularidades e ajudando o público-alvo a identificar se seus interesses
        e vocações estão alinhados ao perfil esperado do egresso deste Curso.
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
			title: 'PET-CC UFRN | Encontros Grupos PET'
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
