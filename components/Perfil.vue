<template>
<div class="mb-2">
    <b-card>
        <div class="parent">
            <b-avatar src="https://images.pexels.com/photos/69954/lemur-madagascar-monkey-animal-world-69954.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
             size="10em" variant="info" href=#>
            </b-avatar>
            <h4 float:left class="mr-auto child inline-block-child">Lêmure Computeiro</h4>
            <b-badge class='child inline-block-child'>Usúario</b-badge>

        </div>
    </b-card>

    <b-card>
        <h6><strong>Email: </strong>lemore@gmail.com</h6>
        <h6><strong>Data de nascimento: </strong>05/03/1996</h6>
        <h6><strong>Lattes: </strong>  http://lattes.cnpq.br/fake56143</h6>
        <h6><strong>Git:</strong> github.com/lemurec</h6>
        <h6><strong>Senha:</strong> ********</h6>
        

    </b-card>
</div>
</template>

<script>
export default {
  name: "perfil",
    data() {
        return {
            currentPhoto: "https://images.pexels.com/photos/69954/lemur-madagascar-monkey-animal-world-69954.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
            plus: "~/assets/plus.png"
        };
    },

  methods: {
    preChangePhoto: function() {
        currentPhoto = plus;
        //currentPhoto: "https://images.pexels.com/photos/69954/lemur-madagascar-monkey-animal-world-69954.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
    }
  },
}

</script>


<style>

.parent {
  padding: 2rem;
}

.inline-block-child {
   margin-left: 0.5em;
  display: inline-block;
}

</style>