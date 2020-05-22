<template>
  <div class="app">
    <AppHeader :headerItems="head"/>
    <div class="app-body">
      <Sidebar :navItems="nav" />
      <main class="main">
        <breadcrumb/>
        <div class="container">
          <nuxt />
        </div>
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import nav from "./usuario";
import head from "./usuarioHeader";

import {
  Header as AppHeader,
  Sidebar,
  Footer as AppFooter,
  Breadcrumb
} from "~/components/";

export default {
  name: "full",
  components: {
    AppHeader,
    Sidebar,
    AppFooter,
    Breadcrumb
  },
  data() {
    return {
      nav: nav.items,
      head: head.items,
    };
  },
  head () {
    return {
      title: `PET-CC UFRN | ${this.$store.state.profile.nome}`
    }
  }
};
</script>