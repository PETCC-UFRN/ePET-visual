<template>
  <div>
    <Particles/>
    <nuxt/>
  </div>
</template>

<script>
  import Particles from "../components/anonymous/Particles";

  export default {
    layout: 'index',
    components: {
      Particles,
    }
  }
</script>
