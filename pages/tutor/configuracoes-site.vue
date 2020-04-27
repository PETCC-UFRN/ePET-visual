<template>
  <div>
    <b-card header-tag="header">
      <template v-slot:header>
        <b-row>
          <b-col cols="12">
            <h3><i class="icon-info pr-1"></i>Informações do site</h3>
          </b-col>
          <b-col>
            <em>Informações públicas relacionadas ao PET-CC exibidas no site</em>
          </b-col>
        </b-row>
			</template>

			<b-card-text>
        <b-card header-tag="header"> 
          <template v-slot:header>
            <b-row>
              <b-col cols="12">
                <h4>Sobre o PET-CC</h4>
              </b-col>
            </b-row>
          </template>
        </b-card>


        <b-card header-tag="header"> 
          <template v-slot:header>
            <b-row>
              <b-col cols="12">
                <h4>Contatos</h4>
              </b-col>
            </b-row>
          </template>
        </b-card>
			</b-card-text>
    </b-card>
  </div>
</template>

<script>
import axios from "~/axios";

export default {
  layout: "menu/tutor",
  data: function() {
    return {
    };
  },
  mounted() {
  }
};

</script>

<style scoped>

i {
  font-size:19px;
}
</style>