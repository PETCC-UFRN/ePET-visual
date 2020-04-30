<template>
  <div class="backDark">
    <b-card >
      <template v-slot:header>
        <h5>Petianos</h5>
      </template>

      <b-table
        class="mb-0 "
        hover
        head-variant="dark"
        responsive="sm"
        :current-page="currentPage"
        :bordered="false"
        :items="tableItemsPetianos"
        :fields="tableFieldsPetianos"
        :per-page="10"
      >
        <template v-slot:cell(actions)="row">
          <b-button class="btn btn-sm btn-danger"  @click="removerPetiano(row.item.idPetiano)">Remover Petiano</b-button>
        </template>
      </b-table>
      <nav>
        <b-pagination
          :total-rows="tableItemsPetianos.length"
          :per-page="10"
          v-model="currentPage"
          prev-text="Anterior"
          next-text="Próximo"
          hide-goto-end-buttons
        />
      </nav>
    </b-card>
  </div>
</template>

<script>
export default {

}

</script>


<style scoped>

.parent {
  padding: 2rem;
}

.inline-block-child {
   margin-left: 0.5em;
  display: inline-block;
}

.backDark{
  background-color:#24333b;
}

.textDark{
  color: #24333b;
}

</style>