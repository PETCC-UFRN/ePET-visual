<template>
  <div>
    <AnonymousNav />
    <Particles />
    <nuxt />
  </div>
</template>

<script>
import AnonymousNav from '@/components/anonymous/AnonymousNav';
import Particles from '@/components/anonymous/Particles';

export default {
    components: {
      AnonymousNav,
      Particles
    }
  
};
</script>