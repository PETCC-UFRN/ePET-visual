<template>
  <div >
    <div class="container pt-5">
      <div class="mx-auto mt-5">
        <h1 class="mt-5 mb-4 text-center">Seminários de Pesquisa</h1>  

        
        <b-card>
            <p>Esta atividade consiste na elaboração, apresentação e participação dos Petianos em seminários de pesquisa, 
            oferecidos de forma presencial e/ou remota. Os seminários são ministrados por Petianos deste grupo e, eventualmente,
            por convidados, abordando temas de pesquisa de interesse ou em desenvolvimento pelos mesmos, seja em função de projetos 
            de iniciação científica, projetos de final de curso ou realizadas no âmbito do PET. Estes seminários buscam disseminar conhecimentos de 
            temas de pesquisa variadas, apresentar avanços de pesquisa obtidos e favorecer o surgimento de sinergias entre iniciativas de pesquisa. Os seminários são planejados para ocorrer quinzenalmente, 
            em média, de forma a permitir a participação de cada Petiano do grupo a cada período letivo.
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
			title: 'PET-CC UFRN | Seminários de pesquisa'
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
