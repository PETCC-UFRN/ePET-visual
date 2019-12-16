<template>
  <div>
    <div id="map-container-google-1" class="z-depth-1-half map-container">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3969.0994332567075!2d-35.20050558520093!3d-5.841607859200002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7b2ff75fe0da203%3A0x779ce70a2e19eceb!2sDepartamento%20de%20Inform%C3%A1tica%20e%20Matem%C3%A1tica%20Aplicada%20-%20Lagoa%20Nova%2C%20Natal%20-%20RN!5e0!3m2!1sen!2sbr!4v1576003314468!5m2!1sen!2sbr"
        frameborder="0"
        style="border:0;"
        allowfullscreen
      ></iframe>
    </div>
    <div class="d-flex flex-column sticky-footer-wrapper">
        <footer>
            <span>&copy; {{ year }} PET-CC</span>
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
.map-container {
  overflow: hidden;
  padding-bottom: 250px;
  position: relative;
  margin-top: 45px;
  height: 0;
}
.map-container iframe {
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  position: absolute;
}
.flex-fill {
   flex:1 1 auto;
}
footer{
    line-height: 60px;
    height: 60px;
    background-color: #89023e;
}
footer span{
    margin-left: 15px;
    color: white;
}
</style>