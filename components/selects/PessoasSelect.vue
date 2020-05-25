<template>
  <v-select
    :options="pessoas"
    :filterable="false"
    label="nome"
    :reduce="nome => nome.idPessoa"
    @search="onSearch"
    @close="onClose"
    v-model="idPessoa"
    @input="handleInput"
  >
    <li slot="list-footer" class="pagination">
      <button @click="pagination('prev')" :disabled="!hasPrevPage" class="col-md-6">Prev</button>
      <button @click="pagination('next')" :disabled="!hasNextPage" class="col-md-6">Next</button>
    </li>
  </v-select>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
import _ from 'lodash';

export default {
  name: 'PessoasSelect',
  components: {
    'v-select': vSelect,
  },
  prop: ['value'],
  data() {
    return {
      pessoas: [],
      currentPage: 0,
      observer: null,
      idPessoa: 0,
      numPages: 0,
      limit: 20,
    };
  },
  computed: {
    hasNextPage() {
      return (this.currentPage+1) < this.numPages;
    },
    hasPrevPage() {
      return this.currentPage != 0;
    }
  },
  mounted() {
    this.getPessoas();
  },
  methods: {
    onClose() {
      this.getPessoas();
    },
    getPessoas(page = 0) {
      this.$axios.get("pessoas?page=" + page).then(res => {
        this.numPages = res.totalPages;
        this.pessoas = res.data.content;
      });
    },
    onSearch(search, loading) {
      loading(true);
      this.fetchPessoas(loading, search, this);
    },
    pagination(type){
      if(type == 'next'){
        this.currentPage += 1;
      }else{
        this.currentPage -= 1;
      }
    },
    fetchPessoas: _.debounce((loading, search, vm) => {
      vm.$axios.get("pesquisar-pessoa/" + search).then(res => {
        vm.pessoas = res.data.content;
        loading(false);
      }).catch(() => {
        loading(false);
      });
    }, 500),
    handleInput(){
      this.$emit('input', this.idPessoa);
    }
  }
};
</script>