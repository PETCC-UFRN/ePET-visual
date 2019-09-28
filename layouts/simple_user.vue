<template>
    <nuxt />
</template>

<script>
export default {
  head: {
    title: "Bem vindo",
	link: [
		{ rel: "stylesheet", href: "/css/admin/style.css" },
		{ rel: "stylesheet", href: "/css/admin/pace.min.css" },
	],
    bodyAttrs: {
      class: ["app", "header-fixed", "sidebar-fixed", "aside-menu-fixed", "sidebar-lg-show"]
    },
  },
}
</script>