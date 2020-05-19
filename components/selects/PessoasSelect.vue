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
    <!-- <template #list-footer v-if="hasNextPage">
      <li ref="load" class="loader">Loading more options...</li>
    </template> -->
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
      limit: 20,
      idPessoa: 0
    };
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
        this.pessoas = res.data.content;
      });
    },
    onSearch(search, loading) {
      loading(true);
      this.fetchPessoas(loading, search, this);
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