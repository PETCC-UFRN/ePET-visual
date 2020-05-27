<template>
  <div>
    <Comum/>
    <div class="atividades container">
      <About/>
    </div>
    <Footer/>
    <nuxt/>
  </div>
</template>

<script>
  import Comum from "../components/Comum";
  import About from "../components/anonymous/About";
  import Footer from "../components/anonymous/Footer";

  export default {
    layout: 'index',
    components: {
      Comum,
      About,
      Footer,
    }
  }
</script>
