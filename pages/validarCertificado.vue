<template>
  <div >
        <Comum/>  
        <div  class="container">
            <br>
            <h2 class="titulo">Validar certificado</h2>
            
            <div class="col-8 mx-auto">
                <b-form>
                    <b-form-group
                        id="input-group-1"
                        label="Código de validação:"
                        label-for="input-1"
                        description="Disponível abaixo do código de barras.">
                        <b-form-input
                            id="input-1"
                            type="email"
                            required
                        ></b-form-input>
                    </b-form-group>

                    <b-button block variant="success">Validar</b-button>
                </b-form>
                <b-card class="mt-3" header="Resultado:">
                    <pre class="m-0">A</pre>
                </b-card>    
                    
            </div>    
            
        </div>
        <BottomBar/>
  </div>
</template>

<script>
import Comum from "../components/Comum";
import axios from "../axios";
import BottomBar from "../components/anonymous/BottomBar";


export default {
    layout: 'index',
    components: {
        Comum,
        BottomBar
    },
    data() {
    return {
      eventos: []
    };
  },
  mounted() {
    axios.get("eventos").then(res => {
      this.eventos = res.data.content;
    });
  }
}
</script>


<style>

.titulo {
margin-top: 20px;
margin-bottom: 10px;
font-weight: bold;
text-align: center;
font-size: 36px;
box-sizing: border-box;
margin: .67em 0;

}

#regular-text {
color: #333;
box-sizing: border-box;
position: relative;
padding-right: 15px;
padding-left: 15px;
float: left;
width: 66.66666667%;
text-align: justify;
}

p {
  margin: 0px 0px 0px;
}
</style>

 
