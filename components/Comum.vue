<template>
  <div>
      <AnonymousNav/>
        <Particles/>
  </div>
</template>

<script>

import AnonymousNav from "./anonymous/AnonymousNav";
    import Particles from "./anonymous/Particles";

    export default {
        layout: 'index',
        components: {
            AnonymousNav,
            Particles
            }
    }
</script>

