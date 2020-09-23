<template>
  <v-app>
    <app-header></app-header>
    <div v-if="worknumberDialog">
      <app-worknumber></app-worknumber>
    </div>
    <app-settings></app-settings>
    <app-history></app-history>
    <app-confirm ref="confirm"></app-confirm>
    <v-content>
      <router-view></router-view>
    </v-content>
    <app-footer></app-footer>
  </v-app>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import AppHeader from '@/components/core/AppHeader.vue';
import AppConfirm from '@/components/core/AppConfirm.vue';
import AppWorknumber from '@/components/core/AppWorknumber.vue';
import AppSettings from '@/components/core/AppSettings.vue';
import AppHistory from '@/components/core/AppHistory.vue';
import AppFooter from '@/components/core/AppFooter.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppConfirm,
    AppWorknumber,
    AppSettings,
    AppHistory,
    AppFooter,
  },
  data() {
    return {
      interval: null,
    };
  },
  methods: {
    ...mapActions({
      getServerTime: 'helper/GET_SERVER_TIME',
    }),
  },
  computed: {
    ...mapState({
      worknumberDialog: state => state.helper.worknumberDialog,
    }),
  },
  mounted() {
    this.$root.$confirm = this.$refs.confirm;
    this.interval = setInterval(() => {
      this.getServerTime();
    }, 3000);
    this.getServerTime();
  },
  destroyed() {
    clearInterval(this.interval);
  },
};
</script>
