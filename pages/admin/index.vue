<template>
  <div class="animated fadeIn">
    <b-row>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-primary">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item>Action</b-dropdown-item>
              <b-dropdown-item>Another action</b-dropdown-item>
              <b-dropdown-item>Something else here...</b-dropdown-item>
              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">9.823</h4>
            <p>Members online</p>
          </b-card-body>
          <card-line1-chart-example class="chart-wrapper px-3" style="height:70px;" height="70" />
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-info">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right no-caret>
              <template slot="button-content">
                <i class="icon-location-pin"></i>
              </template>
              <b-dropdown-item>Action</b-dropdown-item>
              <b-dropdown-item>Another action</b-dropdown-item>
              <b-dropdown-item>Something else here...</b-dropdown-item>
              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">9.823</h4>
            <p>Members online</p>
          </b-card-body>
          <card-line2-chart-example class="chart-wrapper px-3" style="height:70px;" height="70" />
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-warning">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item>Action</b-dropdown-item>
              <b-dropdown-item>Another action</b-dropdown-item>
              <b-dropdown-item>Something else here...</b-dropdown-item>
              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">9.823</h4>
            <p>Members online</p>
          </b-card-body>
          <card-line3-chart-example class="chart-wrapper" style="height:70px;" height="70" />
        </b-card>
      </b-col>
      <b-col sm="6" lg="3">
        <b-card no-body class="bg-danger">
          <b-card-body class="pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
              <template slot="button-content">
                <i class="icon-settings"></i>
              </template>
              <b-dropdown-item>Action</b-dropdown-item>
              <b-dropdown-item>Another action</b-dropdown-item>
              <b-dropdown-item>Something else here...</b-dropdown-item>
              <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">9.823</h4>
            <p>Members online</p>
          </b-card-body>
          <card-bar-chart-example class="chart-wrapper px-3" style="height:70px;" height="70" />
        </b-card>
      </b-col>
    </b-row>

    <b-card>
      <b-row>
        <b-col sm="5">
          <h4 id="traffic" class="card-title mb-0">Traffic</h4>
          <div class="small text-muted">November 2017</div>
        </b-col>
        <b-col sm="7" class="d-none d-md-block">
          <b-button type="button" variant="primary" class="float-right">
            <i class="icon-cloud-download"></i>
          </b-button>
          <b-button-toolbar class="float-right" aria-label="Toolbar with buttons group">
            <b-form-radio-group
              class="mr-3"
              id="radiosBtn"
              buttons
              button-variant="outline-secondary"
              v-model="selected"
              name="radiosBtn"
            >
              <b-form-radio class="mx-0" value="Day">Day</b-form-radio>
              <b-form-radio class="mx-0" value="Month">Month</b-form-radio>
              <b-form-radio class="mx-0" value="Year">Year</b-form-radio>
            </b-form-radio-group>
          </b-button-toolbar>
        </b-col>
      </b-row>
      <main-chart-example class="chart-wrapper" style="height:300px;margin-top:40px;" height="300"></main-chart-example>
      <div slot="footer">
        <ul>
          <li>
            <div class="text-muted">Visits</div>
            <strong>29.703 Users (40%)</strong>
            <b-progress
              height="{}"
              class="progress-xs mt-2"
              :precision="1"
              variant="success"
              :value="40"
            ></b-progress>
          </li>
          <li class="d-none d-md-table-cell">
            <div class="text-muted">Unique</div>
            <strong>24.093 Users (20%)</strong>
            <b-progress
              height="{}"
              class="progress-xs mt-2"
              :precision="1"
              variant="info"
              :value="20"
            ></b-progress>
          </li>
          <li>
            <div class="text-muted">Pageviews</div>
            <strong>78.706 Views (60%)</strong>
            <b-progress
              height="{}"
              class="progress-xs mt-2"
              :precision="1"
              variant="warning"
              :value="60"
            ></b-progress>
          </li>
          <li class="d-none d-md-table-cell">
            <div class="text-muted">New Users</div>
            <strong>22.123 Users (80%)</strong>
            <b-progress
              height="{}"
              class="progress-xs mt-2"
              :precision="1"
              variant="danger"
              :value="80"
            ></b-progress>
          </li>
          <li class="d-none d-md-table-cell">
            <div class="text-muted">Bounce Rate</div>
            <strong>40.15%</strong>
            <b-progress height="{}" class="progress-xs mt-2" :precision="1" :value="40"></b-progress>
          </li>
        </ul>
      </div>
    </b-card>
    <b-row>
      <b-col sm="6" lg="3">
        <div class="social-box facebook">
          <i class="fa fa-facebook"></i>
          <div class="chart-wrapper">
            <social-box-chart-example :data="[65, 59, 84, 84, 51, 55, 40]" height="90" />
          </div>
          <ul>
            <li>
              <strong>89k</strong>
              <span>friends</span>
            </li>
            <li>
              <strong>459</strong>
              <span>feeds</span>
            </li>
          </ul>
        </div>
        <!--/.social-box-->
      </b-col>
      <b-col sm="6" lg="3">
        <div class="social-box twitter">
          <i class="fa fa-twitter"></i>
          <div class="chart-wrapper">
            <social-box-chart-example :data="[1, 13, 9, 17, 34, 41, 38]" height="90" />
          </div>
          <ul>
            <li>
              <strong>973k</strong>
              <span>followers</span>
            </li>
            <li>
              <strong>1.792</strong>
              <span>tweets</span>
            </li>
          </ul>
        </div>
        <!--/.social-box-->
      </b-col>
      <b-col sm="6" lg="3">
        <div class="social-box linkedin">
          <i class="fa fa-linkedin"></i>
          <div class="chart-wrapper">
            <social-box-chart-example :data="[78, 81, 80, 45, 34, 12, 40]" height="90" />
          </div>
          <ul>
            <li>
              <strong>500+</strong>
              <span>contacts</span>
            </li>
            <li>
              <strong>292</strong>
              <span>feeds</span>
            </li>
          </ul>
        </div>
        <!--/.social-box-->
      </b-col>
      <b-col sm="6" lg="3">
        <div class="social-box google-plus">
          <i class="fa fa-google-plus"></i>
          <div class="chart-wrapper">
            <social-box-chart-example :data="[35, 23, 56, 22, 97, 23, 64]" height="90" />
          </div>
          <ul>
            <li>
              <strong>894</strong>
              <span>followers</span>
            </li>
            <li>
              <strong>92</strong>
              <span>circles</span>
            </li>
          </ul>
        </div>
        <!--/.social-box-->
      </b-col>
    </b-row>

    <b-row>
      <b-col md="12">
        <b-card header="Notícias">
          <b-table
            class="mb-0 table-outline"
            responsive="sm"
            hover
            :items="tableItems"
            :fields="tableFields"
            head-variant="light"
          ></b-table>
        </b-card>
      </b-col>
    </b-row>
   </div>
