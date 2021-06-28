<template>
  <div >
    <div class="container pt-5">
      <div class="mx-auto mt-5">
        <h1 class="mt-5 mb-4 text-center"><i class="fa fa-graduation-cap"></i>Tutorias</h1>  

        
        <b-card>
          <p>Para solicitação de uma tutoria, é necessário agendamento antecipado 
            com um dos tutores responsáveis pela disciplina. Para isso, realize o cadastro na plataforma 
            clicando <nuxt-link to="/register">aqui</nuxt-link>. Caso já possua cadastro, realize acesso ao sistema por <nuxt-link to="/login">aqui</nuxt-link>. Em seguida, 
            no menu no lado esquerdo, vá para a área de <em>Tutorias</em>, escolhendo a opção <em>Abertas</em>. 
            Será mostrado um quadro de tutorias similar a esse porém com a opção <b>Solicitar tutoria</b>. Será encaminhada uma solicitação ao tutor responsável
            que irá entrar em contato com o solicitante para marcação do horário.
          </p>
        </b-card>
        
        
        <b-card class="mt-2" >
          <template v-slot:header>
            <b-row>
              <b-col>
                <h2>Tutorias abertas</h2>
              </b-col>
            </b-row>
          </template>
          
        <div v-if="isLoading === true" class="d-flex justify-content-center mb-3">
          <h4>Carregando...</h4>
          <b-spinner 
            style="width: 3rem; height: 3rem;" 
            type="grow" 
            variant="primary" 
            label="Large Spinner"></b-spinner>
        </div>
        <div v-else>  
          <div v-if="tutorias.length > 0">
            <b-table
              hover
              show-empty
              responsive="sm"
              :items="tutorias"
              :bordered="false"
              striped
              :per-page="pageSize"
              :fields="fields"
              no-local-sorting
              :sort-by.sync="ordenado"
              :sort-desc.sync="ordem"
              @sort-changed="ordenarLista"
            >
            </b-table>
            <nav>
              <b-pagination
                :total-rows="numElements"
                :per-page="pageSize"
                pills
                v-model="currentPage"
                prev-text="Anterior"
                next-text="Próximo"
                hide-goto-end-buttons
              />
            </nav>
          </div>
          <div v-else>
            <h5>Nenhuma tutoria cadastrada</h5>
            </div>
          </div>  
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
			title: 'PET-CC UFRN | Tutorias'
		}
	},
  data() {
    return {
      isLoading: true,
      tutorias: [],
      currentPage: 1,
      numElements: 1,
      ordem: false,
      ordenado: "disciplina.nome",
      pageSize: 20,
      fields: [
        { key: "disciplina.nome", label:"Disciplina", sortable: true, thStyle:"font-size:17px" },
        { key: "petiano.pessoa.nome", label:"Responsável", sortable: true, thStyle:"font-size:17px" },
      ]
    }
  },
  mounted() {
    this.consumindoTutoriasApi();
  },
  watch: {
    currentPage: function(val){
      let ordemaux = ""
      if(this.ordem == true){
        ordemaux = "desc"
      }
      else{
        ordemaux = "asc"
      }
      this.$axios.get("tutorias?sort="+this.ordenado+","+ordemaux+"&page=" + (val-1)).then(res => {
        this.tutorias = res.data.content;
        this.numElements = res.data.totalElements;
        this.pageSize = res.data.pageable.pageSize;
      });
    }
  },
  methods: {
  ordenarLista(ctx) {
    let ordemaux = ""
    if(ctx.sortDesc == true){
      ordemaux = "desc"
    }
    else{
      ordemaux = "asc"
    }
    this.$axios.get("tutorias?sort="+ctx.sortBy+","+ordemaux+"&page=" + (this.currentPage-1)).then(res => {
      this.tutorias = res.data.content;
      this.numElements = res.data.totalElements;
      this.pageSize = res.data.pageable.pageSize;
    });
  },
  consumindoTutoriasApi() {
      this.$axios
        .get("tutorias?sort=disciplina.nome,asc&page=0")
        .then(res => {
          this.tutorias = res.data.content;
          this.numElements = res.data.totalElements;
          this.currentPage = res.data.number + 1;          
          this.pageSize = res.data.pageable.pageSize;
        
         this.isLoading = !this.isLoading;
        })
        .catch(err => {
         this.isBusy = !this.isBusy;
        });
    },
  }
}
</script>


<style scoped>
p {
  font-size: 17px;
  text-align: justify;
}
a {
	text-decoration: none;
 }


h1 {
  font-weight: 300;
  font-size: 40px;
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
