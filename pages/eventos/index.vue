<template>
  <div class="col-md-12">
    <div class="card">
      <div class="card-body">
        <!-- TODO::remover esse style -->
        <a
          class="btn btn-sm btn-primary float-right"
          style="color: white"
          href="eventos/create"
        >Adicionar evento</a>
        <div class="table-responsive" v-if="eventos.length > 0">
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="row" v-else>Nenhum evento cadastrado</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import auth from "../../auth";

export default {
  name: "dashboard",
  /* TODO:: Esse layout será apresentado tanto pro petiano quando pro coordenador
  depois será necessário uma lógica pra chamar o layout dependendo do tipo de usuário
  logado. No momento trabalharei apenas com os petianos. */
  layout: "menu/petiano",
  data() {
    return {
      eventos: []
    };
  },
  mounted() {
    axios
      .get("http://epet.imd.ufrn.br/service/api/eventos", auth)
      .then(data => {
        vm.eventos = data;
      });
  }
};
</script>