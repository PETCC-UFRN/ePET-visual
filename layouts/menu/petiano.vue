<template>
  <div class="app">
    <AppHeader/>
    <div class="app-body">
      <Sidebar :navItems="nav"/>
      <main class="main">
        <breadcrumb :list="list"/>
        <div class="container-fluid">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <a class="btn btn-sm btn-primary float-right" style="color: white">Adicionar evento</a>
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
                        <div class="row" v-else>
                            Nenhum evento cadastrado
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </main>
    </div>
    <AppFooter/>
  </div>
</template>

<script>
import nav from './petiano'
import auth from '../../auth'
import { Header as AppHeader, Sidebar, Footer as AppFooter, Breadcrumb } from '~/components/'
import axios from "axios"
export default {
  name: 'full',
  components: {
    AppHeader,
    Sidebar,
    AppFooter,
    Breadcrumb
  },
  data () {
    return {
      nav: nav.items,
      eventos: []
    }
  },
  computed: {
    list () {
      return this.$route.matched
    }
  },
  mounted(){
      console.log(auth);
    let vm = this;
    axios.get('http://epet.imd.ufrn.br/service/api/eventos', auth).then(
        (data) => { vm.eventos = data }
    );
  }
}
</script>