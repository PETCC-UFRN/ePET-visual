<template>
    <!-- Layout da página inicial do website -->
    <nuxt />
</template>

<script>
export default {
    head: {
        title: 'PET-CC UFRN',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
        ],
        link: [
            { rel: 'stylesheet', type: 'text/css', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' },
            { rel: 'stylesheet', type: 'text/css', href: '/css/index/style.css' }
        ],
        script: [
            { src: 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.6/umd/popper.min.js' },
            { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
            { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js' },
            { src: 'https://cdnjs.cloudflare.com/ajax/libs/particlesjs/2.2.3/particles.min.js' },
            { src: '/js/index/particles.js' },
        ]
    },
}
</script>