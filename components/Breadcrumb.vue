<template>
  <ol class="breadcrumb">
    <li class="breadcrumb-item" v-for="(item, index) in list" v-bind:key="index">
      <span class="active" v-if="isLast(index)">       
        <span v-for="(i, index) in showName(item)" v-bind:key="index">
          
          <span v-if="index == 0">
            <a href="">{{"Início "}} </a>  / 
          </span>
          
          <span v-else-if="index != Object.keys(showName(item)).length - 1">
            <span v-if="i == 'rh'"> 
            <a href="">RH </a>  / 
            </span>
          <span v-else>
            <a href="">{{i.replace(/^\w/, c => c.toUpperCase())}} </a>  / 
          </span>
          </span>
          <span v-else>
            {{i.replace(/^\w/, c => c.toUpperCase())}}
          </span>
        </span>
      </span>
      <router-link :to="item" v-else>{{ showName(item) }}</router-link>
    </li>
  </ol>
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
