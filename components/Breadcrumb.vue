<template>
  <div>
    <b-progress  height="2px" :value="`${this.$route.path.split('/').slice(1).length}`" max=3></b-progress>

 <ol class="breadcrumb">
    <li class="breadcrumb-item" v-for="(item, index) in this.$route.path.split('/').slice(1)" v-bind:key="index">
      <span v-if="index === 0">
        <nuxt-link to="">{{"Início  "}}</nuxt-link>  
      </span>
      <span v-else>
        <nuxt-link to="">{{item.replace(/^\w/, c => c.toUpperCase()) }} </nuxt-link>  
      </span>
    </li>
  </ol>
  </div>


</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  methods: {
    isLast (index) {
      return index === this.list.length - 1
    },
    showName (item) {
      if (item.meta && item.meta.label) {
        item = item.meta && item.meta.label
      }
      if (item.name) {
        item = item.name
      }
      return item.split("-")
    }
  }
}
</script>
