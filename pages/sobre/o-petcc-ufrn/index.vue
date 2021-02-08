<template>
  <div >
    <div class="container pt-5">
      <div class="mx-auto mt-5">
        <h1 class="mt-5 mb-4 text-center">O PET-CC UFRN</h1>  
        
        <b-card>
            <p>O Programa Educação Tutorial (PET) é desenvolvido por grupos de estudantes, 
                com tutoria de um docente, organizados a partir de formações em nível de graduação nas Instituições 
                de Ensino Superior do Brasil orientados pelo princípio da indissociabilidade entre ensino, pesquisa e 
                extensão e da educação tutorial. Nosso grupo é vinculado ao curso de Ciência da Computação (CC) da 
                Universidade Federal do Rio grande do Norte (UFRN). O grupo é orientado por um docente com função de 
                tutor. Além disso, o é formado por, no máximo, 12 alunos bolsistas e 6 alunos voluntários.
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
