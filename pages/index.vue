<template>
  <div>
    <Comum/>
    <Particles/>
    <div class="container">
      <About/>
    </div>
    <Footer/>
    <nuxt/>
  </div>
</template>

<script>
  import Particles from "../components/anonymous/Particles";
  import Comum from "../components/Comum";
  import About from "../components/anonymous/About";
  import Footer from "../components/anonymous/Footer";

  export default {
    layout: 'index',
    components: {
      Particles,
      Comum,
      About,
      Footer,
    }
  }
</script>
