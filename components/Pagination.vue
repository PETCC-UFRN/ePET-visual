<template>
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="hasPrevious() ? '' : 'disabled'">
        <a class="page-link" href="#" :tabindex="-1" @click="previous">Previous</a>
      </li>

      <li
        class="page-item"
        v-for="index in pages"
        :key="index"
        :class="index === (currentPage+1) ? 'active' : ''"
      >
        <a class="page-link" href="#" @click="setPage(index)" >{{ index }}</a>
        <span class="sr-only" v-show="index === (currentPage+1)">(current)</span>
      </li>
      <li class="page-item" :class="hasNext() ? '' : 'disabled'">
        <a class="page-link" href="#" @click="next">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["totalRows", "perPage"],
  data() {
    return {
      pages: 1,
      currentPage: 0
    };
  },
  mounted() {
    this.pages = Math.ceil(this.totalRows / this.perPage);
  },
  methods: {
    hasPrevious() {
      return this.currentPage !== 0;
    },
    hasNext() {
      return (this.currentPage+1) !== this.pages;
    },
    next() {
      if (this.hasNext) {
        this.$emit("currentPage", this.currentPage + 1);
      }
    },
    previous() {
      if (this.hasPrevious) {
        this.$emit("currentPage", this.currentPage - 1);
      }
    },
    setPage(val){
        this.currentPage = (val-1);
        this.$emit("currentPage", this.currentPage);
    }
  }
};
</script>