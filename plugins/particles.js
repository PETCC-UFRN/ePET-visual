import Vue from 'vue';
import VueParticlesBg from "particles-bg-vue";

if (process.client) {
    Vue.use(VueParticlesBg);
}