<template>
  <div class="row" style="margin-top: 45px">
    <div class="col-md-8 mb-5">
      <h2>SOBRE O PET-CC</h2>
      <hr>
      <p style="text-indent:25px">
        O Programa de Educação Tutorial (<b>PET</b>) é um projeto nacional, organizado através
        de cursos de graduação das Instituições de Ensino Superior do Brasil. Diante disso, 
        nosso grupo está relacionado ao curso de Ciência da Computação (<b>CC</b>) da universidade
        federal do Rio grande do Norte (<b>UFRN</b>). Além disso, assim como cada PET, somos orientados por um tutor, 
        atualmente o professor Umberto Costa e nosso grupo é composto por <i>12</i> bolsistas e até <i>6</i> voluntários.
      </p>
      <a class="btn btn-success btn-lg" href="/sobre" style="color: white">Saber mais &raquo;</a>
    </div>
    <div class="col-md-4 mb-5">
      <h2>Contato</h2>
      <hr>
      <address>
        <abbr title="Phone">Telefone:</abbr>
        +55 84 3333-3333
        <br>
        <abbr title="Email">Email:</abbr>
        <a href="mailto:#">petcc@dimap.ufrn.br</a>
        <br>
        <br>
      </address>
      <h3> Redes Sociais</h3>
      <a href="https://github.com/PETCC-UFRN" target="_blank"><i class="fab fa-github-square" style="font-size:36px;padding-right:5px;color:black;"></i></a>
      <a href="https://www.facebook.com/petccufrn/" target="_blank"><i class="fab fa-facebook" style="font-size:36px;padding-right:5px;color:black;"></i></a>
      <a href="https://www.instagram.com/petccufrn/" target="_blank"><i class="fab fa-instagram" style="font-size:36px;padding-right:5px;color:black;"></i></a>
      <a href="https://www.youtube.com/channel/UC_1IEMXjN5YMaUFYhcx4JXQ" target="_blank"><i class="fab fa-youtube" style="font-size:36px;color:black;"></i></a>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {
    let fontawesome = document.createElement('script')
    fontawesome.setAttribute('src', 'https://kit.fontawesome.com/a076d05399.js')
    document.head.appendChild(fontawesome)
  }
}
</script>

