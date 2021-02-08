<template>
  <div >
    <div class="container pt-5">
      <div class="mx-auto mt-5">
        <h1 class="mt-5 mb-5 text-center">Participação nos Encontros dos Grupos PET</h1>  

        
        <b-card>
            <p>O Programa de Educação Tutorial promove encontros anuais voltados à
 integração de grupos PET em níveis estadual, regional e nacional,
  respectivamente: EPOPET (Encontro Potiguar dos Grupos PETs), ENEPET
   (Encontro Nordestino dos Grupos PET) e ENAPET (Encontro Nacional dos
    Grupos PET). Estes encontros viabilizam a troca de experiências em
     diversas áreas de conhecimento e localidades, a divulgação de suas produções e a discussão de questões relevantes ao aprimoramento e
      consolidação do Programa, colaborando com o fortalecimento da tríade
       ensino-pesquisa-extensão e o desenvolvimento social. Esta atividade
        corresponde à concepção, planejamento, elaboração e submissão de
         trabalhos aos encontros citados, assim como na participação de
          Petianos em outras ações promovidas nestes eventos.
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
