<template>
  <div >
    <div class="container pt-5">
      <h1 class="mt-4 mb-2"><nuxt-link to="/sobre/ex-petianos#"> <i class="fa fa-chevron-circle-left" aria-hidden="true"></i>
 Voltar aos ex-petianos</nuxt-link></h1>
      <hr>
      <div class="mt-3 mb-5 ml-2 mr-2">
        <b-row>
          <b-col sm="3">
            <b-avatar v-if="fotoMembro !== ''" aligner="center" size="200px" :src="`https://petcc.dimap.ufrn.br:8443/downloadfile/${fotoMembro}`" ></b-avatar>
            <b-avatar v-else aligner="center" size="200px" ></b-avatar>
          </b-col>
          <b-col>
            <b-row class="mt-2">
              <b-col>
                <h3 class="pt-2">{{petiano.pessoa.nome}}</h3> 
              </b-col>
            </b-row>
            <b-row>
              <b-col class="mt-1 mb-1" cols="12">
                <span><strong>Período: </strong> {{petiano.data_ingresso | moment}} - {{petiano.data_egresso | moment}} </span>
              </b-col>
              <b-col class="mt-0 mb-1" cols="12">
                <span><strong>Email:</strong> <a :href="`mailto:${petiano.pessoa.usuario.email}`">  {{petiano.pessoa.usuario.email}}</a> </span>
              </b-col>
              <b-col class="mt-0 mb-1" cols="12">
                <span><strong>Site pessoal:</strong> <a  target="_blank" :href="`${petiano.site_pessoal}`"> {{petiano.site_pessoal}}</a> </span>
              </b-col>
              <b-col class="mt-0 mb-2" cols="12">
                <span><strong>Lattes:</strong> <a target="_blank" :href="`${petiano.lattes}`"> {{petiano.lattes}}</a></span>
              </b-col>
              <b-col class="mt-2 mb-2">
                <span><strong>Áreas de interesse:</strong> {{petiano.area_interesse}}</span>
              </b-col>  
            </b-row>
          </b-col>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import Swal from "sweetalert2";

export default {
  layout: 'index',
  head () {
		return {
			title: 'PET-CC UFRN | Membros eméritos'
		}
	},
  data() {
    return {
        fotoMembro:"",
        petiano: {
          idPetiano:"",
          data_ingresso: "",
          area_interesse:"",
          lattes:"",
          foto:"",
          site_pessoal:"",
          pessoa:{
            nome:"",
            usuario:{
              email:""
            }
          }
        },
        idPetiano: this.$route.params.id
    };
  },
  validate ({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id)
  },
  mounted() {
    this.getPetiano();
  },
  filters: {
    moment: function(date) {
      if ( date != null)
        return moment(date).format("MM/YYYY");
      else
        return "DESCONHECIDO";
    }
  },
  methods: {
    filterNameFile(file) {
      return file.split('/').slice(2)[0];
    },
    getPetiano() {
      this.$axios
        .get("petianos-antigos")
        .then(res => {
          this.petiano = res.data.content.filter(petiano => petiano.idPetiano == this.idPetiano)[0];


          if (this.petiano.foto !== null && this.petiano.foto !== '') 
            this.fotoMembro =  this.filterNameFile(this.petiano.foto)
        })
        .catch( err => {
          Swal.fire({
            title: "Houve um problema...",
            text: "Por favor, tente recarregar a página. Caso não dê certo," + 
            " tente novamente mais tarde.",
            icon: 'error',
          })
        });
    },
  },
}
</script>


<style scoped>
a {
  text-decoration: none;
}

span {
  font-size: 19px;
}
h1 {
  font-weight: 300;
  font-size: 30px;
}

h3 {
  font-weight: 300;
  font-size: 25px;
}

@media(max-width: 500px){
  img {
    max-width: 150px;
  }
} 

</style>

 
