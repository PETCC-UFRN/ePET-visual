<template>
  <div>
      <b-card>
        <!-- TODO::remover esse style -->
        <template v-slot:header>
          <h3>Disciplinas cadastradas</h3>
          
          <nuxt-link
            class="btn btn-sm btn-primary float-right"
            style="color: white"
            to="../disciplina/create"
          ><i class="fa fa-plus" aria-hidden="true"></i> Adicionar Disciplina</nuxt-link>
          
        </template>
      
      <div v-if="disciplinas.length > 0">
        
        <b-table
          responsive="sm"
          :items="disciplinas"
          :current-page="currentPage"
          :bordered="true"
          :per-page="10"
          :fields="fields"
        >
          <template v-slot:cell(actions)="row">
            <b-button @click="cadastrar(row.item.idDisciplina)" class="btn btn-sm btn-warning"><i class="fa fa-check" aria-hidden="true"></i> Tornar tutor</b-button>
            <!--<a
              class="btn btn-sm btn-primary"
              style="color: white"
              href='disciplina/edit/${row.item.id_disciplina}'
            >Editar {{row.item.id_disciplina}}</a>-->
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="disciplinas.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Anterior"
            next-text="Próximo"
            hide-goto-end-buttons
          />
        </nav>

      </div>
      <div v-else>Nenhuma disciplina cadastrada</div>
    </b-card>
  </div>
</template>

<script>


export default {
  name: "dashboard",
  layout: "menu/petiano",
  data() {
    return {
      disciplinas: [],
      currentPessoa:[],
      currentPetiano:[],
      currentPage: 1,
      fields: [
        { key: "codigo", sortable: true, label: "Código" },
        { key: "nome", sortable: true, label: "Nome" },
        { key: "actions", sortable: true, label: "Ações disponíveis" },
      ]
    };
  },
  mounted() {
    this.$axios.get("disciplinas").then(res => {
      this.disciplinas = res.data.content;
    });
    this.$axios.get("pessoas-usuario").then(res => {
      this.currentPessoa = res.data;
      if(res.data.tipo_usuario.nome != "petiano" && res.data.tipo_usuario.nome != "tutor")
      {
        this.$router.push("/");
      }
    }).finally( () =>{
      this.$axios.get("petianos-pessoa/"+this.currentPessoa.idPessoa).then(res2 => {
        this.currentPetiano = res2.data;
        console.log(this.currentPetiano);
      });
      }
    );
    console.log("petianos-pessoa/");
  },
  methods: {
    cadastrar(id){
      /*this.$router.push(
        {
          path: 'edit/',
          query  : {"id": id,
                    "nome": nome,
                    "codigo":codigo}
        }
      )*/
      console.log("tutoria-cadastro/" + this.currentPetiano.idPetiano +"/"+id+"/");
      this.$axios.post("tutoria-cadastro/" + this.currentPetiano.idPetiano +"/"+id+"/").then(() => {
        // para não ter que atualizar os eventos em tempo real forçarei a página a atualizar
        alert('Tutoria cadastrada com sucesso');
        let vm = this;
        setTimeout(function(){
          location.reload()
        }, 1500)
      });
    }
  }
  /*methods: {
    del(id, rowId){
      this.$axios.delete("eventos-remove/" + id).then(() => {
        this.disciplinas.splice(rowId, 1);
        alert('Evento removido com sucesso');
      });
    },
    ativar(id){
      this.$axios.post("eventos-ativar/" + id).then(() => {
        // para não ter que atualizar os eventos em tempo real forçarei a página a atualizar
        alert('Evento ativado com sucesso');
        let vm = this;
        setTimeout(function(){
          location.reload()
        }, 1500)
      });
    }
  }*/
};
</script>



<style scoped>
h3 {
  text-align: center;
}
</style>