</template>

<script>
import CardLine1ChartExample from "~/components/dashboard/CardLine1ChartExample";
import CardLine2ChartExample from "~/components/dashboard/CardLine2ChartExample";
import CardLine3ChartExample from "~/components/dashboard/CardLine3ChartExample";
import CardBarChartExample from "~/components/dashboard/CardBarChartExample";
import MainChartExample from "~/components/dashboard/MainChartExample";
import SocialBoxChartExample from "~/components/dashboard/SocialBoxChartExample";
// import CalloutChartExample from "~/components/dashboard/CalloutChartExample";
// import { Callout } from "~/components/";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: 'dashboard',
  layout: 'menu/petiano',
  components: {
    // Callout,
    CardLine1ChartExample,
    CardLine2ChartExample,
    CardLine3ChartExample,
    CardBarChartExample,
    MainChartExample,
    SocialBoxChartExample,
    // CalloutChartExample
  },
  data: function() {
    return {
      noticia: {
        titulo: "",
        corpo: "",
        data_inicio: "",
        data_fim: ""
      },
      selected: "Month",
      tableItems: null,
      tableFields: {
        avatar: {
          label: '<i class="icon-people"></i>',
          class: "text-center"
        },
        user: {
          label: "User"
        },
        country: {
          label: "Country",
          class: "text-center"
        },
        usage: {
          label: "Usage"
        },
        payment: {
          label: "Payment method",
          class: "text-center"
        },
        activity: {
          label: "Activity"
        }
      }
    };
  },
  computed: {
    ...mapGetters(["loggedInUser"])
  },
  mounted() {
    this.getNoticias();
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
    async getNoticias() {
      await axios
        .get("http://epet.imd.ufrn.br/service/api/noticia", {
          auth: { username: "teste@gmail.com", password: "123456789" }
        })
        .then(res => {
          let result = res.data.content;
          let itens = [];
          let e = null;
          for (e of result) {
            itens.push({
              titulo: e.titulo,
              texto: e.corpo
            });
          }
          this.tableItems = itens;
          console.log(itens);
        });
    },

    variant(value) {
      let $variant;
      if (value <= 25) {
        $variant = "info";
      } else if (value > 25 && value <= 50) {
        $variant = "success";
      } else if (value > 50 && value <= 75) {
        $variant = "warning";
      } else if (value > 75 && value <= 100) {
        $variant = "danger";
      }
      return $variant;
    },
    flag(value) {
      return "flag-icon flag-icon-" + value;
    }
  }
};
</script>