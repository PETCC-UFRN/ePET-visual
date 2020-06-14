<template>
  <div > 
    <div class="container pt-5">
      <br>
      <h1 class="mt-3 text-white">Desenvolvedores</h1>
      <hr>
      <div>
        <b-row class="mx-auto" align-h="center">
          <div v-for="i in devs" :key="i.id">
            <b-col class="ml-4 mr-4">
              <a style="text-decoration:none" :href="i[1]" target="_blank">
                <b-row>
                  <b-img id="image" rounded alt="Rounded image" v-bind="mainProps" fluid :src="i[2]" ></b-img> 
                </b-row>
                <b-row class="mt-1" align-h="center">
                  <h3 style="text-align: justify">{{i[0]}}</h3>
                </b-row>
              </a>
            </b-col> 
          </div>
        </b-row>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'index',
  data() {
    return {
      mainProps: { 
          width: 160, height: 160 
      },
      devs: [
        ['Abraão Dantas','https://github.com/Confuzo', 'https://avatars1.githubusercontent.com/u/21036371?s=460&v=4'],
        ['Daniel Henrique','https://github.com/Danhfg', 'https://avatars2.githubusercontent.com/u/17724218?s=400&v=4'],     
        ['Ítalo Epifânio','https://github.com/itepifanio', 'https://avatars0.githubusercontent.com/u/6730205?s=400&v=4'],
        ['Samuel Lucas','https://github.com/Samuellucas97', 'https://avatars2.githubusercontent.com/u/26898930?s=460&v=4'],
        ['Jhonattan Cabral','https://github.com/Jhon3', 'https://avatars3.githubusercontent.com/u/26605942?s=460&v=4'],
        ['Henrique David','https://github.com/henriquedavid', 'https://avatars3.githubusercontent.com/u/26661794?s=460&v=4'],
        
      ]
    };
  },
}
</script>


<style scoped>

i.fab {
  font-size:50px;
  padding-right:20px;
  align-content: center;
}

#image {
  box-shadow: 0 0 5px #cccccc;
}

a { 
	color: #000000; 
}


h1 {
  text-align: center;
  font-weight: 300;
  font-size: 50px;
  text-shadow: #000 2px 3px 2px;

}

@media(max-width: 500px){
  h1 {
    font-size: 40px;
  }
} 

h3 {
  font-size: 25px;
  text-align: center;
}


hr {
  margin: 40px 60px 40px; 
}

.divBottom {
  margin-bottom: 50px;
}

</style>

 
