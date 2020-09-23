<template>
  <v-app-bar app flat>
    <v-toolbar-title>
      <img
        v-if="!$vuetify.theme.dark"
        :src="require('../../assets/shopworx.png')"
        height="40"
      />
      <img
        v-else
        :src="require('../../assets/shopworxwhite.png')"
        height="40"
      />
      <!-- <span class="headline font-weight-bold primary--text">ShopWorx</span> -->
    </v-toolbar-title>
    <v-toolbar-title class="title ml-2 mt-1">
      <span>|</span>
      <span class="font-weight-bold"> {{ $t('appName') }}</span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <history-button></history-button>
    <settings-button></settings-button>
    <station-button></station-button>
    <worknumber-button></worknumber-button>
  </v-app-bar>
</template>

<script>
import HistoryButton from '@/components/header/HistoryButton.vue';
import SettingsButton from '@/components/header/SettingsButton.vue';
import WorknumberButton from '@/components/header/WorknumberButton.vue';
import StationButton from '@/components/header/StationButton.vue';

export default {
  name: 'AppHeader',
  components: {
    HistoryButton,
    SettingsButton,
    WorknumberButton,
    StationButton,
  },
};
</script>
