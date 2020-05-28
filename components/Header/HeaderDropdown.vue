<template>
  <b-nav-item-dropdown right no-caret >
    <template slot="button-content">
      <img src="~static/img/avatars/10.png" class="img-avatar" />
    </template>

    <b-dropdown-header tag="div"  class="text-center">
      <strong>Configurações</strong>
    </b-dropdown-header>

    <b-dropdown-item class="headerDropdownItem" @click.prevent="perfilUsuario">
      <i class="fa fa-user fa-fw"></i> Meus dados
    </b-dropdown-item>

    <b-dropdown-item class="headerDropdownItem" @click="logout">
      <i class="fa fa-sign-out fa-fw"></i> Sair
    </b-dropdown-item>

  </b-nav-item-dropdown>
</template>

<script>
import Cookies from "js-cookie";

export default {
  name: "header-dropdown",
  methods: {
    perfilUsuario() {
      if (this.$store.state.profile.tipo_usuario.nome === 'tutor')
        this.$router.push('/tutor/perfil');
      if (this.$store.state.profile.tipo_usuario.nome === 'petiano')
        this.$router.push('/petiano/perfil');
      if (this.$store.state.profile.tipo_usuario.nome === 'comum')
        this.$router.push('/usuario/perfil');

    },
    logout() {
      Cookies.set('auth', null);
      Cookies.set('profile', null);

      this.$store.commit('setAuth', null);
      this.$store.commit('setProfile', null);

      document.location.href = '/';
    }
  }
};
</script>

<style scoped>

  .headerDropdownItem {
    cursor:pointer;
    border-radius: 0px !important;
  }
</style>
