<template>
  <div class="app">
    <AppHeader :headerItems="head"/>
    <div class="app-body">
      <Sidebar :navItems="nav" />
      <main class="main">
        <breadcrumb :list="list" />
        <div class="container">
          <nuxt />
        </div>
      </main>
    </div>
    <AppFooter />
  </div>
</template>

<script>
import nav from "./tutor";
import head from "./tutorHeader";

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
      head: head.items
    };
  },
  head () {
    return {
      title: 'PET-CC UFRN | Tutor'
    }
  },
  computed: {
    name() {
      return this.$route.name;
    },
    list() {
      return this.$route.matched;
    }
  }
};
</script>