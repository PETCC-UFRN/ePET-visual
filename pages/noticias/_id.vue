<template>
  <div>
    <Comum/>  
    <div class="container">
     	<br>
        <h1 class="mt-3 mb-0"><i class="far fa-newspaper"></i> Notícias</h1>
        <hr>
		<b-row>
			<b-col cols="9">
				<b-img class="mt-3 mb-3" v-bind="mainProps" src="https://hongkong.imd.ufrn.br/filemanagerportal/source/2020/Palestra_Wedson.png" fluid alt="Responsive image"></b-img>
				<p class="mt-3 mb-1"> {{mes}}</p>
				<h2>{{noticia.titulo}}</h2>
				<p class="mt-3 mb-3">{{noticia.corpo}}</p>
			</b-col>
			<b-col  class="ml-3">
				<h3>Outras notícias</h3>

<b-card-group deck  class="ml-1">
	<b-row>
    <b-card title="Title" class="mt-3">
      <b-card-text>
        This is a wider card with supporting text below as a natural lead-in to additional content.
        This content is a little bit longer.
      </b-card-text>
      <template v-slot:footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>
</b-row>
<b-row>
    <b-card title="Title" class="mt-3">
      <b-card-text>
        This card has supporting text below as a natural lead-in to additional content.
      </b-card-text>
      <template v-slot:footer>
        <small class="text-muted">Last updated 3 mins ago</small>
      </template>
    </b-card>
</b-row>

</b-card-group>



			</b-col>
		</b-row>
    </div>
    <BottomBar/>
  </div>
</template>

<script>
import Comum from "~/components/Comum";
import axios from "~/axios";
import BottomBar from "~/components/anonymous/BottomBar";

export default {
    layout: 'index',
    components: {
        Comum,
        BottomBar
    },
  	data() {
		return {
			noticia: {
				titulo: "",
				corpo: "",
				petiano: {
					pessoa: {
						nome:""
					}
				}},
			mainProps: { width: 825, height: 523},
			mesNomes: [
				"JANEIRO", 
				"FEVEREIRO", 
				"MARÇO", 
				"ABRIL", 
				"MAIO",
				"JUNHO",
				"JULHO", 
				"AGOSTO", 
				"SETEMBRO", 
				"OUTUBRO", 
				"NOVEMBRO",
				"DEZEMBRO"
			]
    	}
  },
  mounted(){
    axios.get('noticia/'+ this.$route.params.id).then((res) => {
        this.noticia = res.data;
    });
  },
  computed: {
    mes() {
      if (this.noticia.inicio_exibicao != null) {
		return "" + this.noticia.inicio_exibicao.substring(8,10) + " " + 
		this.mesNomes[parseInt(this.noticia.inicio_exibicao.substring(5,7) , 10)] + " "+ 
		this.noticia.inicio_exibicao.substring(0,4);
	
	  }
	  return "";
    }
  }
};
</script>


<style>

h1 {
  font-weight: bold;
  font-size: 40px;
}

h2 {
  font-size: 32px;
}

h3 {
  font-size: 25px;
}
p {
  font-size: 19px;
}

hr {
  margin-top: 10px;
  margin-bottom: 20px;
}

</style>

 
