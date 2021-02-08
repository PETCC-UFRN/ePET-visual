<template>
  <div >
    <div class="container pt-5">
      <div class="mx-auto mt-5">
        <h1 class="mt-5 mb-5 text-center">Treinamento para Competições de Programação</h1>  

        
        <b-card>
            <p>As competições de programação são uma forma lúdica de melhorar habilidades
 em programação, habilidades muito relevantes para o Curso de Ciência da
  Computação e afins. Adicionalmente, a participação em competições de
   programação oficiais consiste em uma vitrine para os participantes que
    apresentam bons desempenhos, abrindo portas para oportunidades de
     emprego em diversas empresas ao redor do mundo. Esta atividade
      consiste em incentivar e montar um grupo de estudos para treinar os
       participantes para futuras competições de programação. Os estudos
        são conduzidos por meio de tarefas síncronas e assíncronas: aulas
         sobre algoritmos e estruturas de dados serão gravadas e postadas
          no YouTube como tarefas assíncronas; serão realizados encontros
           remotos síncronos para simulação de competições anteriores e
            discussão dos exercícios via o aplicativo Discord; por fim, um
             grupo Telegram é usado para aumentar a interação entre os
              participantes e apoiar a discussão sobre conteúdos e
               exercícios.
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
			title: 'PET-CC UFRN | Treinamento para Competições de Programação'
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
