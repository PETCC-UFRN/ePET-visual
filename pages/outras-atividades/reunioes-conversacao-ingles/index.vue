<template>
  <div >
    <div class="container pt-5">
      <div class="mx-auto mt-5">
        <h1 class="mt-5 mb-4 text-center">Reuniões Virtuais de Conversação em Inglês</h1>  
        
        <b-card>
            <p>Esta atividade consiste em reuniões virtuais voltadas à conversação em
            inglês, contando com a participação de membros de grupos PET da UFRN e,
            possivelmente, outros discentes desta instituição. A cada período letivo,
            os participantes desta atividade se reúnem semanalmente em salas
            virtuais para conversar sobre temas variados, cada encontro com duração
            média de uma hora. A comunicação se realizada exclusivamente na língua
            inglesa, com a intenção de proporcionar um ambiente onde os
            participantes possam ampliar as competências de listening, pronúncia e vocabulário deste idioma.
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
			title: 'PET-CC UFRN | Reuniões Virtuais de Conversação em Inglês'
		}
	},
  data() {
    return {
    }
  },
  mounted() {
    this.isBusy = !this.isBusy
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
