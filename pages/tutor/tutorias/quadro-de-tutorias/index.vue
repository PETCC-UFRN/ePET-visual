<template>
  <div>
    <b-card>
      <template v-slot:header>
        <b-row>
          <b-col>
            <h3><i class="fa fa-graduation-cap px-2"></i>Quadro de tutorias</h3>
          </b-col>
          <b-col>
            <nuxt-link
              class="btn btn-sm btn-primary float-right mt-4"
              style="color: white"
              to="quadro-de-tutorias/create"
            ><i class="fa fa-plus" aria-hidden="true"></i> Adicionar disciplina tutorada</nuxt-link>
          </b-col>
        </b-row>
      </template>
      <div v-if="tutorias.length > 0">
        <b-table
          responsive="sm"
          :items="tutorias"
          :current-page="currentPage"
          :bordered="true"
          :per-page="10"
          :fields="fields"
        >
          <template v-slot:cell(ativo)="row">
            <b-form-checkbox
                size="lg"
                v-model="row.item.ativo"
                disabled
              ></b-form-checkbox>
          </template>
          <template v-slot:cell(actions)="row">
            <b-button @click.prevent="del(row.item.idTutoria, row.index)" 
            class="btn btn-sm btn-danger"><i class="fa fa-trash-o fa-fw"></i> Remover</b-button>
          </template>
        </b-table>
        <nav>
          <b-pagination
            :total-rows="tutorias.length"
            :per-page="10"
            v-model="currentPage"
            prev-text="Anterior"
            next-text="Próximo"
            pills
            hide-goto-end-buttons
          />
        </nav>
      </div>
      <div v-else><h5>Nenhuma tutoria cadastrada</h5></div>
    </b-card>
  </div>
</template>

<script>

import Swal from "sweetalert2";

export default {
  name: "dashboard",
  layout: "menu/tutor",
  data() {
    return {
      tutorias: [],
      currentPage: 1,
      fields: [
        { key: "disciplina.nome", label:"Disciplina", sortable: true },
        { key: "disciplina.codigo", label:"Código da Disciplina", sortable: true },
        { key: "petiano.pessoa.nome", label:"Petiano", sortable: true },
        { key: "ativo", sortable: true, label:"Ativo" },
        { key: "actions", sortable: true, label:"Ações disponíveis" },
      ]
    };
  },
  mounted() {
   this.$axios.get("tutorias")
      .then(res => {
        this.tutorias = res.data.content;
      })
      .catch( err => {
        if (err.response.status === 404) {
          Swal.fire({
            title: "Nenhuma tutoria cadastrada",
            icon: 'info',
          });
        }
        else {
          Swal.fire({
            title: "Falha em consumir API",
            icon: 'error',
          })
          .then( () => {
            let vm = this;
            setTimeout(function() {
              location.reload();
            }, 1500);
          });
        }
      });
  },
  methods: {
    del(id, rowId){
      this.$axios.delete("tutoria-remove/" + id, {})
        .then( () => {
          Swal.fire({
            title: 'Tutoria removida',
            icon: 'success',
          })
          .then( () => {
            this.tutorias.splice(rowId, 1);
          });
        })
        .catch(err => {
          Swal.fire({
            title: 'Tutoria não removida',
            icon: 'error'
          })
        });

    }
  }
};
</script>