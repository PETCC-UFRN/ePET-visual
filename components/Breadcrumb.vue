<template>
  <div>
    <b-progress  height="2px" :value="`${this.$route.path.split('/').slice(1).length}`" max=4></b-progress>
    <ol class="breadcrumb">
      <li class="breadcrumb-item" v-for="(item, index) in this.$route.path.split('/').slice(1)" v-bind:key="index">
        
        <span v-if="index === 0">
          <nuxt-link :to="`/${item}`">{{"Início"}}</nuxt-link>  
        </span>
        <span v-else-if="item == 'configuracoes'">
          <nuxt-link :to="`/${item}`">{{"Configurações"}}</nuxt-link>  
        </span>
        <span v-else>
          <nuxt-link :to="`/${$route.path.split('/').slice(1).slice(0,index+1).join('/')}`">
          {{item.replace(/^\w/, c => c.toUpperCase()).replace(/-/gi, " ") }} </nuxt-link>  
        </span>
      </li>
    </ol>
  </div>
</template>
