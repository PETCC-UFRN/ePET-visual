<template>
  <div class>
    <nuxt />
  </div>
</template>

<script>
export default {
  head: {
    link: [{ rel: "stylesheet", type: "text/css", href: "/css/style.css" }],
    script: [
      {
        src:
          "https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js"
      },
      { src: "/js/particles.js" }
    ]
  }
};
</script>
