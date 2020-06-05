import Vue from 'vue';
import VCalendar from 'v-calendar';

// Use v-calendar & v-date-picker components
if (process.client) {
    Vue.use(VCalendar);
}
