<template>
  <div > 
    <div class="container pt-5">
      <br>
      <h1 class="mt-4 mb-4 text-center"><i class="fa fa-users"></i> Desenvolvedores</h1>
      
      <b-card class="text-center mr-5 ml-5 pt-2 pb-2">

      <p>Desenvolvedores que contribuíram na criação do novo website.</p>
      </b-card>
      <div>
        <b-row class="mx-auto" align-h="center">
          <div class="pt-1" v-if="devs.length > 0">
              <b-row class="mx-auto" align-h="center">
                <div v-for="dev in devs" :key="dev.id">
                  <b-col class="mt-2 mb-2 ml-2 mr-2">
                    <a style="text-decoration:none" :href="dev[1]" target="_blank">
                      <b-avatar size="180px" :src="dev[2]">
                      </b-avatar>
                      <b-row class="mt-2" align-h="center">
                        <p class="nome pt-2 pb-2 pr-2 pl-2" style="text-align: justify">{{dev[0]}}</p>
                      </b-row>
                    </a>
                  </b-col>
                </div>
              </b-row>
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
.nome {
  font-size: 17px;
  font-weight: 300;
  background: white;
  border-radius: 5px;
}
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

p {
  font-size: 18px;
}

h1 {
  text-align: center;
  font-weight: 300;
  font-size: 36px;
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

 
