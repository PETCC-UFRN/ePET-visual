<template>
  <div>
    <div class="d-flex flex-column sticky-footer-wrapper">
        <footer>
            <span>&copy; {{ year }} PET-CC UFRN - Template por <a href="http://coreui.io">CoreUI</a></span>
        </footer>
    </div>
  </div>
</template>
<script>
export default {
  name: 'c-footer',
  data(){
    return {
      year: new Date().getFullYear()
    }
  }
}
</script>

<style>

.flex-fill {
   flex:1 1 auto;
}
footer{
    line-height: 40px;
    height: 40px;
    background-color: #89023e;
}
footer span{
    margin-left: 15px;
    color: white;
}
</style>